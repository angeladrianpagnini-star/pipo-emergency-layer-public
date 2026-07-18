const LEDGER_EVENT_TYPES = [
  "incident.created",
  "console.assigned",
  "console.joined",
  "operator.authenticated",
  "operator.joined",
  "support.requested",
  "support.accepted",
  "field.dispatch.accepted",
  "field.departed",
  "field.arrived",
  "intervention.started",
  "intervention.updated",
  "evidence.created",
  "evidence.shared",
  "evidence.accessed",
  "act.drafted",
  "act.finalized",
  "clarification.requested",
  "clarification.responded",
  "act.amended",
  "judicial.authorization.registered",
  "device.tracking.authorized",
  "device.tracking.started",
  "device.tracking.stopped",
  "console.participation.closed",
  "incident.closed",
];

const ledgerSeed = [
  {
    type: "incident.created",
    operatorId: "OP-MASTER-01",
    consoleId: "CON-MASTER",
    sessionId: "SES-MASTER-20260718",
    payload: { summary: "Incidente simulado creado desde descripcion libre.", source: "PIPO demo" },
    classification: "OPERATIONAL",
  },
  {
    type: "operator.authenticated",
    operatorId: "OP-MASTER-01",
    consoleId: "CON-MASTER",
    sessionId: "SES-MASTER-20260718",
    payload: { mfaVerified: true, localBiometricVerified: true, enrolledDeviceId: "DEV-MASTER-01" },
    classification: "OPERATIONAL",
  },
  {
    type: "console.assigned",
    operatorId: "OP-MASTER-01",
    consoleId: "CON-MASTER",
    sessionId: "SES-MASTER-20260718",
    payload: { assignedConsoles: ["CON-911", "CON-CIBER"], principle: "integracion sin absorcion documental" },
    classification: "OPERATIONAL",
  },
  {
    type: "console.joined",
    operatorId: "OP-911-01",
    consoleId: "CON-911",
    sessionId: "SES-911-20260718",
    payload: { role: "despacho", status: "Activo" },
    classification: "SENSITIVE",
  },
  {
    type: "operator.joined",
    operatorId: "OP-FIELD-01",
    consoleId: "CON-911",
    sessionId: "SES-FIELD-20260718",
    payload: { role: "movil de campo", deviceId: "DEV-FIELD-01" },
    classification: "SENSITIVE",
  },
  {
    type: "console.joined",
    operatorId: "OP-CIBER-01",
    consoleId: "CON-CIBER",
    sessionId: "SES-CIBER-20260718",
    payload: { role: "preservacion digital", status: "Activo" },
    classification: "RESTRICTED_JUDICIAL",
  },
  {
    type: "evidence.created",
    operatorId: "OP-CIBER-01",
    consoleId: "CON-CIBER",
    sessionId: "SES-CIBER-20260718",
    payload: { evidenceId: "EVI-CIBER-001", origin: "carga voluntaria selectiva", extraction: "no realizada" },
    classification: "RESTRICTED_JUDICIAL",
  },
  {
    type: "act.drafted",
    operatorId: "OP-CIBER-01",
    consoleId: "CON-CIBER",
    sessionId: "SES-CIBER-20260718",
    payload: { actId: "ACT-IND-CIBER-001", version: "v1", editableByMaster: false },
    classification: "RESTRICTED_JUDICIAL",
  },
  {
    type: "clarification.requested",
    operatorId: "OP-MASTER-01",
    consoleId: "CON-MASTER",
    sessionId: "SES-MASTER-20260718",
    payload: { requestId: "CLAR-001", sourceActId: "ACT-IND-CIBER-001", mode: "ampliacion sin reescritura" },
    classification: "SENSITIVE",
  },
];

const OPERATIONAL_LEDGER = [];

function demoIntegrityHash(value) {
  const source = JSON.stringify(value);
  let hash = 2166136261;
  for (let index = 0; index < source.length; index += 1) {
    hash ^= source.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return `demo-ref-${(hash >>> 0).toString(16).padStart(8, "0")}`;
}

function buildLedgerEvent(input) {
  const previous = OPERATIONAL_LEDGER[OPERATIONAL_LEDGER.length - 1];
  const event = {
    eventId: `LEDGER-${String(OPERATIONAL_LEDGER.length + 1).padStart(4, "0")}`,
    incidentId: input.incidentId || "PIPO-BW-000001",
    type: input.type,
    timestamp: input.timestamp || new Date().toISOString(),
    operatorId: input.operatorId,
    consoleId: input.consoleId,
    sessionId: input.sessionId,
    payload: input.payload || {},
    classification: input.classification || "OPERATIONAL",
    integrityReference: null,
    previousEventReference: previous?.integrityReference || "GENESIS",
  };
  event.integrityReference = demoIntegrityHash({
    eventId: event.eventId,
    incidentId: event.incidentId,
    type: event.type,
    timestamp: event.timestamp,
    operatorId: event.operatorId,
    consoleId: event.consoleId,
    sessionId: event.sessionId,
    payload: event.payload,
    classification: event.classification,
    previousEventReference: event.previousEventReference,
  });
  return Object.freeze(event);
}

function appendLedgerEvent(input) {
  if (!LEDGER_EVENT_TYPES.includes(input.type)) {
    throw new Error(`Tipo de evento no permitido: ${input.type}`);
  }
  const event = buildLedgerEvent(input);
  OPERATIONAL_LEDGER.push(event);
  return event;
}

function getLedgerEvents() {
  return OPERATIONAL_LEDGER.map((event) => ({ ...event, payload: { ...event.payload } }));
}

function deleteLedgerEvent() {
  return {
    allowed: false,
    reason: "La bitacora es append-only. Los eventos no se eliminan ni editan silenciosamente.",
  };
}

function appendCorrection(originalEventId, correctionType, summary, operatorId = "OP-MASTER-01") {
  const original = OPERATIONAL_LEDGER.find((event) => event.eventId === originalEventId);
  return appendLedgerEvent({
    type: "intervention.updated",
    operatorId,
    consoleId: original?.consoleId || "CON-MASTER",
    sessionId: original?.sessionId || "SES-MASTER-20260718",
    payload: {
      correctionType,
      summary,
      originalEventId,
      originalPreserved: true,
    },
    classification: original?.classification || "OPERATIONAL",
  });
}

function validateLedgerChain() {
  const errors = [];
  OPERATIONAL_LEDGER.forEach((event, index) => {
    const previous = OPERATIONAL_LEDGER[index - 1];
    if (index === 0 && event.previousEventReference !== "GENESIS") {
      errors.push(`${event.eventId}: el primer evento debe iniciar en GENESIS.`);
    }
    if (index > 0 && event.previousEventReference !== previous.integrityReference) {
      errors.push(`${event.eventId}: referencia previa inconsistente.`);
    }
    ["eventId", "incidentId", "type", "timestamp", "operatorId", "consoleId", "sessionId", "payload", "classification", "integrityReference"].forEach((field) => {
      if (event[field] === undefined || event[field] === null || event[field] === "") {
        errors.push(`${event.eventId}: falta ${field}.`);
      }
    });
  });
  return {
    valid: errors.length === 0,
    errors,
    count: OPERATIONAL_LEDGER.length,
  };
}

ledgerSeed.forEach((event) => appendLedgerEvent(event));

window.PIPOBuildWeekLedger = {
  LEDGER_EVENT_TYPES,
  appendLedgerEvent,
  appendCorrection,
  deleteLedgerEvent,
  getLedgerEvents,
  validateLedgerChain,
};
