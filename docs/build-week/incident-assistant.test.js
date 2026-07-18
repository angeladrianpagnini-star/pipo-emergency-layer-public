const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = __dirname;
const context = {
  window: {},
  console,
  Date,
  setTimeout,
  clearTimeout,
};
context.window = context.window;

[
  "data-models.js",
  "ledger.js",
  "incident-scenarios.js",
  "ai-service.js",
  "incident-assistant.js",
].forEach((file) => {
  const code = fs.readFileSync(path.join(root, file), "utf8");
  vm.runInNewContext(code, context, { filename: file });
});

const {
  BUILD_WEEK_STATE,
  getOperatorById,
  canAccessResource,
  canModifyIndividualAct,
} = context.window.PIPOBuildWeekModels;

const {
  createIncidentAnalysisService,
  AI_MODES,
} = context.window.PIPOAIService;

const {
  getScenarioById,
} = context.window.PIPOIncidentScenarios;

const {
  HUMAN_DECISION_STATUS,
  createHumanDecisionDraft,
  createManualFallbackSuggestion,
  finalizeHumanDecision,
  validateHumanDecision,
} = context.window.PIPOIncidentAssistant;

const {
  appendLedgerEvent,
  getLedgerEvents,
  validateLedgerChain,
  deleteLedgerEvent,
} = context.window.PIPOBuildWeekLedger;

const service = createIncidentAnalysisService({ mode: AI_MODES.SIMULATED_DEMO });

function analyzeScenario(id) {
  const scenario = getScenarioById(id);
  return service.analyzeIncident({
    incidentId: BUILD_WEEK_STATE.incident.id,
    ...scenario,
  }, BUILD_WEEK_STATE);
}

function consoleTypes(suggestion) {
  return suggestion.suggestedConsoles.map((item) => item.consoleType);
}

function assertHasConsole(suggestion, consoleType) {
  assert(consoleTypes(suggestion).includes(consoleType), `Expected ${consoleType}`);
}

const cannotSpeak = analyzeScenario("cannotSpeak");
assert.strictEqual(cannotSpeak.suggestedPriority, "RED");
assertHasConsole(cannotSpeak, "MASTER_MONITORING");
assertHasConsole(cannotSpeak, "SECURITY_911");
assert(cannotSpeak.followUpQuestions.some((question) => question.toLowerCase().includes("lesion")));
assert(cannotSpeak.followUpQuestions.some((question) => question.toLowerCase().includes("agresora")));
assert(cannotSpeak.followUpQuestions.some((question) => question.toLowerCase().includes("armas")));

const medical = analyzeScenario("medical");
assertHasConsole(medical, "HEALTH_107");
assert(["YELLOW", "RED"].includes(medical.suggestedPriority));

const traffic = analyzeScenario("trafficAccident");
assertHasConsole(traffic, "TRAFFIC");
assertHasConsole(traffic, "HEALTH_107");
assertHasConsole(traffic, "FIRE_DEPARTMENT");
assertHasConsole(traffic, "SECURITY_911");

const multidisciplinary = analyzeScenario("multidisciplinary");
assert.strictEqual(multidisciplinary.suggestedPriority, "RED");
assertHasConsole(multidisciplinary, "SECURITY_911");
assertHasConsole(multidisciplinary, "GENDER_RESPONSE");
assertHasConsole(multidisciplinary, "CHILD_PROTECTION");
assertHasConsole(multidisciplinary, "PROSECUTOR_JUSTICE");

const fraud = analyzeScenario("digitalFraud");
assertHasConsole(fraud, "CYBERCRIME");
assert(fraud.suggestedActions.some((action) => action.includes("Preservar capturas")));
assert(!fraud.suggestedActions.some((action) => action.toLowerCase().includes("hack")));

const stolenDevice = analyzeScenario("stolenDevice");
assertHasConsole(stolenDevice, "POLICE_STATION");
assertHasConsole(stolenDevice, "CYBERCRIME");
assertHasConsole(stolenDevice, "PROSECUTOR_JUSTICE");
assert(stolenDevice.suggestedActions.some((action) => action.includes("DeviceRecoveryProtocol")));
assert(stolenDevice.safetyWarnings.includes("Location, audio and video capabilities remain disabled until the simulated authorization requirements are met."));

const incomplete = analyzeScenario("incomplete");
assert.strictEqual(incomplete.suggestedPriority, "UNDETERMINED");
assert(incomplete.missingCriticalInformation.length >= 5);
assert.strictEqual(incomplete.requiresHumanValidation, true);

const backend = createIncidentAnalysisService({ mode: AI_MODES.OPENAI_SECURE_BACKEND });
assert.throws(() => backend.analyzeIncident(getScenarioById("medical"), BUILD_WEEK_STATE), /future server-side contract/);

const operator = getOperatorById("OP-MASTER-01");
const draft = createHumanDecisionDraft(cannotSpeak, operator);
draft.decisionStatus = HUMAN_DECISION_STATUS.MODIFIED;
draft.finalPriority = "GREEN";
draft.finalConsoles = draft.finalConsoles.filter((item) => item.consoleType !== "SECURITY_911");
draft.reason = "";
const invalidDecision = validateHumanDecision(cannotSpeak, draft, operator);
assert.strictEqual(invalidDecision.valid, false);
assert(invalidDecision.errors.some((error) => error.includes("Fundamento obligatorio")));

draft.reason = "Prueba automatizada: el operador deja fundamento para una diferencia material.";
const finalDecision = finalizeHumanDecision(cannotSpeak, draft, operator);
assert.strictEqual(finalDecision.ok, true);
assert(finalDecision.comparison.materialDifferences.length >= 1);
assert(finalDecision.decision.accepted.includes("tipo de incidente"));

const manual = createManualFallbackSuggestion(getScenarioById("incomplete"), BUILD_WEEK_STATE);
assert.strictEqual(manual.suggestedPriority, "UNDETERMINED");
assert.strictEqual(manual.requiresHumanValidation, true);

appendLedgerEvent({
  type: "ai.analysis.requested",
  operatorId: operator.id,
  consoleId: operator.consoleId,
  sessionId: operator.sessionId,
  payload: { summary: "Test analysis requested" },
  classification: "OPERATIONAL",
});
appendLedgerEvent({
  type: "ai.analysis.completed",
  operatorId: operator.id,
  consoleId: operator.consoleId,
  sessionId: operator.sessionId,
  payload: { summary: "Test analysis completed", suggestionId: cannotSpeak.suggestionId },
  classification: "OPERATIONAL",
});
appendLedgerEvent({
  type: "human.decision.confirmed",
  operatorId: operator.id,
  consoleId: operator.consoleId,
  sessionId: operator.sessionId,
  payload: { summary: "Test human decision", decisionId: finalDecision.decision.id },
  classification: "OPERATIONAL",
});
assert.strictEqual(validateLedgerChain().valid, true);
assert(getLedgerEvents().some((event) => event.type === "human.decision.confirmed"));
assert.strictEqual(deleteLedgerEvent().allowed, false);

const evidence = BUILD_WEEK_STATE.evidence.find((item) => item.id === "EVI-CIBER-001");
const unauthenticated = { ...getOperatorById("OP-CIBER-01"), sessionId: null };
assert.strictEqual(canAccessResource(unauthenticated, evidence, "preservacion digital").allowed, false);
assert.strictEqual(canModifyIndividualAct(operator, BUILD_WEEK_STATE.individualInterventionActs[1]), false);

console.log("PIPO AI Incident Assistant tests passed");
