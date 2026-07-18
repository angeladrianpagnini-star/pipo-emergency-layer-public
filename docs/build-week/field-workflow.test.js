const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = __dirname;
const context = {
  window: {},
  console,
  Date,
};
context.window = context.window;

[
  "ledger.js",
  "field-workflow.js",
].forEach((file) => {
  const code = fs.readFileSync(path.join(root, file), "utf8");
  vm.runInNewContext(code, context, { filename: file });
});

const {
  LEDGER_EVENT_TYPES,
  appendLedgerEvent,
  getLedgerEvents,
  validateLedgerChain,
} = context.window.PIPOBuildWeekLedger;

const {
  INTERVENTION_STATES,
  createFieldWorkflowState,
  getAssignment,
  transitionFieldOperator,
  createIndividualEvent,
  createEventCorrection,
  createSimulatedEvidence,
  createSupportRequest,
  acceptSupportRequest,
  createIndividualAct,
  reviewIndividualAct,
  finalizeIndividualAct,
  amendIndividualAct,
  createClarificationRequest,
  getEditableDraftStatus,
  compareInterventions,
} = context.window.PIPOFieldWorkflow;

[
  "field.assignment.accepted",
  "field.assignment.rejected",
  "field.departed",
  "field.arrived",
  "field.intervention.started",
  "field.observation.created",
  "field.statement.recorded",
  "field.action.recorded",
  "field.communication.recorded",
  "field.support.requested",
  "field.support.accepted",
  "field.evidence.created",
  "field.intervention.completed",
  "individual.act.created",
  "individual.act.reviewed",
  "individual.act.finalized",
  "individual.act.amended",
].forEach((eventType) => assert(LEDGER_EVENT_TYPES.includes(eventType), `Missing ${eventType}`));

const state = createFieldWorkflowState();
assert(state.operators.length >= 4);

const policeId = "OP-FIELD-911-A";
const healthId = "OP-FIELD-107-A";
const trafficId = "OP-FIELD-TRAFFIC-A";
const fireId = "OP-FIELD-FIRE-A";

assert.strictEqual(transitionFieldOperator(state, policeId, INTERVENTION_STATES.ARRIVED).ok, false);
assert.strictEqual(transitionFieldOperator(state, policeId, INTERVENTION_STATES.CANCELLED_WITH_REASON).ok, false);

function appendResult(result) {
  assert.strictEqual(result.ok, true, result.error);
  if (result.ledger) {
    appendLedgerEvent({
      type: result.ledger.type,
      operatorId: result.ledger.operatorId,
      consoleId: result.ledger.consoleId,
      sessionId: result.ledger.sessionId,
      payload: result.ledger.payload,
      classification: result.ledger.classification,
    });
  }
  return result;
}

[
  INTERVENTION_STATES.ACCEPTED,
  INTERVENTION_STATES.DEPARTED,
  INTERVENTION_STATES.ARRIVED,
  INTERVENTION_STATES.INTERVENTION_STARTED,
].forEach((status) => appendResult(transitionFieldOperator(state, policeId, status, "Test path")));

const policeObservation = appendResult(createIndividualEvent(state, policeId, {
  category: "hecho observado",
  description: "Accidente vial simulado con lesion y derrame.",
  classification: "SENSITIVE",
  locationSimulated: state.incident.locationSimulated,
}));
assert(policeObservation.event.integrityReference);

const evidence = appendResult(createSimulatedEvidence(state, policeId, {
  type: "fotografia",
  description: "Foto simulada de calzada.",
  classification: "SENSITIVE",
}));
assert.strictEqual(evidence.evidence.realSensorCapture, false);
assert(evidence.evidence.accessibleConsoles.includes("CON-MASTER"));

const support = appendResult(createSupportRequest(state, policeId, {
  targetConsoleId: "CON-107",
  urgency: "RED",
  reason: "Persona lesionada requiere triage.",
  classification: "SENSITIVE",
}));
assert.strictEqual(getAssignment(state, policeId).interventionStatus, INTERVENTION_STATES.WAITING_SUPPORT);

assert.strictEqual(acceptSupportRequest(state, support.request.requestId, trafficId).ok, false);
appendResult(acceptSupportRequest(state, support.request.requestId, healthId));

appendResult(transitionFieldOperator(state, policeId, INTERVENTION_STATES.INTERVENTION_ACTIVE, "Apoyo aceptado"));
appendResult(transitionFieldOperator(state, policeId, INTERVENTION_STATES.COMPLETED, "Intervencion finalizada"));

const act = appendResult(createIndividualAct(state, policeId)).act;
appendResult(reviewIndividualAct(state, policeId));
appendResult(finalizeIndividualAct(state, policeId));
assert.strictEqual(getEditableDraftStatus(state, policeId, act.id).canEdit, false);
assert.strictEqual(getEditableDraftStatus(state, healthId, act.id).canEdit, false);
assert.strictEqual(amendIndividualAct(state, healthId, act.id, "intento ajeno").ok, false);
const amendment = appendResult(amendIndividualAct(state, policeId, act.id, "ampliacion posterior", "Se amplia sin alterar original."));
assert.strictEqual(amendment.version.version, "v3");

assert.strictEqual(createEventCorrection(state, healthId, policeObservation.event.eventId, "aclaracion", "intento ajeno").ok, false);
appendResult(createEventCorrection(state, policeId, policeObservation.event.eventId, "aclaracion", "Aclaracion del propio registro."));

function completeOperator(operatorId, eventText) {
  [
    INTERVENTION_STATES.ACCEPTED,
    INTERVENTION_STATES.DEPARTED,
    INTERVENTION_STATES.ARRIVED,
    INTERVENTION_STATES.INTERVENTION_STARTED,
  ].forEach((status) => appendResult(transitionFieldOperator(state, operatorId, status, "Test path")));
  appendResult(createIndividualEvent(state, operatorId, {
    category: "actuacion realizada",
    description: eventText,
    classification: "SENSITIVE",
    locationSimulated: state.incident.locationSimulated,
  }));
  appendResult(createSimulatedEvidence(state, operatorId, {
    type: "constancia",
    description: `Evidencia simulada de ${operatorId}.`,
    classification: "SENSITIVE",
  }));
  appendResult(transitionFieldOperator(state, operatorId, INTERVENTION_STATES.COMPLETED, "Cierre individual"));
  appendResult(createIndividualAct(state, operatorId));
  appendResult(reviewIndividualAct(state, operatorId));
  appendResult(finalizeIndividualAct(state, operatorId));
}

completeOperator(healthId, "Triage sanitario simulado.");
completeOperator(trafficId, "Corte vial simulado.");
completeOperator(fireId, "Verificacion de derrame simulada.");

const healthAct = state.acts.find((item) => item.ownerOperatorId === healthId);
appendResult(createClarificationRequest(state, policeId, healthAct.id, healthId, "Aclarar horario de triage."));

const comparison = compareInterventions(state);
assert(comparison.filter((item) => item.actStatus === "FINALIZED").length >= 4);
assert(state.individualEvents.some((event) => event.correctionOf === policeObservation.event.eventId));
assert(state.clarificationRequests.length >= 1);
assert.strictEqual(validateLedgerChain().valid, true);
assert(getLedgerEvents().some((event) => event.type === "individual.act.finalized"));
assert(getLedgerEvents().some((event) => event.type === "field.support.accepted"));

console.log("PIPO Field Operator Workflow tests passed");
