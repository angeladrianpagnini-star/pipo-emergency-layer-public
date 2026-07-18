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
};

let selectedModel = MODEL_DEFINITIONS[0].key;
let selectedScenario = "general";

function formatList(items, fallback = "Sin datos") {
  return (items && items.length) ? items.join(", ") : fallback;
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

function renderComparison() {
  const ai = BUILD_WEEK_STATE.aiSuggestion;
  const human = BUILD_WEEK_STATE.humanDecision;
  els.aiPriority.textContent = ai.suggestedPriority;
  els.aiRouting.textContent = ai.competentAgencies.join(", ");
  els.humanPriority.textContent = human.finalPriority;
  els.humanRouting.textContent = human.finalRouting;
  els.humanReason.textContent = `Motivo humano: ${human.reason}`;
}

function renderSnapshot() {
  els.snapshot.textContent = JSON.stringify(getBuildWeekSnapshot(), null, 2);
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
  renderComparison();
  renderSnapshot();
}

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-model], [data-action]");
  if (!button) return;

  if (button.dataset.model) {
    selectedModel = button.dataset.model;
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
  }

  if (action === "share-evidence") {
    addLocalEvent("Evidencia compartida bajo permiso temporal y finalidad declarada.");
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

render();
