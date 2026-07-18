(function () {
const {
  MODEL_DEFINITIONS,
  BUILD_WEEK_STATE,
  AUTHORIZED_ACCESS_PURPOSES,
  canAccessResource,
  canModifyIndividualAct,
  getConsoleById,
  getOperatorById,
  getRequiredCoverage,
  getBuildWeekSnapshot,
} = window.PIPOBuildWeekModels;

const {
  appendLedgerEvent,
  appendCorrection,
  deleteLedgerEvent,
  getLedgerEvents,
  validateLedgerChain,
} = window.PIPOBuildWeekLedger;

const {
  createIncidentAnalysisService,
  AI_MODES,
  AI_SERVICE_VERSION,
  getBackendStatus,
} = window.PIPOAIService;

const {
  INCIDENT_SCENARIOS,
  getScenarioById,
} = window.PIPOIncidentScenarios;

const {
  HUMAN_DECISION_STATUS,
  createHumanDecisionDraft,
  createManualFallbackSuggestion,
  finalizeHumanDecision,
  compareSuggestionWithHumanDecision,
  normalizeConsoleList,
  normalizePriority,
} = window.PIPOIncidentAssistant;

const {
  FIELD_WORKFLOW_VERSION,
  INTERVENTION_STATES,
  EVENT_CATEGORIES,
  EVIDENCE_TYPES,
  SUPPORT_TARGETS,
  createFieldWorkflowState,
  getFieldOperator,
  getAssignment,
  transitionFieldOperator,
  createIndividualEvent,
  createEventCorrection,
  createSimulatedEvidence,
  createSupportRequest,
  acceptSupportRequest,
  buildActPreview,
  createIndividualAct,
  reviewIndividualAct,
  finalizeIndividualAct,
  amendIndividualAct,
  createClarificationRequest,
  getEditableDraftStatus,
  compareInterventions,
} = window.PIPOFieldWorkflow;

const {
  PROCEDURE_ACT_VERSION,
  PROCEDURE_ACT_STATUSES,
  SUPERVISION_STATUSES,
  CLOSURE_STATUSES,
  FINDING_TYPES,
  AI_DRAFT_NOTICE,
  INTEGRITY_NOTICE,
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
  runProcedureDemoSequence,
} = window.PIPOProcedureAct;

const {
  PERSPECTIVES,
  PERSPECTIVE_DETAILS,
  NEXT_STEP_CATEGORIES,
  CITIZEN_SCENARIOS,
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
} = window.PIPOCitizenClosure;

const {
  VAULT_NOTICE,
  TRANSFER_NOTICE,
  DELETION_NOTICE,
  RETENTION_POLICIES,
  ACQUISITION_TYPES,
  createEvidenceVaultState,
  findEvidence,
  createAccessRequest,
  encryptEvidenceContent,
  decryptEvidenceContent,
  verifyEvidenceIntegrity,
  grantTemporaryEvidenceAccess,
  revokeEvidenceAccess,
  expireEvidenceGrant,
  requestEvidenceDownload,
  placeRetentionHold,
  scheduleEvidenceDeletion,
  simulateEvidenceDeletion,
  createDigitalAcquisitionRecord,
  authorizeDigitalAcquisition,
  completeDigitalAcquisition,
  createTransferRecord,
  buildCitizenSanitizedEvidenceCopy,
  runEvidenceVaultDemoSequence,
} = window.PIPOEvidenceVault;

const stateByModel = {
  incident: BUILD_WEEK_STATE.incident,
  event: BUILD_WEEK_STATE.events[0],
  aiSuggestion: BUILD_WEEK_STATE.aiSuggestion,
  humanDecision: BUILD_WEEK_STATE.humanDecision,
  routing: BUILD_WEEK_STATE.routing,
  fieldAction: BUILD_WEEK_STATE.fieldActions[0] || {},
  evidence: BUILD_WEEK_STATE.evidence[0],
  digitalAct: BUILD_WEEK_STATE.digitalAct,
  actVersion: BUILD_WEEK_STATE.actVersions[0],
  review: BUILD_WEEK_STATE.review,
  closure: BUILD_WEEK_STATE.closure,
  auditRecord: BUILD_WEEK_STATE.auditRecords[0],
  operationalConsole: BUILD_WEEK_STATE.operationalConsoles[0],
  operatorIdentity: BUILD_WEEK_STATE.operatorIdentities[0],
  incidentParticipant: BUILD_WEEK_STATE.incidentParticipants[0],
  consoleIntervention: BUILD_WEEK_STATE.consoleInterventions[0],
  individualInterventionAct: BUILD_WEEK_STATE.individualInterventionActs[0],
  masterIncidentRecord: BUILD_WEEK_STATE.masterIncidentRecord,
  clarificationRequest: BUILD_WEEK_STATE.clarificationRequests[0],
  evidenceSharingGrant: BUILD_WEEK_STATE.evidenceSharingGrants[0],
  judicialAuthorization: BUILD_WEEK_STATE.judicialAuthorizations[0],
  deviceRecoveryProtocol: BUILD_WEEK_STATE.deviceRecoveryProtocols[0],
  cybercrimeReport: BUILD_WEEK_STATE.cybercrimeReports[0],
  policeStationReceptionRecord: BUILD_WEEK_STATE.policeStationReceptionRecords[0],
  demoPerspectiveSession: BUILD_WEEK_STATE.demoPerspectiveSessions[0],
  citizenClosureSummary: BUILD_WEEK_STATE.citizenClosureSummaries[0],
  citizenIncidentPackage: BUILD_WEEK_STATE.citizenIncidentPackages[0],
  citizenDocumentAccess: BUILD_WEEK_STATE.citizenDocumentAccesses[0],
  citizenServiceFeedback: BUILD_WEEK_STATE.citizenServiceFeedback[0],
  citizenFormalObservation: BUILD_WEEK_STATE.citizenFormalObservations[0],
  citizenFollowUpAction: BUILD_WEEK_STATE.citizenFollowUpActions[0],
  citizenDeliveryReceipt: BUILD_WEEK_STATE.citizenDeliveryReceipts[0],
  evidenceVaultItem: BUILD_WEEK_STATE.evidenceVaultItems[0],
  evidenceAccessRequest: BUILD_WEEK_STATE.evidenceAccessRequests[0],
  evidenceAccessHistory: BUILD_WEEK_STATE.evidenceAccessHistory[0],
  evidenceRetentionPolicy: BUILD_WEEK_STATE.evidenceRetentionPolicies[0],
  digitalAcquisitionRecord: BUILD_WEEK_STATE.digitalAcquisitionRecords[0],
  evidenceTransferRecord: BUILD_WEEK_STATE.evidenceTransferHistory[0],
  citizenSanitizedEvidenceCopy: BUILD_WEEK_STATE.citizenSanitizedEvidenceCopies[0],
  communicationSecurityStatus: BUILD_WEEK_STATE.communicationSecurityStatuses[0],
  ledgerEvent: getLedgerEvents()[0],
};

const els = {
  scenarioSelect: document.querySelector("#scenarioSelect"),
  scenarioSummary: document.querySelector("#scenarioSummary"),
  consoleGrid: document.querySelector("#consoleGrid"),
  participantsList: document.querySelector("#participantsList"),
  individualActsList: document.querySelector("#individualActsList"),
  masterRecord: document.querySelector("#masterRecord"),
  accessResult: document.querySelector("#accessResult"),
  cyberReport: document.querySelector("#cyberReport"),
  deviceProtocol: document.querySelector("#deviceProtocol"),
  ledgerList: document.querySelector("#ledgerList"),
  ledgerValidation: document.querySelector("#ledgerValidation"),
  modelList: document.querySelector("#modelList"),
  detailTitle: document.querySelector("#detailTitle"),
  detailBadge: document.querySelector("#detailBadge"),
  detailPurpose: document.querySelector("#detailPurpose"),
  requiredFields: document.querySelector("#requiredFields"),
  allFields: document.querySelector("#allFields"),
  timeline: document.querySelector("#timeline"),
  aiPriority: document.querySelector("#aiPriority"),
  aiRouting: document.querySelector("#aiRouting"),
  humanPriority: document.querySelector("#humanPriority"),
  humanRouting: document.querySelector("#humanRouting"),
  humanReason: document.querySelector("#humanReason"),
  snapshot: document.querySelector("#snapshot"),
  assistantScenarioSelect: document.querySelector("#assistantScenarioSelect"),
  assistantForm: document.querySelector("#assistantForm"),
  assistantDescription: document.querySelector("#assistantDescription"),
  assistantChannel: document.querySelector("#assistantChannel"),
  assistantLocation: document.querySelector("#assistantLocation"),
  assistantCanSpeak: document.querySelector("#assistantCanSpeak"),
  assistantCurrentRisk: document.querySelector("#assistantCurrentRisk"),
  assistantInjured: document.querySelector("#assistantInjured"),
  assistantMinors: document.querySelector("#assistantMinors"),
  assistantWeapons: document.querySelector("#assistantWeapons"),
  assistantDigital: document.querySelector("#assistantDigital"),
  assistantStolenDevice: document.querySelector("#assistantStolenDevice"),
  assistantAdditional: document.querySelector("#assistantAdditional"),
  assistantModeSelect: document.querySelector("#assistantModeSelect"),
  assistantBackendStatus: document.querySelector("#assistantBackendStatus"),
  assistantActiveMode: document.querySelector("#assistantActiveMode"),
  assistantRequestId: document.querySelector("#assistantRequestId"),
  assistantAnalysisVersion: document.querySelector("#assistantAnalysisVersion"),
  assistantStatus: document.querySelector("#assistantStatus"),
  assistantType: document.querySelector("#assistantType"),
  assistantPriority: document.querySelector("#assistantPriority"),
  assistantConfidence: document.querySelector("#assistantConfidence"),
  assistantSummary: document.querySelector("#assistantSummary"),
  assistantRisks: document.querySelector("#assistantRisks"),
  assistantMissing: document.querySelector("#assistantMissing"),
  assistantQuestions: document.querySelector("#assistantQuestions"),
  assistantConsoles: document.querySelector("#assistantConsoles"),
  assistantReasoning: document.querySelector("#assistantReasoning"),
  assistantWarnings: document.querySelector("#assistantWarnings"),
  assistantUnsupported: document.querySelector("#assistantUnsupported"),
  humanTypeSelect: document.querySelector("#humanTypeSelect"),
  humanPrioritySelect: document.querySelector("#humanPrioritySelect"),
  humanConsoleOptions: document.querySelector("#humanConsoleOptions"),
  humanFollowUpAnswers: document.querySelector("#humanFollowUpAnswers"),
  humanReasonInput: document.querySelector("#humanReasonInput"),
  assistantComparison: document.querySelector("#assistantComparison"),
  fieldMobileTime: document.querySelector("#fieldMobileTime"),
  fieldOperatorSelect: document.querySelector("#fieldOperatorSelect"),
  fieldOperatorMeta: document.querySelector("#fieldOperatorMeta"),
  fieldStatus: document.querySelector("#fieldStatus"),
  fieldIncidentSummary: document.querySelector("#fieldIncidentSummary"),
  fieldAssignment: document.querySelector("#fieldAssignment"),
  fieldStatusFlow: document.querySelector("#fieldStatusFlow"),
  fieldActionReason: document.querySelector("#fieldActionReason"),
  fieldActionMessage: document.querySelector("#fieldActionMessage"),
  fieldEventCategory: document.querySelector("#fieldEventCategory"),
  fieldEventClassification: document.querySelector("#fieldEventClassification"),
  fieldEventLocation: document.querySelector("#fieldEventLocation"),
  fieldEventDescription: document.querySelector("#fieldEventDescription"),
  fieldEvidenceType: document.querySelector("#fieldEvidenceType"),
  fieldEvidenceClassification: document.querySelector("#fieldEvidenceClassification"),
  fieldEvidenceDescription: document.querySelector("#fieldEvidenceDescription"),
  fieldSupportConsole: document.querySelector("#fieldSupportConsole"),
  fieldSupportUrgency: document.querySelector("#fieldSupportUrgency"),
  fieldSupportReason: document.querySelector("#fieldSupportReason"),
  fieldEventList: document.querySelector("#fieldEventList"),
  fieldEvidenceList: document.querySelector("#fieldEvidenceList"),
  fieldSupportList: document.querySelector("#fieldSupportList"),
  fieldActMeta: document.querySelector("#fieldActMeta"),
  fieldActPreview: document.querySelector("#fieldActPreview"),
  fieldComparison: document.querySelector("#fieldComparison"),
  procedureMessage: document.querySelector("#procedureMessage"),
  procedureActSummary: document.querySelector("#procedureActSummary"),
  procedureCompleteness: document.querySelector("#procedureCompleteness"),
  procedureFindings: document.querySelector("#procedureFindings"),
  procedureAiDraft: document.querySelector("#procedureAiDraft"),
  procedureChronology: document.querySelector("#procedureChronology"),
  procedureVersions: document.querySelector("#procedureVersions"),
  procedureMasterRecordDetail: document.querySelector("#procedureMasterRecordDetail"),
  procedureSupervision: document.querySelector("#procedureSupervision"),
  procedureClosure: document.querySelector("#procedureClosure"),
  procedureExport: document.querySelector("#procedureExport"),
  procedurePrintView: document.querySelector("#procedurePrintView"),
  perspectiveSelect: document.querySelector("#perspectiveSelect"),
  perspectiveScenarioSelect: document.querySelector("#perspectiveScenarioSelect"),
  perspectiveConsoleSelect: document.querySelector("#perspectiveConsoleSelect"),
  perspectiveFieldOperatorSelect: document.querySelector("#perspectiveFieldOperatorSelect"),
  perspectiveHeader: document.querySelector("#perspectiveHeader"),
  perspectivePermissionCards: document.querySelector("#perspectivePermissionCards"),
  perspectiveWorkspace: document.querySelector("#perspectiveWorkspace"),
  perspectiveMessage: document.querySelector("#perspectiveMessage"),
  citizenSummary: document.querySelector("#citizenSummary"),
  citizenSafeView: document.querySelector("#citizenSafeView"),
  citizenNextSteps: document.querySelector("#citizenNextSteps"),
  citizenDocumentSelect: document.querySelector("#citizenDocumentSelect"),
  citizenDocs: document.querySelector("#citizenDocs"),
  citizenReceipt: document.querySelector("#citizenReceipt"),
  citizenFeedback: document.querySelector("#citizenFeedback"),
  citizenObservation: document.querySelector("#citizenObservation"),
  citizenPrintView: document.querySelector("#citizenPrintView"),
  citizenJsonExport: document.querySelector("#citizenJsonExport"),
  feedbackRapidity: document.querySelector("#feedbackRapidity"),
  feedbackClarity: document.querySelector("#feedbackClarity"),
  feedbackTreatment: document.querySelector("#feedbackTreatment"),
  feedbackCoordination: document.querySelector("#feedbackCoordination"),
  feedbackProtection: document.querySelector("#feedbackProtection"),
  feedbackNextSteps: document.querySelector("#feedbackNextSteps"),
  feedbackOverall: document.querySelector("#feedbackOverall"),
  feedbackComment: document.querySelector("#feedbackComment"),
  observationCategory: document.querySelector("#observationCategory"),
  observationDescription: document.querySelector("#observationDescription"),
  communicationSecurityStatus: document.querySelector("#communicationSecurityStatus"),
  securityControlOverview: document.querySelector("#securityControlOverview"),
  vaultMessage: document.querySelector("#vaultMessage"),
  evidenceVaultList: document.querySelector("#evidenceVaultList"),
  retentionPolicyList: document.querySelector("#retentionPolicyList"),
  evidenceAccessDecision: document.querySelector("#evidenceAccessDecision"),
  evidenceAccessHistory: document.querySelector("#evidenceAccessHistory"),
  digitalAcquisitionList: document.querySelector("#digitalAcquisitionList"),
  citizenSanitizedCopy: document.querySelector("#citizenSanitizedCopy"),
  evidenceTransferHistory: document.querySelector("#evidenceTransferHistory"),
};

let selectedModel = MODEL_DEFINITIONS[0].key;
let selectedScenario = "general";
let selectedAssistantMode = AI_MODES.SIMULATED_DEMO;
const fieldState = createFieldWorkflowState();
let selectedFieldOperatorId = fieldState.selectedOperatorId;
let fieldMessage = "Esperando accion del operador.";
const procedureState = createProcedureActState(BUILD_WEEK_STATE, fieldState, getLedgerEvents());
let procedureMessage = "Acta Digital de Procedimiento pendiente de generar.";
let citizenState = createCitizenClosureState(BUILD_WEEK_STATE, fieldState, procedureState, getLedgerEvents());
let citizenMessage = "Simulacion multiperspectiva pendiente de ejecutar.";
const evidenceVaultState = createEvidenceVaultState(BUILD_WEEK_STATE, getLedgerEvents(), {
  appendLedgerEvent,
  canAccessResource,
  locationLike: window.location,
});
let vaultMessage = "Boveda inicializada con evidencia ficticia y controles simulados.";
let assistantState = {
  suggestion: BUILD_WEEK_STATE.aiSuggestion,
  humanDraft: createHumanDecisionDraft(BUILD_WEEK_STATE.aiSuggestion, getOperatorById("OP-MASTER-01")),
  comparison: compareSuggestionWithHumanDecision(BUILD_WEEK_STATE.aiSuggestion, BUILD_WEEK_STATE.humanDecision),
  validationErrors: [],
  backendStatus: null,
  requestId: null,
  analysisVersion: BUILD_WEEK_STATE.aiSuggestion?.version || "3.0.0",
  activeMode: AI_MODES.SIMULATED_DEMO,
  lastInput: null,
  status: "idle",
};

function formatList(items, fallback = "Sin datos") {
  return (items && items.length) ? items.join(", ") : fallback;
}

function setText(element, value) {
  if (element) element.textContent = value || "-";
}

function assistantModeLabel(mode) {
  return mode === AI_MODES.OPENAI_SECURE_BACKEND ? "Secure OpenAI Backend" : "Simulated AI Demo";
}

function renderBackendControls() {
  if (els.assistantModeSelect) {
    els.assistantModeSelect.value = selectedAssistantMode;
  }

  const backend = assistantState.backendStatus;
  const backendCopy = backend
    ? `${backend.available ? "Disponible" : "No disponible"} / modelo: ${backend.model || "configurado en servidor"} / contrato: ${backend.contractVersion || "-"}`
    : "Estado pendiente. En GitHub Pages el backend puede no estar disponible.";

  if (els.assistantBackendStatus) {
    els.assistantBackendStatus.className = `backend-status ${backend?.available ? "online" : "offline"}`;
    els.assistantBackendStatus.textContent = backendCopy;
  }

  setText(els.assistantActiveMode, assistantModeLabel(assistantState.activeMode || selectedAssistantMode));
  setText(els.assistantRequestId, assistantState.requestId || "Pendiente");
  setText(els.assistantAnalysisVersion, assistantState.analysisVersion || "Pendiente");
}

function renderPlainList(element, items, fallback = "Sin datos") {
  if (!element) return;
  element.innerHTML = "";
  const safeItems = (items && items.length) ? items : [fallback];
  safeItems.forEach((line) => {
    const item = document.createElement("li");
    item.textContent = typeof line === "string" ? line : JSON.stringify(line);
    element.appendChild(item);
  });
}

function getSelectedConsoleTypes() {
  return Array.from(els.humanConsoleOptions.querySelectorAll("input[type='checkbox']:checked"))
    .map((input) => input.value);
}

function getConsoleSuggestionByType(type) {
  const fromSuggestion = normalizeConsoleList(assistantState.suggestion?.suggestedConsoles)
    .find((item) => item.consoleType === type);
  if (fromSuggestion) return fromSuggestion;
  const config = BUILD_WEEK_STATE.operationalConsoles.find((item) => item.type === type);
  return {
    consoleType: type,
    consoleId: config?.id || type,
    consoleName: config?.name || type,
  };
}

function getAssistantInput() {
  return {
    incidentId: BUILD_WEEK_STATE.incident.id,
    description: els.assistantDescription.value,
    channel: els.assistantChannel.value,
    location: els.assistantLocation.value,
    canSpeak: els.assistantCanSpeak.value,
    currentRisk: els.assistantCurrentRisk.value,
    injuredPersons: els.assistantInjured.value,
    minorsPresent: els.assistantMinors.value,
    weaponsPresent: els.assistantWeapons.value,
    possibleDigitalIncident: els.assistantDigital.value,
    stolenOrLostDevice: els.assistantStolenDevice.value,
    additionalInfo: els.assistantAdditional.value,
    reportedBy: "usuario u operador demo",
  };
}

function syncHumanDraftFromControls(status = assistantState.humanDraft?.decisionStatus || HUMAN_DECISION_STATUS.ACCEPTED) {
  const finalConsoles = getSelectedConsoleTypes().map(getConsoleSuggestionByType);
  assistantState.humanDraft = {
    ...assistantState.humanDraft,
    decisionStatus: status,
    finalIncidentType: els.humanTypeSelect.value,
    finalPriority: normalizePriority(els.humanPrioritySelect.value),
    finalConsoles,
    finalRouting: finalConsoles.map((item) => item.consoleName).join(" / "),
    reason: els.humanReasonInput.value,
    addedInformation: els.humanFollowUpAnswers.value,
    followUpAnswers: els.humanFollowUpAnswers.value
      ? els.humanFollowUpAnswers.value.split("\n").map((line) => line.trim()).filter(Boolean)
      : [],
  };
  return assistantState.humanDraft;
}

function loadAssistantScenario(id) {
  const scenario = getScenarioById(id);
  els.assistantDescription.value = scenario.description;
  els.assistantChannel.value = scenario.channel;
  els.assistantLocation.value = scenario.location;
  els.assistantCanSpeak.value = scenario.canSpeak;
  els.assistantCurrentRisk.value = scenario.currentRisk;
  els.assistantInjured.value = scenario.injuredPersons;
  els.assistantMinors.value = scenario.minorsPresent;
  els.assistantWeapons.value = scenario.weaponsPresent;
  els.assistantDigital.value = scenario.possibleDigitalIncident;
  els.assistantStolenDevice.value = scenario.stolenOrLostDevice;
  els.assistantAdditional.value = scenario.additionalInfo;
}

function initializeAssistantScenarios() {
  els.assistantScenarioSelect.innerHTML = "";
  INCIDENT_SCENARIOS.forEach((scenario) => {
    const option = document.createElement("option");
    option.value = scenario.id;
    option.textContent = scenario.label;
    els.assistantScenarioSelect.appendChild(option);
  });
  loadAssistantScenario(INCIDENT_SCENARIOS[0].id);
}

function FederatedOperationalConsole(consoleConfig, priorityIds) {
  const article = document.createElement("article");
  article.className = `console-card ${priorityIds.includes(consoleConfig.id) ? "priority" : ""}`;
  article.innerHTML = `
    <small>${consoleConfig.type}</small>
    <strong>${consoleConfig.name}</strong>
    <span>${consoleConfig.jurisdiction}</span>
    <span>Nivel: ${consoleConfig.accessLevel} / ${consoleConfig.securityLevel}</span>
    <span>Conservacion: ${consoleConfig.retentionPolicy}</span>
    <div class="console-actions-list">
      ${consoleConfig.allowedActions.slice(0, 4).map((action) => `<em>${action}</em>`).join("")}
    </div>
  `;
  return article;
}

function addLocalEvent(summary) {
  const nextNumber = BUILD_WEEK_STATE.events.length + 1;
  BUILD_WEEK_STATE.events.push({
    id: `EVT-LOCAL-${String(nextNumber).padStart(3, "0")}`,
    incidentId: BUILD_WEEK_STATE.incident.id,
    timestamp: new Date().toISOString(),
    type: "local_demo_event",
    actor: "Interfaz Build Week demo",
    classification: "Dato del sistema",
    summary,
    immutable: true,
    correctionOf: null,
    ownerConsole: "CON-MASTER",
    permittedRoles: ["coordinador", "operador", "supervisor"],
    sharingPurpose: "demostracion funcional",
    retentionRule: "append-only demo",
  });
}

function addLedger(type, payload = {}, operatorId = "OP-MASTER-01") {
  const operator = getOperatorById(operatorId) || getFieldOperator(fieldState, operatorId) || getOperatorById("OP-MASTER-01");
  return appendLedgerEvent({
    type,
    operatorId: operator.id || operator.operatorId,
    consoleId: operator.consoleId,
    sessionId: operator.sessionId,
    payload,
    classification: payload.classification || "OPERATIONAL",
  });
}

function appendFieldLedger(result) {
  if (!result?.ok || !result.ledger) return null;
  return addLedger(result.ledger.type, result.ledger.payload, result.ledger.operatorId);
}

function setFieldMessage(message, isError = false) {
  fieldMessage = message;
  if (els.fieldActionMessage) {
    els.fieldActionMessage.className = `field-message ${isError ? "field-error" : ""}`;
    els.fieldActionMessage.textContent = message;
  }
}

function ensureUnique(list, value) {
  if (value && !list.includes(value)) list.push(value);
}

function ensureFieldOperatorInBuildWeek(operator) {
  if (!operator) return;
  if (!BUILD_WEEK_STATE.operatorIdentities.some((item) => item.id === operator.operatorId)) {
    BUILD_WEEK_STATE.operatorIdentities.push({
      id: operator.operatorId,
      fictitiousName: operator.fictitiousName,
      organization: operator.organization,
      rankOrRole: operator.rankOrRole,
      specialty: operator.specialty,
      consoleId: operator.consoleId,
      enrolledDeviceId: operator.enrolledDeviceId,
      mfaVerified: operator.mfaVerified,
      localBiometricVerified: operator.localBiometricVerified,
      sessionId: operator.sessionId,
      sessionStartedAt: operator.joinedAt,
    });
  }

  if (!BUILD_WEEK_STATE.incidentParticipants.some((item) => item.operatorId === operator.operatorId)) {
    BUILD_WEEK_STATE.incidentParticipants.push({
      incidentId: fieldState.incident.id,
      operatorId: operator.operatorId,
      consoleId: operator.consoleId,
      role: operator.role,
      joinedAt: operator.joinedAt,
      leftAt: null,
      permissions: ["registrar salida", "registrar arribo", "registrar acontecimiento", "adjuntar evidencia", "acta individual"],
      status: "Activo",
      interventionStatus: operator.interventionStatus,
      individualActId: operator.individualActId,
    });
  } else {
    const participant = BUILD_WEEK_STATE.incidentParticipants.find((item) => item.operatorId === operator.operatorId);
    participant.interventionStatus = operator.interventionStatus;
    participant.status = operator.interventionStatus === INTERVENTION_STATES.COMPLETED ? "Cerrado" : "Activo";
  }
}

function syncFieldStateToBuildWeek() {
  fieldState.operators.forEach(ensureFieldOperatorInBuildWeek);

  fieldState.evidences.forEach((evidence) => {
    if (!BUILD_WEEK_STATE.evidence.some((item) => item.id === evidence.evidenceId)) {
      BUILD_WEEK_STATE.evidence.push({
        id: evidence.evidenceId,
        incidentId: evidence.incidentId,
        type: evidence.type,
        origin: evidence.origin,
        createdAt: evidence.timestamp,
        responsibleUser: evidence.operatorId,
        status: "Preservada simulada",
        integrityRef: evidence.integrityReference,
        viewPermissions: evidence.permissions,
        classification: evidence.classification,
        ownerConsole: evidence.consoleId,
        permittedRoles: ["operador autor", "consola titular", "coordinador"],
        sharingPurpose: "coordinacion operativa",
        retentionRule: "retencion de evidencia simulada",
      });
    }
    ensureUnique(BUILD_WEEK_STATE.masterIncidentRecord.evidenceIndex, evidence.evidenceId);
  });

  fieldState.acts.forEach((act) => {
    const actView = {
      id: act.id,
      incidentId: act.incidentId,
      consoleId: act.ownerConsoleId,
      operatorId: act.ownerOperatorId,
      specialty: act.specialty,
      chronology: act.chronology,
      observations: act.observations,
      actions: act.actions,
      evidenceReferences: act.evidenceReferences,
      status: act.status,
      version: act.version,
      integrityReference: act.integrityReference,
      classification: "SENSITIVE",
      ownerConsole: act.ownerConsoleId,
      permittedRoles: ["operador autor", "supervisor", "coordinador"],
      sharingPurpose: "integracion documental",
      retentionRule: "acta individual con autoria propia",
    };
    const existingAct = BUILD_WEEK_STATE.individualInterventionActs.find((item) => item.id === act.id);
    if (existingAct) {
      Object.assign(existingAct, actView);
    } else {
      BUILD_WEEK_STATE.individualInterventionActs.push(actView);
    }
    ensureUnique(BUILD_WEEK_STATE.masterIncidentRecord.individualActs, act.id);
    ensureUnique(BUILD_WEEK_STATE.masterIncidentRecord.participatingConsoles, act.ownerConsoleId);
  });

  fieldState.individualEvents.forEach((event) => {
    ensureUnique(BUILD_WEEK_STATE.masterIncidentRecord.integratedTimeline, event.eventId);
  });

  BUILD_WEEK_STATE.fieldWorkflow = {
    version: fieldState.version,
    incident: fieldState.incident,
    assignments: fieldState.assignments,
    individualEvents: fieldState.individualEvents,
    evidences: fieldState.evidences,
    supportRequests: fieldState.supportRequests,
    acts: fieldState.acts,
    actVersions: fieldState.actVersions,
    clarificationRequests: fieldState.clarificationRequests,
  };
}

function procedureContext() {
  return {
    buildWeekState: BUILD_WEEK_STATE,
    fieldState,
    ledgerEvents: getLedgerEvents(),
  };
}

function appendProcedureLedger(result) {
  if (!result?.ok || !result.ledger) return null;
  return addLedger(result.ledger.type, result.ledger.payload, result.ledger.operatorId);
}

function setProcedureMessage(message, isError = false) {
  procedureMessage = message;
  if (els.procedureMessage) {
    els.procedureMessage.className = `access-result ${isError ? "denied" : "allowed"}`;
    els.procedureMessage.innerHTML = `
      <strong>${isError ? "Accion bloqueada" : "Etapa 5"}</strong>
      <span>${message}</span>
    `;
  }
}

function syncProcedureStateToBuildWeek() {
  BUILD_WEEK_STATE.procedureActWorkflow = {
    version: PROCEDURE_ACT_VERSION,
    procedureAct: procedureState.procedureAct,
    aiDraft: procedureState.aiDraft,
    chronology: procedureState.chronology,
    completeness: procedureState.completeness,
    findings: procedureState.findings,
    supervision: procedureState.supervision,
    procedureActVersions: procedureState.procedureActVersions,
    clarificationRequests: procedureState.clarificationRequests,
    masterIncidentRecord: procedureState.masterIncidentRecord,
    closure: procedureState.closure,
    exports: procedureState.exports,
    integrityNotice: INTEGRITY_NOTICE,
  };

  if (procedureState.procedureAct) {
    BUILD_WEEK_STATE.digitalAct = {
      ...BUILD_WEEK_STATE.digitalAct,
      id: procedureState.procedureAct.actId,
      incidentId: procedureState.procedureAct.incidentId,
      threadId: BUILD_WEEK_STATE.incident.threadId,
      agency: procedureState.procedureAct.organization,
      author: procedureState.procedureAct.operatorId,
      role: procedureState.procedureAct.rankOrRole,
      device: procedureState.procedureAct.deviceId,
      jurisdiction: procedureState.procedureAct.jurisdiction,
      location: procedureState.procedureAct.simulatedLocation,
      version: procedureState.procedureAct.version,
      status: procedureState.procedureAct.status,
      startedAt: procedureState.procedureAct.startedAt,
      finishedAt: procedureState.procedureAct.completedAt,
      sections: procedureState.procedureAct.content,
      completion: procedureState.completeness,
      integrityReference: procedureState.procedureAct.integrityReference,
    };
    stateByModel.digitalAct = BUILD_WEEK_STATE.digitalAct;
  }

  if (procedureState.procedureActVersions.length) {
    BUILD_WEEK_STATE.actVersions = [
      ...BUILD_WEEK_STATE.actVersions.filter((item) => !String(item.id || item.versionId || "").startsWith("PACT-V-")),
      ...procedureState.procedureActVersions.map((version) => ({
        id: version.versionId,
        actId: version.actId,
        version: version.version,
        author: version.authorId,
        createdAt: version.timestamp,
        changeReason: version.reason,
        previousHash: version.previousVersionId,
        contentHash: version.integrityReference?.value,
        status: version.status,
      })),
    ];
    stateByModel.actVersion = BUILD_WEEK_STATE.actVersions[BUILD_WEEK_STATE.actVersions.length - 1];
  }

  if (procedureState.masterIncidentRecord) {
    BUILD_WEEK_STATE.masterIncidentRecord = {
      ...BUILD_WEEK_STATE.masterIncidentRecord,
      ...procedureState.masterIncidentRecord,
      individualActs: procedureState.masterIncidentRecord.individualActs,
      evidenceIndex: procedureState.masterIncidentRecord.evidence.map((item) => item.evidenceId),
      integratedTimeline: procedureState.masterIncidentRecord.chronology.map((item) => item.eventId),
      clarificationRequests: procedureState.masterIncidentRecord.clarifications.map((item) => item.id),
      closureStatus: procedureState.masterIncidentRecord.closureStatus,
    };
    stateByModel.masterIncidentRecord = BUILD_WEEK_STATE.masterIncidentRecord;
  }

  if (procedureState.closure) {
    BUILD_WEEK_STATE.closure = {
      id: procedureState.closure.id,
      incidentId: procedureState.closure.incidentId,
      result: procedureState.closure.status,
      responsible: procedureState.closure.responsible,
      summary: procedureState.closure.summary,
      followUp: procedureState.closure.followUp,
      associatedAct: procedureState.closure.associatedAct,
      closedAt: procedureState.closure.closedAt,
    };
    stateByModel.closure = BUILD_WEEK_STATE.closure;
  }
}

function citizenContext() {
  return {
    buildWeekState: BUILD_WEEK_STATE,
    fieldState,
    procedureState,
    ledgerEvents: getLedgerEvents(),
    scenarioId: citizenState.scenarioId,
  };
}

function appendCitizenLedger(result) {
  if (!result?.ok || !result.ledger) return null;
  return appendLedgerEvent({
    type: result.ledger.type,
    operatorId: result.ledger.operatorId,
    consoleId: result.ledger.consoleId,
    sessionId: result.ledger.sessionId,
    payload: result.ledger.payload,
    classification: result.ledger.classification,
  });
}

function setCitizenMessage(message, isError = false) {
  citizenMessage = message;
  if (els.perspectiveMessage) {
    els.perspectiveMessage.className = `access-result ${isError ? "denied" : "allowed"}`;
    els.perspectiveMessage.innerHTML = `
      <strong>${isError ? "Accion bloqueada" : "Etapa 5.1"}</strong>
      <span>${message}</span>
    `;
  }
}

function syncCitizenStateToBuildWeek() {
  citizenState.incidentId = BUILD_WEEK_STATE.incident.id;
  citizenState.selectedFieldOperatorId = selectedFieldOperatorId;
  BUILD_WEEK_STATE.demoPerspectiveSessions = citizenState.perspectiveSessions;
  BUILD_WEEK_STATE.citizenClosureSummaries = citizenState.summaries;
  BUILD_WEEK_STATE.citizenIncidentPackages = citizenState.packages;
  BUILD_WEEK_STATE.citizenDocumentAccesses = citizenState.documentAccesses;
  BUILD_WEEK_STATE.citizenServiceFeedback = citizenState.feedback;
  BUILD_WEEK_STATE.citizenFormalObservations = citizenState.observations;
  BUILD_WEEK_STATE.citizenFollowUpActions = citizenState.followUps;
  BUILD_WEEK_STATE.citizenDeliveryReceipts = citizenState.receipts;
  stateByModel.demoPerspectiveSession = citizenState.perspectiveSessions[citizenState.perspectiveSessions.length - 1];
  stateByModel.citizenClosureSummary = citizenState.summaries[citizenState.summaries.length - 1];
  stateByModel.citizenIncidentPackage = citizenState.packages[citizenState.packages.length - 1];
  stateByModel.citizenDocumentAccess = citizenState.documentAccesses[citizenState.documentAccesses.length - 1];
  stateByModel.citizenServiceFeedback = citizenState.feedback[citizenState.feedback.length - 1];
  stateByModel.citizenFormalObservation = citizenState.observations[citizenState.observations.length - 1];
  stateByModel.citizenFollowUpAction = citizenState.followUps[citizenState.followUps.length - 1];
  stateByModel.citizenDeliveryReceipt = citizenState.receipts[citizenState.receipts.length - 1];
}

function syncEvidenceVaultStateToBuildWeek() {
  BUILD_WEEK_STATE.evidenceVaultItems = evidenceVaultState.items;
  BUILD_WEEK_STATE.evidenceAccessRequests = evidenceVaultState.accessRequests;
  BUILD_WEEK_STATE.evidenceAccessHistory = evidenceVaultState.accessHistory;
  BUILD_WEEK_STATE.evidenceRetentionPolicies = Object.values(evidenceVaultState.retentionPolicies);
  BUILD_WEEK_STATE.digitalAcquisitionRecords = evidenceVaultState.acquisitions;
  BUILD_WEEK_STATE.evidenceTransferHistory = evidenceVaultState.transferHistory;
  BUILD_WEEK_STATE.citizenSanitizedEvidenceCopies = evidenceVaultState.citizenCopies;
  BUILD_WEEK_STATE.communicationSecurityStatuses = [evidenceVaultState.communicationStatus];
  stateByModel.evidenceVaultItem = evidenceVaultState.items[0];
  stateByModel.evidenceAccessRequest = evidenceVaultState.accessRequests[evidenceVaultState.accessRequests.length - 1];
  stateByModel.evidenceAccessHistory = evidenceVaultState.accessHistory[evidenceVaultState.accessHistory.length - 1];
  stateByModel.evidenceRetentionPolicy = Object.values(evidenceVaultState.retentionPolicies)[0];
  stateByModel.digitalAcquisitionRecord = evidenceVaultState.acquisitions[evidenceVaultState.acquisitions.length - 1];
  stateByModel.evidenceTransferRecord = evidenceVaultState.transferHistory[evidenceVaultState.transferHistory.length - 1];
  stateByModel.citizenSanitizedEvidenceCopy = evidenceVaultState.citizenCopies[evidenceVaultState.citizenCopies.length - 1];
  stateByModel.communicationSecurityStatus = evidenceVaultState.communicationStatus;
}

function selectedFieldOperator() {
  return getFieldOperator(fieldState, selectedFieldOperatorId);
}

function renderScenario() {
  const scenario = BUILD_WEEK_STATE.buildWeekScenarios[selectedScenario];
  els.scenarioSummary.textContent = scenario.summary;
}

function renderConsoles() {
  const scenario = BUILD_WEEK_STATE.buildWeekScenarios[selectedScenario];
  const priorityIds = scenario.recommendedConsoles;
  els.consoleGrid.innerHTML = "";
  BUILD_WEEK_STATE.operationalConsoles.forEach((consoleConfig) => {
    els.consoleGrid.appendChild(FederatedOperationalConsole(consoleConfig, priorityIds));
  });
}

function renderParticipants() {
  els.participantsList.innerHTML = "";
  BUILD_WEEK_STATE.incidentParticipants.forEach((participant) => {
    const operator = getOperatorById(participant.operatorId);
    const consoleConfig = getConsoleById(participant.consoleId);
    const item = document.createElement("li");
    item.textContent = `${operator?.fictitiousName || participant.operatorId} / ${consoleConfig?.name || participant.consoleId} / ${participant.role} / ${participant.status}`;
    els.participantsList.appendChild(item);
  });
}

function renderIndividualActs() {
  els.individualActsList.innerHTML = "";
  BUILD_WEEK_STATE.individualInterventionActs.forEach((act) => {
    const operator = getOperatorById(act.operatorId);
    const consoleConfig = getConsoleById(act.consoleId);
    const masterOperator = getOperatorById("OP-MASTER-01");
    const editableByMaster = canModifyIndividualAct(masterOperator, act);
    const item = document.createElement("li");
    item.textContent = `${act.id} / ${consoleConfig?.name || act.consoleId} / autor: ${operator?.fictitiousName || act.operatorId} / ${act.status} / consola maestra puede editar: ${editableByMaster ? "si" : "no"}`;
    els.individualActsList.appendChild(item);
  });
}

function renderMasterRecord() {
  const record = BUILD_WEEK_STATE.masterIncidentRecord;
  els.masterRecord.innerHTML = `
    <article><strong>Consolas</strong><span>${record.participatingConsoles.length}</span></article>
    <article><strong>Actas fuente</strong><span>${record.individualActs.join(", ")}</span></article>
    <article><strong>Evidencia</strong><span>${record.evidenceIndex.join(", ")}</span></article>
    <article><strong>Cierre</strong><span>${record.closureStatus}</span></article>
  `;
}

function renderCyberAndRecovery() {
  const report = BUILD_WEEK_STATE.cybercrimeReports[0];
  const protocol = BUILD_WEEK_STATE.deviceRecoveryProtocols[0];
  els.cyberReport.innerHTML = "";
  [
    `Categoria: ${report.category}`,
    `Cuentas afectadas: ${formatList(report.affectedAccounts)}`,
    `URLs: ${formatList(report.urls)}`,
    `Archivos seleccionados: ${formatList(report.selectedFiles)}`,
    `Hash demo: ${formatList(report.hashes)}`,
    `Derivacion: ${report.referralAuthority}`,
  ].forEach((line) => {
    const item = document.createElement("li");
    item.textContent = line;
    els.cyberReport.appendChild(item);
  });

  els.deviceProtocol.innerHTML = "";
  [
    `Consentimiento previo: ${protocol.ownerConsentRecorded ? "registrado" : "pendiente"}`,
    `Denuncia: ${protocol.complaintNumber}`,
    `Autoridad: ${protocol.receivingAuthority}`,
    `Autorizacion: ${protocol.judicialAuthorizationId}`,
    `Estado: ${protocol.trackingStatus}`,
    `Acciones: ${formatList(protocol.actionsLog)}`,
  ].forEach((line) => {
    const item = document.createElement("li");
    item.textContent = line;
    els.deviceProtocol.appendChild(item);
  });
}

function renderAccessResult(result) {
  if (!result) {
    const operator = getOperatorById("OP-CIBER-01");
    const evidence = BUILD_WEEK_STATE.evidence.find((item) => item.id === "EVI-CIBER-001");
    result = canAccessResource(operator, evidence, "preservacion digital");
  }
  els.accessResult.className = `access-result ${result.allowed ? "allowed" : "denied"}`;
  els.accessResult.innerHTML = `
    <strong>${result.allowed ? "Acceso permitido" : "Acceso denegado"}</strong>
    <span>${result.reason}</span>
    <span>Limitaciones: ${formatList(result.limitations)}</span>
    <span>Vencimiento: ${result.expiration || "no aplica"}</span>
  `;
}

function renderModelList() {
  els.modelList.innerHTML = "";
  MODEL_DEFINITIONS.forEach((model) => {
    const instance = stateByModel[model.key] || {};
    const coverage = getRequiredCoverage(model.key, instance);
    const button = document.createElement("button");
    button.type = "button";
    button.className = `model-card ${model.key === selectedModel ? "active" : ""}`;
    button.dataset.model = model.key;
    button.innerHTML = `
      <small>${coverage.complete.length}/${model.required.length} requeridos</small>
      <strong>${model.name}</strong>
      <span>${model.purpose}</span>
    `;
    els.modelList.appendChild(button);
  });
}

function renderDetail() {
  const model = MODEL_DEFINITIONS.find((item) => item.key === selectedModel);
  const instance = stateByModel[selectedModel] || {};
  const coverage = getRequiredCoverage(selectedModel, instance);

  els.detailTitle.textContent = model.name;
  els.detailBadge.textContent = coverage.missing.length ? "Campos pendientes" : "Base completa";
  els.detailPurpose.textContent = model.purpose;
  els.requiredFields.innerHTML = "";
  els.allFields.innerHTML = "";

  model.required.forEach((field) => {
    const item = document.createElement("li");
    const done = coverage.complete.includes(field);
    item.textContent = `${done ? "Completo" : "Pendiente"}: ${field}`;
    els.requiredFields.appendChild(item);
  });

  model.fields.forEach(([field, description]) => {
    const item = document.createElement("li");
    item.innerHTML = `<strong>${field}</strong>: ${description}`;
    els.allFields.appendChild(item);
  });
}

function renderTimeline() {
  els.timeline.innerHTML = "";
  BUILD_WEEK_STATE.events.forEach((event) => {
    const item = document.createElement("li");
    item.innerHTML = `
      <strong>${event.timestamp} - ${event.type}</strong>
      <span>${event.summary}</span>
      <span>${event.classification} / ${event.informationType || "dato"} / ${event.actor}</span>
    `;
    els.timeline.appendChild(item);
  });
}

function renderLedger() {
  const events = getLedgerEvents();
  const validation = validateLedgerChain();
  stateByModel.ledgerEvent = events[0] || {};
  els.ledgerValidation.className = `access-result ${validation.valid ? "allowed" : "denied"}`;
  els.ledgerValidation.innerHTML = `
    <strong>${validation.valid ? "Cadena consistente" : "Cadena observada"}</strong>
    <span>${validation.count} eventos append-only registrados.</span>
    <span>${validation.errors.length ? validation.errors.join(" / ") : "Sin errores de referencia previa."}</span>
  `;
  els.ledgerList.innerHTML = "";
  events.slice().reverse().forEach((event) => {
    const item = document.createElement("li");
    item.innerHTML = `
      <strong>${event.eventId} / ${event.type}</strong>
      <span>${event.timestamp} / ${event.consoleId} / ${event.operatorId}</span>
      <span>${event.classification}: ${event.payload.summary || event.payload.role || event.payload.actId || event.payload.evidenceId || "evento registrado"}</span>
      <code>${event.integrityReference} / prev: ${event.previousEventReference || "inicio"}</code>
    `;
    els.ledgerList.appendChild(item);
  });
}

function renderAssistantConsoles() {
  const consoles = assistantState.suggestion?.suggestedConsoles || [];
  els.assistantConsoles.innerHTML = "";
  if (!consoles.length) {
    const item = document.createElement("li");
    item.textContent = "Sin consolas sugeridas. Requiere clasificacion humana.";
    els.assistantConsoles.appendChild(item);
    return;
  }

  consoles.forEach((consoleSuggestion) => {
    const item = document.createElement("li");
    const auth = consoleSuggestion.additionalAuthorizationRequired ? "requiere autorizacion adicional" : "sin autorizacion adicional";
    item.textContent = `${consoleSuggestion.consoleName} (${consoleSuggestion.consoleType}) - ${consoleSuggestion.purpose}. Prioridad: ${consoleSuggestion.incorporationPriority}. Minimo a compartir: ${formatList(consoleSuggestion.minimumInfoToShare)}. Clasificacion: ${consoleSuggestion.classification}. ${auth}.`;
    els.assistantConsoles.appendChild(item);
  });
}

function renderHumanConsoleOptions() {
  const selectedTypes = new Set(uniqueConsoleTypesForDraft());
  els.humanConsoleOptions.innerHTML = "";
  BUILD_WEEK_STATE.operationalConsoles.forEach((consoleConfig) => {
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = consoleConfig.type;
    checkbox.checked = selectedTypes.has(consoleConfig.type);
    const text = document.createElement("span");
    text.textContent = consoleConfig.name;
    label.appendChild(checkbox);
    label.appendChild(text);
    els.humanConsoleOptions.appendChild(label);
  });
}

function uniqueConsoleTypesForDraft() {
  const draftConsoles = normalizeConsoleList(assistantState.humanDraft?.finalConsoles);
  return Array.from(new Set(draftConsoles.map((item) => item.consoleType || item.consoleId)));
}

function renderAssistantComparisonBox(comparison) {
  els.assistantComparison.innerHTML = "";
  const data = comparison || assistantState.comparison;
  if (!data) {
    const item = document.createElement("p");
    item.textContent = "La comparacion se genera al confirmar la decision humana.";
    els.assistantComparison.appendChild(item);
    return;
  }

  [
    `Prioridad sugerida: ${data.suggestedPriority}`,
    `Prioridad final: ${data.finalPriority}`,
    `Tipo sugerido: ${data.suggestedType}`,
    `Tipo final: ${data.finalType}`,
    `Consolas sugeridas: ${formatList(data.suggestedConsoles)}`,
    `Consolas finales: ${formatList(data.finalConsoles)}`,
    `Aceptado: ${formatList(data.accepted)}`,
    `Modificado: ${formatList(data.modified)}`,
    `Rechazado: ${formatList(data.rejected)}`,
    `Motivo humano: ${data.reason || "no informado"}`,
    `Operador: ${data.operator}`,
    `Sesion: ${data.sessionId}`,
    `Fecha: ${data.decidedAt}`,
  ].forEach((line) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = line;
    els.assistantComparison.appendChild(paragraph);
  });
}

function renderAssistant() {
  const suggestion = assistantState.suggestion;
  const draft = assistantState.humanDraft || createHumanDecisionDraft(suggestion, getOperatorById("OP-MASTER-01"));
  const statusCopy = {
    idle: "Listo para analisis. El modo simulado no transmite datos; el backend experimental requiere servidor local.",
    processing: `Analisis en curso por ${assistantModeLabel(selectedAssistantMode)}.`,
    analyzed: `Analisis generado por ${assistantModeLabel(assistantState.activeMode)}. Requiere decision humana.`,
    manual: "IA omitida. El operador continua con carga manual.",
    confirmed: "Decision humana confirmada y registrada en bitacora.",
    error: "El analisis fallo. La entrada se conserva; puede reintentar, usar demo simulada o continuar sin IA.",
  };
  const statusClass = assistantState.status === "error" ? "denied" : "allowed";

  renderBackendControls();

  els.assistantStatus.className = `access-result ${statusClass}`;
  els.assistantStatus.innerHTML = `
    <strong>${assistantState.status === "confirmed" ? "Validacion confirmada" : "Control humano obligatorio"}</strong>
    <span>${statusCopy[assistantState.status] || statusCopy.idle}</span>
    <span>${assistantState.validationErrors.length ? assistantState.validationErrors.join(" / ") : "Secure backend analysis - human validation required. Datos ficticios. Sin conexion con emergencias reales."}</span>
  `;

  setText(els.assistantType, suggestion?.suggestedIncidentType || suggestion?.suggestedType);
  setText(els.assistantPriority, suggestion?.suggestedPriority);
  setText(els.assistantConfidence, suggestion?.confidenceLevel || suggestion?.confidence);
  setText(els.assistantSummary, suggestion?.neutralSummary || suggestion?.summary);
  setText(els.assistantReasoning, suggestion?.reasoningSummary || suggestion?.explanation);

  renderPlainList(els.assistantRisks, suggestion?.detectedRiskFactors || suggestion?.riskFactors);
  renderPlainList(els.assistantMissing, suggestion?.missingCriticalInformation || suggestion?.missingInfo);
  renderPlainList(els.assistantQuestions, suggestion?.followUpQuestions || suggestion?.suggestedQuestions);
  renderAssistantConsoles();
  renderPlainList(els.assistantWarnings, [
    ...(suggestion?.safetyWarnings || []),
    ...(suggestion?.legalOrAuthorizationRequirements || []),
  ]);
  renderPlainList(els.assistantUnsupported, suggestion?.unsupportedClaims, "Sin afirmaciones no respaldadas detectadas.");

  els.humanTypeSelect.value = draft.finalIncidentType || suggestion?.suggestedIncidentType || "";
  els.humanPrioritySelect.value = normalizePriority(draft.finalPriority || suggestion?.suggestedPriority);
  els.humanFollowUpAnswers.value = draft.addedInformation || "";
  els.humanReasonInput.value = draft.reason || "";
  renderHumanConsoleOptions();
  renderAssistantComparisonBox();
}

function renderFieldMetaItem(label, value) {
  const item = document.createElement("span");
  item.textContent = `${label}: ${value || "-"}`;
  return item;
}

function renderFieldWorkflow() {
  if (!els.fieldOperatorSelect) return;
  const operator = selectedFieldOperator();
  const assignment = getAssignment(fieldState, selectedFieldOperatorId);
  const act = fieldState.acts.find((item) => item.id === operator?.individualActId);
  const preview = buildActPreview(fieldState, selectedFieldOperatorId);
  const statusOrder = [
    INTERVENTION_STATES.ASSIGNED,
    INTERVENTION_STATES.ACCEPTED,
    INTERVENTION_STATES.DEPARTED,
    INTERVENTION_STATES.ARRIVED,
    INTERVENTION_STATES.INTERVENTION_STARTED,
    INTERVENTION_STATES.INTERVENTION_ACTIVE,
    INTERVENTION_STATES.WAITING_SUPPORT,
    INTERVENTION_STATES.TRANSFERRED,
    INTERVENTION_STATES.COMPLETED,
  ];
  const currentIndex = statusOrder.indexOf(assignment?.interventionStatus);

  setText(els.fieldMobileTime, new Date().toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" }));
  setText(els.fieldStatus, assignment?.interventionStatus);
  setText(els.fieldIncidentSummary, `${fieldState.incident.id} / ${fieldState.incident.summary} / ${fieldState.incident.locationSimulated}`);
  setFieldMessage(fieldMessage);

  els.fieldOperatorMeta.innerHTML = "";
  [
    ["Operador", operator?.fictitiousName],
    ["Organismo", operator?.organization],
    ["Funcion", operator?.rankOrRole],
    ["Especialidad", operator?.specialty],
    ["Consola", operator?.consoleId],
    ["Dispositivo", operator?.enrolledDeviceId],
    ["MFA", operator?.mfaVerified ? "verificado" : "pendiente"],
    ["Biometria", operator?.localBiometricVerified ? "local verificada" : "pendiente"],
  ].forEach(([label, value]) => els.fieldOperatorMeta.appendChild(renderFieldMetaItem(label, value)));

  els.fieldAssignment.innerHTML = "";
  [
    ["Incidente", assignment?.incidentId],
    ["Estado", assignment?.interventionStatus],
    ["Sesion", assignment?.sessionId],
    ["Acta", assignment?.individualActId],
    ["Asignacion", assignment?.assignedAt],
    ["Salida", assignment?.departedAt || "pendiente"],
    ["Arribo", assignment?.arrivedAt || "pendiente"],
    ["Inicio", assignment?.startedAt || "pendiente"],
  ].forEach(([label, value]) => els.fieldAssignment.appendChild(renderFieldMetaItem(label, value)));

  els.fieldStatusFlow.innerHTML = "";
  statusOrder.forEach((status, index) => {
    const item = document.createElement("span");
    item.textContent = status.replace(/_/g, " ");
    item.className = index < currentIndex ? "done" : index === currentIndex ? "current" : "";
    els.fieldStatusFlow.appendChild(item);
  });

  renderFieldEvents(operator);
  renderFieldEvidence(operator);
  renderFieldSupport();
  renderFieldAct(act, preview);
  renderFieldComparison();
  syncFieldStateToBuildWeek();
}

function renderFieldEvents(operator) {
  els.fieldEventList.innerHTML = "";
  const events = fieldState.individualEvents.filter((event) => event.operatorId === operator?.operatorId);
  const safeEvents = events.length ? events.slice().reverse() : [{
    eventId: "sin-eventos",
    category: "pendiente",
    description: "Sin acontecimientos propios registrados.",
    timestamp: "-",
    integrityReference: "-",
  }];
  safeEvents.forEach((event) => {
    const item = document.createElement("li");
    item.innerHTML = `<strong>${event.eventId} / ${event.category}</strong><br>${event.timestamp}<br>${event.description}<br><code>${event.integrityReference}</code>`;
    els.fieldEventList.appendChild(item);
  });
}

function renderFieldEvidence(operator) {
  els.fieldEvidenceList.innerHTML = "";
  const evidences = fieldState.evidences.filter((evidence) => evidence.operatorId === operator?.operatorId);
  const safeEvidence = evidences.length ? evidences.slice().reverse() : [{
    evidenceId: "sin-evidencia",
    type: "pendiente",
    description: "Sin evidencia simulada incorporada.",
    timestamp: "-",
    integrityReference: "-",
  }];
  safeEvidence.forEach((evidence) => {
    const item = document.createElement("li");
    item.innerHTML = `<strong>${evidence.evidenceId} / ${evidence.type}</strong><br>${evidence.timestamp}<br>${evidence.description}<br><code>${evidence.integrityReference}</code>`;
    els.fieldEvidenceList.appendChild(item);
  });
}

function renderFieldSupport() {
  els.fieldSupportList.innerHTML = "";
  const safeRequests = fieldState.supportRequests.length ? fieldState.supportRequests.slice().reverse() : [{
    requestId: "sin-apoyo",
    targetConsoleId: "-",
    urgency: "-",
    status: "Sin solicitudes",
    reason: "No hay solicitudes de apoyo registradas.",
  }];
  safeRequests.forEach((request) => {
    const item = document.createElement("li");
    item.innerHTML = `<strong>${request.requestId} / ${request.targetConsoleId} / ${request.urgency}</strong><br>${request.status}<br>${request.reason}`;
    els.fieldSupportList.appendChild(item);
  });
}

function renderFieldAct(act, preview) {
  setText(els.fieldActMeta, act ? `${act.status} / ${act.version}` : "Sin acta");
  els.fieldActPreview.innerHTML = "";
  if (!preview) {
    els.fieldActPreview.textContent = "Sin operador seleccionado.";
    return;
  }

  [
    ["Acta", preview.id],
    ["Operador", `${preview.operatorName} / ${preview.organization}`],
    ["Especialidad", `${preview.rankOrRole} / ${preview.specialty}`],
    ["Cronologia", preview.chronology.length ? preview.chronology.join(" | ") : "pendiente"],
    ["Acontecimientos", preview.eventIds.length ? preview.eventIds.join(", ") : "sin acontecimientos"],
    ["Evidencia", preview.evidenceReferences.length ? preview.evidenceReferences.join(", ") : "sin evidencia"],
    ["Resultado", preview.result],
    ["Seguimiento", preview.followUpRequired],
    ["Aviso", preview.disclaimer],
  ].forEach(([label, value]) => {
    const paragraph = document.createElement("p");
    paragraph.innerHTML = `<strong>${label}:</strong> ${value}`;
    els.fieldActPreview.appendChild(paragraph);
  });
}

function renderFieldComparison() {
  els.fieldComparison.innerHTML = "";
  compareInterventions(fieldState).forEach((item) => {
    const card = document.createElement("span");
    card.textContent = `${item.name} / ${item.organization} / ${item.status} / eventos ${item.eventCount} / evidencia ${item.evidenceCount} / acta ${item.actStatus}`;
    els.fieldComparison.appendChild(card);
  });
}

function renderMiniRecord(element, rows, fallback = "Pendiente") {
  if (!element) return;
  element.innerHTML = "";
  if (!rows.length) {
    const paragraph = document.createElement("p");
    paragraph.textContent = fallback;
    element.appendChild(paragraph);
    return;
  }
  rows.forEach(([label, value]) => {
    const paragraph = document.createElement("p");
    paragraph.innerHTML = `<strong>${label}:</strong> ${value || "-"}`;
    element.appendChild(paragraph);
  });
}

function setVaultMessage(message, isError = false) {
  vaultMessage = message;
  if (els.vaultMessage) {
    els.vaultMessage.className = `access-result ${isError ? "denied" : "allowed"}`;
    els.vaultMessage.innerHTML = `
      <strong>${isError ? "Control observado" : "Etapa 5.2"}</strong>
      <span>${message}</span>
    `;
  }
}

function vaultOperator(operatorId = "OP-CIBER-01") {
  return getOperatorById(operatorId) || getOperatorById("OP-MASTER-01");
}

function renderVaultBadges(items) {
  return (items && items.length ? items : ["Simulated control"])
    .map((item) => `<span>${item}</span>`)
    .join("");
}

function renderSecurityStatus() {
  if (!els.communicationSecurityStatus) return;
  const transport = evidenceVaultState.communicationStatus;
  els.communicationSecurityStatus.innerHTML = `
    <article class="transport-card ${transport.status.toLowerCase()}">
      <span>Transporte</span>
      <strong>${transport.status}</strong>
      <p>${transport.label}: ${transport.description}</p>
    </article>
    <article class="transport-card">
      <span>Finalidades autorizadas</span>
      <strong>${AUTHORIZED_ACCESS_PURPOSES.length}</strong>
      <p>${AUTHORIZED_ACCESS_PURPOSES.join(" / ")}</p>
    </article>
  `;

  els.securityControlOverview.innerHTML = "";
  evidenceVaultState.controlStatus.forEach((control) => {
    const card = document.createElement("article");
    card.innerHTML = `
      <span>${control.category}</span>
      <strong>${control.control}</strong>
      <p>${control.evidence}</p>
      <small>${control.limitation}</small>
    `;
    els.securityControlOverview.appendChild(card);
  });
}

function renderEvidenceVault() {
  if (!els.evidenceVaultList) return;
  if (!els.vaultMessage.textContent) setVaultMessage(vaultMessage);
  els.evidenceVaultList.innerHTML = "";
  evidenceVaultState.items.forEach((evidence) => {
    const selected = evidence.evidenceId === evidenceVaultState.selectedEvidenceId;
    const card = document.createElement("article");
    card.className = `vault-card ${selected ? "selected" : ""}`;
    card.innerHTML = `
      <button type="button" data-vault-action="select" data-evidence-id="${evidence.evidenceId}">
        ${selected ? "Seleccionado" : "Seleccionar"}
      </button>
      <span>${evidence.classification} / ${evidence.status}</span>
      <strong>${evidence.evidenceId}</strong>
      <p>${evidence.type} - ${evidence.fileName}</p>
      <div class="chip-grid">${renderVaultBadges(evidence.badges)}</div>
      <div class="mini-record">
        <p><strong>Consola titular:</strong> ${evidence.ownerConsoleId}</p>
        <p><strong>Cifrado:</strong> ${evidence.encryptionStatus}</p>
        <p><strong>Integridad:</strong> ${evidence.integrityStatus}</p>
        <p><strong>Hash original:</strong> ${evidence.integrityHash || "pendiente"}</p>
        <p><strong>Hash cifrado:</strong> ${evidence.encryptedHash || "pendiente"}</p>
        <p><strong>Retencion:</strong> ${evidence.retentionPolicy} / ${evidence.expirationDate || "hold"}</p>
      </div>
    `;
    els.evidenceVaultList.appendChild(card);
  });

  els.retentionPolicyList.innerHTML = "";
  Object.values(RETENTION_POLICIES).forEach((policy) => {
    const item = document.createElement("article");
    item.innerHTML = `
      <span>${policy.id}</span>
      <strong>${policy.retentionDays ? `${policy.retentionDays} dias` : "bloqueo"}</strong>
      <p>${policy.deletionRule}</p>
      <small>Revision legal: ${policy.legalReviewRequired ? "si" : "no"} / Auditoria: ${policy.auditRequired ? "si" : "no"}</small>
    `;
    els.retentionPolicyList.appendChild(item);
  });
}

function renderEvidenceAccess() {
  if (!els.evidenceAccessDecision) return;
  const lastRequest = evidenceVaultState.accessRequests[evidenceVaultState.accessRequests.length - 1];
  const lastHistory = evidenceVaultState.accessHistory[evidenceVaultState.accessHistory.length - 1];
  const decision = lastRequest?.decision;
  els.evidenceAccessDecision.className = `access-result ${decision?.allowed ? "allowed" : "denied"}`;
  els.evidenceAccessDecision.innerHTML = decision ? `
    <strong>${decision.allowed ? "Acceso permitido" : "Acceso denegado"}</strong>
    <span>${decision.reason}</span>
    <span>Campos visibles: ${formatList(decision.visibleFields)}</span>
    <span>Vencimiento: ${decision.expiresAt || "no aplica"} / Descarga: ${decision.downloadable ? "habilitada" : "bloqueada"}</span>
    <span>Marca de agua: ${decision.watermarkedViewRequired ? "requerida" : "no requerida"} / Segunda aprobacion: ${decision.requiresSecondApproval ? "si" : "no"}</span>
  ` : `
    <strong>Sin solicitud reciente</strong>
    <span>Ejecute una accion de acceso para ver la decision.</span>
  `;

  els.evidenceAccessHistory.innerHTML = "";
  const history = evidenceVaultState.accessHistory.length ? evidenceVaultState.accessHistory.slice(-10).reverse() : [lastHistory].filter(Boolean);
  if (!history.length) {
    const item = document.createElement("li");
    item.textContent = "Sin historial de acceso.";
    els.evidenceAccessHistory.appendChild(item);
    return;
  }
  history.forEach((entry) => {
    const item = document.createElement("li");
    item.innerHTML = `
      <strong>${entry.action} / ${entry.result}</strong>
      <span>${entry.timestamp} / ${entry.evidenceId}</span>
      <span>${entry.consoleId} / ${entry.operatorId} / ${entry.purpose}</span>
      <code>${entry.authorizationId || "sin autorizacion asociada"} / ${entry.reason}</code>
    `;
    els.evidenceAccessHistory.appendChild(item);
  });
}

function renderDigitalAcquisitions() {
  if (!els.digitalAcquisitionList) return;
  els.digitalAcquisitionList.innerHTML = "";
  const records = evidenceVaultState.acquisitions.length ? evidenceVaultState.acquisitions : [{
    acquisitionId: "Sin registros",
    acquisitionType: "pendiente",
    status: "Pendiente",
    authority: "Crear registro para visualizar.",
    scope: "No hay adquisicion digital registrada.",
    integrityStatus: "NOT_VERIFIED",
    limitations: ["No hay datos reales."],
  }];
  records.slice(-6).reverse().forEach((record) => {
    const card = document.createElement("article");
    card.className = "vault-card";
    card.innerHTML = `
      <span>${record.acquisitionType}</span>
      <strong>${record.acquisitionId}</strong>
      <p>${record.status} / ${record.authority}</p>
      <div class="mini-record">
        <p><strong>Alcance:</strong> ${record.scope}</p>
        <p><strong>Metodo:</strong> ${record.method || "pendiente"}</p>
        <p><strong>Items:</strong> ${formatList(record.acquiredItemIds)}</p>
        <p><strong>Integridad:</strong> ${record.integrityStatus}</p>
        <p><strong>Referencia:</strong> ${record.integrityReference || "pendiente"}</p>
      </div>
      <div class="chip-grid warning-chips">${renderPlainChipList(record.limitations || [])}</div>
    `;
    els.digitalAcquisitionList.appendChild(card);
  });

  const copy = evidenceVaultState.citizenCopies[evidenceVaultState.citizenCopies.length - 1];
  els.citizenSanitizedCopy.className = `access-result ${copy ? "allowed" : "denied"}`;
  els.citizenSanitizedCopy.innerHTML = copy ? `
    <strong>Copia ciudadana depurada</strong>
    <span>${copy.documentId} / ${copy.version} / ${copy.classification}</span>
    <span>Hash: ${copy.hash}</span>
    <span>Recibo: ${copy.deliveryReceipt.receiptId}</span>
    <span>Redacciones: ${formatList(copy.redactions)}</span>
  ` : `
    <strong>Copia ciudadana pendiente</strong>
    <span>No se entrega automaticamente material judicial restringido.</span>
  `;
}

function renderTransferHistory() {
  if (!els.evidenceTransferHistory) return;
  els.evidenceTransferHistory.innerHTML = "";
  const transfers = evidenceVaultState.transferHistory.length ? evidenceVaultState.transferHistory.slice().reverse() : [{
    transferId: "sin-transferencias",
    evidenceId: "-",
    timestamp: "-",
    purpose: "-",
    status: "Pendiente",
    origin: { operatorId: "-", consoleId: "-" },
    receiver: { operatorId: "-", consoleId: "-" },
    integrityReference: TRANSFER_NOTICE,
  }];
  transfers.forEach((transfer) => {
    const item = document.createElement("li");
    item.innerHTML = `
      <strong>${transfer.transferId} / ${transfer.status}</strong>
      <span>${transfer.timestamp} / ${transfer.evidenceId} / ${transfer.purpose}</span>
      <span>Origen: ${transfer.origin.consoleId}/${transfer.origin.operatorId} - Receptor: ${transfer.receiver.consoleId}/${transfer.receiver.operatorId}</span>
      <code>${transfer.integrityReference}</code>
    `;
    els.evidenceTransferHistory.appendChild(item);
  });
}

function renderEvidenceVaultSections() {
  syncEvidenceVaultStateToBuildWeek();
  const internalVisible = citizenState.selectedPerspective !== PERSPECTIVES.CITIZEN;
  document.querySelectorAll("[data-internal-vault]").forEach((element) => {
    element.hidden = !internalVisible;
  });
  renderSecurityStatus();
  renderEvidenceVault();
  renderEvidenceAccess();
  renderDigitalAcquisitions();
  renderTransferHistory();
}

function findingBadgeClass(type) {
  if (type === FINDING_TYPES.BLOCKING_ERROR) return "finding-badge blocking";
  if (type === FINDING_TYPES.WARNING || type === FINDING_TYPES.PENDING_INFORMATION) return "finding-badge warning";
  return "finding-badge";
}

function renderProcedureAct() {
  if (!els.procedureActSummary) return;
  const act = procedureState.procedureAct;
  if (!els.procedureMessage.textContent) {
    setProcedureMessage(procedureMessage);
  }

  renderMiniRecord(els.procedureActSummary, act ? [
    ["Acta", act.actId],
    ["Incidente", act.incidentId],
    ["Estado", act.status],
    ["Version", act.version],
    ["Operador", act.operatorId],
    ["Actas fuente", act.individualActIds.join(", ")],
    ["Integridad", act.integrityReference?.value || "pendiente"],
  ] : [], "Acta Digital de Procedimiento no generada.");

  const completeness = procedureState.completeness;
  els.procedureCompleteness.innerHTML = `
    <p><strong>Acta ${completeness.percent}% completa</strong></p>
    <div class="meter" aria-label="Completitud del acta"><span style="width: ${completeness.percent}%"></span></div>
    <p><strong>Completos:</strong> ${formatList(completeness.completed)}</p>
    <p><strong>Pendientes:</strong> ${formatList(completeness.pending)}</p>
    <p><strong>Bloqueantes:</strong> ${formatList(completeness.blockingErrors)}</p>
  `;

  els.procedureFindings.innerHTML = "";
  const findings = procedureState.findings.length ? procedureState.findings : [{
    type: "INFO",
    code: "no_check",
    message: "Control de consistencia pendiente.",
  }];
  findings.slice(0, 8).forEach((finding) => {
    const item = document.createElement("li");
    item.innerHTML = `<span class="${findingBadgeClass(finding.type)}">${finding.type}</span>${finding.message}`;
    els.procedureFindings.appendChild(item);
  });

  const aiDraft = procedureState.aiDraft;
  renderMiniRecord(els.procedureAiDraft, aiDraft ? [
    ["Aviso", aiDraft.notice],
    ["Politica fuente", aiDraft.sourcePolicy],
    ["Hechos", aiDraft.sections.hechosObservados.slice(0, 2).join(" / ")],
    ["Resultado", aiDraft.sections.resultado.slice(0, 2).join(" / ")],
    ["Limites", aiDraft.limitations.slice(0, 3).join(" / ")],
  ] : [], "Borrador asistido pendiente. El sistema puede continuar sin IA.");

  els.procedureChronology.innerHTML = "";
  procedureState.chronology.slice(0, 12).forEach((event) => {
    const item = document.createElement("li");
    item.innerHTML = `<strong>${event.eventId}</strong> ${event.timestamp} / ${event.operatorId || "sistema"} / ${event.consoleId || "sin consola"}<br>${event.summary}`;
    els.procedureChronology.appendChild(item);
  });
  if (!procedureState.chronology.length) {
    const item = document.createElement("li");
    item.textContent = "Cronologia automatica pendiente.";
    els.procedureChronology.appendChild(item);
  }

  els.procedureVersions.innerHTML = "";
  procedureState.procedureActVersions.forEach((version) => {
    const item = document.createElement("li");
    item.innerHTML = `<strong>${version.version}</strong> ${version.status} / ${version.versionId}<br>${version.reason}<br><code>${version.integrityReference?.value}</code>`;
    els.procedureVersions.appendChild(item);
  });
  if (!procedureState.procedureActVersions.length) {
    const item = document.createElement("li");
    item.textContent = "Sin versiones documentales.";
    els.procedureVersions.appendChild(item);
  }

  const master = procedureState.masterIncidentRecord;
  renderMiniRecord(els.procedureMasterRecordDetail, master ? [
    ["Expediente", master.id],
    ["Organismos", master.organizations.join(", ")],
    ["Operadores", master.operators.length],
    ["Actas", master.individualActs.join(", ")],
    ["Divergencias", master.divergenceNotice],
    ["Cierre", master.closureStatus],
  ] : [], "Expediente maestro pendiente.");

  renderMiniRecord(els.procedureSupervision, [
    ["Requiere", procedureState.supervision.required ? "si" : "no"],
    ["Estado", procedureState.supervision.status],
    ["Disparadores", formatList(procedureState.supervision.triggers)],
    ["Observaciones", procedureState.supervision.observations.length],
  ]);

  renderMiniRecord(els.procedureClosure, procedureState.closure ? [
    ["Cierre", procedureState.closure.status],
    ["Propuesto", procedureState.closure.proposedStatus || "-"],
    ["Responsable", procedureState.closure.responsible],
    ["Acta asociada", procedureState.closure.associatedAct || "-"],
    ["Errores", formatList(procedureState.closure.blockingErrors || [])],
  ] : [], "Cierre pendiente. Toda alerta requiere cierre trazable.");

  const lastExport = procedureState.exports[procedureState.exports.length - 1];
  renderMiniRecord(els.procedureExport, [
    ["Exportaciones", procedureState.exports.length],
    ["Ultimo JSON", lastExport?.exportId || "pendiente"],
    ["Hash export", lastExport?.integrityReference?.value || "pendiente"],
    ["Vista impresion", procedureState.printViewHtml ? "disponible" : "pendiente"],
  ]);

  if (els.procedurePrintView) {
    els.procedurePrintView.textContent = procedureState.printViewHtml || "Vista de impresion pendiente.";
  }
}

function ensureSelectOptions(select, options, selectedValue) {
  if (!select) return;
  const signature = options.map((option) => `${option.value}:${option.label}`).join("|");
  if (select.dataset.signature !== signature) {
    select.innerHTML = "";
    options.forEach((option) => {
      const item = document.createElement("option");
      item.value = option.value;
      item.textContent = option.label;
      select.appendChild(item);
    });
    select.dataset.signature = signature;
  }
  if (selectedValue && options.some((option) => option.value === selectedValue)) {
    select.value = selectedValue;
  }
}

function renderPlainChipList(items) {
  return (items && items.length)
    ? items.map((item) => `<span>${item}</span>`).join("")
    : "<span>Sin datos disponibles</span>";
}

function initializeCitizenControls() {
  ensureSelectOptions(
    els.perspectiveScenarioSelect,
    Object.values(CITIZEN_SCENARIOS).map((scenario) => ({ value: scenario.id, label: scenario.label })),
    citizenState.scenarioId,
  );

  const consoleOptions = [
    { value: "CON-CITIZEN", label: "Vista ciudadana" },
    ...BUILD_WEEK_STATE.operationalConsoles.map((consoleConfig) => ({
      value: consoleConfig.id,
      label: consoleConfig.name,
    })),
  ];
  ensureSelectOptions(els.perspectiveConsoleSelect, consoleOptions, citizenState.selectedConsoleId);

  ensureSelectOptions(
    els.perspectiveFieldOperatorSelect,
    fieldState.operators.map((operator) => ({
      value: operator.operatorId,
      label: `${operator.fictitiousName} / ${operator.organization}`,
    })),
    selectedFieldOperatorId,
  );

  [
    els.feedbackRapidity,
    els.feedbackClarity,
    els.feedbackTreatment,
    els.feedbackCoordination,
    els.feedbackProtection,
    els.feedbackNextSteps,
    els.feedbackOverall,
  ].forEach((select) => {
    ensureSelectOptions(select, [5, 4, 3, 2, 1].map((value) => ({ value: String(value), label: String(value) })), "4");
  });
}

function renderPerspectiveHeader(view) {
  const detail = view.detail;
  els.perspectiveHeader.innerHTML = `
    <div class="perspective-icon" aria-hidden="true">${detail.icon}</div>
    <div>
      <p class="eyebrow">Perspectiva activa</p>
      <h3>${detail.name}</h3>
      <p>${detail.role}</p>
      <p><strong>Incidente:</strong> ${view.incidentId}</p>
    </div>
    <div class="state-preserved">
      <strong>Estado preservado</strong>
      <span>Sesiones ${citizenState.perspectiveSessions.length}</span>
      <span>Resumenes ${citizenState.summaries.length}</span>
      <span>Paquetes ${citizenState.packages.length}</span>
    </div>
  `;
}

function renderPermissionCards(view) {
  const detail = view.detail;
  els.perspectivePermissionCards.innerHTML = `
    <article>
      <h3>Permisos</h3>
      <div class="chip-grid">${renderPlainChipList(detail.permissions)}</div>
    </article>
    <article>
      <h3>Informacion disponible</h3>
      <div class="chip-grid">${renderPlainChipList(detail.availableInformation)}</div>
    </article>
    <article>
      <h3>Funciones restringidas</h3>
      <div class="chip-grid warning-chips">${renderPlainChipList(detail.restrictedFunctions)}</div>
    </article>
  `;
}

function workspaceArticle(title, body) {
  const article = document.createElement("article");
  article.innerHTML = `<h3>${title}</h3>${body}`;
  return article;
}

function renderCitizenPerspectiveWorkspace(view) {
  const safeView = view.citizenSafeView;
  els.perspectiveWorkspace.appendChild(workspaceArticle(
    "Entrega automatica",
    `<ul class="compact-list">${safeView.deliverableAutomatically.map((item) => `<li><strong>${item.label}:</strong> ${item.value}</li>`).join("")}</ul>`,
  ));
  els.perspectiveWorkspace.appendChild(workspaceArticle(
    "A pedido del ciudadano",
    `<ul class="compact-list">${safeView.deliverableOnRequest.map((item) => `<li><strong>${item.label}</strong><br>${item.source}</li>`).join("")}</ul>`,
  ));
  els.perspectiveWorkspace.appendChild(workspaceArticle(
    "No visible en esta vista",
    `<ul class="compact-list">${safeView.restricted.slice(0, 6).map((item) => `<li><strong>${item.label}:</strong> ${item.genericReason}</li>`).join("")}</ul>`,
  ));
}

function renderFieldPerspectiveWorkspace(view) {
  const field = view.field;
  els.perspectiveWorkspace.appendChild(workspaceArticle(
    "Movil receptor",
    `<div class="mini-record">
      <p><strong>Operador:</strong> ${field.operator?.fictitiousName || "Sin operador"}</p>
      <p><strong>Organismo:</strong> ${field.operator?.organization || "-"}</p>
      <p><strong>Estado:</strong> ${field.assignment?.interventionStatus || "Sin asignacion"}</p>
      <p><strong>Canal operativo:</strong> disponible durante toda la intervencion</p>
    </div>`,
  ));
  els.perspectiveWorkspace.appendChild(workspaceArticle(
    "Registros propios",
    `<div class="mini-record">
      <p><strong>Acontecimientos:</strong> ${field.ownEvents.length}</p>
      <p><strong>Evidencia simulada:</strong> ${field.ownEvidence.length}</p>
      <p><strong>Actas propias:</strong> ${field.ownActs.length}</p>
    </div>`,
  ));
  els.perspectiveWorkspace.appendChild(workspaceArticle(
    "Limites",
    `<ul class="compact-list">${field.denied.map((item) => `<li>${item}</li>`).join("")}</ul>`,
  ));
}

function renderFederatedPerspectiveWorkspace(view) {
  const federated = view.federated;
  els.perspectiveWorkspace.appendChild(workspaceArticle(
    federated.consoleConfig?.name || "Consola sin asignar",
    `<div class="mini-record">
      <p><strong>Participacion:</strong> ${federated.participationStatus}</p>
      <p><strong>Incidentes asignados:</strong> ${formatList(federated.assignedIncidents)}</p>
      <p><strong>Operadores propios:</strong> ${federated.ownOperators.length}</p>
      <p><strong>Documentos propios:</strong> ${federated.ownDocuments.length}</p>
    </div>`,
  ));
  els.perspectiveWorkspace.appendChild(workspaceArticle(
    "Acciones permitidas",
    `<div class="chip-grid">${renderPlainChipList(federated.permittedInfo)}</div>`,
  ));
  els.perspectiveWorkspace.appendChild(workspaceArticle(
    "Denegaciones por finalidad",
    `<ul class="compact-list">${federated.accessDenied.map((item) => `<li>${item}</li>`).join("")}</ul>`,
  ));
}

function renderMasterPerspectiveWorkspace(view) {
  const master = view.master;
  els.perspectiveWorkspace.appendChild(workspaceArticle(
    "Mapa del incidente",
    `<div class="mini-record">
      <p><strong>ID:</strong> ${master.incidentMap.incidentId}</p>
      <p><strong>Organismos:</strong> ${formatList(master.incidentMap.organizations)}</p>
      <p><strong>Operadores:</strong> ${master.incidentMap.operators}</p>
      <p><strong>Eventos en cronologia:</strong> ${master.incidentMap.chronologyEvents}</p>
    </div>`,
  ));
  els.perspectiveWorkspace.appendChild(workspaceArticle(
    "Actas y aclaraciones",
    `<div class="mini-record">
      <p><strong>Versiones de acta:</strong> ${master.actsReadOnly.length}</p>
      <p><strong>Inconsistencias:</strong> ${master.inconsistencies.length}</p>
      <p><strong>Aclaraciones:</strong> ${master.clarificationRequests.length}</p>
      <p><strong>Cierre:</strong> ${master.closure?.status || master.closure?.result || "Pendiente"}</p>
    </div>`,
  ));
  els.perspectiveWorkspace.appendChild(workspaceArticle(
    "No permitido a la consola maestra",
    `<ul class="compact-list">${master.prohibitedActions.map((item) => `<li>${item}</li>`).join("")}</ul>`,
  ));
}

function renderPerspective() {
  if (!els.perspectiveSelect) return;
  initializeCitizenControls();
  els.perspectiveSelect.value = citizenState.selectedPerspective;
  els.perspectiveScenarioSelect.value = citizenState.scenarioId;
  els.perspectiveConsoleSelect.value = citizenState.selectedConsoleId;
  els.perspectiveFieldOperatorSelect.value = selectedFieldOperatorId;
  const view = getPerspectiveView(citizenState, citizenContext());
  renderPerspectiveHeader(view);
  renderPermissionCards(view);
  els.perspectiveWorkspace.innerHTML = "";
  if (citizenState.selectedPerspective === PERSPECTIVES.CITIZEN) renderCitizenPerspectiveWorkspace(view);
  if (citizenState.selectedPerspective === PERSPECTIVES.FIELD_OPERATOR) renderFieldPerspectiveWorkspace(view);
  if (citizenState.selectedPerspective === PERSPECTIVES.FEDERATED_CONSOLE) renderFederatedPerspectiveWorkspace(view);
  if (citizenState.selectedPerspective === PERSPECTIVES.MASTER_CONSOLE) renderMasterPerspectiveWorkspace(view);
  document.querySelectorAll("[data-perspective-target]").forEach((button) => {
    const targets = button.dataset.perspectiveTarget.split(" ");
    button.hidden = !targets.includes(citizenState.selectedPerspective);
  });
  if (!els.perspectiveMessage.textContent) setCitizenMessage(citizenMessage);
}

function renderCitizenSafeDetail(summary) {
  const safeView = summary?.safeView || buildCitizenSafeView(
    procedureState.masterIncidentRecord || BUILD_WEEK_STATE.masterIncidentRecord,
    { ...citizenContext(), state: citizenState, scenarioId: citizenState.scenarioId },
  );
  els.citizenSafeView.innerHTML = "";
  const delivered = document.createElement("p");
  delivered.innerHTML = `<strong>Entrega automatica:</strong> ${safeView.deliverableAutomatically.map((item) => item.label).join(", ")}`;
  els.citizenSafeView.appendChild(delivered);
  const requestable = document.createElement("p");
  requestable.innerHTML = `<strong>A pedido:</strong> ${safeView.deliverableOnRequest.map((item) => item.label).join(", ") || "Sin documentos habilitados"}`;
  els.citizenSafeView.appendChild(requestable);
  const restricted = document.createElement("ol");
  restricted.className = "compact-list";
  safeView.restricted.slice(0, 8).forEach((item) => {
    const line = document.createElement("li");
    line.innerHTML = `<strong>${item.label}:</strong> ${item.genericReason}`;
    restricted.appendChild(line);
  });
  els.citizenSafeView.appendChild(restricted);
}

function renderCitizenDocumentOptions(summary) {
  const scenario = CITIZEN_SCENARIOS[citizenState.scenarioId] || CITIZEN_SCENARIOS.A_ACCIDENT;
  const options = [
    ...(summary?.enabledDocuments || scenario.documents).map((document) => ({
      value: document.id,
      label: `${document.label} / habilitado`,
    })),
    ...scenario.restrictedDocuments.map((document) => ({
      value: document.id,
      label: `${document.label} / restringido`,
    })),
  ];
  ensureSelectOptions(els.citizenDocumentSelect, options, options[0]?.value);
}

function renderCitizenClosure() {
  if (!els.citizenSummary) return;
  const summary = citizenState.summaries[citizenState.summaries.length - 1];
  const citizenPackage = citizenState.packages[citizenState.packages.length - 1];
  const receipt = citizenState.receipts[citizenState.receipts.length - 1];
  const feedback = citizenState.feedback[citizenState.feedback.length - 1];
  const observation = citizenState.observations[citizenState.observations.length - 1];
  renderMiniRecord(els.citizenSummary, summary ? [
    ["Resumen", summary.id],
    ["Estado", summary.status],
    ["Estado final", summary.finalState],
    ["Organismos", summary.participatingOrganizations.join(" / ")],
    ["Aviso IA", summary.aiAssistedNotice],
    ["Integridad", summary.integrityReference?.value],
  ] : [], "Resumen ciudadano pendiente.");

  renderCitizenSafeDetail(summary);

  els.citizenNextSteps.innerHTML = "";
  const followUps = summary?.nextSteps || citizenState.followUps;
  followUps.forEach((step) => {
    const item = document.createElement("li");
    item.innerHTML = `<strong>${step.category}</strong><br>${step.label}<br>${step.responsibleOrganization || step.responsible}`;
    els.citizenNextSteps.appendChild(item);
  });
  if (!followUps.length) {
    const item = document.createElement("li");
    item.textContent = "Proximos pasos pendientes de generar.";
    els.citizenNextSteps.appendChild(item);
  }

  renderCitizenDocumentOptions(summary);
  els.citizenDocs.innerHTML = "";
  const accesses = citizenState.documentAccesses.length ? citizenState.documentAccesses : [{
    label: "Sin solicitudes",
    status: "Pendiente",
    reason: "El ciudadano puede solicitar documentos habilitados cuando exista paquete.",
  }];
  accesses.slice(-5).forEach((access) => {
    const item = document.createElement("li");
    item.innerHTML = `<strong>${access.label}</strong> / ${access.status}<br>${access.reason}`;
    els.citizenDocs.appendChild(item);
  });

  renderMiniRecord(els.citizenReceipt, receipt ? [
    ["Recibo", receipt.id],
    ["Entregado", receipt.deliveredAt],
    ["Abierto", receipt.openedAt || "pendiente"],
    ["Confirmado", receipt.acknowledgedAt || "pendiente"],
    ["Metodo", receipt.deliveryMethod],
    ["Version", receipt.documentVersion],
    ["Integridad", receipt.integrityReference?.value],
  ] : [], "Recibo pendiente.");

  renderMiniRecord(els.citizenFeedback, feedback ? [
    ["Opinion", feedback.id],
    ["Estado", feedback.status],
    ["Promedio", (Object.values(feedback.ratings).reduce((sum, value) => sum + value, 0) / Object.values(feedback.ratings).length).toFixed(1)],
    ["Dato separado", feedback.qualityDataOnly ? "si" : "no"],
    ["No modifica expediente", feedback.doesNotModifyProcedure ? "si" : "no"],
  ] : [], "Opinion de servicio pendiente.");

  renderMiniRecord(els.citizenObservation, observation ? [
    ["Observacion", observation.observationId],
    ["Estado", observation.status],
    ["Categoria", observation.category],
    ["Consola asignada", observation.assignedConsole || "pendiente"],
    ["Respuesta", observation.response || "pendiente"],
    ["Efecto", observation.effectNotice],
  ] : [], "Observacion formal pendiente.");

  els.citizenPrintView.textContent = citizenPackage?.printView || "Vista de impresion pendiente. El navegador podra guardar como PDF.";
  els.citizenJsonExport.textContent = citizenPackage?.sanitizedJsonExport
    ? JSON.stringify(citizenPackage.sanitizedJsonExport, null, 2)
    : "Exportacion ciudadana depurada pendiente.";
}

function initializeFieldWorkflowControls() {
  if (!els.fieldOperatorSelect) return;
  els.fieldOperatorSelect.innerHTML = "";
  fieldState.operators.forEach((operator) => {
    const option = document.createElement("option");
    option.value = operator.operatorId;
    option.textContent = `${operator.fictitiousName} / ${operator.organization}`;
    els.fieldOperatorSelect.appendChild(option);
  });
  els.fieldOperatorSelect.value = selectedFieldOperatorId;

  els.fieldEventCategory.innerHTML = "";
  EVENT_CATEGORIES.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    els.fieldEventCategory.appendChild(option);
  });

  els.fieldEvidenceType.innerHTML = "";
  EVIDENCE_TYPES.forEach((type) => {
    const option = document.createElement("option");
    option.value = type;
    option.textContent = type;
    els.fieldEvidenceType.appendChild(option);
  });

  els.fieldSupportConsole.innerHTML = "";
  SUPPORT_TARGETS.forEach((target) => {
    const option = document.createElement("option");
    option.value = target.consoleId;
    option.textContent = target.label;
    els.fieldSupportConsole.appendChild(option);
  });

  els.fieldEventLocation.value = fieldState.incident.locationSimulated;
  els.fieldEventDescription.value = "Se observa situacion simulada vinculada al accidente vial multidisciplinario.";
  els.fieldEvidenceDescription.value = "Elemento ficticio incorporado para documentar la intervencion.";
  els.fieldSupportReason.value = "Se requiere apoyo por lesion, derrame y ordenamiento del corredor vial.";
}

function applyFieldResult(result, successMessage) {
  if (!result?.ok) {
    setFieldMessage(result?.error || "Accion de campo no permitida.", true);
    renderFieldWorkflow();
    return false;
  }
  appendFieldLedger(result);
  setFieldMessage(successMessage || "Accion registrada en bitacora.");
  render();
  return true;
}

function transitionSelectedFieldOperator(nextStatus) {
  const result = transitionFieldOperator(fieldState, selectedFieldOperatorId, nextStatus, els.fieldActionReason.value);
  return applyFieldResult(result, `Estado actualizado a ${nextStatus}.`);
}

function registerSelectedFieldEvent() {
  const result = createIndividualEvent(fieldState, selectedFieldOperatorId, {
    category: els.fieldEventCategory.value,
    description: els.fieldEventDescription.value,
    classification: els.fieldEventClassification.value,
    locationSimulated: els.fieldEventLocation.value,
  });
  if (applyFieldResult(result, "Acontecimiento propio registrado.")) {
    els.fieldEventDescription.value = "";
  }
}

function correctLastSelectedFieldEvent() {
  const ownEvents = fieldState.individualEvents.filter((event) => event.operatorId === selectedFieldOperatorId);
  const lastOwnEvent = ownEvents[ownEvents.length - 1];
  const result = lastOwnEvent
    ? createEventCorrection(fieldState, selectedFieldOperatorId, lastOwnEvent.eventId, "aclaracion", els.fieldActionReason.value || "Aclaracion de demo sobre el ultimo acontecimiento propio.")
    : { ok: false, error: "No hay acontecimiento propio para aclarar." };
  applyFieldResult(result, "Aclaracion agregada sin alterar el acontecimiento original.");
}

function addSelectedFieldEvidence() {
  const result = createSimulatedEvidence(fieldState, selectedFieldOperatorId, {
    type: els.fieldEvidenceType.value,
    description: els.fieldEvidenceDescription.value,
    classification: els.fieldEvidenceClassification.value,
  });
  if (applyFieldResult(result, "Evidencia simulada incorporada.")) {
    els.fieldEvidenceDescription.value = "";
  }
}

function requestSelectedFieldSupport() {
  const result = createSupportRequest(fieldState, selectedFieldOperatorId, {
    targetConsoleId: els.fieldSupportConsole.value,
    urgency: els.fieldSupportUrgency.value,
    reason: els.fieldSupportReason.value,
    classification: els.fieldSupportUrgency.value === "RED" ? "SENSITIVE" : "OPERATIONAL",
  });
  applyFieldResult(result, "Solicitud de apoyo registrada.");
}

function acceptPendingFieldSupport() {
  const operator = selectedFieldOperator();
  const pending = fieldState.supportRequests.find((request) => request.status === "PENDING" && request.targetConsoleId === operator?.consoleId);
  const result = pending
    ? acceptSupportRequest(fieldState, pending.requestId, selectedFieldOperatorId)
    : { ok: false, error: "No hay solicitud pendiente para la consola del operador seleccionado." };
  applyFieldResult(result, "Apoyo aceptado por consola destinataria.");
}

function createSelectedFieldAct() {
  applyFieldResult(createIndividualAct(fieldState, selectedFieldOperatorId), "Acta individual creada o recuperada.");
}

function reviewSelectedFieldAct() {
  applyFieldResult(reviewIndividualAct(fieldState, selectedFieldOperatorId), "Borrador de acta revisado por el operador autor.");
}

function finalizeSelectedFieldAct() {
  applyFieldResult(finalizeIndividualAct(fieldState, selectedFieldOperatorId), "Acta individual finalizada y bloqueada.");
}

function amendSelectedFieldAct() {
  const operator = selectedFieldOperator();
  const actId = operator?.individualActId;
  const result = actId
    ? amendIndividualAct(fieldState, selectedFieldOperatorId, actId, els.fieldActionReason.value || "Ampliacion documental posterior.", els.fieldEventDescription.value)
    : { ok: false, error: "No hay acta asociada al operador." };
  applyFieldResult(result, "Version documental agregada sin alterar el acta original.");
}

function requestFieldClarificationBetweenOperators() {
  const finalizedActs = fieldState.acts.filter((act) => act.locked);
  const sourceAct = finalizedActs.find((act) => act.ownerOperatorId !== selectedFieldOperatorId) || finalizedActs[0];
  const result = sourceAct
    ? createClarificationRequest(fieldState, selectedFieldOperatorId, sourceAct.id, sourceAct.ownerOperatorId, els.fieldActionReason.value || "Solicitar ampliacion sin modificar el acta fuente.")
    : { ok: false, error: "No hay acta finalizada para solicitar aclaracion." };
  applyFieldResult(result, "Solicitud de aclaracion registrada sin alterar acta fuente.");
}

function runFieldDemoSequence() {
  if (fieldState.demoCompleted) {
    setFieldMessage("La demo multidisciplinaria ya fue ejecutada.");
    render();
    return;
  }

  const steps = [];
  function runStep(result) {
    if (result?.ok) {
      appendFieldLedger(result);
      steps.push(result);
    }
    return result;
  }

  function progressOperator(operatorId, eventDescription, evidenceType, evidenceDescription) {
    selectedFieldOperatorId = operatorId;
    [
      INTERVENTION_STATES.ACCEPTED,
      INTERVENTION_STATES.DEPARTED,
      INTERVENTION_STATES.ARRIVED,
      INTERVENTION_STATES.INTERVENTION_STARTED,
    ].forEach((status) => runStep(transitionFieldOperator(fieldState, operatorId, status, "Recorrido demo multidisciplinario.")));
    runStep(createIndividualEvent(fieldState, operatorId, {
      category: "hecho observado",
      description: eventDescription,
      classification: "SENSITIVE",
      locationSimulated: fieldState.incident.locationSimulated,
    }));
    runStep(createSimulatedEvidence(fieldState, operatorId, {
      type: evidenceType,
      description: evidenceDescription,
      classification: "SENSITIVE",
    }));
  }

  progressOperator("OP-FIELD-911-A", "Se observa siniestro vial con persona lesionada y derrame sobre calzada.", "fotografia", "Foto simulada panoramica del punto de intervencion.");
  runStep(createSupportRequest(fieldState, "OP-FIELD-911-A", {
    targetConsoleId: "CON-107",
    urgency: "RED",
    reason: "Persona lesionada requiere triage y eventual traslado.",
    classification: "SENSITIVE",
  }));
  runStep(createSupportRequest(fieldState, "OP-FIELD-911-A", {
    targetConsoleId: "CON-TRANSITO",
    urgency: "YELLOW",
    reason: "Se requiere corte preventivo y corredor sanitario.",
    classification: "OPERATIONAL",
  }));
  runStep(createSupportRequest(fieldState, "OP-FIELD-911-A", {
    targetConsoleId: "CON-BOMBEROS",
    urgency: "YELLOW",
    reason: "Derrame con posible riesgo de incendio.",
    classification: "OPERATIONAL",
  }));

  progressOperator("OP-FIELD-107-A", "Equipo sanitario realiza triage inicial y reporta persona consciente.", "constancia", "Constancia sanitaria ficticia de triage inicial.");
  progressOperator("OP-FIELD-TRAFFIC-A", "Transito dispone corte y ordena corredor preventivo.", "ubicacion", "Ubicacion simulada del corte preventivo.");
  progressOperator("OP-FIELD-FIRE-A", "Bomberos verifica derrame y ausencia de llama visible en la escena.", "informe externo", "Informe tecnico ficticio de derrame.");

  fieldState.supportRequests.filter((request) => request.status === "PENDING").forEach((request) => {
    const acceptingOperator = fieldState.operators.find((operator) => operator.consoleId === request.targetConsoleId);
    if (acceptingOperator) runStep(acceptSupportRequest(fieldState, request.requestId, acceptingOperator.operatorId));
  });

  ["OP-FIELD-911-A", "OP-FIELD-107-A", "OP-FIELD-TRAFFIC-A", "OP-FIELD-FIRE-A"].forEach((operatorId) => {
    const assignment = getAssignment(fieldState, operatorId);
    if (assignment.interventionStatus === INTERVENTION_STATES.WAITING_SUPPORT) {
      runStep(transitionFieldOperator(fieldState, operatorId, INTERVENTION_STATES.INTERVENTION_ACTIVE, "Apoyo aceptado; intervencion continua."));
    }
    if (assignment.interventionStatus === INTERVENTION_STATES.INTERVENTION_STARTED) {
      runStep(transitionFieldOperator(fieldState, operatorId, INTERVENTION_STATES.INTERVENTION_ACTIVE, "Intervencion activa en demo."));
    }
    runStep(createIndividualEvent(fieldState, operatorId, {
      category: "actuacion realizada",
      description: "Se deja cierre operativo individual de la participacion simulada.",
      classification: "SENSITIVE",
      locationSimulated: fieldState.incident.locationSimulated,
    }));
    runStep(transitionFieldOperator(fieldState, operatorId, INTERVENTION_STATES.COMPLETED, "Intervencion completada en demo."));
    runStep(createIndividualAct(fieldState, operatorId));
    runStep(reviewIndividualAct(fieldState, operatorId));
    runStep(finalizeIndividualAct(fieldState, operatorId));
  });

  const healthAct = fieldState.acts.find((act) => act.ownerOperatorId === "OP-FIELD-107-A");
  if (healthAct) {
    runStep(createClarificationRequest(
      fieldState,
      "OP-FIELD-911-A",
      healthAct.id,
      "OP-FIELD-107-A",
      "Aclarar horario de triage sin modificar el acta sanitaria original.",
    ));
  }

  selectedFieldOperatorId = "OP-FIELD-911-A";
  els.fieldOperatorSelect.value = selectedFieldOperatorId;
  fieldState.demoCompleted = true;
  setFieldMessage(`Demo multidisciplinaria ejecutada: ${steps.length} eventos operativos agregados.`);
  render();
}

function handleFieldAction(action) {
  if (action === "accept") transitionSelectedFieldOperator(INTERVENTION_STATES.ACCEPTED);
  if (action === "reject") transitionSelectedFieldOperator(INTERVENTION_STATES.CANCELLED_WITH_REASON);
  if (action === "depart") transitionSelectedFieldOperator(INTERVENTION_STATES.DEPARTED);
  if (action === "arrive") transitionSelectedFieldOperator(INTERVENTION_STATES.ARRIVED);
  if (action === "start") transitionSelectedFieldOperator(INTERVENTION_STATES.INTERVENTION_STARTED);
  if (action === "active") transitionSelectedFieldOperator(INTERVENTION_STATES.INTERVENTION_ACTIVE);
  if (action === "complete") transitionSelectedFieldOperator(INTERVENTION_STATES.COMPLETED);
  if (action === "add-event") registerSelectedFieldEvent();
  if (action === "correct-event") correctLastSelectedFieldEvent();
  if (action === "add-evidence") addSelectedFieldEvidence();
  if (action === "request-support") requestSelectedFieldSupport();
  if (action === "accept-support") acceptPendingFieldSupport();
  if (action === "create-act") createSelectedFieldAct();
  if (action === "review-act") reviewSelectedFieldAct();
  if (action === "finalize-act") finalizeSelectedFieldAct();
  if (action === "amend-act") amendSelectedFieldAct();
  if (action === "clarify-act") requestFieldClarificationBetweenOperators();
  if (action === "demo") runFieldDemoSequence();
}

function ensureFieldDemoForProcedure() {
  const finalizedActs = fieldState.acts.filter((act) => act.status === "FINALIZED").length;
  if (finalizedActs < 4) {
    runFieldDemoSequence();
  }
}

function applyProcedureResult(result, successMessage) {
  if (!result?.ok) {
    setProcedureMessage(result?.error || "Accion documental no permitida.", true);
    renderProcedureAct();
    return false;
  }
  appendProcedureLedger(result);
  syncProcedureStateToBuildWeek();
  setProcedureMessage(successMessage || procedureState.lastMessage || "Accion documental registrada.");
  render();
  return true;
}

function runProcedureCreate() {
  ensureFieldDemoForProcedure();
  return applyProcedureResult(
    createProcedureAct(procedureState, procedureContext()),
    "Acta Digital de Procedimiento creada desde actas individuales y bitacora.",
  );
}

function runProcedureDemo() {
  ensureFieldDemoForProcedure();
  if (procedureState.procedureAct?.locked && procedureState.closure?.closedAt) {
    setProcedureMessage("La demo Etapa 5 ya fue ejecutada.");
    renderProcedureAct();
    return;
  }
  const demo = runProcedureDemoSequence(procedureState, procedureContext());
  demo.results.forEach(appendProcedureLedger);
  syncProcedureStateToBuildWeek();
  setProcedureMessage(demo.ok
    ? "Demo Etapa 5 completada: acta, consistencia, hash, expediente y cierre trazable."
    : "Demo Etapa 5 ejecuto pasos, revisar avisos pendientes.", !demo.ok);
  render();
}

function runProcedureAction(action) {
  if (action === "create") {
    runProcedureCreate();
    return;
  }
  if (!procedureState.procedureAct && action !== "demo") {
    setProcedureMessage("Primero debe generarse el Acta Digital de Procedimiento.", true);
    renderProcedureAct();
    return;
  }

  if (action === "ai-draft") applyProcedureResult(generateAiDraft(procedureState), "Borrador asistido generado con fuentes trazables.");
  if (action === "review") applyProcedureResult(completeOperatorReview(procedureState), "Revision humana del operador registrada.");
  if (action === "clarify") {
    registerDemoTimeInconsistency(procedureState);
    applyProcedureResult(requestClarification(procedureState, {
      sourceActId: "ACT-FIELD-107-A",
      recipientOperatorId: "OP-FIELD-107-A",
      reason: "Aclarar horario de triage por diferencia simulada.",
    }), "Solicitud de aclaracion agregada sin modificar la fuente.");
  }
  if (action === "answer-clarification") {
    const pending = procedureState.clarificationRequests.find((request) => request.status !== "RESPONDED");
    applyProcedureResult(pending
      ? respondClarification(procedureState, pending.id, "Respuesta por anexo: se conserva el registro original y se aclara el horario.")
      : { ok: false, error: "No hay aclaraciones pendientes." }, "Aclaracion respondida por anexo.");
  }
  if (action === "supervisor") {
    const requested = requestSupervisorReview(procedureState);
    if (requested.ok) appendProcedureLedger(requested);
    const validated = validateSupervisor(procedureState);
    applyProcedureResult(validated, "Supervisor valido recepcion documental sin modificar relato.");
  }
  if (action === "submit") applyProcedureResult(submitProcedureAct(procedureState), "Acta presentada para control final.");
  if (action === "finalize") applyProcedureResult(finalizeProcedureAct(procedureState), "Acta finalizada y bloqueada con referencia de integridad.");
  if (action === "amend") applyProcedureResult(amendProcedureAct(procedureState), "Ampliacion versionada sin sobrescribir el final.");
  if (action === "rectify") applyProcedureResult(rectifyProcedureAct(procedureState), "Rectificacion versionada sin borrar el documento original.");
  if (action === "master-record") applyProcedureResult(buildMasterIncidentRecord(procedureState), "Expediente maestro generado como indice y sintesis.");
  if (action === "propose-closure") {
    const result = proposeClosure(procedureState, CLOSURE_STATUSES.CLOSED_WITH_PROCEDURE_ACT);
    const isBlocked = result.ok && result.closure?.status === "BLOCKED";
    applyProcedureResult(result, isBlocked ? "Cierre bloqueado por requisitos pendientes." : "Cierre propuesto por operador.");
  }
  if (action === "close") applyProcedureResult(finalizeClosure(procedureState), "Incidente cerrado con trazabilidad documental.");
  if (action === "export") applyProcedureResult(exportProcedureJson(procedureState), "Exportacion JSON generada con referencia de integridad.");
  if (action === "print") {
    procedureState.printViewHtml = procedureState.procedureAct
      ? window.PIPOProcedureAct.buildPrintView(procedureState.procedureAct, procedureState)
      : "";
    setProcedureMessage("Vista de impresion actualizada. El navegador permite guardar como PDF.");
    renderProcedureAct();
  }
  if (action === "demo") runProcedureDemo();
}

function ensureProcedureReadyForCitizenClosure() {
  ensureFieldDemoForProcedure();
  if (!procedureState.procedureAct?.locked || !procedureState.closure?.closedAt) {
    runProcedureDemo();
  }
  syncProcedureStateToBuildWeek();
}

function applyCitizenResult(result, successMessage) {
  if (!result?.ok) {
    setCitizenMessage(result?.error || "Accion ciudadana no permitida.", true);
    renderPerspective();
    renderCitizenClosure();
    return false;
  }
  if (result.results) {
    result.results.forEach(appendCitizenLedger);
  } else {
    appendCitizenLedger(result);
  }
  syncCitizenStateToBuildWeek();
  setCitizenMessage(successMessage || citizenState.lastMessage || "Accion ciudadana registrada.");
  render();
  return true;
}

function citizenFeedbackInput() {
  return {
    rapidity: els.feedbackRapidity.value,
    clarity: els.feedbackClarity.value,
    treatment: els.feedbackTreatment.value,
    coordination: els.feedbackCoordination.value,
    protectionFeeling: els.feedbackProtection.value,
    nextStepUnderstanding: els.feedbackNextSteps.value,
    overallSatisfaction: els.feedbackOverall.value,
    optionalComment: els.feedbackComment.value,
  };
}

function runCitizenDemo() {
  ensureProcedureReadyForCitizenClosure();
  const demo = runCitizenClosureDemoSequence(citizenState, citizenContext());
  applyCitizenResult(demo, demo.ok
    ? "Demo Etapa 5.1 completada: perspectivas, resumen, paquete, recibo, opinion y observacion."
    : "Demo Etapa 5.1 ejecuto pasos; revisar avisos pendientes.");
}

function runCitizenAction(action) {
  if (action === "reset-demo") {
    citizenState = createCitizenClosureState(BUILD_WEEK_STATE, fieldState, procedureState, getLedgerEvents());
    citizenMessage = "Datos de Etapa 5.1 reiniciados en memoria de la demo.";
    setCitizenMessage(citizenMessage);
    syncCitizenStateToBuildWeek();
    render();
    return;
  }

  if (action === "toggle-ai") {
    const result = setCitizenAiAvailability(citizenState, !citizenState.aiAvailable);
    applyCitizenResult({ ok: result.ok }, citizenState.lastMessage);
    return;
  }

  if (action === "demo-5-1") {
    runCitizenDemo();
    return;
  }

  if (["generate-summary", "review-summary", "package", "deliver"].includes(action)) {
    ensureProcedureReadyForCitizenClosure();
  }

  if (action === "generate-summary") {
    if (!citizenState.followUps.length) appendCitizenLedger(generateCitizenNextSteps(citizenState, citizenContext()));
    applyCitizenResult(generateCitizenClosureSummary(citizenState, citizenContext()), "Resumen ciudadano generado con vista segura.");
  }
  if (action === "review-summary") applyCitizenResult(reviewCitizenClosureSummary(citizenState), "Resumen ciudadano revisado institucionalmente.");
  if (action === "package") applyCitizenResult(createCitizenIncidentPackage(citizenState), "Paquete ciudadano preparado para impresion, PDF navegador y JSON depurado.");
  if (action === "deliver") applyCitizenResult(deliverCitizenPackage(citizenState), "Entrega ciudadana registrada con recibo.");
  if (action === "open") applyCitizenResult(openCitizenPackage(citizenState), "Apertura ciudadana registrada.");
  if (action === "ack") applyCitizenResult(confirmCitizenReceipt(citizenState), "Confirmacion de recepcion registrada.");
  if (action === "request-access") {
    applyCitizenResult(
      requestCitizenDocumentAccess(citizenState, els.citizenDocumentSelect.value),
      "Solicitud de documento procesada con minimizacion.",
    );
  }
  if (action === "download-doc") applyCitizenResult(downloadCitizenDocument(citizenState), "Descarga simulada registrada.");
  if (action === "feedback") applyCitizenResult(submitCitizenServiceFeedback(citizenState, citizenFeedbackInput()), "Opinion de servicio guardada como dato de calidad separado.");
  if (action === "observation") {
    applyCitizenResult(createCitizenFormalObservation(citizenState, {
      category: els.observationCategory.value,
      description: els.observationDescription.value,
      referencedActIds: procedureState.procedureAct ? [procedureState.procedureAct.actId] : [],
      referencedEventIds: procedureState.chronology.slice(0, 2).map((event) => event.eventId),
    }), "Observacion formal creada sin alterar registros previos.");
  }
  if (action === "assign-observation") {
    const observation = citizenState.observations[citizenState.observations.length - 1];
    applyCitizenResult(assignCitizenObservation(citizenState, observation?.observationId, citizenState.selectedConsoleId || "CON-MASTER"), "Observacion asignada a consola competente.");
  }
  if (action === "review-observation") {
    const observation = citizenState.observations[citizenState.observations.length - 1];
    applyCitizenResult(reviewCitizenObservation(citizenState, observation?.observationId), "Observacion bajo revision.");
  }
  if (action === "clarify-observation") {
    const observation = citizenState.observations[citizenState.observations.length - 1];
    applyCitizenResult(requestCitizenClarification(citizenState, observation?.observationId), "Aclaracion solicitada al ciudadano.");
  }
  if (action === "respond-observation") {
    const observation = citizenState.observations[citizenState.observations.length - 1];
    applyCitizenResult(respondCitizenObservation(citizenState, observation?.observationId), "Observacion respondida y expediente original preservado.");
  }
  if (action === "followup-required") {
    applyCitizenResult(markCitizenFollowUpRequired(citizenState, NEXT_STEP_CATEGORIES.FOLLOW_UP_REQUIRED), "Seguimiento adicional requerido.");
  }
  if (action === "followup-complete") {
    const followUp = citizenState.followUps[citizenState.followUps.length - 1];
    applyCitizenResult(completeCitizenFollowUp(citizenState, followUp?.id), "Seguimiento ciudadano completado.");
  }
}

function selectedVaultContext(evidence) {
  const restricted = evidence?.classification === "RESTRICTED_JUDICIAL";
  const operator = restricted ? vaultOperator("OP-CIBER-01") : vaultOperator("OP-911-01");
  return {
    operator,
    purpose: restricted ? "CYBERCRIME_ANALYSIS" : "OPERATIONAL_RESPONSE",
    secondApprovalVerified: true,
    supervisionActive: true,
  };
}

async function runVaultAction(action, button) {
  const selectedId = button?.dataset?.evidenceId || evidenceVaultState.selectedEvidenceId;
  const evidence = findEvidence(evidenceVaultState, selectedId);

  try {
    if (action === "select") {
      evidenceVaultState.selectedEvidenceId = selectedId;
      setVaultMessage(`${selectedId} seleccionado.`);
      render();
      return;
    }

    if (action === "demo") {
      await runEvidenceVaultDemoSequence(evidenceVaultState);
      setVaultMessage("Demo 5.2 ejecutada: cifrado, acceso, descarga bloqueada, retencion, adquisicion, transferencia y copia depurada.");
    }

    if (action === "encrypt") {
      const actor = selectedVaultContext(evidence).operator;
      const result = await encryptEvidenceContent(evidenceVaultState, selectedId, `fictitious-content-${selectedId}`, actor);
      setVaultMessage(result.ok ? `${selectedId} cifrado con hash original y hash cifrado.` : "No se pudo cifrar el elemento.", !result.ok);
    }

    if (action === "decrypt") {
      const result = await decryptEvidenceContent(evidenceVaultState, selectedId, selectedVaultContext(evidence));
      setVaultMessage(result.ok ? `${selectedId} descifrado solo para vista autorizada.` : `Acceso bloqueado: ${result.errorCode}.`, !result.ok);
    }

    if (action === "verify") {
      const actor = selectedVaultContext(evidence).operator;
      const result = await verifyEvidenceIntegrity(evidenceVaultState, selectedId, `fictitious-content-${selectedId}`, actor);
      setVaultMessage(`${selectedId}: ${result.integrityStatus}.`, !result.ok);
    }

    if (action === "tamper") {
      const actor = selectedVaultContext(evidence).operator;
      const result = await verifyEvidenceIntegrity(evidenceVaultState, selectedId, `altered-fictitious-content-${selectedId}`, actor);
      setVaultMessage(`${selectedId}: alteracion simulada detectada como ${result.integrityStatus}.`, !result.ok);
    }

    if (action === "request-access") {
      const result = createAccessRequest(evidenceVaultState, selectedId, selectedVaultContext(evidence));
      setVaultMessage(`Solicitud ${result.request.requestId}: ${result.request.status}.`, !result.decision.allowed);
    }

    if (action === "download") {
      const result = requestEvidenceDownload(evidenceVaultState, selectedId, selectedVaultContext(evidence));
      setVaultMessage(`Descarga ${result.result}.`, result.result !== "ALLOWED");
    }

    if (action === "grant") {
      const grant = grantTemporaryEvidenceAccess(evidenceVaultState, selectedId, {
        destinationConsoleId: "CON-107",
        purpose: "MEDICAL_ASSISTANCE",
        fieldsAllowed: ["evidenceId", "type", "createdAt", "classification", "integrityHash"],
        downloadAllowed: false,
      });
      setVaultMessage(`${grant.id} creado para CON-107 con descarga bloqueada.`);
    }

    if (action === "expire-grant") {
      const grant = evidenceVaultState.sharingGrants[evidenceVaultState.sharingGrants.length - 1];
      const result = expireEvidenceGrant(evidenceVaultState, grant?.id);
      setVaultMessage(result.ok ? `${grant.id} vencido y denegado hacia adelante.` : "No hay permiso para vencer.", !result.ok);
    }

    if (action === "revoke-grant") {
      const grant = evidenceVaultState.sharingGrants[evidenceVaultState.sharingGrants.length - 1];
      const result = revokeEvidenceAccess(evidenceVaultState, grant?.id, "Revocacion por supervision de demo.");
      setVaultMessage(result.ok ? `${grant.id} revocado.` : "No hay permiso para revocar.", !result.ok);
    }

    if (action === "hold") {
      const result = placeRetentionHold(evidenceVaultState, selectedId);
      setVaultMessage(result.ok ? `${selectedId} colocado en retention hold.` : "No se pudo aplicar retencion.", !result.ok);
    }

    if (action === "schedule-delete") {
      const result = scheduleEvidenceDeletion(evidenceVaultState, selectedId);
      setVaultMessage(result.ok ? `${selectedId}: ${DELETION_NOTICE}` : "No se pudo programar eliminacion.", !result.ok);
    }

    if (action === "simulate-delete") {
      const result = simulateEvidenceDeletion(evidenceVaultState, selectedId);
      setVaultMessage(result.ok ? `${selectedId}: ${result.notice}` : "No se pudo simular eliminacion.", !result.ok);
    }

    if (action === "create-acquisition") {
      const record = await createDigitalAcquisitionRecord(evidenceVaultState, {
        acquisitionType: ACQUISITION_TYPES.GUIDED_PRESERVATION,
        authority: "Equipo ciber institucional simulado",
        authorizationId: "PRESERVE-SIM-UI",
        scope: "Preservacion guiada de evidencia ficticia seleccionada.",
        acquiredItemIds: [selectedId],
      });
      setVaultMessage(`${record.acquisitionId} creado en estado ${record.status}.`);
    }

    if (action === "authorize-acquisition") {
      const record = evidenceVaultState.acquisitions[evidenceVaultState.acquisitions.length - 1];
      const result = authorizeDigitalAcquisition(evidenceVaultState, record?.acquisitionId, {
        authority: "Fiscalia simulada",
        authorizationId: "AUTH-SIM-UI",
        scope: "Alcance acotado a elementos ficticios ya registrados.",
      });
      setVaultMessage(result.ok ? `${record.acquisitionId} autorizado conceptualmente.` : "No hay registro para autorizar.", !result.ok);
    }

    if (action === "complete-acquisition") {
      const record = evidenceVaultState.acquisitions[evidenceVaultState.acquisitions.length - 1];
      const result = completeDigitalAcquisition(evidenceVaultState, record?.acquisitionId, {
        originalHash: evidence?.integrityHash || "demo-sha256-original-reference",
        copyHash: evidence?.integrityHash || "demo-sha256-original-reference",
      });
      setVaultMessage(result.ok ? `${record.acquisitionId} completado.` : "No hay registro listo para completar.", !result.ok);
    }

    if (action === "transfer") {
      const transfer = await createTransferRecord(evidenceVaultState, {
        evidenceId: selectedId,
        purpose: "JUDICIAL_REVIEW",
        receiver: { operatorId: "OP-COM-01", consoleId: "CON-COMISARIA" },
      });
      setVaultMessage(`${transfer.transferId} registrado. ${TRANSFER_NOTICE}`);
    }

    if (action === "citizen-copy") {
      const result = await buildCitizenSanitizedEvidenceCopy(evidenceVaultState, selectedId);
      setVaultMessage(result.ok ? `${result.copy.documentId} creado para entrega depurada.` : result.reason, !result.ok);
    }
  } catch (error) {
    setVaultMessage(`Operacion observada: ${error.code || "vault_action_failed"}.`, true);
  }
  render();
}

function renderComparison() {
  const ai = BUILD_WEEK_STATE.aiSuggestion;
  const human = BUILD_WEEK_STATE.humanDecision;
  const aiConsoles = ai.suggestedConsoles?.map((item) => item.consoleName) || ai.competentAgencies || [];
  const humanConsoles = normalizeConsoleList(human.finalConsoles).map((item) => item.consoleName);
  els.aiPriority.textContent = ai.suggestedPriority;
  els.aiRouting.textContent = formatList(aiConsoles);
  els.humanPriority.textContent = human.finalPriority;
  els.humanRouting.textContent = human.finalRouting || formatList(humanConsoles);
  els.humanReason.textContent = `Motivo humano: ${human.reason}`;
}

function renderSnapshot() {
  const snapshot = getBuildWeekSnapshot();
  const ledgerEvents = getLedgerEvents();
  els.snapshot.textContent = JSON.stringify({
    incident: snapshot.incident,
    routing: snapshot.routing,
    counts: {
      events: snapshot.events.length,
      ledgerEvents: ledgerEvents.length,
      operationalConsoles: snapshot.operationalConsoles.length,
      participants: snapshot.incidentParticipants.length,
      individualActs: snapshot.individualInterventionActs.length,
      procedureVersions: snapshot.procedureActWorkflow?.procedureActVersions?.length || 0,
      citizenSummaries: snapshot.citizenClosureSummaries.length,
      citizenPackages: snapshot.citizenIncidentPackages.length,
      citizenObservations: snapshot.citizenFormalObservations.length,
      evidenceVaultItems: snapshot.evidenceVaultItems.length,
      evidenceAccessHistory: snapshot.evidenceAccessHistory.length,
      acquisitionRecords: snapshot.digitalAcquisitionRecords.length,
      transferRecords: snapshot.evidenceTransferHistory.length,
    },
    latestProcedure: {
      actId: snapshot.procedureActWorkflow?.procedureAct?.actId || null,
      closure: snapshot.procedureActWorkflow?.closure || snapshot.closure,
      masterRecordId: snapshot.procedureActWorkflow?.masterIncidentRecord?.id || snapshot.masterIncidentRecord?.id,
    },
    latestCitizenClosure: {
      perspective: snapshot.demoPerspectiveSessions.slice(-1)[0],
      summary: snapshot.citizenClosureSummaries.slice(-1)[0],
      package: snapshot.citizenIncidentPackages.slice(-1)[0],
      receipt: snapshot.citizenDeliveryReceipts.slice(-1)[0],
      feedback: snapshot.citizenServiceFeedback.slice(-1)[0],
      observation: snapshot.citizenFormalObservations.slice(-1)[0],
    },
    evidenceProtection: {
      transport: snapshot.communicationSecurityStatuses[0],
      latestEvidence: snapshot.evidenceVaultItems[0],
      latestAccess: snapshot.evidenceAccessHistory.slice(-1)[0],
      latestAcquisition: snapshot.digitalAcquisitionRecords.slice(-1)[0],
      latestCitizenCopy: snapshot.citizenSanitizedEvidenceCopies.slice(-1)[0],
    },
    operationalLedgerTail: ledgerEvents.slice(-12),
  }, null, 2);
}

async function refreshBackendStatus() {
  try {
    assistantState.backendStatus = await getBackendStatus();
  } catch (error) {
    assistantState.backendStatus = {
      available: false,
      model: "servidor no detectado",
      contractVersion: "no disponible",
      warning: "Secure backend unavailable from this static view.",
    };
  }
  renderBackendControls();
}

function normalizeSuggestionAliases(suggestion) {
  return {
    ...suggestion,
    id: suggestion.id || suggestion.suggestionId,
    summary: suggestion.summary || suggestion.neutralSummary,
    suggestedType: suggestion.suggestedType || suggestion.suggestedIncidentType,
    riskFactors: suggestion.riskFactors || suggestion.detectedRiskFactors,
    availableInfo: suggestion.availableInfo || suggestion.availableInformation,
    missingInfo: suggestion.missingInfo || suggestion.missingCriticalInformation,
    suggestedQuestions: suggestion.suggestedQuestions || suggestion.followUpQuestions,
    competentAgencies: suggestion.competentAgencies || (suggestion.suggestedConsoles || []).map((item) => item.consoleName),
    confidence: suggestion.confidence || suggestion.confidenceLevel,
    explanation: suggestion.explanation || suggestion.reasoningSummary,
  };
}

function storeAssistantSuggestion(suggestion) {
  const normalized = normalizeSuggestionAliases(suggestion);
  assistantState.requestId = normalized.requestId || normalized.serverAudit?.requestId || null;
  assistantState.analysisVersion = normalized.analysisVersion || normalized.version || "sin version";
  assistantState.activeMode = normalized.mode || selectedAssistantMode;
  BUILD_WEEK_STATE.aiSuggestion = normalized;
  BUILD_WEEK_STATE.aiSuggestions.push(normalized);
  stateByModel.aiSuggestion = normalized;
  assistantState.suggestion = normalized;
  assistantState.humanDraft = createHumanDecisionDraft(normalized, getOperatorById("OP-MASTER-01"));
  assistantState.comparison = compareSuggestionWithHumanDecision(normalized, assistantState.humanDraft);
  BUILD_WEEK_STATE.assistantRuns.push({
    suggestionId: normalized.suggestionId,
    mode: normalized.mode,
    generatedAt: normalized.generatedAt,
    requestId: assistantState.requestId,
    analysisVersion: assistantState.analysisVersion,
    status: "suggestion_presented",
  });
  return normalized;
}

function recordAssistantSuggestionEvents(suggestion, input) {
  const modeLabel = suggestion.mode === AI_MODES.OPENAI_SECURE_BACKEND ? "backend seguro experimental" : "demo simulada";
  addLedger("ai.analysis.completed", {
    summary: `Analisis completado por ${modeLabel}.`,
    suggestionId: suggestion.suggestionId,
    requestId: suggestion.requestId || suggestion.serverAudit?.requestId || null,
    analysisVersion: suggestion.analysisVersion || suggestion.version,
    mode: suggestion.mode,
    suggestedIncidentType: suggestion.suggestedIncidentType,
    suggestedPriority: suggestion.suggestedPriority,
    missingCount: suggestion.missingCriticalInformation.length,
    classification: "OPERATIONAL",
  });
  addLedger("ai.suggestion.presented", {
    summary: "Sugerencia presentada para revision humana.",
    suggestionId: suggestion.suggestionId,
    requestId: suggestion.requestId || suggestion.serverAudit?.requestId || null,
    mode: suggestion.mode,
    requiresHumanValidation: suggestion.requiresHumanValidation,
    classification: "OPERATIONAL",
  });
  suggestion.suggestedConsoles.forEach((consoleSuggestion) => {
    addLedger("console.suggested", {
      summary: `${consoleSuggestion.consoleName} sugerida por asistente ${modeLabel}.`,
      suggestionId: suggestion.suggestionId,
      consoleType: consoleSuggestion.consoleType,
      consoleId: consoleSuggestion.consoleId,
      purpose: consoleSuggestion.purpose,
      minimumInfoToShare: consoleSuggestion.minimumInfoToShare,
      classification: consoleSuggestion.classification,
    });
  });
  suggestion.followUpQuestions.forEach((question) => {
    addLedger("followup.question.created", {
      summary: `Pregunta de seguimiento creada por asistente ${modeLabel}.`,
      suggestionId: suggestion.suggestionId,
      question,
      classification: "OPERATIONAL",
    });
  });
  addLocalEvent(`PIPO AI Incident Assistant genero sugerencia ${suggestion.suggestionId} para ${input.channel}.`);
}

async function runAssistantAnalysis() {
  const input = getAssistantInput();
  assistantState.lastInput = input;
  assistantState.validationErrors = [];
  assistantState.status = "processing";
  assistantState.activeMode = selectedAssistantMode;
  assistantState.requestId = null;
  assistantState.analysisVersion = selectedAssistantMode === AI_MODES.OPENAI_SECURE_BACKEND ? "pendiente backend" : AI_SERVICE_VERSION;
  render();
  try {
    addLedger("ai.analysis.requested", {
      summary: `Analisis solicitado por operador en modo ${assistantModeLabel(selectedAssistantMode)}.`,
      inputChannel: input.channel,
      hasLocation: Boolean(input.location),
      requestedMode: selectedAssistantMode,
      classification: "OPERATIONAL",
    });
    const assistantService = createIncidentAnalysisService({ mode: selectedAssistantMode });
    const suggestion = await assistantService.analyzeIncident(input, BUILD_WEEK_STATE, { mode: selectedAssistantMode });
    const normalized = storeAssistantSuggestion(suggestion);
    recordAssistantSuggestionEvents(normalized, input);
    addLedger("human.review.started", {
      summary: "Revision humana iniciada sobre sugerencia IA.",
      suggestionId: normalized.suggestionId,
      requestId: normalized.requestId || normalized.serverAudit?.requestId || null,
      mode: normalized.mode,
      classification: "OPERATIONAL",
    });
    assistantState.status = "analyzed";
  } catch (error) {
    assistantState.status = "error";
    assistantState.requestId = error.requestId || error.audit?.requestId || null;
    assistantState.analysisVersion = "fallida";
    assistantState.activeMode = selectedAssistantMode;
    assistantState.validationErrors = [
      `${error.message || "Secure backend unavailable."}${error.requestId ? ` RequestId: ${error.requestId}` : ""}`,
    ];
    addLedger("ai.analysis.failed", {
      summary: "Analisis fallido. El sistema permite reintentar, usar demo simulada o continuar sin IA.",
      errorCode: error.code || "frontend_error",
      requestId: assistantState.requestId,
      mode: selectedAssistantMode,
      classification: "OPERATIONAL",
    });
  }
  render();
}

function useSimulatedDemoMode() {
  selectedAssistantMode = AI_MODES.SIMULATED_DEMO;
  assistantState.activeMode = AI_MODES.SIMULATED_DEMO;
  assistantState.validationErrors = [];
  assistantState.status = "idle";
  render();
}

function continueWithoutAI() {
  const input = getAssistantInput();
  assistantState.lastInput = input;
  const suggestion = createManualFallbackSuggestion(input, BUILD_WEEK_STATE);
  const normalized = storeAssistantSuggestion(suggestion);
  assistantState.humanDraft.decisionStatus = HUMAN_DECISION_STATUS.MANUAL_WITHOUT_AI;
  assistantState.status = "manual";
  assistantState.validationErrors = [];
  assistantState.requestId = null;
  assistantState.analysisVersion = normalized.version || "manual";
  assistantState.activeMode = normalized.mode || AI_MODES.SIMULATED_DEMO;
  addLedger("human.review.started", {
    summary: "Operacion continua sin IA por decision humana.",
    suggestionId: normalized.suggestionId,
    mode: HUMAN_DECISION_STATUS.MANUAL_WITHOUT_AI,
    classification: "OPERATIONAL",
  });
  addLocalEvent("Operador continua sin IA; el incidente permanece operativo.");
  render();
}

function setHumanReviewMode(mode) {
  if (!assistantState.suggestion) {
    continueWithoutAI();
    return;
  }
  assistantState.validationErrors = [];
  const operator = getOperatorById("OP-MASTER-01");
  const nextDraft = createHumanDecisionDraft(assistantState.suggestion, operator);
  nextDraft.decisionStatus = mode;
  if (mode === HUMAN_DECISION_STATUS.REJECTED) {
    nextDraft.finalIncidentType = "Revision manual";
    nextDraft.finalPriority = "UNDETERMINED";
    nextDraft.finalConsoles = [];
    nextDraft.finalRouting = "";
  }
  if (mode === HUMAN_DECISION_STATUS.MODIFIED) {
    nextDraft.reason = "Operador revisa y ajusta la sugerencia antes de confirmar.";
  }
  assistantState.humanDraft = nextDraft;
  assistantState.comparison = compareSuggestionWithHumanDecision(assistantState.suggestion, nextDraft);
  render();
}

function confirmHumanDecision() {
  const operator = getOperatorById("OP-MASTER-01");
  const draft = syncHumanDraftFromControls(assistantState.humanDraft?.decisionStatus);
  const result = finalizeHumanDecision(assistantState.suggestion, draft, operator);
  assistantState.validationErrors = result.errors;
  assistantState.comparison = result.comparison;

  if (!result.ok) {
    assistantState.status = "error";
    render();
    return;
  }

  const decision = result.decision;
  BUILD_WEEK_STATE.humanDecision = decision;
  BUILD_WEEK_STATE.humanDecisions.push(decision);
  stateByModel.humanDecision = decision;
  assistantState.humanDraft = decision;
  assistantState.status = "confirmed";

  const decisionEventType = decision.decisionStatus === HUMAN_DECISION_STATUS.REJECTED
    ? "human.suggestion.rejected"
    : decision.decisionStatus === HUMAN_DECISION_STATUS.MODIFIED
      ? "human.suggestion.modified"
      : "human.suggestion.accepted";

  addLedger(decisionEventType, {
    summary: `Decision humana ${decision.decisionStatus.toLowerCase()} sobre sugerencia IA.`,
    suggestionId: assistantState.suggestion.suggestionId,
    requestId: assistantState.suggestion.requestId || assistantState.suggestion.serverAudit?.requestId || null,
    analysisVersion: assistantState.suggestion.analysisVersion || assistantState.suggestion.version,
    reason: decision.reason || "sin diferencia material",
    materialDifferences: decision.materialDifferences,
    classification: "OPERATIONAL",
  }, operator.id);

  addLedger("human.decision.confirmed", {
    summary: "Decision humana confirmada.",
    decisionId: decision.id,
    suggestionId: assistantState.suggestion.suggestionId,
    requestId: assistantState.suggestion.requestId || assistantState.suggestion.serverAudit?.requestId || null,
    finalIncidentType: decision.finalIncidentType,
    finalPriority: decision.finalPriority,
    finalConsoles: decision.finalConsoles.map((item) => item.consoleType),
    classification: "OPERATIONAL",
  }, operator.id);

  addLedger("incident.classification.updated", {
    summary: "Clasificacion del incidente actualizada por decision humana.",
    decisionId: decision.id,
    finalIncidentType: decision.finalIncidentType,
    finalPriority: decision.finalPriority,
    classification: "OPERATIONAL",
  }, operator.id);

  decision.finalConsoles.forEach((consoleSuggestion) => {
    addLedger("console.assigned", {
      summary: `${consoleSuggestion.consoleName} preparada para derivacion validada.`,
      decisionId: decision.id,
      consoleType: consoleSuggestion.consoleType,
      consoleId: consoleSuggestion.consoleId,
      classification: "OPERATIONAL",
    }, operator.id);
  });

  if (decision.followUpAnswers.length) {
    addLedger("followup.answer.recorded", {
      summary: "Respuestas de seguimiento registradas por operador.",
      decisionId: decision.id,
      answerCount: decision.followUpAnswers.length,
      classification: "OPERATIONAL",
    }, operator.id);
  }

  BUILD_WEEK_STATE.incident.priority = decision.finalPriority;
  BUILD_WEEK_STATE.incident.status = "Preparado para derivacion humana";
  BUILD_WEEK_STATE.incident.updatedAt = decision.decisionAt;
  BUILD_WEEK_STATE.routing.targetAgency = decision.finalRouting || "Pendiente de derivacion";
  BUILD_WEEK_STATE.routing.status = "Preparada por decision humana";

  addLocalEvent(`Decision humana ${decision.id} confirmada y enlazada al hilo documental.`);
  render();
}

function render() {
  syncFieldStateToBuildWeek();
  syncProcedureStateToBuildWeek();
  syncCitizenStateToBuildWeek();
  syncEvidenceVaultStateToBuildWeek();
  renderScenario();
  renderConsoles();
  renderParticipants();
  renderIndividualActs();
  renderMasterRecord();
  renderCyberAndRecovery();
  renderAccessResult();
  renderModelList();
  renderDetail();
  renderTimeline();
  renderLedger();
  renderAssistant();
  renderFieldWorkflow();
  renderProcedureAct();
  renderPerspective();
  renderCitizenClosure();
  renderEvidenceVaultSections();
  renderComparison();
  renderSnapshot();
}

document.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-model], [data-action], [data-ledger], [data-assistant], [data-field-action], [data-procedure-action], [data-citizen-action], [data-vault-action]");
  if (!button) return;

  if (button.dataset.vaultAction) {
    await runVaultAction(button.dataset.vaultAction, button);
    return;
  }

  if (button.dataset.citizenAction) {
    runCitizenAction(button.dataset.citizenAction);
    return;
  }

  if (button.dataset.procedureAction) {
    runProcedureAction(button.dataset.procedureAction);
    return;
  }

  if (button.dataset.fieldAction) {
    handleFieldAction(button.dataset.fieldAction);
    return;
  }

  if (button.dataset.assistant) {
    const assistantAction = button.dataset.assistant;
    if (assistantAction === "analyze") {
      runAssistantAnalysis();
      return;
    }
    if (assistantAction === "retry") {
      runAssistantAnalysis();
      return;
    }
    if (assistantAction === "use-simulated-demo") {
      useSimulatedDemoMode();
      return;
    }
    if (assistantAction === "continue-without-ai") {
      continueWithoutAI();
      return;
    }
    if (assistantAction === "accept") {
      setHumanReviewMode(HUMAN_DECISION_STATUS.ACCEPTED);
      return;
    }
    if (assistantAction === "modify") {
      setHumanReviewMode(HUMAN_DECISION_STATUS.MODIFIED);
      return;
    }
    if (assistantAction === "reject") {
      setHumanReviewMode(HUMAN_DECISION_STATUS.REJECTED);
      return;
    }
    if (assistantAction === "confirm") {
      confirmHumanDecision();
      return;
    }
  }

  if (button.dataset.model) {
    selectedModel = button.dataset.model;
    render();
    return;
  }

  if (button.dataset.ledger) {
    addLedger(button.dataset.ledger, {
      summary: `Evento ${button.dataset.ledger} agregado desde la demo.`,
      source: "boton de bitacora",
    }, button.dataset.ledger.startsWith("field.") ? "OP-FIELD-01" : "OP-MASTER-01");
    render();
    return;
  }

  const action = button.dataset.action;
  if (action === "join-console") {
    if (!BUILD_WEEK_STATE.incidentParticipants.some((item) => item.consoleId === "CON-COMISARIA")) {
      BUILD_WEEK_STATE.incidentParticipants.push({
        incidentId: BUILD_WEEK_STATE.incident.id,
        operatorId: "OP-COM-01",
        consoleId: "CON-COMISARIA",
        role: "recepcion denuncia",
        joinedAt: new Date().toISOString(),
        leftAt: null,
        permissions: ["recibir denuncia", "adjuntar constancia"],
        status: "Activo",
      });
    }
    addLocalEvent("Comisaria incorporada al incidente como consola participante.");
    addLedger("console.joined", { summary: "Comisaria incorporada al incidente.", consoleId: "CON-COMISARIA" }, "OP-COM-01");
  }

  if (action === "join-operator") {
    if (!BUILD_WEEK_STATE.incidentParticipants.some((item) => item.operatorId === "OP-FIELD-02")) {
      BUILD_WEEK_STATE.operatorIdentities.push({
        id: "OP-FIELD-02",
        fictitiousName: "Segundo movil demo",
        organization: "911 Seguridad",
        rankOrRole: "Equipo de campo",
        specialty: "apoyo operativo",
        consoleId: "CON-911",
        enrolledDeviceId: "DEV-FIELD-02",
        mfaVerified: true,
        localBiometricVerified: true,
        sessionId: "SES-FIELD-02-20260718",
        sessionStartedAt: new Date().toISOString(),
      });
      BUILD_WEEK_STATE.incidentParticipants.push({
        incidentId: BUILD_WEEK_STATE.incident.id,
        operatorId: "OP-FIELD-02",
        consoleId: "CON-911",
        role: "apoyo campo",
        joinedAt: new Date().toISOString(),
        leftAt: null,
        permissions: ["registrar observacion", "adjuntar evidencia"],
        status: "Activo",
      });
    }
    addLocalEvent("Segundo operador de campo incorporado sin modificar actas ajenas.");
    addLedger("operator.joined", { summary: "Segundo operador de campo incorporado.", deviceId: "DEV-FIELD-02" }, "OP-FIELD-02");
  }

  if (action === "clarification") {
    const requestId = `CLAR-${String(BUILD_WEEK_STATE.clarificationRequests.length + 1).padStart(3, "0")}`;
    BUILD_WEEK_STATE.clarificationRequests.push({
      id: requestId,
      incidentId: BUILD_WEEK_STATE.incident.id,
      sourceActId: "ACT-IND-CIBER-001",
      requestingOperatorId: "OP-MASTER-01",
      recipientOperatorId: "OP-CIBER-01",
      reason: "Aclarar referencia de origen sin alterar texto original.",
      referencedEvents: ["EVT-CIBER-001"],
      status: "Pendiente",
      responseActVersion: null,
      createdAt: new Date().toISOString(),
      resolvedAt: null,
    });
    BUILD_WEEK_STATE.masterIncidentRecord.clarificationRequests.push(requestId);
    addLocalEvent(`Solicitud de aclaracion ${requestId} registrada.`);
    addLedger("clarification.requested", { summary: `Solicitud de aclaracion ${requestId} registrada.`, requestId }, "OP-MASTER-01");
  }

  if (action === "share-evidence") {
    addLocalEvent("Evidencia compartida bajo permiso temporal y finalidad declarada.");
    addLedger("evidence.shared", { summary: "Evidencia compartida con permiso temporal.", grantId: "GRANT-001" }, "OP-CIBER-01");
  }

  if (action === "rectify-ledger") {
    const firstEvent = getLedgerEvents()[0];
    appendCorrection(firstEvent.eventId, "aclaracion", "Se agrega aclaracion sin borrar el evento original.");
  }

  if (action === "try-delete-ledger") {
    const result = deleteLedgerEvent();
    els.ledgerValidation.className = "access-result denied";
    els.ledgerValidation.innerHTML = `
      <strong>Borrado bloqueado</strong>
      <span>${result.reason}</span>
    `;
    return;
  }

  if (action === "test-allowed") {
    const operator = getOperatorById("OP-CIBER-01");
    const evidence = BUILD_WEEK_STATE.evidence.find((item) => item.id === "EVI-CIBER-001");
    renderAccessResult(canAccessResource(operator, evidence, "preservacion digital"));
    return;
  }

  if (action === "test-denied") {
    const operator = getOperatorById("OP-FIELD-01");
    const evidence = BUILD_WEEK_STATE.evidence.find((item) => item.id === "EVI-CIBER-001");
    renderAccessResult(canAccessResource(operator, evidence, "curiosidad operativa"));
    return;
  }

  if (action === "test-expired") {
    const operator = { ...getOperatorById("OP-FIELD-01"), consoleId: "CON-CVGRT", rankOrRole: "guia territorial", specialty: "orientacion" };
    const evidence = BUILD_WEEK_STATE.evidence.find((item) => item.id === "EVI-CIBER-001");
    renderAccessResult(canAccessResource(operator, evidence, "orientacion comunitaria"));
    return;
  }

  render();
});

els.scenarioSelect.addEventListener("change", (event) => {
  selectedScenario = event.target.value;
  render();
});

els.assistantScenarioSelect.addEventListener("change", (event) => {
  loadAssistantScenario(event.target.value);
});

els.assistantModeSelect.addEventListener("change", (event) => {
  selectedAssistantMode = event.target.value;
  assistantState.activeMode = selectedAssistantMode;
  assistantState.validationErrors = [];
  assistantState.status = "idle";
  if (selectedAssistantMode === AI_MODES.OPENAI_SECURE_BACKEND) {
    refreshBackendStatus();
  }
  render();
});

els.fieldOperatorSelect.addEventListener("change", (event) => {
  selectedFieldOperatorId = event.target.value;
  fieldState.selectedOperatorId = selectedFieldOperatorId;
  setFieldMessage("Operador seleccionado. La autonomia documental se mantiene por autor.");
  render();
});

els.perspectiveSelect.addEventListener("change", (event) => {
  const result = changePerspective(citizenState, event.target.value, {
    selectedConsoleId: citizenState.selectedConsoleId,
    selectedFieldOperatorId,
  });
  applyCitizenResult(result, citizenState.lastMessage);
});

els.perspectiveScenarioSelect.addEventListener("change", (event) => {
  citizenState.scenarioId = event.target.value;
  setCitizenMessage(`Escenario ciudadano activo: ${CITIZEN_SCENARIOS[citizenState.scenarioId].label}.`);
  render();
});

els.perspectiveConsoleSelect.addEventListener("change", (event) => {
  citizenState.selectedConsoleId = event.target.value;
  const result = changePerspective(citizenState, citizenState.selectedPerspective, {
    selectedConsoleId: citizenState.selectedConsoleId,
    selectedFieldOperatorId,
  });
  applyCitizenResult(result, `Consola de contexto actualizada: ${event.target.options[event.target.selectedIndex].textContent}.`);
});

els.perspectiveFieldOperatorSelect.addEventListener("change", (event) => {
  selectedFieldOperatorId = event.target.value;
  fieldState.selectedOperatorId = selectedFieldOperatorId;
  citizenState.selectedFieldOperatorId = selectedFieldOperatorId;
  const result = changePerspective(citizenState, citizenState.selectedPerspective, {
    selectedConsoleId: citizenState.selectedConsoleId,
    selectedFieldOperatorId,
  });
  applyCitizenResult(result, "Movil de campo actualizado para vista multiperspectiva.");
});

initializeAssistantScenarios();
initializeFieldWorkflowControls();
initializeCitizenControls();
refreshBackendStatus();
render();
}());
