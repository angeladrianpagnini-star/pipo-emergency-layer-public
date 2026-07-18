const { getServerConfig, getPublicBackendStatus } = require("./config");
const { callOpenAIResponses } = require("./openai-client");
const {
  createRequestId,
  validateIncidentRequest,
  normalizeSuggestion,
  sanitizeProviderError,
} = require("./validator");
const { recordAuditEvent } = require("./audit");

function sendJson(res, status, body) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  res.end(JSON.stringify(body));
}

function createAuditBase(requestId, config, incidentId, charCount, success, durationMs, errorCode = null) {
  return {
    requestId,
    timestamp: new Date().toISOString(),
    incidentId,
    mode: "OPENAI_SECURE_BACKEND",
    durationMs,
    success,
    contractVersion: config.contractVersion,
    model: config.model,
    errorCode,
    charCount,
  };
}

async function analyzeIncidentWithBackend(body, options = {}) {
  const config = options.config || getServerConfig(options.env);
  const requestId = options.requestId || createRequestId();
  const startedAt = Date.now();
  const validation = validateIncidentRequest(body, config);

  if (!validation.ok) {
    const audit = recordAuditEvent(createAuditBase(
      requestId,
      config,
      body?.incidentId || "unknown",
      0,
      false,
      Date.now() - startedAt,
      validation.error.code,
    ));
    return {
      status: validation.status,
      body: {
        ok: false,
        error: {
          ...validation.error,
          requestId,
        },
        audit,
      },
    };
  }

  const input = validation.value;

  try {
    const rawSuggestion = await (options.providerCall || callOpenAIResponses)(input, config, options.fetchImpl);
    const audit = recordAuditEvent(createAuditBase(
      requestId,
      config,
      input.incidentId,
      input.charCount,
      true,
      Date.now() - startedAt,
      null,
    ));
    const suggestion = normalizeSuggestion(rawSuggestion, input, audit, config);
    return {
      status: 200,
      body: {
        ok: true,
        suggestion,
        audit,
      },
    };
  } catch (error) {
    const safeError = sanitizeProviderError(error);
    const audit = recordAuditEvent(createAuditBase(
      requestId,
      config,
      input.incidentId,
      input.charCount,
      false,
      Date.now() - startedAt,
      safeError.body.error.code,
    ));
    return {
      status: safeError.status,
      body: {
        ok: false,
        error: {
          ...safeError.body.error,
          requestId,
        },
        audit,
      },
    };
  }
}

function readJsonBody(req, maxBodyBytes) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (Buffer.byteLength(body, "utf8") > maxBodyBytes) {
        const error = new Error("Body too large.");
        error.code = "body_too_large";
        reject(error);
        req.destroy();
      }
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        const parseError = new Error("Invalid JSON body.");
        parseError.code = "invalid_json";
        reject(parseError);
      }
    });
    req.on("error", reject);
  });
}

async function handleAnalyzeIncident(req, res, options = {}) {
  const config = options.config || getServerConfig(options.env);
  if (req.method === "OPTIONS") {
    res.writeHead(204, { Allow: "POST, OPTIONS" });
    res.end();
    return;
  }

  if (req.method !== "POST") {
    sendJson(res, 405, {
      ok: false,
      error: {
        code: "method_not_allowed",
        message: "Use POST for /api/analyze-incident.",
      },
    });
    return;
  }

  try {
    const body = await readJsonBody(req, config.maxBodyBytes);
    const result = await analyzeIncidentWithBackend(body, { ...options, config });
    sendJson(res, result.status, result.body);
  } catch (error) {
    const code = error?.code === "body_too_large" ? "body_too_large" : "invalid_json";
    sendJson(res, code === "body_too_large" ? 413 : 400, {
      ok: false,
      error: {
        code,
        message: code === "body_too_large" ? "Request body is too large." : "Invalid JSON body.",
      },
    });
  }
}

function handleBackendStatus(req, res, options = {}) {
  const config = options.config || getServerConfig(options.env);
  if (req.method !== "GET") {
    sendJson(res, 405, {
      ok: false,
      error: {
        code: "method_not_allowed",
        message: "Use GET for /api/backend-status.",
      },
    });
    return;
  }

  sendJson(res, 200, {
    ok: true,
    backend: getPublicBackendStatus(config),
  });
}

module.exports = {
  analyzeIncidentWithBackend,
  handleAnalyzeIncident,
  handleBackendStatus,
  readJsonBody,
};
