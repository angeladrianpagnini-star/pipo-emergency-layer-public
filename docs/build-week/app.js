const {
  MODEL_DEFINITIONS,
  BUILD_WEEK_STATE,
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
};

const els = {
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
      <span>${event.classification} / ${event.actor}</span>
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
  renderModelList();
  renderDetail();
  renderTimeline();
  renderComparison();
  renderSnapshot();
}

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-model]");
  if (!button) return;
  selectedModel = button.dataset.model;
  render();
});

render();
