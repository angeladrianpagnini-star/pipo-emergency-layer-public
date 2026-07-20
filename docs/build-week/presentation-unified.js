(function () {
  "use strict";

  const root = document.getElementById("pipoUnifiedPresentation");
  const config = window.PIPOAlertRoutingConfig;
  if (!root || !config) return;

  const copy = {
    "es-AR": {
      documentTitle: "PIPO Emergency Layer - Presentación operativa unificada", navCitizen: "Ciudadano", navCoordination: "Coordinación", navConsoles: "Consolas", navField: "Campo", navJustice: "Fiscalía y denuncias", navDocs: "Documentación", navClosure: "Cierre", all: "Todas las consolas", activeAgencies: "Organismos activos",
      eyebrow: "Demostración conceptual de coordinación", title: "PIPO Emergency Layer", claim: "Ayuda inmediata. Coordinación simultánea. Procedimientos trazables.",
      lead: "PIPO se proyecta como una aplicación de activación inmediata que conecta al ciudadano, las consolas institucionales y los operadores de campo en un único hilo operativo documentado.",
      start: "Iniciar demostración", fullFlow: "Ver flujo completo", advanced: "Explorar módulos avanzados", restart: "Reiniciar", filming: "Modo filmación", filmingOn: "Modo filmación activo", language: "Idioma", spanish: "Español", english: "English",
      citizen: "Dispositivo ciudadano", master: "Consola maestra", field: "Operador de campo", records: "Registros", individualActs: "Actas individuales", procedure: "Acta de procedimiento", masterRecord: "Expediente maestro", citizenClosure: "Cierre ciudadano",
      simulated: "Demostración conceptual: datos, ubicación, audio, video, recursos y documentos ficticios. Sin conexiones oficiales ni sensores reales.", simulatedLabel: "Simulado",
      openPipo: "Abrir punto PIPO", closePipo: "Cerrar punto PIPO", choose: "Seleccione una condición", securityDetail: "Detalle de seguridad", condition: "Condición", chooseSecurity: "Seleccione la situación", armedInjured: "Persona armada y persona lesionada", danger: "Peligro inmediato o delito en curso", confidential: "Aporte de información sin peligro inmediato", reserved: "Identidad reservada o protegida conforme al protocolo, la competencia y la normativa aplicable.", confidentialFields: ["Descripción simulada", "Ubicación aproximada ficticia", "Foto, video o documento ficticio", "Fecha y horario", "Solicitud de reserva", "Canal de contacto seguro", "Consentimiento de entrega"], submitConfidential: "Registrar aporte simulado",
      permissionTitle: "Permisos simulados para este incidente", simulatedLocation: "Ubicación simulada", simulatedAudio: "Audio simulado", simulatedVideo: "Video simulado", description: "Relato estructurado", activateAlert: "Activar alerta simulada", alertPrepared: "Alerta preparada para validación humana", noRealReport: "No es una denuncia real y no reemplaza el 911.",
      scenario: "Escenario de presentación", scenarioTitle: "Robo con posible persona armada y persona lesionada", priority: "Prioridad", critical: "Crítica", pending: "Pendiente", validated: "Validada por persona operadora", active: "Activa", closed: "Cerrado", humanRequired: "Requiere confirmación humana", incident: "Incidente", location: "Ubicación", permissions: "Permisos", risks: "Riesgos", missing: "Datos faltantes", narration: "Relato inicial", noMissing: "Sin datos faltantes para la demostración",
      validateAlert: "Validar alerta", adjustPriority: "Ajustar prioridad", routeParallel: "Derivar simultáneamente", requestInfo: "Solicitar información", addAgency: "Incorporar organismo", viewDocs: "Consultar documentación", validateClosure: "Validar cierre", routed: "Derivación simultánea preparada", receiving: "Recibe información mínima necesaria según finalidad.",
      consolesTitle: "Consolas especializadas", consolesLead: "Cada base recibe solo el contexto habilitado para su finalidad. Ninguna integración es real.", operator: "Operador activo", session: "Sesión", inbox: "Bandeja", resources: "Recursos", communications: "Comunicaciones", documents: "Documentación", actions: "Actuaciones", involved: "Organismos participantes", noAccess: "Sin acceso a este incidente", assigned: "Asignado", awaiting: "A la espera",
      confirmResource: "Confirmar recurso", confirmed: "Confirmado por operador", resourceSuggestion: "Recurso sugerido", proximity: "Distancia simulada", specialty: "Especialidad", availability: "Disponibilidad", eta: "ETA", confirmLead: "La sugerencia no asigna recursos por sí sola.",
      commTitle: "Comunicaciones interinstitucionales", commLead: "Bandeja estructurada; no es un chat informal.", communicationId: "ID de comunicación", sender: "Emisora", recipient: "Receptora", purpose: "Finalidad", status: "Estado", read: "Constancia de lectura", integrity: "Integridad de demostración", operationalMessage: "Mensaje operativo", supportRequest: "Solicitud de apoyo", informationRequest: "Solicitud de información", diligenceRequest: "Solicitud de diligencia", response: "Respuesta", sharedDocument: "Documento compartido", priorityUpdate: "Actualización de prioridad", acceptance: "Aceptación", motivatedRejection: "Rechazo motivado",
      sharedContext: "Contexto compartido del incidente", sharedContextLead: "Información simulada compartida por la consola según permisos y finalidad.", arrival: "Arribo", departure: "Salida", accept: "Aceptar", reportDeparture: "Informar salida", reportArrival: "Informar arribo", startIntervention: "Iniciar intervención", updateStatus: "Actualizar estado", requestSupport: "Solicitar apoyo", consultProsecution: "Consultar Fiscalía", sendCommunication: "Enviar comunicación", finish: "Finalizar intervención", createAct: "Crear acta", fieldInstruction: "Prioridad de vida, seguridad de escena y coordinación interinstitucional.", agenciesOnWay: "Otros organismos en camino", activationTime: "Hora de activación", elapsed: "Tiempo transcurrido", evidenceTitle: "Evidencia ficticia del operador", addEvidence: "Incorporar evidencia ficticia", evidenceAdded: "Fotografía, audio y video ficticios incorporados", evidenceNote: "No se utiliza cámara, micrófono, ubicación ni archivos personales reales.",
      justiceTitle: "Consulta de campo a Fiscalía", institutionalNotice: "Demostración conceptual sin conexión institucional real.", justiceNotice: "No constituye actuación fiscal real ni orden judicial.", consultation: "Consulta", urgency: "Urgencia", reference: "Referencia ficticia", sendConsultation: "Enviar consulta simulada", simulateResponse: "Simular respuesta de Fiscalía", received: "Recibida", answered: "Respondida", completed: "Cerrada", prosecutorAnswer: "Preservar el lugar, ampliar información y registrar la actuación. Respuesta simulada.", stationTitle: "Consola de Comisaría", stationNotice: "No constituye denuncia policial real.", stationScope: "La comisaría agrega su propia referencia al expediente sin modificar el registro ciudadano ni las actas de otros organismos.", municipalTitle: "147 — Atención y respuesta municipal", municipalNotice: "No crea un reclamo municipal oficial.", municipalCategory: "Categoría simulada", municipalRoute: "Área asignada", municipalTime: "Plazo estimado", municipalClose: "Cierre ciudadano",
      actsTitle: "Actas y expediente", actsLead: "Cada organismo conserva su propia autoría; el expediente maestro vincula referencias sin reescribir actas individuales.", actReady: "Acta individual disponible", procedureReady: "Acta de procedimiento preparada", masterReady: "Expediente maestro actualizado", closureReady: "Listo para validación de cierre", evidenceReference: "Referencia de evidencia", externalRef: "Referencia documental", finaliseDocs: "Generar actas simuladas", documentationStatus: "Estado documental",
      closureTitle: "Devolución al ciudadano", closureLead: "La consola maestra valida el cierre antes de devolver un resumen, una constancia y los próximos pasos al dispositivo ciudadano.", deliver: "Entregar cierre ciudadano", package: "Resumen y constancia", nextSteps: "Próximos pasos", receipt: "Confirmación de recepción", deliveryPending: "Pendiente de validación y entrega", deliveryDone: "Cierre entregado al teléfono ciudadano", nextStepOne: "Conservar la constancia de demostración si necesita revisar el recorrido.", nextStepTwo: "Para una emergencia real, use los canales oficiales de su jurisdicción.",
      tourTitle: "Recorrido profesional de presentación", tourLead: "Ocho pasos, diseñados para explicar el caso completo en menos de dos minutos y medio.", step: "Paso", next: "Siguiente", previous: "Anterior", tourStart: "Iniciar recorrido", tourRestart: "Reiniciar recorrido", stepLabels: ["Activación ciudadana", "Validación humana", "Derivación simultánea", "Confirmación de recursos", "Contexto de campo", "Evidencia y consulta", "Actas y expediente", "Cierre ciudadano"],
      limitsTitle: "Alcance y límites", limits: ["Demostración conceptual con datos ficticios.", "Sin conexiones oficiales, despacho automático ni denuncia real.", "Sin sensores, rastreo o vigilancia en segundo plano.", "Control humano obligatorio y acceso por finalidad.", "Sin anonimato absoluto ni valor jurídico automático."],
      advancedTitle: "Información técnica y módulos avanzados", advancedLead: "Material de Build Week, arquitectura conceptual, auditoría y módulos de demostración preservados fuera del recorrido principal.", v36: "La versión pública v36 permanece intacta.", configTitle: "Fuente única de alertas y derivaciones", configLead: "Las opciones visibles, las rutas simuladas y las consolas se leen desde una configuración común.", actionMessage: "Seleccione una acción para continuar.",
    },
    "en-US": {
      documentTitle: "PIPO Emergency Layer - Unified operational presentation", navCitizen: "Citizen", navCoordination: "Coordination", navConsoles: "Consoles", navField: "Field", navJustice: "Prosecution and reports", navDocs: "Documentation", navClosure: "Closure", all: "All consoles", activeAgencies: "Active agencies",
      eyebrow: "Conceptual coordination demonstration", title: "PIPO Emergency Layer", claim: "Immediate help. Parallel coordination. Traceable procedures.",
      lead: "PIPO is envisioned as an immediate-activation application that connects the citizen, institutional consoles, and field operators in one documented operational thread.",
      start: "Start demonstration", fullFlow: "View full flow", advanced: "Explore advanced modules", restart: "Restart", filming: "Recording mode", filmingOn: "Recording mode enabled", language: "Language", spanish: "Spanish", english: "English",
      citizen: "Citizen device", master: "Master console", field: "Field operator", records: "Records", individualActs: "Individual acts", procedure: "Procedure act", masterRecord: "Master incident record", citizenClosure: "Citizen closure",
      simulated: "Concept demonstration: fictional data, location, audio, video, resources, and documents. No official connections or real sensors.", simulatedLabel: "Simulated",
      openPipo: "Open PIPO point", closePipo: "Close PIPO point", choose: "Select a condition", securityDetail: "Security detail", condition: "Condition", chooseSecurity: "Select the situation", armedInjured: "Armed person and injured person", danger: "Immediate danger or crime in progress", confidential: "Information without immediate danger", reserved: "Reserved or protected identity is subject to protocol, jurisdiction, and applicable law.", confidentialFields: ["Simulated description", "Fictional approximate location", "Fictional photo, video, or document", "Date and time", "Request for reserved identity", "Secure contact channel", "Delivery consent"], submitConfidential: "Register simulated submission",
      permissionTitle: "Simulated permissions for this incident", simulatedLocation: "Simulated location", simulatedAudio: "Simulated audio", simulatedVideo: "Simulated video", description: "Structured account", activateAlert: "Activate simulated alert", alertPrepared: "Alert ready for human validation", noRealReport: "This is not a real report and does not replace emergency services.",
      scenario: "Presentation scenario", scenarioTitle: "Robbery with a possibly armed person and an injured person", priority: "Priority", critical: "Critical", pending: "Pending", validated: "Validated by a human operator", active: "Active", closed: "Closed", humanRequired: "Human confirmation required", incident: "Incident", location: "Location", permissions: "Permissions", risks: "Risks", missing: "Missing information", narration: "Initial account", noMissing: "No missing information for this demonstration",
      validateAlert: "Validate alert", adjustPriority: "Adjust priority", routeParallel: "Route in parallel", requestInfo: "Request information", addAgency: "Add agency", viewDocs: "View documentation", validateClosure: "Validate closure", routed: "Parallel routing prepared", receiving: "Receives only the minimum information needed for its purpose.",
      consolesTitle: "Specialized consoles", consolesLead: "Each operational base receives only context enabled for its purpose. No connection is real.", operator: "Active operator", session: "Session", inbox: "Inbox", resources: "Resources", communications: "Communications", documents: "Documentation", actions: "Actions", involved: "Participating agencies", noAccess: "No access to this incident", assigned: "Assigned", awaiting: "Waiting",
      confirmResource: "Confirm resource", confirmed: "Confirmed by operator", resourceSuggestion: "Suggested resource", proximity: "Simulated distance", specialty: "Specialty", availability: "Availability", eta: "ETA", confirmLead: "A suggestion does not assign a resource on its own.",
      commTitle: "Inter-agency communications", commLead: "Structured inbox; it is not an informal chat.", communicationId: "Communication ID", sender: "Sender", recipient: "Recipient", purpose: "Purpose", status: "Status", read: "Read receipt", integrity: "Demonstration integrity", operationalMessage: "Operational message", supportRequest: "Support request", informationRequest: "Information request", diligenceRequest: "Diligence request", response: "Response", sharedDocument: "Shared document", priorityUpdate: "Priority update", acceptance: "Acceptance", motivatedRejection: "Reasoned rejection",
      sharedContext: "Shared incident context", sharedContextLead: "Simulated information shared by the console according to permissions and purpose.", arrival: "Arrival", departure: "Departure", accept: "Accept", reportDeparture: "Report departure", reportArrival: "Report arrival", startIntervention: "Start intervention", updateStatus: "Update status", requestSupport: "Request support", consultProsecution: "Consult prosecution", sendCommunication: "Send communication", finish: "Finish intervention", createAct: "Create act", fieldInstruction: "Prioritize life, scene safety, and inter-agency coordination.", agenciesOnWay: "Other agencies en route", activationTime: "Activation time", elapsed: "Elapsed time", evidenceTitle: "Fictional field evidence", addEvidence: "Add fictional evidence", evidenceAdded: "Fictional photo, audio, and video added", evidenceNote: "No camera, microphone, location, or personal file is used.",
      justiceTitle: "Field consultation to prosecution", institutionalNotice: "Conceptual demonstration with no real institutional connection.", justiceNotice: "It is not a real prosecutorial action or judicial order.", consultation: "Consultation", urgency: "Urgency", reference: "Fictional reference", sendConsultation: "Send simulated consultation", simulateResponse: "Simulate prosecution response", received: "Received", answered: "Answered", completed: "Closed", prosecutorAnswer: "Preserve the scene, expand the information, and record the action. Simulated response.", stationTitle: "Police station console", stationNotice: "It is not a real police report.", stationScope: "The police station adds its own reference to the record without modifying the citizen record or other agencies' acts.", municipalTitle: "147 — Municipal attention and response", municipalNotice: "It does not create an official municipal request.", municipalCategory: "Simulated category", municipalRoute: "Assigned area", municipalTime: "Estimated timeframe", municipalClose: "Citizen closure",
      actsTitle: "Acts and master record", actsLead: "Each agency keeps its own authorship; the master record links references without rewriting individual acts.", actReady: "Individual act available", procedureReady: "Procedure act prepared", masterReady: "Master incident record updated", closureReady: "Ready for closure validation", evidenceReference: "Evidence reference", externalRef: "Document reference", finaliseDocs: "Generate simulated acts", documentationStatus: "Documentation status",
      closureTitle: "Return to the citizen", closureLead: "The master console validates closure before returning a summary, receipt, and next steps to the citizen device.", deliver: "Deliver citizen closure", package: "Summary and receipt", nextSteps: "Next steps", receipt: "Receipt confirmation", deliveryPending: "Awaiting validation and delivery", deliveryDone: "Closure delivered to the citizen device", nextStepOne: "Keep the demonstration receipt if you need to review the walkthrough.", nextStepTwo: "For a real emergency, use your jurisdiction's official channels.",
      tourTitle: "Professional presentation walkthrough", tourLead: "Eight steps, designed to explain the complete case in under two minutes and thirty seconds.", step: "Step", next: "Next", previous: "Previous", tourStart: "Start walkthrough", tourRestart: "Restart walkthrough", stepLabels: ["Citizen activation", "Human validation", "Parallel routing", "Resource confirmation", "Field context", "Evidence and consultation", "Acts and master record", "Citizen closure"],
      limitsTitle: "Scope and limits", limits: ["Concept demonstration with fictional data.", "No official connection, automatic dispatch, or real report.", "No sensors, tracking, or background surveillance.", "Human control is mandatory and access is purpose-based.", "No absolute anonymity or automatic legal value."],
      advancedTitle: "Technical information and advanced modules", advancedLead: "Build Week material, conceptual architecture, audit, and demonstration modules kept outside the primary walkthrough.", v36: "The public v36 version remains intact.", configTitle: "Single alert and routing source", configLead: "Visible options, simulated routes, and consoles read from a shared configuration.", actionMessage: "Choose an action to continue.",
    },
  };

  const state = {
    locale: "es-AR",
    menuOpen: false,
    selectedAlert: "security",
    armedInjured: true,
    permissions: { location: true, audio: true, video: true },
    alertSent: false,
    validated: false,
    routed: false,
    resourcesConfirmed: { security: false, health: false },
    fieldStage: "pending",
    evidenceAdded: false,
    consultation: "pending",
    actsReady: false,
    closureValidated: false,
    delivered: false,
    tourStep: 0,
    filming: false,
    message: "",
    ledger: [],
  };

  function t(key) { return copy[state.locale][key]; }
  function alert() { return config.getAlert(state.selectedAlert); }
  function label(item) { return config.label(item, state.locale); }
  function addEvent(code, detail) {
    state.ledger.push({ code, detail, time: `10:${String(12 + state.ledger.length).padStart(2, "0")}` });
  }
  function activeRoute() {
    const selected = alert();
    const route = [...selected.route];
    if (state.armedInjured && selected.routeWhen?.injured) selected.routeWhen.injured.forEach((id) => { if (!route.includes(id)) route.push(id); });
    return route;
  }
  function activeResources() { return activeRoute().filter((id) => config.resources[id]); }
  function allResourcesConfirmed() { return activeResources().every((id) => state.resourcesConfirmed[id]); }
  function incidentId() { return "PIPO-DEMO-4821"; }
  function priorityClass() { return alert().priority === "critical" ? "critical" : "warning"; }
  function statusText(value) {
    return ({ pending: t("pending"), accepted: t("accepted"), departed: t("departure"), arrived: t("arrival"), active: t("active"), completed: t("completed") })[value] || t("pending");
  }
  function escape(value) { return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char])); }
  function phoneStatus() { return state.alertSent ? t("alertPrepared") : t("openPipo"); }
  function consoleName(id) { return label(config.getConsole(id)); }
  function sectionClass(step) { return state.tourStep === step ? "is-tour-active" : ""; }

  function renderHeader() {
    return `<header class="presentation-header">
      <a class="presentation-brand" href="#presentationCitizen" aria-label="PIPO Emergency Layer">PIPO<span>+</span></a>
      <nav class="presentation-nav" aria-label="${t("title")}">
        <a href="#presentationCitizen">${t("navCitizen")}</a><a href="#presentationMaster">${t("navCoordination")}</a><a href="#presentationConsoles">${t("navConsoles")}</a><a href="#presentationField">${t("navField")}</a><a href="#presentationJustice">${t("navJustice")}</a><a href="#presentationDocumentation">${t("navDocs")}</a><a href="#presentationClosure">${t("navClosure")}</a>
      </nav>
      <label class="presentation-locale"><span>${t("language")}</span><select data-unified-action="locale"><option value="es-AR" ${state.locale === "es-AR" ? "selected" : ""}>${t("spanish")}</option><option value="en-US" ${state.locale === "en-US" ? "selected" : ""}>${t("english")}</option></select></label>
    </header>`;
  }

  function renderHero() {
    return `<section class="presentation-hero" aria-labelledby="presentationTitle">
      <div class="presentation-hero-copy"><p class="presentation-kicker">${t("eyebrow")}</p><h1 id="presentationTitle">${t("title")}</h1><h2>${t("claim")}</h2><p>${t("lead")}</p>
        <div class="presentation-actions"><button type="button" class="presentation-primary" data-unified-action="start-tour">${t("start")}</button><a class="presentation-secondary" href="#presentationCitizen">${t("fullFlow")}</a><a class="presentation-secondary" href="advanced.html">${t("advanced")}</a><button type="button" class="presentation-icon-action" data-unified-action="restart" title="${t("restart")}" aria-label="${t("restart")}">↺</button></div>
      </div>
      <div class="presentation-hero-map" aria-label="${t("claim")}"><div class="hero-grid-line line-one"></div><div class="hero-grid-line line-two"></div><div class="hero-node hero-citizen">${t("citizen")}</div><div class="hero-node hero-master">${t("master")}</div><div class="hero-node hero-field">${t("field")}</div><div class="hero-flow">${t("citizen")} <b>→</b> ${t("master")} <b>→</b> ${t("field")}</div></div>
      <p class="presentation-simulation-notice">${t("simulated")}</p>
    </section>`;
  }

  function renderTour() {
    const steps = t("stepLabels");
    return `<section class="presentation-tour" aria-labelledby="tourTitle"><div><p class="presentation-kicker">${t("tourTitle")}</p><h2 id="tourTitle">${t("tourLead")}</h2></div>
      <div class="presentation-tour-controls"><button type="button" data-unified-action="tour-previous" ${state.tourStep <= 1 ? "disabled" : ""}>${t("previous")}</button><button type="button" class="presentation-primary" data-unified-action="tour-next">${state.tourStep ? t("next") : t("tourStart")}</button><button type="button" data-unified-action="film">${state.filming ? t("filmingOn") : t("filming")}</button><button type="button" data-unified-action="restart">${t("tourRestart")}</button></div>
      <ol class="presentation-tour-steps">${steps.map((name, index) => `<li class="${state.tourStep === index + 1 ? "is-active" : ""} ${state.tourStep > index + 1 ? "is-complete" : ""}"><span>${index + 1}</span>${name}</li>`).join("")}</ol>
      <p class="presentation-live" role="status" aria-live="polite">${escape(state.message || t("actionMessage"))}</p></section>`;
  }

  function renderRouteSummary() {
    return `<div class="presentation-record-flow"><strong>${t("records")}</strong><span>${t("individualActs")}</span><b>→</b><span>${t("procedure")}</span><b>→</b><span>${t("masterRecord")}</span><b>→</b><span>${t("citizenClosure")}</span></div>`;
  }

  function renderCitizen() {
    const selected = alert();
    const subtypes = state.locale === "es-AR" ? ["Robo o intento de robo", "Persona armada", "Amenaza o agresión", "Hecho ilícito en desarrollo", "Violación de domicilio", "Actividad sospechosa", "Necesito presencia policial", "Aportar información o evidencia"] : ["Robbery or attempted robbery", "Armed person", "Threat or assault", "Crime in progress", "Home intrusion", "Suspicious activity", "Need police presence", "Submit information or evidence"];
    return `<section id="presentationCitizen" class="presentation-section presentation-citizen ${sectionClass(1)}" aria-labelledby="citizenTitle"><div class="presentation-section-heading"><div><p class="presentation-kicker">A</p><h2 id="citizenTitle">${t("citizen")}</h2><p>${t("noRealReport")}</p></div><span class="presentation-step-tag">${t("step")} 1</span></div>
      <div class="presentation-device-layout"><article class="presentation-phone citizen-phone"><div class="phone-status"><span>9:41</span><span>● ● ●</span></div><div class="phone-appbar"><b>PIPO</b><span>${t("simulatedLabel")}</span></div><div class="phone-message-card"><span class="phone-contact-dot"></span><div><strong>${t("scenarioTitle")}</strong><small>${phoneStatus()}</small></div></div>
        <button type="button" class="pipo-floating-point" data-unified-action="toggle-menu" aria-expanded="${state.menuOpen}" aria-controls="presentationAlertMenu" aria-label="${t("openPipo")}">+</button>
        <div class="phone-screen-lines"><span></span><span></span><span></span><span></span></div><footer><span>⌂</span><span>◌</span><span>⌁</span></footer></article>
        <div id="presentationAlertMenu" class="presentation-alert-workbench ${state.menuOpen ? "is-open" : ""}"><div class="presentation-workbench-head"><div><p>${t("choose")}</p><h3>${label(selected)}</h3></div><button type="button" data-unified-action="toggle-menu">${t("closePipo")}</button></div>
          <div class="presentation-alert-grid">${config.alerts.map((item) => `<button type="button" class="presentation-alert-option ${item.id === selected.id ? "is-selected" : ""}" data-unified-action="select-alert" data-alert-id="${item.id}"><span>${item.icon}</span>${label(item)}</button>`).join("")}</div>
          ${selected.id === "security" ? `<div class="presentation-subtype-panel"><div><p>${t("securityDetail")}</p><strong>${t("armedInjured")}</strong><small>${t("danger")}</small></div><div class="presentation-subtypes">${subtypes.map((item, index) => `<span class="${index === 1 ? "is-picked" : ""}">${item}</span>`).join("")}</div><p class="presentation-reserved">${t("reserved")}</p></div>` : ""}
          ${selected.id === "confidential" ? `<div class="presentation-confidential"><strong>${t("confidential")}</strong><p>${t("reserved")}</p><div class="presentation-confidential-fields">${t("confidentialFields").map((item, index) => `<span><b>${String(index + 1).padStart(2, "0")}</b>${item}</span>`).join("")}</div><button type="button" data-unified-action="confidential-submit">${t("submitConfidential")}</button><small>${t("noRealReport")}</small></div>` : ""}
          ${selected.id === "municipal147" ? `<div class="presentation-municipal-categories">${selected.municipalCategories.map((item) => `<span>${item}</span>`).join("")}</div>` : ""}
          <fieldset class="presentation-permission-set"><legend>${t("permissionTitle")}</legend>${["location", "audio", "video"].map((key) => `<label><input type="checkbox" data-unified-permission="${key}" ${state.permissions[key] ? "checked" : ""} />${t(`simulated${key[0].toUpperCase()}${key.slice(1)}`)}</label>`).join("")}<span>${t("description")}</span></fieldset>
          <button type="button" class="presentation-primary presentation-alert-submit" data-unified-action="send-alert">${t("activateAlert")}</button>
        </div></div>
      ${renderRouteSummary()}</section>`;
  }

  function renderMaster() {
    const route = activeRoute();
    return `<section id="presentationMaster" class="presentation-section presentation-master ${sectionClass(2)}" aria-labelledby="masterTitle"><div class="presentation-section-heading"><div><p class="presentation-kicker">B</p><h2 id="masterTitle">${t("master")}</h2><p>${t("receiving")}</p></div><span class="presentation-step-tag">${t("step")} 2–3</span></div>
      <div class="master-console-surface"><header><div><span class="console-live-dot"></span>${t("master")} <small>${t("session")} · Turno A / Demo</small></div><span class="presentation-chip ${priorityClass()}">${t("priority")}: ${t("critical")}</span></header><div class="master-console-grid"><article class="master-alert-card"><p>${t("incident")}</p><h3>${incidentId()}</h3><strong>${t("scenarioTitle")}</strong><dl><div><dt>${t("location")}</dt><dd>${t("simulatedLocation")}</dd></div><div><dt>${t("permissions")}</dt><dd>${t("simulatedAudio")} · ${t("simulatedVideo")}</dd></div><div><dt>${t("risks")}</dt><dd>${t("armedInjured")}</dd></div><div><dt>${t("missing")}</dt><dd>${t("noMissing")}</dd></div></dl></article>
        <article class="master-action-card"><p>${t("actions")}</p><div class="presentation-button-grid"><button type="button" data-unified-action="validate">${t("validateAlert")}</button><button type="button" data-unified-action="priority">${t("adjustPriority")}</button><button type="button" class="presentation-primary" data-unified-action="route" ${state.validated ? "" : "disabled"}>${t("routeParallel")}</button><button type="button" data-unified-action="request">${t("requestInfo")}</button><button type="button" data-unified-action="add-console">${t("addAgency")}</button><button type="button" data-unified-action="docs">${t("viewDocs")}</button></div><p class="master-human-note">${state.validated ? t("validated") : t("humanRequired")}</p></article>
        <article class="master-route-card"><p>${t("involved")}</p><div class="presentation-route-chips">${route.map((id) => `<span class="${state.routed ? "is-routed" : ""}">${consoleName(id)}</span>`).join("")}</div><strong>${state.routed ? t("routed") : t("pending")}</strong><small>${t("confirmLead")}</small></article></div></div></section>`;
  }

  function renderConsoles() {
    const route = activeRoute();
    return `<section id="presentationConsoles" class="presentation-section presentation-consoles ${sectionClass(3)}" aria-labelledby="consolesTitle"><div class="presentation-section-heading"><div><p class="presentation-kicker">C</p><h2 id="consolesTitle">${t("consolesTitle")}</h2><p>${t("consolesLead")}</p></div><span class="presentation-step-tag">${t("step")} 3–4</span></div>
      <div class="presentation-console-grid">${Object.values(config.consoles).map((console) => { const involved = route.includes(console.id); return `<article class="presentation-console-card ${involved ? "is-involved" : ""}"><header><span class="console-kind ${console.kind}"></span><div><h3>${label(console)}</h3><small>${t("operator")}: ${involved ? "Turno / Demo" : "—"} · ${t("session")}: DEMO-01</small></div><span class="presentation-chip ${involved ? "success" : "muted"}">${involved ? t("active") : t("noAccess")}</span></header><dl><div><dt>${t("inbox")}</dt><dd>${involved && state.routed ? t("received") : t("awaiting")}</dd></div><div><dt>${t("communications")}</dt><dd>${involved ? "1" : "0"}</dd></div><div><dt>${t("resources")}</dt><dd>${involved ? t("assigned") : "—"}</dd></div><div><dt>${t("documents")}</dt><dd>${involved ? t("pending") : "—"}</dd></div><div><dt>${t("priority")}</dt><dd>${involved ? t("critical") : "—"}</dd></div></dl>${config.resources[console.id] ? `<div class="presentation-resource-suggestion"><strong>${t("resourceSuggestion")}</strong><span>${config.resources[console.id].unit}</span><span>${t("proximity")}: ${config.resources[console.id].distance}</span><span>${t("eta")}: ${config.resources[console.id].eta}</span><button type="button" data-unified-action="confirm-resource" data-resource="${console.id}" ${state.routed && !state.resourcesConfirmed[console.id] ? "" : "disabled"}>${state.resourcesConfirmed[console.id] ? t("confirmed") : t("confirmResource")}</button></div>` : ""}</article>`; }).join("")}</div>
      <aside class="presentation-confirmation-note"><strong>${t("humanRequired")}</strong><span>${t("confirmLead")}</span></aside></section>`;
  }

  function renderCommunications() {
    const rows = state.routed ? config.getCommunicationRows(activeRoute(), state.locale) : [];
    return `<section class="presentation-section presentation-communications" aria-labelledby="communicationsTitle"><div class="presentation-section-heading"><div><p class="presentation-kicker">${t("communications")}</p><h2 id="communicationsTitle">${t("commTitle")}</h2><p>${t("commLead")}</p></div></div><div class="presentation-communications-table" role="region" aria-label="${t("commTitle")}"><div class="communications-row communications-head"><span>${t("communicationId")}</span><span>${t("sender")}</span><span>${t("recipient")}</span><span>${t("purpose")}</span><span>${t("status")}</span></div>${rows.length ? rows.map((row) => `<article class="communications-row"><strong>${row.id}</strong><span>${consoleName(row.sender)}</span><span>${row.recipient === "activeRoute" ? t("activeAgencies") : consoleName(row.recipient)}</span><span><b>${t(row.purpose)}</b>${row.message}</span><span>${t(row.status)} · ${t("integrity")}</span></article>`).join("") : `<p class="presentation-empty">${t("pending")}</p>`}</div></section>`;
  }

  function renderField() {
    const evidence = state.evidenceAdded ? t("evidenceAdded") : t("evidenceNote");
    return `<section id="presentationField" class="presentation-section presentation-field ${sectionClass(5)}" aria-labelledby="fieldTitle"><div class="presentation-section-heading"><div><p class="presentation-kicker">D</p><h2 id="fieldTitle">${t("field")}</h2><p>${t("sharedContextLead")}</p></div><span class="presentation-step-tag">${t("step")} 5–6</span></div><div class="presentation-field-layout">
        <article class="presentation-phone field-phone"><div class="phone-status"><span>10:21</span><span>● ● ●</span></div><div class="phone-appbar"><b>PIPO Field</b><span>${statusText(state.fieldStage)}</span></div><div class="field-context-card"><p>${t("sharedContext")}</p><h3>${t("scenarioTitle")}</h3><div class="field-media"><span>${t("simulatedVideo")}</span><span>${t("simulatedAudio")}</span><span>${t("simulatedLocation")}</span></div><dl><div><dt>${t("priority")}</dt><dd>${t("critical")}</dd></div><div><dt>${t("risks")}</dt><dd>${t("armedInjured")}</dd></div><div><dt>${t("agenciesOnWay")}</dt><dd>${consoleName("health")} · ${consoleName("prosecution")}</dd></div><div><dt>${t("activationTime")}</dt><dd>10:12</dd></div><div><dt>${t("elapsed")}</dt><dd>00:09:42</dd></div></dl><p>${t("fieldInstruction")}</p></div><div class="field-phone-actions"><button type="button" data-unified-action="field-accept">${t("accept")}</button><button type="button" data-unified-action="field-depart">${t("reportDeparture")}</button><button type="button" data-unified-action="field-arrive">${t("reportArrival")}</button><button type="button" data-unified-action="field-start">${t("startIntervention")}</button><button type="button" data-unified-action="field-complete">${t("finish")}</button></div></article>
      <article class="presentation-field-workspace"><header><div><p>${t("evidenceTitle")}</p><h3>${t("fieldInstruction")}</h3></div><span class="presentation-chip success">${t("simulated")}</span></header><div class="field-workspace-grid"><div><h4>${t("actions")}</h4><div class="presentation-button-grid"><button type="button" data-unified-action="field-status">${t("updateStatus")}</button><button type="button" data-unified-action="field-support">${t("requestSupport")}</button><button type="button" data-unified-action="consult">${t("consultProsecution")}</button><button type="button" data-unified-action="send-communication">${t("sendCommunication")}</button><button type="button" data-unified-action="field-evidence">${t("addEvidence")}</button><button type="button" data-unified-action="field-act">${t("createAct")}</button></div></div><div><h4>${t("evidenceReference")}</h4><p>${evidence}</p><ul class="presentation-mini-ledger">${state.evidenceAdded ? `<li>EVD-DEMO-001 · ${t("simulatedVideo")} · 10:18</li><li>EVD-DEMO-002 · ${t("simulatedAudio")} · 10:19</li><li>EVD-DEMO-003 · ${state.locale === "es-AR" ? "Fotografía ficticia" : "Fictional photograph"} · 10:20</li>` : `<li>${t("pending")}</li>`}</ul></div></div><p class="presentation-legal-note">${t("evidenceNote")}</p></article></div></section>`;
  }

  function renderJustice() {
    const consultationState = state.consultation === "answered" ? t("answered") : state.consultation === "received" ? t("received") : t("pending");
    return `<section id="presentationJustice" class="presentation-section presentation-justice ${sectionClass(6)}" aria-labelledby="justiceTitle"><div class="presentation-section-heading"><div><p class="presentation-kicker">E</p><h2 id="justiceTitle">${t("justiceTitle")}</h2><p>${t("institutionalNotice")} ${t("justiceNotice")}</p></div><span class="presentation-step-tag">${t("step")} 6</span></div><div class="presentation-justice-grid"><article><h3>${t("consultation")}</h3><dl><div><dt>${t("urgency")}</dt><dd>${t("critical")}</dd></div><div><dt>${t("reference")}</dt><dd>REF-DEMO-231</dd></div><div><dt>${t("status")}</dt><dd>${consultationState}</dd></div></dl><p>${state.locale === "es-AR" ? "Consulta simulada sobre preservación de escena y ampliación de información." : "Simulated consultation about scene preservation and information expansion."}</p><div class="presentation-button-grid"><button type="button" data-unified-action="send-consultation">${t("sendConsultation")}</button><button type="button" class="presentation-primary" data-unified-action="answer-consultation" ${state.consultation === "received" ? "" : "disabled"}>${t("simulateResponse")}</button></div></article><article><h3>${t("response")}</h3><p>${state.consultation === "answered" ? t("prosecutorAnswer") : t("pending")}</p><span class="presentation-chip ${state.consultation === "answered" ? "success" : "muted"}">${consultationState}</span><p class="presentation-document-ref">DOC-DEMO-FIS-019 · ${t("integrity")}</p></article><article><h3>${t("stationTitle")}</h3><p>${t("institutionalNotice")}</p><p>${t("stationNotice")}</p><p>${t("stationScope")}</p><dl><div><dt>${t("inbox")}</dt><dd>${state.routed ? t("received") : t("awaiting")}</dd></div><div><dt>${t("documents")}</dt><dd>${state.actsReady ? t("actReady") : t("pending")}</dd></div></dl></article></div>
      <article class="presentation-municipal-card"><div><p>${t("municipalTitle")}</p><h3>${t("institutionalNotice")}</h3><p>${t("municipalNotice")}</p></div><dl><div><dt>${t("municipalCategory")}</dt><dd>${state.locale === "es-AR" ? "Infraestructura" : "Infrastructure"}</dd></div><div><dt>${t("municipalRoute")}</dt><dd>${state.locale === "es-AR" ? "Espacio público / Defensa Civil" : "Public space / Civil protection"}</dd></div><div><dt>${t("municipalTime")}</dt><dd>48 h · ${t("simulated")}</dd></div><div><dt>${t("municipalClose")}</dt><dd>${t("pending")}</dd></div></dl></article></section>`;
  }

  function renderDocumentation() {
    const acts = [consoleName("security"), consoleName("health"), consoleName("prosecution")];
    return `<section id="presentationDocumentation" class="presentation-section presentation-documentation ${sectionClass(7)}" aria-labelledby="documentationTitle"><div class="presentation-section-heading"><div><p class="presentation-kicker">F</p><h2 id="documentationTitle">${t("actsTitle")}</h2><p>${t("actsLead")}</p></div><span class="presentation-step-tag">${t("step")} 7</span></div><div class="presentation-document-grid">${acts.map((name, index) => `<article class="presentation-act-card"><header><span>${index + 1}</span><div><h3>${name}</h3><small>${state.actsReady ? t("actReady") : t("pending")}</small></div></header><dl><div><dt>${t("externalRef")}</dt><dd>ACT-DEMO-0${index + 1}</dd></div><div><dt>${t("evidenceReference")}</dt><dd>EVD-DEMO-00${index + 1}</dd></div><div><dt>${t("status")}</dt><dd>${state.actsReady ? t("completed") : t("pending")}</dd></div></dl></article>`).join("")}</div><div class="presentation-master-record"><div><p>${t("masterRecord")}</p><h3>${t("masterReady")}</h3><span>${incidentId()} · DOC-DEMO-MASTER-001</span></div><div><p>${t("documentationStatus")}</p><strong>${state.actsReady ? t("closureReady") : t("pending")}</strong><button type="button" class="presentation-primary" data-unified-action="create-acts">${t("finaliseDocs")}</button></div></div></section>`;
  }

  function renderClosure() {
    return `<section id="presentationClosure" class="presentation-section presentation-closure ${sectionClass(8)}" aria-labelledby="closureTitle"><div class="presentation-section-heading"><div><p class="presentation-kicker">G</p><h2 id="closureTitle">${t("closureTitle")}</h2><p>${t("closureLead")}</p></div><span class="presentation-step-tag">${t("step")} 8</span></div><div class="presentation-closure-layout"><article class="presentation-closure-console"><h3>${t("master")}</h3><p>${state.closureValidated ? t("closureReady") : t("deliveryPending")}</p><div class="presentation-button-grid"><button type="button" data-unified-action="validate-closure" ${state.actsReady ? "" : "disabled"}>${t("validateClosure")}</button><button type="button" class="presentation-primary" data-unified-action="deliver" ${state.closureValidated ? "" : "disabled"}>${t("deliver")}</button></div><dl><div><dt>${t("procedure")}</dt><dd>${state.actsReady ? t("procedureReady") : t("pending")}</dd></div><div><dt>${t("masterRecord")}</dt><dd>${state.actsReady ? t("masterReady") : t("pending")}</dd></div></dl></article><article class="presentation-phone closure-phone"><div class="phone-status"><span>10:28</span><span>● ● ●</span></div><div class="phone-appbar"><b>PIPO</b><span>${t("simulatedLabel")}</span></div><div class="closure-package"><p>${state.delivered ? t("deliveryDone") : t("deliveryPending")}</p><h3>${t("package")}</h3><dl><div><dt>${t("incident")}</dt><dd>${incidentId()}</dd></div><div><dt>${t("receipt")}</dt><dd>${state.delivered ? "REC-DEMO-821" : "—"}</dd></div></dl><ol><li>${t("nextStepOne")}</li><li>${t("nextStepTwo")}</li></ol></div></article></div></section>`;
  }

  function renderAdvanced() {
    return `<aside id="presentationAdvanced" class="presentation-advanced"><h2>${t("advancedTitle")}</h2><p>${t("advancedLead")}</p><p>${t("v36")}</p><a class="presentation-secondary" href="advanced.html">${t("advanced")}</a></aside>`;
  }

  function render() {
    document.documentElement.lang = state.locale;
    document.title = t("documentTitle");
    document.body.classList.toggle("presentation-filming", state.filming);
    root.innerHTML = `${renderHeader()}<main class="presentation-main">${renderHero()}${renderTour()}${renderCitizen()}${renderMaster()}${renderConsoles()}${renderCommunications()}${renderField()}${renderJustice()}${renderDocumentation()}${renderClosure()}${renderAdvanced()}</main>`;
    bindEvents();
  }

  function scrollToCurrentStep() {
    const targets = ["presentationCitizen", "presentationMaster", "presentationConsoles", "presentationConsoles", "presentationField", "presentationJustice", "presentationDocumentation", "presentationClosure"];
    const target = document.getElementById(targets[Math.max(0, state.tourStep - 1)]);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function restart() {
    Object.assign(state, { menuOpen: false, selectedAlert: "security", armedInjured: true, permissions: { location: true, audio: true, video: true }, alertSent: false, validated: false, routed: false, resourcesConfirmed: { security: false, health: false }, fieldStage: "pending", evidenceAdded: false, consultation: "pending", actsReady: false, closureValidated: false, delivered: false, tourStep: 0, message: "", ledger: [] });
  }

  function advanceTour() {
    if (!state.tourStep) state.tourStep = 1;
    else state.tourStep = Math.min(8, state.tourStep + 1);
    const actions = {
      1: () => { state.menuOpen = true; state.alertSent = true; addEvent("citizen.alert.confirmed", "simulated citizen alert"); },
      2: () => { state.validated = true; addEvent("master.alert.validated", "human validation"); },
      3: () => { state.routed = true; addEvent("master.parallel.routing", "911, 107, prosecution"); },
      4: () => { activeResources().forEach((id) => { state.resourcesConfirmed[id] = true; }); addEvent("resources.human.confirmation", "human confirmed resources"); },
      5: () => { state.fieldStage = "arrived"; addEvent("field.context.received", "simulated context delivered"); },
      6: () => { state.evidenceAdded = true; state.consultation = "answered"; addEvent("field.evidence.added", "fictional evidence"); addEvent("prosecution.response", "simulated response"); },
      7: () => { state.actsReady = true; addEvent("documentation.acts.created", "individual acts and master record"); },
      8: () => { state.closureValidated = true; state.delivered = true; addEvent("citizen.closure.delivered", "summary and receipt"); },
    };
    actions[state.tourStep]();
    state.message = `${t("step")} ${state.tourStep}: ${t("stepLabels")[state.tourStep - 1]}.`;
    render();
    scrollToCurrentStep();
  }

  function bindEvents() {
    root.querySelectorAll("[data-unified-action]").forEach((button) => {
      button.addEventListener("click", () => {
        const action = button.dataset.unifiedAction;
        if (action === "locale") return;
        if (action === "toggle-menu") state.menuOpen = !state.menuOpen;
        if (action === "select-alert") { state.selectedAlert = button.dataset.alertId; state.menuOpen = true; state.message = `${t("condition")}: ${label(alert())}.`; }
        if (action === "send-alert") { state.alertSent = true; state.message = t("alertPrepared"); addEvent("citizen.alert.confirmed", label(alert())); }
        if (action === "confidential-submit") { state.alertSent = true; state.message = `${t("submitConfidential")}: REF-DEMO-CONF-011`; addEvent("citizen.confidential.submission", "REF-DEMO-CONF-011"); }
        if (action === "validate") { state.validated = true; state.message = t("validated"); addEvent("master.alert.validated", incidentId()); }
        if (action === "priority") { state.message = `${t("priority")}: ${t("critical")} · ${t("validated")}`; }
        if (action === "route") { state.routed = true; state.message = t("routed"); addEvent("master.parallel.routing", activeRoute().join(",")); }
        if (action === "request" || action === "add-console" || action === "docs") state.message = t("receiving");
        if (action === "confirm-resource") { state.resourcesConfirmed[button.dataset.resource] = true; state.message = `${config.resources[button.dataset.resource].unit}: ${t("confirmed")}`; addEvent("resources.human.confirmation", button.dataset.resource); }
        if (action === "field-accept") { state.fieldStage = "accepted"; state.message = t("accept"); }
        if (action === "field-depart") { state.fieldStage = "departed"; state.message = t("departure"); }
        if (action === "field-arrive") { state.fieldStage = "arrived"; state.message = t("arrival"); }
        if (action === "field-start" || action === "field-status") { state.fieldStage = "active"; state.message = t("active"); }
        if (action === "field-complete") { state.fieldStage = "completed"; state.message = t("completed"); }
        if (action === "field-support" || action === "send-communication") state.message = t("supportRequest");
        if (action === "field-evidence") { state.evidenceAdded = true; state.message = t("evidenceAdded"); addEvent("field.evidence.added", "EVD-DEMO"); }
        if (action === "field-act") { state.actsReady = true; state.message = t("actReady"); }
        if (action === "consult" || action === "send-consultation") { state.consultation = "received"; state.message = t("received"); addEvent("prosecution.consultation.received", "REF-DEMO-231"); }
        if (action === "answer-consultation") { state.consultation = "answered"; state.message = t("answered"); addEvent("prosecution.response", "DOC-DEMO-FIS-019"); }
        if (action === "create-acts") { state.actsReady = true; state.message = t("closureReady"); addEvent("documentation.acts.created", "ACT-DEMO"); }
        if (action === "validate-closure") { state.closureValidated = true; state.message = t("closureReady"); addEvent("master.closure.validated", incidentId()); }
        if (action === "deliver") { state.delivered = true; state.message = t("deliveryDone"); addEvent("citizen.closure.delivered", incidentId()); }
        if (action === "restart") restart();
        if (action === "film") { state.filming = !state.filming; state.message = state.filming ? t("filmingOn") : t("actionMessage"); }
        if (action === "start-tour" || action === "tour-next") { advanceTour(); return; }
        if (action === "tour-previous") { state.tourStep = Math.max(1, state.tourStep - 1); state.message = `${t("step")} ${state.tourStep}: ${t("stepLabels")[state.tourStep - 1]}.`; render(); scrollToCurrentStep(); return; }
        render();
      });
    });
    root.querySelectorAll('select[data-unified-action="locale"]').forEach((select) => select.addEventListener("change", () => {
      state.locale = select.value;
      render();
    }));
    root.querySelectorAll("[data-unified-permission]").forEach((input) => input.addEventListener("change", () => { state.permissions[input.dataset.unifiedPermission] = input.checked; state.message = t("permissionTitle"); render(); }));
  }

  render();
})();
