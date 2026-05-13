const cases = [
  {
    id: "PIPO-000124",
    title: "No puedo hablar",
    priority: "Rojo",
    zone: "Lomas de Zamora - ubicacion estimada",
    channel: "PIPO discreto",
    status: "Recibido",
    evidence: "Ubicacion + audio",
    commsId: "COM-AR-778204",
    phone: "+54 9 11 ***-4428",
    receiver: "Sin asignar",
    fieldDevice: "Movil seguro pendiente",
    threadId: "TRACE-PIPO-000124",
    closure: "Abierto - requiere cierre",
    docs: [],
    history: ["09:42 alerta recibida", "09:42 ubicacion registrada", "09:43 operador asignado"],
  },
];

let selectedCase = cases[0];
let derivedCount = 0;
let caseCounter = 125;
let selectedRoute = "Centro de Monitoreo";
const socialTitles = {
  chat: "Mensajes",
  feed: "Actividad",
  work: "Trabajo",
  community: "Comunidad",
};

const els = {
  pipoRail: document.querySelector("#pipoRail"),
  networkPicker: document.querySelector("#networkPicker"),
  networkRail: document.querySelector("#networkRail"),
  networkToggle: document.querySelector("#networkToggle"),
  neutralScreen: document.querySelector("#neutralScreen"),
  neutralCase: document.querySelector("#neutralCase"),
  citizenFlow: document.querySelector("#citizenFlow"),
  caseList: document.querySelector("#caseList"),
  activeCount: document.querySelector("#activeCount"),
  redCount: document.querySelector("#redCount"),
  derivedCount: document.querySelector("#derivedCount"),
  caseId: document.querySelector("#caseId"),
  caseTitle: document.querySelector("#caseTitle"),
  casePriority: document.querySelector("#casePriority"),
  caseZone: document.querySelector("#caseZone"),
  caseChannel: document.querySelector("#caseChannel"),
  caseStatus: document.querySelector("#caseStatus"),
  caseEvidence: document.querySelector("#caseEvidence"),
  caseComms: document.querySelector("#caseComms"),
  casePhone: document.querySelector("#casePhone"),
  receiverName: document.querySelector("#receiverName"),
  fieldDevice: document.querySelector("#fieldDevice"),
  threadId: document.querySelector("#threadId"),
  closureState: document.querySelector("#closureState"),
  receiverReport: document.querySelector("#receiverReport"),
  linkedDocs: document.querySelector("#linkedDocs"),
  fieldLog: document.querySelector("#fieldLog"),
  fieldEvidence: document.querySelector("#fieldEvidence"),
  radioState: document.querySelector("#radioState"),
  cameraModal: document.querySelector("#cameraModal"),
  modalCameraTitle: document.querySelector("#modalCameraTitle"),
  modalCameraView: document.querySelector("#modalCameraView"),
  reportState: document.querySelector("#reportState"),
  timelineList: document.querySelector("#timelineList"),
};

els.pipoRail.classList.add("hidden");

function padCaseNumber(value) {
  return `PIPO-${String(value).padStart(6, "0")}`;
}

function nowTime() {
  return new Date().toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });
}

function createCase(title, options = {}) {
  const newCase = {
    id: padCaseNumber(caseCounter++),
    title,
    priority: options.priority || "Rojo",
    zone: "Lomas de Zamora - ubicacion estimada",
    channel: options.channel || "PIPO Layer",
    status: options.route ? `Derivar a ${options.route}` : "Recibido",
    evidence: options.evidence || "Ubicacion",
    commsId: `COM-AR-${Math.floor(700000 + Math.random() * 200000)}`,
    phone: "+54 9 11 ***-4428",
    receiver: options.route || "Sin asignar",
    fieldDevice: options.route ? "Notificacion movil enviada" : "Movil seguro pendiente",
    threadId: `TRACE-${padCaseNumber(caseCounter - 1)}`,
    closure: "Abierto - requiere cierre",
    docs: [],
    history: [
      `${nowTime()} alerta recibida`,
      `${nowTime()} paquete inicial creado`,
      options.route ? `${nowTime()} ruta sugerida: ${options.route}` : `${nowTime()} pendiente de clasificacion`,
    ],
  };

  cases.unshift(newCase);
  selectedCase = newCase;
  render();

  if (options.silent) {
    els.neutralCase.textContent = `Caso: ${newCase.id}`;
    els.neutralScreen.classList.remove("hidden");
  }
}

function renderCaseList() {
  els.caseList.innerHTML = "";
  cases.forEach((item) => {
    const row = document.createElement("button");
    row.type = "button";
    row.className = `case-row ${item.id === selectedCase.id ? "active" : ""}`;
    row.innerHTML = `
      <strong>${item.priority}<span>${item.id}</span></strong>
      <span>${item.title}</span>
      <span>${item.status} · ${item.zone.split(" - ")[0]}</span>
    `;
    row.addEventListener("click", () => {
      selectedCase = item;
      render();
    });
    els.caseList.appendChild(row);
  });
}

function renderDetail() {
  els.caseId.textContent = selectedCase.id;
  els.caseTitle.textContent = selectedCase.title;
  els.casePriority.textContent = selectedCase.priority;
  els.casePriority.className = `priority ${selectedCase.priority === "Rojo" ? "red" : "amber"}`;
  els.caseZone.textContent = selectedCase.zone;
  els.caseChannel.textContent = selectedCase.channel;
  els.caseStatus.textContent = selectedCase.status;
  els.caseEvidence.textContent = selectedCase.evidence;
  els.caseComms.textContent = selectedCase.commsId;
  els.casePhone.textContent = selectedCase.phone;
  els.receiverName.textContent = selectedCase.receiver;
  els.fieldDevice.textContent = selectedCase.fieldDevice;
  els.threadId.textContent = selectedCase.threadId;
  els.closureState.textContent = selectedCase.closure;
  els.receiverReport.value = selectedCase.receiver === "Sin asignar" ? "Pendiente de carga por area derivada." : `Caso recibido por ${selectedCase.receiver}. Reporte enlazado al hilo documental.`;
  els.linkedDocs.innerHTML = "";
  const docs = selectedCase.docs.length ? selectedCase.docs : ["Sin documentacion externa asociada."];
  docs.forEach((doc) => {
    const li = document.createElement("li");
    li.textContent = doc;
    els.linkedDocs.appendChild(li);
  });
  els.fieldLog.innerHTML = "";
  const fieldEntries = selectedCase.history.filter((entry) => entry.includes("movil") || entry.includes("campo") || entry.includes("arribo") || entry.includes("handy"));
  (fieldEntries.length ? fieldEntries : ["Movil seguro en espera de asignacion."]).forEach((entry) => {
    const li = document.createElement("li");
    li.textContent = entry;
    els.fieldLog.appendChild(li);
  });
  els.timelineList.innerHTML = "";
  selectedCase.history.forEach((entry) => {
    const li = document.createElement("li");
    li.textContent = entry;
    els.timelineList.appendChild(li);
  });
}

function renderMetrics() {
  els.activeCount.textContent = cases.filter((item) => item.status !== "Cerrado").length;
  els.redCount.textContent = cases.filter((item) => item.priority === "Rojo" && item.status !== "Cerrado").length;
  els.derivedCount.textContent = derivedCount;
}

function render() {
  renderCaseList();
  renderDetail();
  renderMetrics();
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("[data-action], [data-incident], [data-derive], [data-route], [data-linkdoc], [data-radio]");
  if (!target) return;

  const action = target.dataset.action;
  const incident = target.dataset.incident;
  const derive = target.dataset.derive;
  const route = target.dataset.route;
  const linkdoc = target.dataset.linkdoc;
  const radio = target.dataset.radio;
  const social = target.dataset.social;

  if (action === "toggle-rail") {
    els.pipoRail.classList.toggle("hidden");
  }

  if (social) {
    document.querySelectorAll("[data-social]").forEach((button) => button.classList.remove("active"));
    target.classList.add("active");
    document.querySelectorAll("[data-screen]").forEach((screen) => {
      screen.classList.toggle("active", screen.dataset.screen === social);
    });
    document.querySelector("#socialTitle").textContent = socialTitles[social];
    els.networkToggle.textContent = target.textContent;
    els.networkPicker.open = false;
  }

  if (action === "silent") {
    createCase("No puedo hablar", {
      channel: "PIPO discreto",
      evidence: "Ubicacion + audio/video preautorizado",
      route: "Activacion silenciosa",
      silent: true,
    });
  }

  if (action === "reserved-call") {
    createCase("Solicitud con identidad reservada", {
      channel: "PIPO reserva legal",
      evidence: "Ubicacion + registro de identidad reservada",
      route: selectedRoute,
    });
  }

  if (action === "location") {
    createCase("Actualizacion de ubicacion", {
      priority: "Amarillo",
      evidence: "Ubicacion actualizada",
    });
  }

  if (action === "evidence") {
    createCase("Evidencia enviada", {
      priority: "Amarillo",
      evidence: "Foto + ubicacion",
    });
  }

  if (action === "restore") {
    els.neutralScreen.classList.add("hidden");
  }

  if (action === "reset") {
    cases.splice(1);
    selectedCase = cases[0];
    cases[0].status = "Recibido";
    cases[0].receiver = "Sin asignar";
    cases[0].fieldDevice = "Movil seguro pendiente";
    cases[0].closure = "Abierto - requiere cierre";
    cases[0].docs = [];
    els.fieldEvidence.classList.add("hidden");
    cases[0].history = ["09:42 alerta recibida", "09:42 ubicacion registrada", "09:43 operador asignado"];
    derivedCount = 0;
    render();
  }

  if (action === "daily-report") {
    els.reportState.textContent = "Reporte diario generado: incidentes, derivaciones, tiempos y cierres del dia.";
  }

  if (action === "monthly-report") {
    els.reportState.textContent = "Reporte mensual generado: recurrencias, zonas criticas, organismos y tiempos promedio.";
  }

  if (action === "annual-report") {
    els.reportState.textContent = "Reporte anual generado: tendencias, carga operativa, auditoria y planificacion.";
  }

  if (incident) {
    const isSilent = incident === "No puedo hablar";
    const richEvidence = isSilent
      ? "Ubicacion + audio/video preautorizado"
      : incident === "Incendio" || incident === "Accidente vial" || incident === "Robo en curso"
        ? "Ubicacion + evidencia disponible"
        : "Ubicacion";
    createCase(incident, {
      channel: isSilent ? "PIPO discreto" : "PIPO Layer",
      evidence: richEvidence,
      route: selectedRoute,
      silent: isSilent,
    });
    document.querySelectorAll("[data-incident]").forEach((button) => button.classList.remove("active"));
    target.classList.add("active");
  }

  if (route) {
    selectedRoute = route;
    document.querySelectorAll("[data-route]").forEach((button) => button.classList.remove("active"));
    target.classList.add("active");
  }

  if (derive) {
    selectedCase.status = `Derivado a ${derive}`;
    selectedCase.receiver = derive;
    selectedCase.fieldDevice = "Notificacion movil enviada";
    selectedCase.history.push(`${nowTime()} derivado a ${derive}`);
    selectedCase.history.push(`${nowTime()} llamada y funciones enlazadas a ${derive}`);
    derivedCount += 1;
    render();
  }

  if (action === "field-accept") {
    selectedCase.fieldDevice = "Derivacion aceptada en movil";
    selectedCase.history.push(`${nowTime()} movil de campo acepta derivacion`);
    selectedCase.history.push(`${nowTime()} evidencia y audio habilitados en movil de campo`);
    els.fieldEvidence.classList.remove("hidden");
    render();
  }

  if (action === "field-update") {
    selectedCase.fieldDevice = "Equipo en arribo";
    selectedCase.history.push(`${nowTime()} equipo de campo informa arribo`);
    selectedCase.history.push(`${nowTime()} alerta de arribo notificada al operador derivante`);
    render();
  }

  if (action === "field-video") {
    selectedCase.history.push(`${nowTime()} video de campo agregado al hilo documental`);
    render();
  }

  if (action === "field-audio") {
    selectedCase.history.push(`${nowTime()} audio de campo agregado al hilo documental`);
    render();
  }

  if (action === "ask-field-video") {
    selectedCase.history.push(`${nowTime()} monitoreo solicita al agente cargar video`);
    selectedCase.docs.push(`Solicitud de carga de video enviada a movil de campo`);
    render();
  }

  if (action === "ask-field-audio") {
    selectedCase.history.push(`${nowTime()} monitoreo solicita al agente cargar audio`);
    selectedCase.docs.push(`Solicitud de carga de audio enviada a movil de campo`);
    render();
  }

  if (action === "request-field-video") {
    selectedCase.history.push(`${nowTime()} monitoreo activa video preautorizado del movil de campo`);
    selectedCase.docs.push(`Canal de video preautorizado asociado a ${selectedCase.threadId}`);
    render();
  }

  if (action === "request-field-audio") {
    selectedCase.history.push(`${nowTime()} monitoreo activa audio preautorizado del movil de campo`);
    selectedCase.docs.push(`Canal de audio preautorizado asociado a ${selectedCase.threadId}`);
    render();
  }

  if (radio) {
    els.radioState.textContent = `Canal ${radio} activo. Multired disponible segun evolucion del caso.`;
    selectedCase.history.push(`${nowTime()} canal operativo multired abierto con ${radio}`);
    selectedCase.docs.push(`Comunicacion multired ${radio} asociada a ${selectedCase.threadId}`);
    render();
  }

  if (action === "mark-followup") {
    selectedCase.closure = "Pendiente de seguimiento";
    selectedCase.status = "Pendiente seguimiento";
    selectedCase.history.push(`${nowTime()} marcado para seguimiento`);
    render();
  }

  if (action === "close-case") {
    selectedCase.closure = "Cerrado con reporte";
    selectedCase.status = "Cerrado";
    selectedCase.history.push(`${nowTime()} reporte cerrado`);
    els.cameraModal.classList.add("hidden");
    render();
  }

  if (linkdoc) {
    const record = `${linkdoc} asociado a ${selectedCase.threadId}`;
    if (!selectedCase.docs.includes(record)) selectedCase.docs.push(record);
    selectedCase.history.push(`${nowTime()} ${linkdoc} enlazado al circuito`);
    render();
  }

  if (action === "expand-front" || action === "expand-rear") {
    const isFront = action === "expand-front";
    els.modalCameraTitle.textContent = isFront ? "Camara frontal" : "Camara trasera";
    els.modalCameraView.className = `modal-camera-view ${isFront ? "front-view" : "rear-view"}`;
    els.modalCameraView.innerHTML = isFront ? '<div class="face-mask"></div>' : '<div class="scene-lines"></div>';
    selectedCase.history.push(`${nowTime()} ${isFront ? "camara frontal" : "camara trasera"} expandida por operador`);
    els.cameraModal.classList.remove("hidden");
    render();
  }

  if (action === "close-camera") {
    els.cameraModal.classList.add("hidden");
  }
});

document.querySelector("#panicButton").addEventListener("click", () => {
  createCase("Emergencia general", {
    channel: "PIPO Layer",
    evidence: "Ubicacion + contacto de confianza",
    route: selectedRoute,
  });
});

document.querySelectorAll("#networkRail [data-social]").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    const social = button.dataset.social;
    document.querySelectorAll("[data-social]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    document.querySelectorAll("[data-screen]").forEach((screen) => {
      screen.classList.toggle("active", screen.dataset.screen === social);
    });
    document.querySelector("#socialTitle").textContent = socialTitles[social];
    els.networkToggle.textContent = button.textContent;
    els.networkPicker.open = false;
  });
});

render();
