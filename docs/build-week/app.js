(function () {
const {
  MODEL_DEFINITIONS,
  BUILD_WEEK_STATE,
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
};

let selectedModel = MODEL_DEFINITIONS[0].key;
let selectedScenario = "general";
let selectedAssistantMode = AI_MODES.SIMULATED_DEMO;
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
  const operator = getOperatorById(operatorId);
  return appendLedgerEvent({
    type,
    operatorId: operator.id,
    consoleId: operator.consoleId,
    sessionId: operator.sessionId,
    payload,
    classification: payload.classification || "OPERATIONAL",
  });
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
  els.snapshot.textContent = JSON.stringify({
    ...getBuildWeekSnapshot(),
    operationalLedger: getLedgerEvents(),
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
  renderComparison();
  renderSnapshot();
}

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-model], [data-action], [data-ledger], [data-assistant]");
  if (!button) return;

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

initializeAssistantScenarios();
refreshBackendStatus();
render();
}());
