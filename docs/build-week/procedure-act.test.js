const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = __dirname;
const context = {
  window: {},
  console,
  Date,
  TextEncoder,
};
context.window = context.window;

[
  "data-models.js",
  "ledger.js",
  "field-workflow.js",
  "procedure-act.js",
].forEach((file) => {
  const code = fs.readFileSync(path.join(root, file), "utf8");
  vm.runInNewContext(code, context, { filename: file });
});

const { BUILD_WEEK_STATE } = context.window.PIPOBuildWeekModels;

const {
  LEDGER_EVENT_TYPES,
  appendLedgerEvent,
  getLedgerEvents,
  validateLedgerChain,
} = context.window.PIPOBuildWeekLedger;

const {
  INTERVENTION_STATES,
  createFieldWorkflowState,
  transitionFieldOperator,
  createIndividualEvent,
  createSimulatedEvidence,
  createSupportRequest,
  acceptSupportRequest,
  createIndividualAct,
  reviewIndividualAct,
  finalizeIndividualAct,
} = context.window.PIPOFieldWorkflow;

const {
  PROCEDURE_ACT_STATUSES,
  SUPERVISION_STATUSES,
  CLOSURE_STATUSES,
  FINDING_TYPES,
  AI_DRAFT_NOTICE,
  createProcedureActState,
  createProcedureAct,
  generateAiDraft,
  updateCompleteness,
  checkConsistency,
  completeOperatorReview,
  submitProcedureAct,
  requestSupervisorReview,
  validateSupervisor,
  registerDemoTimeInconsistency,
  requestClarification,
  respondClarification,
  finalizeProcedureAct,
  amendProcedureAct,
  rectifyProcedureAct,
  buildMasterIncidentRecord,
  proposeClosure,
  finalizeClosure,
  exportProcedureJson,
  buildAutomaticChronology,
  calculateSha256Reference,
} = context.window.PIPOProcedureAct;

[
  "procedure.act.created",
  "procedure.act.ai_draft_generated",
  "procedure.act.review_started",
  "procedure.act.consistency_checked",
  "procedure.act.completeness_updated",
  "procedure.act.submitted",
  "procedure.act.supervisor_requested",
  "procedure.act.finalized",
  "procedure.act.amended",
  "procedure.act.rectified",
  "master.record.generated",
  "clarification.requested",
  "clarification.responded",
  "incident.closure.proposed",
  "incident.closure.blocked",
  "incident.closed",
].forEach((eventType) => assert(LEDGER_EVENT_TYPES.includes(eventType), `Missing ${eventType}`));

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

function completeFieldOperator(fieldState, operatorId, eventText, evidenceType) {
  [
    INTERVENTION_STATES.ACCEPTED,
    INTERVENTION_STATES.DEPARTED,
    INTERVENTION_STATES.ARRIVED,
    INTERVENTION_STATES.INTERVENTION_STARTED,
  ].forEach((status) => appendResult(transitionFieldOperator(fieldState, operatorId, status, "Etapa 5 test")));

  appendResult(createIndividualEvent(fieldState, operatorId, {
    category: "hecho observado",
    description: eventText,
    classification: "SENSITIVE",
    locationSimulated: fieldState.incident.locationSimulated,
  }));

  appendResult(createSimulatedEvidence(fieldState, operatorId, {
    type: evidenceType,
    description: `Evidencia simulada ${evidenceType} para ${operatorId}.`,
    classification: "SENSITIVE",
  }));

  appendResult(createIndividualEvent(fieldState, operatorId, {
    category: "actuacion realizada",
    description: "Actuacion individual final documentada.",
    classification: "SENSITIVE",
    locationSimulated: fieldState.incident.locationSimulated,
  }));

  appendResult(transitionFieldOperator(fieldState, operatorId, INTERVENTION_STATES.COMPLETED, "Cierre individual"));
  appendResult(createIndividualAct(fieldState, operatorId));
  appendResult(reviewIndividualAct(fieldState, operatorId));
  appendResult(finalizeIndividualAct(fieldState, operatorId));
}

function startFieldOperator(fieldState, operatorId, eventText, evidenceType) {
  [
    INTERVENTION_STATES.ACCEPTED,
    INTERVENTION_STATES.DEPARTED,
    INTERVENTION_STATES.ARRIVED,
    INTERVENTION_STATES.INTERVENTION_STARTED,
  ].forEach((status) => appendResult(transitionFieldOperator(fieldState, operatorId, status, "Etapa 5 test")));

  appendResult(createIndividualEvent(fieldState, operatorId, {
    category: "hecho observado",
    description: eventText,
    classification: "SENSITIVE",
    locationSimulated: fieldState.incident.locationSimulated,
  }));

  appendResult(createSimulatedEvidence(fieldState, operatorId, {
    type: evidenceType,
    description: `Evidencia simulada ${evidenceType} para ${operatorId}.`,
    classification: "SENSITIVE",
  }));
}

function closeStartedFieldOperator(fieldState, operatorId) {
  appendResult(createIndividualEvent(fieldState, operatorId, {
    category: "actuacion realizada",
    description: "Actuacion individual final documentada.",
    classification: "SENSITIVE",
    locationSimulated: fieldState.incident.locationSimulated,
  }));
  appendResult(transitionFieldOperator(fieldState, operatorId, INTERVENTION_STATES.COMPLETED, "Cierre individual"));
  appendResult(createIndividualAct(fieldState, operatorId));
  appendResult(reviewIndividualAct(fieldState, operatorId));
  appendResult(finalizeIndividualAct(fieldState, operatorId));
}

const fieldState = createFieldWorkflowState();
const policeId = "OP-FIELD-911-A";
const healthId = "OP-FIELD-107-A";
const trafficId = "OP-FIELD-TRAFFIC-A";
const fireId = "OP-FIELD-FIRE-A";

startFieldOperator(fieldState, policeId, "Siniestro vial simulado con lesion, derrame y riesgo sobre calzada.", "fotografia");
appendResult(createSupportRequest(fieldState, policeId, {
  targetConsoleId: "CON-107",
  urgency: "RED",
  reason: "Persona lesionada requiere triage.",
  classification: "SENSITIVE",
}));
appendResult(createSupportRequest(fieldState, policeId, {
  targetConsoleId: "CON-TRANSITO",
  urgency: "YELLOW",
  reason: "Corte vial y corredor preventivo.",
  classification: "OPERATIONAL",
}));
appendResult(createSupportRequest(fieldState, policeId, {
  targetConsoleId: "CON-BOMBEROS",
  urgency: "YELLOW",
  reason: "Derrame con posible riesgo de incendio.",
  classification: "OPERATIONAL",
}));
fieldState.supportRequests.filter((request) => request.status === "PENDING").forEach((request) => {
  const accepting = fieldState.operators.find((operator) => operator.consoleId === request.targetConsoleId);
  if (accepting) appendResult(acceptSupportRequest(fieldState, request.requestId, accepting.operatorId));
});
appendResult(transitionFieldOperator(fieldState, policeId, INTERVENTION_STATES.INTERVENTION_ACTIVE, "Apoyos aceptados"));
closeStartedFieldOperator(fieldState, policeId);

completeFieldOperator(fieldState, healthId, "Triage sanitario simulado; persona consciente.", "constancia");
completeFieldOperator(fieldState, trafficId, "Corte vial preventivo y corredor sanitario.", "ubicacion");
completeFieldOperator(fieldState, fireId, "Derrame verificado sin llama visible.", "informe externo");

assert.strictEqual(fieldState.acts.filter((act) => act.status === "FINALIZED").length, 4);

const procedureState = createProcedureActState(BUILD_WEEK_STATE, fieldState, getLedgerEvents());
const contextInput = {
  buildWeekState: BUILD_WEEK_STATE,
  fieldState,
  ledgerEvents: getLedgerEvents(),
};

appendResult(createProcedureAct(procedureState, contextInput));
assert.strictEqual(procedureState.procedureAct.status, PROCEDURE_ACT_STATUSES.DRAFT);
assert.strictEqual(procedureState.procedureAct.individualActIds.includes("ACT-FIELD-107-A"), true);
assert(buildAutomaticChronology(contextInput).length >= 20);

appendResult(generateAiDraft(procedureState));
assert.strictEqual(procedureState.aiDraft.notice, AI_DRAFT_NOTICE);
assert(procedureState.aiDraft.sections.hechosObservados.length >= 1);
assert(procedureState.aiDraft.sections.resultado.some((line) => line.includes("ACT-FIELD")));

appendResult(updateCompleteness(procedureState));
assert(procedureState.completeness.percent < 100);
assert(procedureState.completeness.blockingErrors.some((error) => error.includes("Confirmacion")));

registerDemoTimeInconsistency(procedureState);
appendResult(checkConsistency(procedureState));
assert(procedureState.findings.some((finding) => finding.code === "time_inconsistency"));
assert(procedureState.findings.some((finding) => finding.type === FINDING_TYPES.BLOCKING_ERROR));
assert.strictEqual(finalizeProcedureAct(procedureState).ok, false);

appendResult(completeOperatorReview(procedureState));
assert.strictEqual(procedureState.completeness.percent, 100);
assert.strictEqual(submitProcedureAct(procedureState).ok, false);

const clarification = appendResult(requestClarification(procedureState, {
  sourceActId: "ACT-FIELD-107-A",
  recipientOperatorId: healthId,
  reason: "Aclarar horario de triage por diferencia simulada.",
})).request;
appendResult(respondClarification(procedureState, clarification.id, "Respuesta por anexo: se confirma horario correcto sin alterar el acta original."));
assert(procedureState.findings.some((finding) => finding.code === "time_inconsistency" && finding.type === FINDING_TYPES.RECOMMENDATION));

appendResult(requestSupervisorReview(procedureState));
assert.strictEqual(procedureState.supervision.status, SUPERVISION_STATUSES.IN_REVIEW);
appendResult(validateSupervisor(procedureState));
assert.strictEqual(procedureState.supervision.status, SUPERVISION_STATUSES.VALIDATED);
appendResult(checkConsistency(procedureState));
assert(!procedureState.findings.some((finding) => finding.type === FINDING_TYPES.BLOCKING_ERROR));
appendResult(submitProcedureAct(procedureState));
appendResult(finalizeProcedureAct(procedureState));
assert.strictEqual(procedureState.procedureAct.status, PROCEDURE_ACT_STATUSES.FINALIZED);
assert.strictEqual(procedureState.procedureAct.locked, true);
assert(procedureState.procedureAct.integrityReference.value.startsWith("demo-sha256-"));

assert.strictEqual(finalizeProcedureAct(procedureState).ok, false);
const amendment = appendResult(amendProcedureAct(procedureState, "Ampliacion de prueba", "Texto ampliatorio sin alterar version final.")).version;
assert.strictEqual(amendment.version, "v3.1");
const rectification = appendResult(rectifyProcedureAct(procedureState, "Se rectifica un dato simulado.", "Correccion fundada de prueba.")).version;
assert.strictEqual(rectification.version, "v3.2");
assert(procedureState.procedureActVersions.length >= 5);

appendResult(buildMasterIncidentRecord(procedureState));
assert.strictEqual(procedureState.masterIncidentRecord.procedureActId, "PACT-BW-000001");
assert.strictEqual(procedureState.masterIncidentRecord.divergenceNotice.includes("Existen versiones"), true);
assert(procedureState.masterIncidentRecord.clarifications.some((item) => item.status === "RESPONDED"));

const blockedClosureState = createProcedureActState(BUILD_WEEK_STATE, fieldState, getLedgerEvents());
appendResult(createProcedureAct(blockedClosureState, contextInput));
const blockedClosure = appendResult(proposeClosure(blockedClosureState, CLOSURE_STATUSES.CLOSED_WITH_PROCEDURE_ACT));
assert.strictEqual(blockedClosure.closure.status, "BLOCKED");

appendResult(proposeClosure(procedureState, CLOSURE_STATUSES.CLOSED_WITH_PROCEDURE_ACT));
appendResult(finalizeClosure(procedureState));
assert.strictEqual(procedureState.closure.status, CLOSURE_STATUSES.CLOSED_WITH_PROCEDURE_ACT);

const exported = appendResult(exportProcedureJson(procedureState)).export;
assert.strictEqual(exported.content.procedureAct.actId, "PACT-BW-000001");
assert(exported.integrityReference.value.startsWith("demo-sha256-"));
assert(procedureState.printViewHtml.includes("Acta individual de procedimiento"));
assert(!procedureState.printViewHtml.includes("Acta Digital de Procedimiento"));

calculateSha256Reference({ test: true }).then((reference) => {
  assert(reference.value.startsWith("sha256-") || reference.value.startsWith("demo-sha256-"));
  assert.strictEqual(validateLedgerChain().valid, true);
  assert(getLedgerEvents().some((event) => event.type === "procedure.act.finalized"));
  assert(getLedgerEvents().some((event) => event.type === "incident.closed"));
  console.log("PIPO Procedure Act tests passed");
}).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
