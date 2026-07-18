const {
  ALLOWED_CHOICES,
  ALLOWED_PRIORITIES,
  ALLOWED_CONFIDENCE_LEVELS,
  CONSOLE_BY_TYPE,
  ALLOWED_CONSOLE_TYPES,
} = require("./schema");

function createRequestId() {
  const stamp = Date.now().toString(36).toUpperCase();
  const entropy = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `REQ-${stamp}-${entropy}`;
}

function asString(value, fallback = "") {
  if (value === null || value === undefined) return fallback;
  return String(value).trim();
}

function asArrayOfStrings(value) {
  if (!Array.isArray(value)) return [];
  return value.map((item) => asString(item)).filter(Boolean).slice(0, 20);
}

function normalizeChoice(value) {
  const normalized = asString(value, "UNKNOWN").toUpperCase();
  return ALLOWED_CHOICES.includes(normalized) ? normalized : "UNKNOWN";
}

function normalizePriority(value) {
  const normalized = asString(value, "UNDETERMINED").toUpperCase();
  return ALLOWED_PRIORITIES.includes(normalized) ? normalized : "UNDETERMINED";
}

function normalizeConfidence(value) {
  const normalized = asString(value, "LOW").toUpperCase();
  return ALLOWED_CONFIDENCE_LEVELS.includes(normalized) ? normalized : "LOW";
}

function safeStringList(value, fallback) {
  const list = asArrayOfStrings(value);
  return list.length ? list : fallback;
}

function createValidationError(status, code, message) {
  return {
    ok: false,
    status,
    error: {
      code,
      message,
    },
  };
}

function validateIncidentRequest(body = {}, config) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return createValidationError(400, "invalid_body", "JSON body object required.");
  }

  const incidentId = asString(body.incidentId, "PIPO-BW-000001");
  const freeText = asString(body.freeText || body.description);
  const additionalInfo = asString(body.additionalInfo);
  const channel = asString(body.channel, "PIPO Layer");
  const estimatedLocation = asString(body.estimatedLocation || body.location);
  const requestedMode = asString(body.requestedMode, "OPENAI_SECURE_BACKEND");
  const riskIndicators = body.riskIndicators && typeof body.riskIndicators === "object" ? body.riskIndicators : {};
  const existingContext = body.existingContext && typeof body.existingContext === "object" ? body.existingContext : {};
  const totalText = `${freeText}\n${additionalInfo}`.trim();

  if (requestedMode !== "OPENAI_SECURE_BACKEND") {
    return createValidationError(400, "unsupported_mode", "Only OPENAI_SECURE_BACKEND is accepted by this endpoint.");
  }

  if (!totalText) {
    return createValidationError(400, "empty_input", "Incident text is required.");
  }

  if (totalText.length > config.maxFreeTextChars) {
    return createValidationError(413, "input_too_long", `Incident text exceeds ${config.maxFreeTextChars} characters.`);
  }

  return {
    ok: true,
    value: {
      incidentId,
      freeText,
      additionalInfo,
      channel,
      estimatedLocation,
      requestedMode,
      riskIndicators: {
        canSpeak: normalizeChoice(riskIndicators.canSpeak),
        currentRisk: normalizeChoice(riskIndicators.currentRisk),
        injuredPersons: normalizeChoice(riskIndicators.injuredPersons),
        minorsPresent: normalizeChoice(riskIndicators.minorsPresent),
        weaponsPresent: normalizeChoice(riskIndicators.weaponsPresent),
        possibleDigitalIncident: normalizeChoice(riskIndicators.possibleDigitalIncident),
        stolenOrLostDevice: normalizeChoice(riskIndicators.stolenOrLostDevice),
      },
      existingContext: {
        incidentStatus: asString(existingContext.incidentStatus),
        currentPriority: asString(existingContext.currentPriority),
        availableConsoles: Array.isArray(existingContext.availableConsoles)
          ? existingContext.availableConsoles.map((item) => ({
            consoleId: asString(item.consoleId || item.id),
            consoleType: asString(item.consoleType || item.type),
            consoleName: asString(item.consoleName || item.name),
          })).filter((item) => item.consoleId || item.consoleType || item.consoleName).slice(0, 20)
          : [],
      },
      charCount: totalText.length,
    },
  };
}

function buildProviderPayload(input) {
  return {
    incidentId: input.incidentId,
    freeText: input.freeText,
    channel: input.channel,
    estimatedLocation: input.estimatedLocation,
    riskIndicators: input.riskIndicators,
    existingContext: input.existingContext,
    requestedMode: input.requestedMode,
    constraints: {
      fictitiousDataOnly: true,
      noOperationalAction: true,
      humanValidationRequired: true,
      allowedConsoleTypes: ALLOWED_CONSOLE_TYPES,
      allowedPriorities: ALLOWED_PRIORITIES,
      allowedConfidenceLevels: ALLOWED_CONFIDENCE_LEVELS,
    },
  };
}

function normalizeConsole(rawConsole, warnings, unsupportedClaims) {
  const consoleType = asString(rawConsole?.consoleType).toUpperCase();
  const configured = CONSOLE_BY_TYPE[consoleType];
  if (!configured) {
    if (consoleType) {
      unsupportedClaims.push(`Console not configured: ${consoleType}.`);
    }
    return null;
  }

  const baseAuthorizationRequired = Boolean(
    configured.additionalAuthorizationRequired
    || rawConsole.authorizationRequired
    || rawConsole.additionalAuthorizationRequired,
  );

  return {
    consoleType,
    consoleId: configured.consoleId,
    consoleName: configured.consoleName,
    purpose: asString(rawConsole.purpose, configured.purpose),
    incorporationPriority: asString(rawConsole.incorporationPriority, "REVIEW"),
    minimumInfoToShare: safeStringList(rawConsole.minimumInfoToShare, configured.minimumInfoToShare),
    classification: asString(rawConsole.classification, configured.classification),
    additionalAuthorizationRequired: baseAuthorizationRequired,
    authorizationRequired: baseAuthorizationRequired,
    authorizationExplanation: asString(
      rawConsole.authorizationExplanation,
      baseAuthorizationRequired ? "Requiere validacion humana y autoridad competente antes de medidas excepcionales." : "Sin autorizacion adicional sugerida para la derivacion basica.",
    ),
    potentialAuthority: asString(rawConsole.potentialAuthority, baseAuthorizationRequired ? "Autoridad competente segun protocolo" : "Operador autorizado"),
    missingAuthorizationInformation: safeStringList(rawConsole.missingAuthorizationInformation, []),
  };
}

function buildDefaultAuthorizationRequirement() {
  return {
    authorizationRequired: false,
    capabilityOrAction: "analisis estructurado",
    explanation: "El backend no ejecuta acciones operativas.",
    potentialAuthority: "Operador humano autorizado",
    missingInformation: [],
    humanControlWarning: "Secure backend analysis - human validation required.",
  };
}

function normalizeAuthorizationRequirement(raw) {
  return {
    authorizationRequired: Boolean(raw?.authorizationRequired),
    capabilityOrAction: asString(raw?.capabilityOrAction, "accion no especificada"),
    explanation: asString(raw?.explanation, "Requiere revision humana antes de cualquier accion."),
    potentialAuthority: asString(raw?.potentialAuthority, "Autoridad competente segun protocolo"),
    missingInformation: safeStringList(raw?.missingInformation, []),
    humanControlWarning: asString(raw?.humanControlWarning, "Secure backend analysis - human validation required."),
  };
}

function normalizeSourceFact(raw) {
  return {
    field: asString(raw?.field, "no disponible"),
    value: asString(raw?.value, "no disponible"),
    source: asString(raw?.source, "provided_input"),
  };
}

function normalizeSuggestion(raw = {}, input, auditMetadata, config) {
  const warnings = safeStringList(raw.safetyWarnings, []);
  const unsupportedClaims = safeStringList(raw.unsupportedClaims, []);
  const suggestedPriority = normalizePriority(raw.suggestedPriority);
  const confidenceLevel = normalizeConfidence(raw.confidenceLevel);

  if (suggestedPriority !== asString(raw.suggestedPriority).toUpperCase()) {
    warnings.push("Priority normalized to UNDETERMINED because provider output was outside allowed values.");
  }

  if (confidenceLevel !== asString(raw.confidenceLevel).toUpperCase()) {
    warnings.push("Confidence normalized to LOW because provider output was outside allowed values.");
  }

  const suggestedConsoles = (Array.isArray(raw.suggestedConsoles) ? raw.suggestedConsoles : [])
    .map((item) => normalizeConsole(item, warnings, unsupportedClaims))
    .filter(Boolean);

  if (!suggestedConsoles.some((item) => item.consoleType === "MASTER_MONITORING")) {
    suggestedConsoles.unshift(normalizeConsole({ consoleType: "MASTER_MONITORING", incorporationPriority: "IMMEDIATE" }, warnings, unsupportedClaims));
  }

  const authorizationRequirements = (Array.isArray(raw.authorizationRequirements) ? raw.authorizationRequirements : [])
    .map(normalizeAuthorizationRequirement);

  if (!authorizationRequirements.length) {
    authorizationRequirements.push(buildDefaultAuthorizationRequirement());
  }

  const sourceFacts = (Array.isArray(raw.sourceFacts) ? raw.sourceFacts : [])
    .map(normalizeSourceFact);

  if (!sourceFacts.length) {
    sourceFacts.push({ field: "freeText", value: "provided", source: "incident_input" });
  }

  if (raw.requiresHumanValidation !== true) {
    warnings.push("Human validation forced by server contract.");
  }

  const normalizedInput = {
    incidentId: input.incidentId,
    description: input.freeText,
    channel: input.channel,
    location: input.estimatedLocation,
    canSpeak: input.riskIndicators.canSpeak,
    currentRisk: input.riskIndicators.currentRisk,
    injuredPersons: input.riskIndicators.injuredPersons,
    minorsPresent: input.riskIndicators.minorsPresent,
    weaponsPresent: input.riskIndicators.weaponsPresent,
    possibleDigitalIncident: input.riskIndicators.possibleDigitalIncident,
    stolenOrLostDevice: input.riskIndicators.stolenOrLostDevice,
    additionalInfo: input.additionalInfo,
    reportedBy: "usuario u operador demo",
  };

  const neutralSummary = asString(raw.neutralSummary, "No disponible. La respuesta fue normalizada sin completar datos no informados.");
  const suggestedIncidentType = asString(raw.suggestedIncidentType, "Informacion insuficiente");
  const detectedRiskFactors = safeStringList(raw.detectedRiskFactors, ["riesgo no determinado"]);
  const availableInformation = safeStringList(raw.availableInformation, ["entrada ficticia recibida"]);
  const missingCriticalInformation = safeStringList(raw.missingCriticalInformation, ["validacion humana"]);
  const followUpQuestions = safeStringList(raw.followUpQuestions, ["Que organismo debe revisar primero?"]);
  const suggestedSpecialties = safeStringList(raw.suggestedSpecialties, ["revision humana"]);
  const reasoningSummary = asString(raw.reasoningSummary, "Respuesta estructurada normalizada por el backend experimental.");

  return {
    suggestionId: `AI-BACKEND-${auditMetadata.requestId}`,
    id: null,
    incidentId: input.incidentId,
    originalInput: normalizedInput,
    inputText: input.freeText,
    neutralSummary,
    summary: neutralSummary,
    suggestedIncidentType,
    suggestedType: suggestedIncidentType,
    suggestedPriority,
    detectedRiskFactors,
    riskFactors: detectedRiskFactors,
    availableInformation,
    availableInfo: availableInformation,
    missingCriticalInformation,
    missingInfo: missingCriticalInformation,
    followUpQuestions,
    suggestedQuestions: followUpQuestions,
    suggestedConsoles,
    competentAgencies: suggestedConsoles.map((item) => item.consoleName),
    suggestedSpecialties,
    suggestedActions: [
      "Registrar la sugerencia en bitacora append-only.",
      "Revisar y confirmar decision humana antes de derivar.",
      "Compartir solo informacion minima necesaria por consola.",
    ],
    safetyWarnings: [
      "Secure backend analysis - human validation required.",
      "Backend experimental Build Week. Datos ficticios.",
      ...warnings,
    ],
    authorizationRequirements,
    legalOrAuthorizationRequirements: authorizationRequirements.map((item) => item.explanation),
    confidenceLevel,
    confidence: confidenceLevel,
    reasoningSummary,
    explanation: reasoningSummary,
    sourceFacts,
    unsupportedClaims,
    requiresHumanValidation: true,
    generatedAt: auditMetadata.timestamp,
    mode: "OPENAI_SECURE_BACKEND",
    provider: "secure-openai-backend",
    modelOrEngineLabel: config.model,
    version: config.contractVersion,
    requestId: auditMetadata.requestId,
    analysisVersion: config.contractVersion,
    serverAudit: auditMetadata,
    allowedPriorities: ALLOWED_PRIORITIES,
    allowedConfidenceLevels: ALLOWED_CONFIDENCE_LEVELS,
  };
}

function sanitizeProviderError(error) {
  const code = error?.code || "provider_error";
  const status = error?.status || (code === "provider_timeout" ? 504 : 503);
  const messageByCode = {
    missing_provider_credential: "Secure backend credential is not configured.",
    provider_timeout: "Secure backend provider request timed out.",
    provider_error: "Secure backend provider returned an error.",
    provider_invalid_json: "Secure backend provider response could not be parsed.",
    provider_empty_response: "Secure backend provider response was empty.",
    validation_failed: "Secure backend validation failed.",
  };
  return {
    status,
    body: {
      ok: false,
      error: {
        code,
        message: messageByCode[code] || "Secure backend request failed.",
      },
    },
  };
}

module.exports = {
  createRequestId,
  validateIncidentRequest,
  buildProviderPayload,
  normalizeSuggestion,
  sanitizeProviderError,
  normalizePriority,
  normalizeConfidence,
};
