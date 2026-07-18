const assert = require("assert");
const {
  analyzeIncidentWithBackend,
} = require("./analyze-incident");
const {
  getServerConfig,
} = require("./config");
const {
  callOpenAIResponses,
} = require("./openai-client");
const {
  getAuditEvents,
  clearAuditEvents,
} = require("./audit");

const configuredEnv = {
  PIPO_OPENAI_CREDENTIAL: "test-credential",
  PIPO_OPENAI_MODEL: "gpt-5.6",
  PIPO_OPENAI_TIMEOUT_MS: "50",
  PIPO_OPENAI_MAX_FREE_TEXT_CHARS: "400",
};

function baseBody(overrides = {}) {
  return {
    incidentId: "PIPO-BW-TEST",
    freeText: "Persona informa amenaza digital y posible robo de dispositivo. Solicita orientacion.",
    channel: "PIPO Layer",
    estimatedLocation: "Zona ficticia",
    riskIndicators: {
      canSpeak: "YES",
      currentRisk: "UNKNOWN",
      injuredPersons: "NO",
      minorsPresent: "UNKNOWN",
      weaponsPresent: "NO",
      possibleDigitalIncident: "YES",
      stolenOrLostDevice: "YES",
    },
    existingContext: {
      incidentStatus: "En validacion humana",
      currentPriority: "UNDETERMINED",
      availableConsoles: [
        { consoleId: "CON-MASTER", consoleType: "MASTER_MONITORING", consoleName: "Consola Maestra PIPO" },
        { consoleId: "CON-CIBER", consoleType: "CYBERCRIME", consoleName: "Ciberdelitos" },
      ],
    },
    requestedMode: "OPENAI_SECURE_BACKEND",
    ...overrides,
  };
}

function providerSuggestion(overrides = {}) {
  return {
    neutralSummary: "El relato indica un posible incidente digital con dispositivo robado o perdido. No se verifica ubicacion real ni culpabilidad.",
    suggestedIncidentType: "Ciberdelito / dispositivo robado",
    suggestedPriority: "YELLOW",
    detectedRiskFactors: ["posible evidencia digital sensible", "dispositivo declarado como robado o perdido"],
    availableInformation: ["relato ficticio", "canal PIPO Layer", "ubicacion ficticia"],
    missingCriticalInformation: ["denuncia", "titularidad", "autoridad receptora"],
    followUpQuestions: ["Existe denuncia formal?", "Que autoridad recibio la comunicacion?"],
    suggestedConsoles: [
      {
        consoleType: "MASTER_MONITORING",
        consoleId: "CON-MASTER",
        consoleName: "Consola Maestra PIPO",
        purpose: "coordinar",
        incorporationPriority: "IMMEDIATE",
        minimumInfoToShare: ["ID de incidente"],
        classification: "OPERATIONAL",
        additionalAuthorizationRequired: false,
        authorizationRequired: false,
        authorizationExplanation: "Revision operativa.",
        potentialAuthority: "Operador autorizado",
        missingAuthorizationInformation: [],
      },
      {
        consoleType: "CYBERCRIME",
        consoleId: "CON-CIBER",
        consoleName: "Ciberdelitos",
        purpose: "preservacion selectiva",
        incorporationPriority: "REVIEW",
        minimumInfoToShare: ["capturas seleccionadas"],
        classification: "RESTRICTED_JUDICIAL",
        additionalAuthorizationRequired: true,
        authorizationRequired: true,
        authorizationExplanation: "Requiere autorizacion competente para capacidades excepcionales.",
        potentialAuthority: "Fiscalia / Justicia",
        missingAuthorizationInformation: ["denuncia", "alcance"],
      },
    ],
    suggestedSpecialties: ["ciberdelitos", "preservacion digital"],
    safetyWarnings: ["No activar ubicacion, audio ni video desde el asistente."],
    authorizationRequirements: [
      {
        authorizationRequired: true,
        capabilityOrAction: "recuperacion de dispositivo",
        explanation: "Requiere denuncia, titularidad, alcance y autoridad competente.",
        potentialAuthority: "Fiscalia / Justicia",
        missingInformation: ["denuncia", "titularidad", "alcance"],
        humanControlWarning: "Secure backend analysis - human validation required.",
      },
    ],
    confidenceLevel: "MEDIUM",
    reasoningSummary: "Se consideran solo datos aportados y se bloquean capacidades intrusivas.",
    sourceFacts: [
      { field: "freeText", value: "provided", source: "incident_input" },
    ],
    unsupportedClaims: ["No se confirma ubicacion real del dispositivo."],
    requiresHumanValidation: true,
    ...overrides,
  };
}

async function main() {
  clearAuditEvents();
  const config = getServerConfig(configuredEnv);

  const valid = await analyzeIncidentWithBackend(baseBody(), {
    config,
    requestId: "REQ-VALID",
    providerCall: async () => providerSuggestion(),
  });
  assert.strictEqual(valid.status, 200);
  assert.strictEqual(valid.body.ok, true);
  assert.strictEqual(valid.body.suggestion.suggestedPriority, "YELLOW");
  assert.strictEqual(valid.body.suggestion.confidenceLevel, "MEDIUM");
  assert.strictEqual(valid.body.suggestion.requestId, "REQ-VALID");
  assert.strictEqual(valid.body.suggestion.requiresHumanValidation, true);
  assert(valid.body.suggestion.suggestedConsoles.some((item) => item.consoleType === "CYBERCRIME"));
  assert(valid.body.suggestion.authorizationRequirements.some((item) => item.authorizationRequired));
  assert(!JSON.stringify(valid.body.audit).includes("Persona informa"));
  assert.strictEqual(getAuditEvents().length, 1);

  const empty = await analyzeIncidentWithBackend(baseBody({ freeText: "", additionalInfo: "" }), {
    config,
    requestId: "REQ-EMPTY",
    providerCall: async () => providerSuggestion(),
  });
  assert.strictEqual(empty.status, 400);
  assert.strictEqual(empty.body.error.code, "empty_input");

  const tooLong = await analyzeIncidentWithBackend(baseBody({ freeText: "x".repeat(401) }), {
    config,
    requestId: "REQ-LONG",
    providerCall: async () => providerSuggestion(),
  });
  assert.strictEqual(tooLong.status, 413);
  assert.strictEqual(tooLong.body.error.code, "input_too_long");

  const absentCredential = await analyzeIncidentWithBackend(baseBody(), {
    config: getServerConfig({ PIPO_OPENAI_MODEL: "gpt-5.6" }),
    requestId: "REQ-NO-CREDENTIAL",
  });
  assert.strictEqual(absentCredential.status, 503);
  assert.strictEqual(absentCredential.body.error.code, "missing_provider_credential");

  const providerError = await analyzeIncidentWithBackend(baseBody(), {
    config,
    requestId: "REQ-PROVIDER-ERROR",
    providerCall: async () => {
      const error = new Error("Provider failed");
      error.code = "provider_error";
      error.status = 503;
      throw error;
    },
  });
  assert.strictEqual(providerError.status, 503);
  assert.strictEqual(providerError.body.error.code, "provider_error");
  assert(!providerError.body.error.stack);

  const incomplete = await analyzeIncidentWithBackend(baseBody(), {
    config,
    requestId: "REQ-INCOMPLETE",
    providerCall: async () => ({
      suggestedPriority: "BLUE",
      confidenceLevel: "CERTAIN",
      suggestedConsoles: [{ consoleType: "UNKNOWN_CONSOLE" }],
      requiresHumanValidation: false,
    }),
  });
  assert.strictEqual(incomplete.status, 200);
  assert.strictEqual(incomplete.body.suggestion.suggestedPriority, "UNDETERMINED");
  assert.strictEqual(incomplete.body.suggestion.confidenceLevel, "LOW");
  assert(incomplete.body.suggestion.suggestedConsoles.some((item) => item.consoleType === "MASTER_MONITORING"));
  assert(incomplete.body.suggestion.unsupportedClaims.some((item) => item.includes("UNKNOWN_CONSOLE")));
  assert(incomplete.body.suggestion.safetyWarnings.some((item) => item.includes("Human validation forced")));

  const cybercrime = await analyzeIncidentWithBackend(baseBody({
    freeText: "Cuenta suplantada y extorsion con capturas. Piden activar rastreo silencioso.",
    riskIndicators: {
      canSpeak: "YES",
      currentRisk: "UNKNOWN",
      injuredPersons: "NO",
      minorsPresent: "NO",
      weaponsPresent: "NO",
      possibleDigitalIncident: "YES",
      stolenOrLostDevice: "NO",
    },
  }), {
    config,
    requestId: "REQ-CYBER",
    providerCall: async () => providerSuggestion({
      suggestedIncidentType: "Ciberdelito",
      authorizationRequirements: [
        {
          authorizationRequired: true,
          capabilityOrAction: "rastreo o acceso a cuenta",
          explanation: "La herramienta no ejecuta rastreo ni acceso a cuentas.",
          potentialAuthority: "Fiscalia / Justicia",
          missingInformation: ["orden competente", "alcance", "finalidad"],
          humanControlWarning: "Secure backend analysis - human validation required.",
        },
      ],
    }),
  });
  assert.strictEqual(cybercrime.status, 200);
  assert(cybercrime.body.suggestion.authorizationRequirements.some((item) => item.authorizationRequired));

  const timeoutConfig = getServerConfig({ ...configuredEnv, PIPO_OPENAI_TIMEOUT_MS: "1" });
  await assert.rejects(
    () => callOpenAIResponses(baseBody(), timeoutConfig, (_url, init) => new Promise((_resolve, reject) => {
      init.signal.addEventListener("abort", () => {
        const error = new Error("aborted");
        error.name = "AbortError";
        reject(error);
      });
    })),
    /Provider timed out/,
  );

  await assert.rejects(
    () => callOpenAIResponses(baseBody(), config, async () => ({
      ok: true,
      json: async () => ({ output_text: "{not-json" }),
    })),
    /Provider output was not valid JSON/,
  );

  await assert.rejects(
    () => callOpenAIResponses(baseBody(), config, async () => ({
      ok: false,
      status: 500,
      json: async () => ({}),
    })),
    /Provider returned HTTP 500/,
  );

  const audits = getAuditEvents();
  assert(audits.some((item) => item.requestId === "REQ-VALID" && item.success === true));
  assert(audits.some((item) => item.requestId === "REQ-NO-CREDENTIAL" && item.errorCode === "missing_provider_credential"));
  assert(!JSON.stringify(audits).includes("extorsion"));

  console.log("PIPO secure backend tests passed");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
