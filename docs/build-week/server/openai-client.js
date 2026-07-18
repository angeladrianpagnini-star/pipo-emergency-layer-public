const { SYSTEM_PROMPT } = require("./prompt");
const { PIPO_AI_RESPONSE_SCHEMA } = require("./schema");
const { buildProviderPayload } = require("./validator");

function createProviderError(code, status, message) {
  const error = new Error(message || code);
  error.code = code;
  error.status = status;
  return error;
}

function extractOutputText(responseBody) {
  if (typeof responseBody?.output_text === "string") return responseBody.output_text;
  const output = Array.isArray(responseBody?.output) ? responseBody.output : [];
  for (const item of output) {
    const content = Array.isArray(item?.content) ? item.content : [];
    for (const part of content) {
      if (typeof part?.text === "string") return part.text;
      if (typeof part?.output_text === "string") return part.output_text;
    }
  }
  return "";
}

async function callOpenAIResponses(input, config, fetchImpl = globalThis.fetch) {
  if (!config.providerCredentialPresent || !config.providerCredential) {
    throw createProviderError("missing_provider_credential", 503, "Provider credential missing.");
  }

  if (typeof fetchImpl !== "function") {
    throw createProviderError("provider_error", 503, "Fetch unavailable.");
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), config.timeoutMs);

  try {
    const response = await fetchImpl(config.providerEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.providerCredential}`,
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: config.model,
        input: [
          {
            role: "system",
            content: [{ type: "input_text", text: SYSTEM_PROMPT }],
          },
          {
            role: "user",
            content: [{ type: "input_text", text: JSON.stringify(buildProviderPayload(input)) }],
          },
        ],
        text: {
          format: {
            type: "json_schema",
            name: "pipo_ai_incident_suggestion",
            strict: true,
            schema: PIPO_AI_RESPONSE_SCHEMA,
          },
        },
      }),
    });

    if (!response.ok) {
      throw createProviderError("provider_error", 503, `Provider returned HTTP ${response.status}.`);
    }

    const responseBody = await response.json();
    const outputText = extractOutputText(responseBody);
    if (!outputText) {
      throw createProviderError("provider_empty_response", 503, "Provider response empty.");
    }

    try {
      return JSON.parse(outputText);
    } catch (error) {
      throw createProviderError("provider_invalid_json", 503, "Provider output was not valid JSON.");
    }
  } catch (error) {
    if (error?.name === "AbortError") {
      throw createProviderError("provider_timeout", 504, "Provider timed out.");
    }
    if (error?.code) throw error;
    throw createProviderError("provider_error", 503, "Provider request failed.");
  } finally {
    clearTimeout(timer);
  }
}

module.exports = {
  callOpenAIResponses,
  extractOutputText,
};
