const state = {
  condition: "Seguridad",
  route: "911",
  cases: [],
  selectedId: null,
  closed: 0,
};

const els = {
  panel: document.querySelector("#pipoPanel"),
  activeCount: document.querySelector("#activeCount"),
  derivedCount: document.querySelector("#derivedCount"),
  closedCount: document.querySelector("#closedCount"),
  caseList: document.querySelector("#caseList"),
  caseId: document.querySelector("#caseId"),
  caseTitle: document.querySelector("#caseTitle"),
  caseRoute: document.querySelector("#caseRoute"),
  caseStatus: document.querySelector("#caseStatus"),
  caseClosure: document.querySelector("#caseClosure"),
};

function nowTime() {
  return new Date().toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });
}

function nextId() {
  return `PIPO-PUB-${String(state.cases.length + 1).padStart(4, "0")}`;
}

function selectedCase() {
  return state.cases.find((item) => item.id === state.selectedId) || state.cases[0];
}

function createCase() {
  const item = {
    id: nextId(),
    condition: state.condition,
    route: state.route,
    status: "Recibido",
    closure: "Abierto",
    time: nowTime(),
  };
  state.cases.unshift(item);
  state.selectedId = item.id;
  render();
}

function render() {
  els.activeCount.textContent = state.cases.filter((item) => item.closure !== "Cerrado").length;
  els.derivedCount.textContent = state.cases.length;
  els.closedCount.textContent = state.closed;

  els.caseList.innerHTML = state.cases.map((item) => `
    <button class="case-card ${item.id === state.selectedId ? "active" : ""}" type="button" data-case="${item.id}">
      <strong>${item.condition}</strong>
      <p>${item.route} · ${item.status} · ${item.time}</p>
    </button>
  `).join("");

  const item = selectedCase();
  if (!item) return;
  els.caseId.textContent = item.id;
  els.caseTitle.textContent = item.condition;
  els.caseRoute.textContent = item.route;
  els.caseStatus.textContent = item.status;
  els.caseClosure.textContent = item.closure;
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("button");
  if (!target) return;

  if (target.id === "pipoButton" || target.id === "closePanel") {
    els.panel.classList.toggle("hidden");
  }

  if (target.dataset.condition) {
    state.condition = target.dataset.condition;
    document.querySelectorAll("[data-condition]").forEach((item) => item.classList.remove("active"));
    target.classList.add("active");
  }

  if (target.dataset.route) {
    state.route = target.dataset.route;
    document.querySelectorAll("[data-route]").forEach((item) => item.classList.remove("active"));
    target.classList.add("active");
  }

  if (target.id === "sendAlert") {
    createCase();
    els.panel.classList.add("hidden");
  }

  if (target.dataset.case) {
    state.selectedId = target.dataset.case;
    render();
  }

  if (target.id === "closeCase") {
    const item = selectedCase();
    if (!item || item.closure === "Cerrado") return;
    item.closure = "Cerrado";
    item.status = "Cerrado con registro";
    state.closed += 1;
    render();
  }

  if (target.id === "resetDemo") {
    state.cases = [];
    state.selectedId = null;
    state.closed = 0;
    render();
  }
});

document.querySelector("[data-condition]").classList.add("active");
document.querySelector("[data-route]").classList.add("active");
render();
