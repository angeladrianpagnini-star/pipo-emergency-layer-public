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
  "citizen-closure.js",
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
const { createFieldWorkflowState } = context.window.PIPOFieldWorkflow;
const { createProcedureActState } = context.window.PIPOProcedureAct;
const {
  PERSPECTIVES,
  NEXT_STEP_CATEGORIES,
  CITIZEN_NEXT_STEP_DISCLAIMER,
  CITIZEN_AI_NOTICE,
  CITIZEN_AI_UNAVAILABLE_NOTICE,
  createCitizenClosureState,
  changePerspective,
  setCitizenAiAvailability,
  getPerspectiveView,
  buildCitizenSafeView,
  generateCitizenNextSteps,
  generateCitizenClosureSummary,
  reviewCitizenClosureSummary,
  createCitizenIncidentPackage,
  deliverCitizenPackage,
  openCitizenPackage,
  confirmCitizenReceipt,
  requestCitizenDocumentAccess,
  downloadCitizenDocument,
  submitCitizenServiceFeedback,
  createCitizenFormalObservation,
  assignCitizenObservation,
  reviewCitizenObservation,
  requestCitizenClarification,
  respondCitizenObservation,
  markCitizenFollowUpRequired,
  completeCitizenFollowUp,
  runCitizenClosureDemoSequence,
} = context.window.PIPOCitizenClosure;

[
  "demo.perspective.changed",
  "citizen.closure.summary.generated",
  "citizen.closure.summary.reviewed",
  "citizen.closure.summary.delivered",
  "citizen.closure.summary.opened",
  "citizen.closure.receipt.confirmed",
  "citizen.next_steps.generated",
  "citizen.document.access.requested",
  "citizen.document.downloaded",
  "citizen.feedback.submitted",
  "citizen.observation.created",
  "citizen.observation.assigned",
  "citizen.observation.reviewed",
  "citizen.clarification.requested",
  "citizen.clarification.responded",
  "citizen.followup.required",
  "citizen.followup.completed",
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

const fieldState = createFieldWorkflowState();
const procedureState = createProcedureActState(BUILD_WEEK_STATE, fieldState, getLedgerEvents());
const citizenState = createCitizenClosureState(BUILD_WEEK_STATE, fieldState, procedureState, getLedgerEvents());
const initialIncidentId = citizenState.incidentId;

appendResult(changePerspective(citizenState, PERSPECTIVES.CITIZEN, { selectedConsoleId: "CON-CITIZEN" }));
assert.strictEqual(citizenState.incidentId, initialIncidentId);
assert.strictEqual(citizenState.selectedPerspective, PERSPECTIVES.CITIZEN);

appendResult(generateCitizenNextSteps(citizenState, { buildWeekState: BUILD_WEEK_STATE, fieldState, procedureState, ledgerEvents: getLedgerEvents() }));
assert(citizenState.followUps.some((item) => item.category === NEXT_STEP_CATEGORIES.MEDICAL_FOLLOW_UP));
assert(citizenState.followUps.every((item) => item.disclaimer === CITIZEN_NEXT_STEP_DISCLAIMER));

const summaryResult = appendResult(generateCitizenClosureSummary(citizenState, {
  buildWeekState: BUILD_WEEK_STATE,
  fieldState,
  procedureState,
  ledgerEvents: getLedgerEvents(),
}));
assert.strictEqual(summaryResult.summary.aiAssistedNotice, CITIZEN_AI_NOTICE);
assert(summaryResult.summary.participatingOrganizations.includes("107 Salud"));
assert(summaryResult.safeView.restricted.every((item) => item.genericReason));
assert(!JSON.stringify(summaryResult.summary).includes("OP-CIBER-01"));

appendResult(reviewCitizenClosureSummary(citizenState));
const packageResult = createCitizenIncidentPackage(citizenState);
assert.strictEqual(packageResult.ok, true, packageResult.error);
assert(packageResult.citizenPackage.browserPdfAvailable);
assert(packageResult.citizenPackage.sanitizedJsonExport);
assert(!JSON.stringify(packageResult.citizenPackage.sanitizedJsonExport).includes("RESTRICTED_JUDICIAL"));

const delivery = appendResult(deliverCitizenPackage(citizenState, "demo-link"));
assert(delivery.receipt.deliveredAt);
appendResult(openCitizenPackage(citizenState));
appendResult(confirmCitizenReceipt(citizenState));
assert(citizenState.receipts[0].openedAt);
assert(citizenState.receipts[0].acknowledgedAt);

const access = appendResult(requestCitizenDocumentAccess(citizenState, "DOC-CIT-SUMMARY"));
appendResult(downloadCitizenDocument(citizenState, access.access.id));
const restrictedAccess = appendResult(requestCitizenDocumentAccess(citizenState, "DOC-TACTICAL-AUDIO-DEMO"));
assert.strictEqual(restrictedAccess.access.status, "RESTRICTED");
assert.strictEqual(downloadCitizenDocument(citizenState, restrictedAccess.access.id).ok, false);

const feedback = appendResult(submitCitizenServiceFeedback(citizenState, {
  rapidity: 5,
  clarity: 4,
  treatment: 5,
  coordination: 4,
  protectionFeeling: 4,
  nextStepUnderstanding: 5,
  overallSatisfaction: 5,
  optionalComment: "Texto ficticio de calidad.",
}));
assert(feedback.feedback.qualityDataOnly);
assert(feedback.feedback.doesNotModifyProcedure);
assert.strictEqual(citizenState.observations.length, 0);

const observation = appendResult(createCitizenFormalObservation(citizenState, {
  category: "SOLICITUD_DE_ACLARACION",
  description: "Solicito aclaracion formal sobre un paso posterior.",
  referencedActIds: ["ACT-DEMO-001"],
  referencedEventIds: ["EVT-DEMO-001"],
}));
assert.notStrictEqual(observation.observation.id, feedback.feedback.id);
appendResult(assignCitizenObservation(citizenState, observation.observation.observationId, "CON-MASTER"));
appendResult(reviewCitizenObservation(citizenState, observation.observation.observationId));
appendResult(requestCitizenClarification(citizenState, observation.observation.observationId));
appendResult(respondCitizenObservation(citizenState, observation.observation.observationId));
assert.strictEqual(observation.observation.status, "RESPONDED");

appendResult(markCitizenFollowUpRequired(citizenState, NEXT_STEP_CATEGORIES.FOLLOW_UP_REQUIRED));
appendResult(completeCitizenFollowUp(citizenState, citizenState.followUps[citizenState.followUps.length - 1].id));
assert.strictEqual(citizenState.followUps[citizenState.followUps.length - 1].status, "COMPLETED");

appendResult(changePerspective(citizenState, PERSPECTIVES.FIELD_OPERATOR, { selectedFieldOperatorId: "OP-FIELD-911-A" }));
let view = getPerspectiveView(citizenState, { buildWeekState: BUILD_WEEK_STATE, fieldState, procedureState, ledgerEvents: getLedgerEvents() });
assert.strictEqual(view.field.operator.operatorId, "OP-FIELD-911-A");
assert(view.detail.restrictedFunctions.includes("editar actas ajenas"));

appendResult(changePerspective(citizenState, PERSPECTIVES.FEDERATED_CONSOLE, { selectedConsoleId: "CON-107" }));
view = getPerspectiveView(citizenState, { buildWeekState: BUILD_WEEK_STATE, fieldState, procedureState, ledgerEvents: getLedgerEvents() });
assert(view.federated.accessDenied.some((item) => item.includes("finalidad")));

appendResult(changePerspective(citizenState, PERSPECTIVES.MASTER_CONSOLE, { selectedConsoleId: "CON-MASTER" }));
view = getPerspectiveView(citizenState, { buildWeekState: BUILD_WEEK_STATE, fieldState, procedureState, ledgerEvents: getLedgerEvents() });
assert(view.master.prohibitedActions.includes("borrar eventos"));

const safeView = buildCitizenSafeView(null, { buildWeekState: BUILD_WEEK_STATE, fieldState, procedureState, ledgerEvents: getLedgerEvents(), state: citizenState });
assert(safeView.deliverableAutomatically.length > 0);
assert(safeView.deliverableOnRequest.length > 0);
assert(safeView.restricted.length > 0);

const stolenState = createCitizenClosureState(BUILD_WEEK_STATE, fieldState, procedureState, getLedgerEvents());
stolenState.scenarioId = "B_STOLEN_DEVICE";
setCitizenAiAvailability(stolenState, false);
generateCitizenNextSteps(stolenState, { buildWeekState: BUILD_WEEK_STATE, fieldState, procedureState, ledgerEvents: getLedgerEvents() });
const stolenSummary = generateCitizenClosureSummary(stolenState, { buildWeekState: BUILD_WEEK_STATE, fieldState, procedureState, ledgerEvents: getLedgerEvents() });
assert.strictEqual(stolenSummary.summary.aiAssistedNotice, CITIZEN_AI_UNAVAILABLE_NOTICE);
assert(stolenSummary.summary.nextSteps.some((item) => item.category === NEXT_STEP_CATEGORIES.DEVICE_SECURITY_ACTIONS));
assert(stolenSummary.summary.derivations.includes("Fiscalia"));

const demoState = createCitizenClosureState(BUILD_WEEK_STATE, fieldState, procedureState, getLedgerEvents());
const demo = runCitizenClosureDemoSequence(demoState, { buildWeekState: BUILD_WEEK_STATE, fieldState, procedureState, ledgerEvents: getLedgerEvents() });
assert.strictEqual(demo.ok, true);
assert(demoState.packages.length === 1);
assert(demoState.feedback.length === 1);
assert(demoState.observations.length === 1);

[
  demoState.perspectiveSessions[0],
  demoState.summaries[0],
  demoState.packages[0],
  demoState.documentAccesses[0],
  demoState.feedback[0],
  demoState.observations[0],
  demoState.followUps[0],
  demoState.receipts[0],
].forEach((record) => {
  ["id", "incidentId", "createdAt", "createdBy", "status", "version", "classification", "integrityReference"].forEach((field) => {
    assert(record[field] !== undefined && record[field] !== null, `Missing ${field}`);
  });
});

const validation = validateLedgerChain();
assert.strictEqual(validation.valid, true, validation.errors.join("\n"));

console.log("citizen-closure.test.js passed");
