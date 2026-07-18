(function () {
  "use strict";

  const LOCALE_STORAGE_KEY = "pipo_demo_locale";
  const DEFAULT_LOCALE = "es-AR";
  const root = document.getElementById("pipoCitizenExperience");

  if (!root) return;

  const copy = {
    "es-AR": {
      documentTitle: "PIPO Emergency Layer - Activacion ciudadana simulada",
      eyebrow: "Aplicacion de emergencia proyectada",
      headline: "PIPO Emergency Layer",
      tagline: "Ayuda inmediata. Contexto en tiempo real. Procedimientos trazables.",
      description: "Aplicacion de emergencia que conecta al ciudadano con operadores y organismos mediante una alerta estructurada, comunicacion segura y documentacion integral del incidente.",
      activation: "Ver activacion ciudadana",
      coordination: "Explorar coordinacion institucional",
      language: "Cambiar idioma",
      localeLabel: "Idioma / Language",
      regionLabel: "Region operativa",
      productNote: "PIPO se proyecta como una aplicacion descargable de activacion inmediata.",
      compatibility: "En Android compatible puede utilizar un punto flotante autorizado. En otros sistemas, la activacion se adapta a widget, pantalla bloqueada, control del sistema, acceso directo o boton de accion. La disponibilidad depende del sistema operativo y de los permisos.",
      simulation: "Demo conceptual: no instala una aplicacion nativa ni activa sensores, ubicacion, camara o microfono reales.",
      howTitle: "Asi utiliza PIPO una persona",
      howLead: "La persona sigue usando la aplicacion que tenia abierta y accede a una capa de emergencia cuando la necesita.",
      deviceScreen: "Pantalla ficticia de mensajeria",
      emergencyAvailable: "Acceso de emergencia disponible",
      simulated: "Simulacion visual",
      openAccess: "Abrir punto PIPO",
      closeAccess: "Cerrar punto PIPO",
      chooseEmergency: "Elegir condicion de emergencia",
      permissionsTitle: "Confirmar alerta simulada",
      selectedCondition: "Condicion seleccionada",
      shareDuring: "Compartir durante este incidente",
      permissionLocation: "Ubicacion simulada",
      permissionAudio: "Audio simulado",
      permissionVideo: "Video simulado",
      permissionDescription: "Descripcion escrita",
      permissionDevice: "Informacion de dispositivo ficticio",
      permissionNote: "Los permisos se aplican unicamente a esta demostracion y a este incidente simulado.",
      cancel: "Cancelar",
      startAlert: "Iniciar alerta simulada",
      sessionTitle: "Sesion de emergencia simulada",
      sessionLead: "La interfaz representa el contexto que podria documentarse antes del arribo. No transmite medios ni datos reales.",
      simulatedVideo: "Video simulado",
      abstractSignal: "Senal abstracta sin imagen de personas",
      simulatedAudio: "Audio simulado",
      simulatedMap: "Ubicacion simulada",
      elapsed: "Tiempo transcurrido",
      incident: "Identificador del incidente",
      operator: "Operador conectado",
      receivingAgency: "Organismo receptor",
      routing: "Estado de derivacion",
      includedAgencies: "Organismos incorporados",
      locationShared: "Ubicacion compartida",
      audioActive: "Audio activo",
      videoActive: "Video activo",
      operatorConnected: "Operador conectado",
      helpOnWay: "Ayuda en camino",
      documented: "Sesion documentada",
      stopAudio: "Detener audio",
      stopVideo: "Detener video",
      stopLocation: "Dejar de compartir ubicacion",
      endSession: "Finalizar transmision",
      waiting: "En espera de activacion simulada",
      active: "Activa",
      inactive: "No compartida",
      receptionTitle: "Recepcion institucional",
      receptionLead: "El contexto simulado llega a una consola antes de la intervencion en campo y queda asociado al incidente de demostracion.",
      receivedAlert: "Alerta recibida",
      liveContext: "Contexto en tiempo real",
      activePermissions: "Permisos activos",
      priority: "Prioridad",
      time: "Hora",
      suggestedConsoles: "Consolas sugeridas",
      routeTitle: "Del pedido de ayuda al cierre trazable",
      routeCitizen: "Ciudadano",
      routeConsole: "Consola maestra",
      routeAgency: "Organismo competente",
      routeField: "Operador de campo",
      routeRecord: "Acta y expediente",
      routeClosure: "Cierre ciudadano",
      aiTitle: "IA, permisos y control humano",
      aiNotice: "La IA no activa sensores. La persona inicia la sesion y selecciona explicitamente que informacion simulada comparte. Las decisiones operativas permanecen bajo control humano.",
      aiDetails: "El asistente puede ordenar un relato ficticio, detectar faltantes y sugerir una prioridad. No puede iniciar medios, rastrear, despachar recursos ni cerrar un incidente.",
      advanced: "Ver modulos avanzados",
      technical: "Informacion tecnica de Build Week",
      technicalLead: "Contexto de desarrollo, preservacion de v36, rama y modulos de demostracion.",
      advancedLead: "Consolas, actas, bitacora y controles tecnicos de la demostracion.",
      navActivation: "Activacion ciudadana",
      navCoordination: "Coordinacion",
      navField: "Operador de campo",
      navDocumentation: "Documentacion",
      navSecurity: "Seguridad",
      navClosure: "Cierre ciudadano",
      primaryNavigation: "Navegacion principal",
      esArgentina: "Argentina - Buenos Aires",
      international: "Demostracion internacional",
      general: "Emergencia general",
      health: "Salud",
      fire: "Incendio",
      violence: "Violencia o genero",
      childhood: "Ninez",
      traffic: "Accidente vial",
      cyber: "Ciberdelito",
      stolen: "Dispositivo robado",
      cannotSpeak: "No puedo hablar",
      noCondition: "Aun no se selecciono una condicion.",
      alertStarted: "Alerta simulada iniciada. No se activaron sensores reales.",
      alertCancelled: "Seleccion de alerta cancelada.",
      sessionEnded: "Transmision simulada finalizada. La bitacora conserva los eventos de demostracion.",
      permissionEnabled: "permiso seleccionado para la demostracion",
      permissionDisabled: "permiso retirado de la demostracion",
      mediaStopped: "medio simulado detenido",
      locationStopped: "ubicacion simulada dejada de compartir",
      regionArgentinaAgency: "911 Seguridad / 107 Salud",
      regionInternationalAgency: "Centro de respuesta de demostracion",
      agencyArgentina: "911 Seguridad, 107 Salud, Bomberos y Defensa Civil",
      agencyInternational: "Seguridad publica, salud de emergencia, bomberos y proteccion civil",
      priorityValue: "Prioridad inicial para validacion humana",
      eventLedger: "Bitacora de activacion simulada",
      noEvents: "No hay eventos de activacion todavia.",
      statusWaiting: "La consola espera una alerta simulada.",
      statusReceived: "Alerta simulada recibida y preparada para coordinacion humana.",
      languageSpanish: "Espanol (Argentina)",
      languageEnglish: "English (United States)",
      technicalNav: "Navegacion tecnica",
      legacyPerspectives: "Perspectivas",
      legacyCitizenClosure: "Cierre ciudadano",
      legacyAssistant: "Asistente de incidentes con IA",
      legacyMaster: "Consola maestra",
      legacyField: "Operadores de campo",
      legacyActs: "Actas individuales",
      legacyProcedure: "Acta de procedimiento",
      legacySecurity: "Estado de seguridad",
      legacyVault: "Boveda de evidencia",
      legacyAccess: "Solicitudes de acceso",
      legacyAcquisition: "Registros de adquisicion",
      legacyTransfer: "Historial de transferencias",
      legacyRecord: "Expediente maestro",
      legacyAudit: "Auditoria",
      legacyClosure: "Cierre",
    },
    "en-US": {
      documentTitle: "PIPO Emergency Layer - Simulated citizen activation",
      eyebrow: "Projected emergency application",
      headline: "PIPO Emergency Layer",
      tagline: "Immediate help. Real-time context. Traceable procedures.",
      description: "An emergency application that connects citizens with operators and agencies through a structured alert, secure communication, and complete incident documentation.",
      activation: "View citizen activation",
      coordination: "Explore institutional coordination",
      language: "Change language",
      localeLabel: "Language / Idioma",
      regionLabel: "Operational region",
      productNote: "PIPO is designed as a downloadable application for immediate activation.",
      compatibility: "On compatible Android devices it can use a user-authorized floating access point. On other systems, activation adapts to a widget, lock screen, system control, shortcut, or action button. Availability depends on the operating system and permissions.",
      simulation: "Concept demo: it does not install a native app or activate real sensors, location, camera, or microphone.",
      howTitle: "How a person uses PIPO",
      howLead: "A person keeps using the application already open and accesses an emergency layer when needed.",
      deviceScreen: "Fictional messaging screen",
      emergencyAvailable: "Emergency access available",
      simulated: "Visual simulation",
      openAccess: "Open PIPO point",
      closeAccess: "Close PIPO point",
      chooseEmergency: "Choose an emergency condition",
      permissionsTitle: "Confirm simulated alert",
      selectedCondition: "Selected condition",
      shareDuring: "Share during this incident",
      permissionLocation: "Simulated location",
      permissionAudio: "Simulated audio",
      permissionVideo: "Simulated video",
      permissionDescription: "Written description",
      permissionDevice: "Fictional device information",
      permissionNote: "Permissions apply only to this demonstration and this simulated incident.",
      cancel: "Cancel",
      startAlert: "Start simulated alert",
      sessionTitle: "Simulated emergency session",
      sessionLead: "The interface represents context that could be documented before field arrival. It does not transmit real media or data.",
      simulatedVideo: "Simulated video",
      abstractSignal: "Abstract signal with no image of real people",
      simulatedAudio: "Simulated audio",
      simulatedMap: "Simulated location",
      elapsed: "Elapsed time",
      incident: "Incident identifier",
      operator: "Connected operator",
      receivingAgency: "Receiving agency",
      routing: "Routing status",
      includedAgencies: "Included agencies",
      locationShared: "Location shared",
      audioActive: "Audio active",
      videoActive: "Video active",
      operatorConnected: "Operator connected",
      helpOnWay: "Help on the way",
      documented: "Session documented",
      stopAudio: "Stop audio",
      stopVideo: "Stop video",
      stopLocation: "Stop sharing location",
      endSession: "End transmission",
      waiting: "Waiting for simulated activation",
      active: "Active",
      inactive: "Not shared",
      receptionTitle: "Institutional reception",
      receptionLead: "Simulated context reaches a console before field intervention and remains associated with the demonstration incident.",
      receivedAlert: "Alert received",
      liveContext: "Live context",
      activePermissions: "Active permissions",
      priority: "Priority",
      time: "Time",
      suggestedConsoles: "Suggested consoles",
      routeTitle: "From a request for help to traceable closure",
      routeCitizen: "Citizen",
      routeConsole: "Master console",
      routeAgency: "Competent agency",
      routeField: "Field operator",
      routeRecord: "Act and record",
      routeClosure: "Citizen closure",
      aiTitle: "AI, permissions, and human control",
      aiNotice: "AI does not activate sensors. The person starts the session and explicitly selects what simulated information to share. Operational decisions remain under human control.",
      aiDetails: "The assistant can organize a fictional account, identify missing information, and suggest priority. It cannot start media, track, dispatch resources, or close an incident.",
      advanced: "View advanced modules",
      technical: "Build Week technical information",
      technicalLead: "Development context, v36 preservation, branch, and demonstration modules.",
      advancedLead: "Consoles, acts, ledger, and technical demonstration controls.",
      navActivation: "Citizen activation",
      navCoordination: "Coordination",
      navField: "Field operator",
      navDocumentation: "Documentation",
      navSecurity: "Security",
      navClosure: "Citizen closure",
      primaryNavigation: "Primary navigation",
      esArgentina: "Argentina - Buenos Aires",
      international: "International demonstration",
      general: "General emergency",
      health: "Health",
      fire: "Fire",
      violence: "Violence or gender-based violence",
      childhood: "Children and youth",
      traffic: "Road incident",
      cyber: "Cybercrime",
      stolen: "Stolen device",
      cannotSpeak: "I cannot speak",
      noCondition: "No condition has been selected yet.",
      alertStarted: "Simulated alert started. No real sensors were activated.",
      alertCancelled: "Alert selection cancelled.",
      sessionEnded: "Simulated transmission ended. The ledger preserves demonstration events.",
      permissionEnabled: "permission selected for the demonstration",
      permissionDisabled: "permission removed from the demonstration",
      mediaStopped: "simulated media stopped",
      locationStopped: "simulated location sharing stopped",
      regionArgentinaAgency: "911 Security / 107 Health",
      regionInternationalAgency: "Demonstration response center",
      agencyArgentina: "911 Security, 107 Health, Fire and Civil Protection",
      agencyInternational: "Public safety, emergency health, fire and civil protection",
      priorityValue: "Initial priority pending human validation",
      eventLedger: "Simulated activation ledger",
      noEvents: "There are no activation events yet.",
      statusWaiting: "The console is waiting for a simulated alert.",
      statusReceived: "Simulated alert received and prepared for human coordination.",
      languageSpanish: "Spanish (Argentina)",
      languageEnglish: "English (United States)",
      technicalNav: "Technical navigation",
      legacyPerspectives: "Perspectives",
      legacyCitizenClosure: "Citizen closure",
      legacyAssistant: "AI incident assistant",
      legacyMaster: "Master console",
      legacyField: "Field operators",
      legacyActs: "Individual acts",
      legacyProcedure: "Procedure act",
      legacySecurity: "Security status",
      legacyVault: "Evidence vault",
      legacyAccess: "Access requests",
      legacyAcquisition: "Acquisition records",
      legacyTransfer: "Transfer history",
      legacyRecord: "Master incident record",
      legacyAudit: "Audit",
      legacyClosure: "Closure",
    },
  };

  const emergencyTypes = [
    "general",
    "health",
    "fire",
    "violence",
    "childhood",
    "traffic",
    "cyber",
    "stolen",
    "cannotSpeak",
  ];

  const permissionKeys = ["location", "audio", "video", "description", "device"];
  const permissionGrantedEvents = {
    location: "citizen.permission.location.granted",
    audio: "citizen.permission.audio.granted",
    video: "citizen.permission.video.granted",
    description: "citizen.permission.description.granted",
    device: "citizen.permission.device.granted",
  };
  const state = {
    locale: detectLocale(),
    region: "AR_BUENOS_AIRES",
    menuOpen: false,
    selectedType: null,
    permissions: {
      location: false,
      audio: false,
      video: false,
      description: false,
      device: false,
    },
    sessionActive: false,
    startedAt: null,
    incidentNumber: 1,
    events: [],
    message: "",
  };
  let timerHandle = null;

  function detectLocale() {
    try {
      const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
      if (stored === "es-AR" || stored === "en-US") return stored;
    } catch (error) {
      // Locale preference is optional in restrictive browser modes.
    }
    const browserLocale = String(navigator.language || "").toLowerCase();
    if (browserLocale.startsWith("en")) return "en-US";
    return DEFAULT_LOCALE;
  }

  function persistLocale(locale) {
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    } catch (error) {
      // The demonstration works without persistence.
    }
  }

  function text(key) {
    return copy[state.locale][key] || key;
  }

  function currentIncidentId() {
    return `PIPO-CIT-${String(state.incidentNumber).padStart(6, "0")}`;
  }

  function shortHash(value) {
    let hash = 2166136261;
    for (let index = 0; index < value.length; index += 1) {
      hash ^= value.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return (hash >>> 0).toString(16).padStart(8, "0");
  }

  function appendEvent(code, label) {
    const previous = state.events[state.events.length - 1];
    const timestamp = new Date().toISOString();
    const reference = `demo-ref-${shortHash(`${previous?.reference || "GENESIS"}|${code}|${timestamp}|${state.events.length + 1}`)}`;
    state.events.push({
      id: `ACTIVATION-${String(state.events.length + 1).padStart(4, "0")}`,
      code,
      label,
      timestamp,
      previous: previous?.reference || "GENESIS",
      reference,
    });
  }

  function permissionLabel(key) {
    return text(`permission${key.charAt(0).toUpperCase()}${key.slice(1)}`);
  }

  function permissionEventCode(key, enabled) {
    return enabled ? permissionGrantedEvents[key] : "citizen.permission.revoked";
  }

  function regionDetails() {
    const argentina = state.region === "AR_BUENOS_AIRES";
    return {
      receiver: argentina ? text("regionArgentinaAgency") : text("regionInternationalAgency"),
      agencies: argentina ? text("agencyArgentina") : text("agencyInternational"),
      console: argentina ? "CON-MASTER-AR" : "CON-MASTER-INTL",
    };
  }

  function typeLabel(type) {
    return text(type || "general");
  }

  function activePermissionLabels() {
    return permissionKeys.filter((key) => state.permissions[key]).map(permissionLabel);
  }

  function renderPermissionControl(key) {
    const id = `pipoPermission${key.charAt(0).toUpperCase()}${key.slice(1)}`;
    return `
      <label class="pipo-permission" for="${id}">
        <input id="${id}" type="checkbox" data-pipo-permission="${key}" ${state.permissions[key] ? "checked" : ""} />
        <span>${permissionLabel(key)}</span>
      </label>`;
  }

  function renderStatusChip(label, active) {
    return `<span class="pipo-status-chip ${active ? "is-active" : "is-inactive"}"><span aria-hidden="true"></span>${label}: ${active ? text("active") : text("inactive")}</span>`;
  }

  function renderEventLedger() {
    const events = state.events.slice(-6).reverse();
    if (!events.length) return `<p class="pipo-empty-state">${text("noEvents")}</p>`;
    return `<ol class="pipo-event-ledger">${events.map((event) => `
      <li>
        <strong>${event.code}</strong>
        <span>${event.label}</span>
        <code>${event.reference} / prev: ${event.previous}</code>
      </li>`).join("")}</ol>`;
  }

  function renderSession() {
    if (!state.sessionActive) return "";
    const region = regionDetails();
    const permissions = activePermissionLabels();
    return `
      <section id="pipoLiveSession" class="pipo-live-session" aria-labelledby="pipoLiveSessionTitle">
        <div class="pipo-section-heading">
          <div>
            <p class="pipo-kicker">${text("simulated")}</p>
            <h2 id="pipoLiveSessionTitle">${text("sessionTitle")}</h2>
          </div>
          <p>${text("sessionLead")}</p>
        </div>
        <div class="pipo-live-grid">
          <div class="pipo-media-stage" aria-label="${text("simulatedVideo")}">
            <div class="pipo-abstract-signal" aria-hidden="true"><span></span><span></span><span></span></div>
            <strong>${text("simulatedVideo")}</strong>
            <span>${text("abstractSignal")}</span>
          </div>
          <div class="pipo-live-details">
            <div class="pipo-audio-meter" aria-label="${text("simulatedAudio")}"><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>
            <div class="pipo-map-simulation" aria-label="${text("simulatedMap")}"><i aria-hidden="true"></i><span>${text("simulatedMap")}</span></div>
            <dl class="pipo-session-facts">
              <div><dt>${text("elapsed")}</dt><dd id="pipoSessionTimer">00:00</dd></div>
              <div><dt>${text("incident")}</dt><dd>${currentIncidentId()}</dd></div>
              <div><dt>${text("operator")}</dt><dd>${state.region === "AR_BUENOS_AIRES" ? "Operador demo Turno A" : "Demo operator Shift A"}</dd></div>
              <div><dt>${text("receivingAgency")}</dt><dd>${region.receiver}</dd></div>
              <div><dt>${text("routing")}</dt><dd>${text("helpOnWay")}</dd></div>
              <div><dt>${text("includedAgencies")}</dt><dd>${region.agencies}</dd></div>
            </dl>
          </div>
        </div>
        <div class="pipo-status-list" aria-label="${text("liveContext")}">
          ${renderStatusChip(text("locationShared"), state.permissions.location)}
          ${renderStatusChip(text("audioActive"), state.permissions.audio)}
          ${renderStatusChip(text("videoActive"), state.permissions.video)}
          ${renderStatusChip(text("operatorConnected"), true)}
          ${renderStatusChip(text("helpOnWay"), true)}
          ${renderStatusChip(text("documented"), true)}
        </div>
        <div class="pipo-session-actions">
          <button type="button" data-pipo-action="stop-audio" ${state.permissions.audio ? "" : "disabled"}>${text("stopAudio")}</button>
          <button type="button" data-pipo-action="stop-video" ${state.permissions.video ? "" : "disabled"}>${text("stopVideo")}</button>
          <button type="button" data-pipo-action="stop-location" ${state.permissions.location ? "" : "disabled"}>${text("stopLocation")}</button>
          <button type="button" class="is-danger" data-pipo-action="end-session">${text("endSession")}</button>
        </div>
      </section>`;
  }

  function renderReception() {
    const region = regionDetails();
    const started = state.sessionActive;
    return `
      <section id="pipoCoordination" class="pipo-reception" aria-labelledby="pipoReceptionTitle">
        <div class="pipo-section-heading">
          <div>
            <p class="pipo-kicker">${text("navCoordination")}</p>
            <h2 id="pipoReceptionTitle">${text("receptionTitle")}</h2>
          </div>
          <p>${text("receptionLead")}</p>
        </div>
        <div class="pipo-reception-grid">
          <article>
            <span>${text("receivedAlert")}</span>
            <strong>${started ? typeLabel(state.selectedType) : text("waiting")}</strong>
            <small>${started ? text("statusReceived") : text("statusWaiting")}</small>
          </article>
          <article>
            <span>${text("liveContext")}</span>
            <strong>${started ? activePermissionLabels().join(", ") || text("inactive") : text("waiting")}</strong>
            <small>${text("locationShared")}: ${state.permissions.location ? text("active") : text("inactive")} | ${text("audioActive")}: ${state.permissions.audio ? text("active") : text("inactive")} | ${text("videoActive")}: ${state.permissions.video ? text("active") : text("inactive")}</small>
          </article>
          <article>
            <span>${text("suggestedConsoles")}</span>
            <strong>${region.receiver}</strong>
            <small>${region.agencies}</small>
          </article>
          <article>
            <span>${text("priority")}</span>
            <strong>${started ? text("priorityValue") : "-"}</strong>
            <small>${text("time")}: ${started ? new Date().toLocaleTimeString(state.locale) : "-"}</small>
          </article>
        </div>
        <div class="pipo-route" aria-label="${text("routeTitle")}">
          ${[text("routeCitizen"), text("routeConsole"), text("routeAgency"), text("routeField"), text("routeRecord"), text("routeClosure")].map((step) => `<span>${step}</span>`).join("<b aria-hidden=\"true\">&#8594;</b>")}
        </div>
      </section>`;
  }

  function renderTemplate() {
    const selected = state.selectedType ? typeLabel(state.selectedType) : text("noCondition");
    const session = renderSession();
    return `
      <section id="pipoCitizenActivation" class="pipo-product" aria-labelledby="pipoProductTitle">
        <header class="pipo-product-hero">
          <div>
            <p class="pipo-kicker">${text("eyebrow")}</p>
            <h1 id="pipoProductTitle">${text("headline")}</h1>
            <p class="pipo-tagline">${text("tagline")}</p>
            <p class="pipo-description">${text("description")}</p>
            <div class="pipo-hero-actions">
              <button type="button" data-pipo-action="go-activation">${text("activation")}</button>
              <button type="button" class="is-secondary" data-pipo-action="go-coordination">${text("coordination")}</button>
              <button type="button" class="is-quiet" data-pipo-action="focus-language">${text("language")}</button>
            </div>
          </div>
          <aside class="pipo-product-controls" aria-label="${text("localeLabel")}">
            <label for="pipoLocaleSelect">${text("localeLabel")}</label>
            <select id="pipoLocaleSelect" data-pipo-locale>
              <option value="es-AR" ${state.locale === "es-AR" ? "selected" : ""}>${text("languageSpanish")}</option>
              <option value="en-US" ${state.locale === "en-US" ? "selected" : ""}>${text("languageEnglish")}</option>
            </select>
            <label for="pipoRegionSelect">${text("regionLabel")}</label>
            <select id="pipoRegionSelect" data-pipo-region>
              <option value="AR_BUENOS_AIRES" ${state.region === "AR_BUENOS_AIRES" ? "selected" : ""}>${text("esArgentina")}</option>
              <option value="INTERNATIONAL" ${state.region === "INTERNATIONAL" ? "selected" : ""}>${text("international")}</option>
            </select>
            <p>${text("simulation")}</p>
          </aside>
        </header>
        <nav class="pipo-primary-nav" aria-label="${text("primaryNavigation")}">
          <a href="#pipoActivation">${text("navActivation")}</a>
          <a href="#pipoCoordination">${text("navCoordination")}</a>
          <a href="#pipoFieldGuidance">${text("navField")}</a>
          <a href="#pipoDocumentation">${text("navDocumentation")}</a>
          <a href="#pipoSecurity">${text("navSecurity")}</a>
          <a href="#pipoClosure">${text("navClosure")}</a>
        </nav>

        <section id="pipoActivation" class="pipo-activation-section" aria-labelledby="pipoActivationTitle">
          <div class="pipo-section-heading">
            <div>
              <p class="pipo-kicker">${text("navActivation")}</p>
              <h2 id="pipoActivationTitle">${text("howTitle")}</h2>
            </div>
            <p>${text("howLead")}</p>
          </div>
          <div class="pipo-device-layout">
            <div class="pipo-phone" aria-label="${text("deviceScreen")}">
              <div class="pipo-phone-top"><span>9:41</span><span aria-hidden="true">&#9679; &#9679; &#9679;</span></div>
              <div class="pipo-phone-app">
                <strong>${text("deviceScreen")}</strong>
                <span class="pipo-search">&#128269; ${state.locale === "es-AR" ? "Buscar" : "Search"}</span>
                <div class="pipo-chat-line"><i></i><span>${state.locale === "es-AR" ? "Grupo comunitario" : "Community group"}<small>${state.locale === "es-AR" ? "Reunion en el punto habitual" : "Meeting at the usual place"}</small></span></div>
                <div class="pipo-chat-line"><i></i><span>${state.locale === "es-AR" ? "Contacto de confianza" : "Trusted contact"}<small>${state.locale === "es-AR" ? "Mensaje simulado" : "Simulated message"}</small></span></div>
                <div class="pipo-chat-line"><i></i><span>${state.locale === "es-AR" ? "Actividad local" : "Local activity"}<small>${state.locale === "es-AR" ? "Actualizacion de demostracion" : "Demonstration update"}</small></span></div>
              </div>
              <button id="pipoQuickAccess" type="button" class="pipo-quick-access" data-pipo-action="toggle-access" aria-haspopup="true" aria-expanded="${state.menuOpen}" aria-controls="pipoQuickMenu" aria-label="${state.menuOpen ? text("closeAccess") : text("openAccess")}">P</button>
              <span class="pipo-device-caption">${text("emergencyAvailable")}</span>
              <div id="pipoQuickMenu" class="pipo-quick-menu" role="group" aria-label="${text("chooseEmergency")}" ${state.menuOpen ? "" : "hidden"}>
                ${emergencyTypes.map((type) => `<button type="button" data-pipo-action="select-emergency" data-emergency-type="${type}">${typeLabel(type)}</button>`).join("")}
              </div>
            </div>
            <div class="pipo-product-definition">
              <p class="pipo-definition-emphasis">${text("productNote")}</p>
              <p>${text("compatibility")}</p>
              <div class="pipo-demo-badge"><span aria-hidden="true"></span>${text("simulated")}</div>
            </div>
          </div>
          <div id="pipoActivationMessage" class="pipo-live-message" role="status" aria-live="polite">${state.message}</div>
          ${state.selectedType && !state.sessionActive ? `
            <form id="pipoPermissions" class="pipo-permissions" aria-labelledby="pipoPermissionsTitle">
              <div>
                <p class="pipo-kicker">${text("permissionsTitle")}</p>
                <h3 id="pipoPermissionsTitle">${selected}</h3>
                <p>${text("shareDuring")}</p>
              </div>
              <div class="pipo-permission-list">${permissionKeys.map(renderPermissionControl).join("")}</div>
              <p class="pipo-permission-note">${text("permissionNote")}</p>
              <div class="pipo-confirm-actions">
                <button type="button" class="is-secondary" data-pipo-action="cancel-alert">${text("cancel")}</button>
                <button type="button" data-pipo-action="start-alert">${text("startAlert")}</button>
              </div>
            </form>` : ""}
        </section>
        ${session}
        ${renderReception()}
        <section id="pipoSecurity" class="pipo-ai-notice" aria-labelledby="pipoAiTitle">
          <div>
            <p class="pipo-kicker">${text("navSecurity")}</p>
            <h2 id="pipoAiTitle">${text("aiTitle")}</h2>
          </div>
          <p><strong>${text("aiNotice")}</strong> ${text("aiDetails")}</p>
        </section>
        <section id="pipoDocumentation" class="pipo-ledger-section" aria-labelledby="pipoLedgerTitle">
          <div class="pipo-section-heading">
            <div><p class="pipo-kicker">${text("navDocumentation")}</p><h2 id="pipoLedgerTitle">${text("eventLedger")}</h2></div>
            <p>${text("routeTitle")}</p>
          </div>
          ${renderEventLedger()}
        </section>
        <section id="pipoFieldGuidance" class="pipo-guidance-strip" aria-label="${text("navField")}">
          <span>${text("navField")}</span><strong>${text("routeField")}</strong><p>${text("routeRecord")} &#8594; ${text("routeClosure")}</p>
        </section>
        <section id="pipoClosure" class="pipo-guidance-strip pipo-closure-strip" aria-label="${text("navClosure")}">
          <span>${text("navClosure")}</span><strong>${text("routeClosure")}</strong><p>${text("routeTitle")}</p>
        </section>
      </section>`;
  }

  function organizeLegacyExperience() {
    if (document.getElementById("pipoAdvancedModules")) return;
    const legacyHero = document.querySelector("header.hero");
    const legacyNav = document.querySelector("nav.section-nav");
    const legacyMain = document.querySelector("main.layout");
    if (!legacyHero || !legacyNav || !legacyMain) return;

    const technicalDetails = document.createElement("details");
    technicalDetails.id = "pipoTechnicalInformation";
    technicalDetails.className = "pipo-legacy-details pipo-technical-details";
    technicalDetails.innerHTML = `<summary>${text("technical")}</summary><p>${text("technicalLead")}</p>`;
    const technicalBody = document.createElement("div");
    technicalBody.className = "pipo-legacy-body";
    root.after(technicalDetails);
    technicalDetails.appendChild(technicalBody);
    technicalBody.appendChild(legacyHero);
    const stagePanel = legacyMain.querySelector(":scope > .stage-panel");
    const federationPanel = legacyMain.querySelector(":scope > .federation-principle");
    if (stagePanel) technicalBody.appendChild(stagePanel);
    if (federationPanel) technicalBody.appendChild(federationPanel);

    const advancedDetails = document.createElement("details");
    advancedDetails.id = "pipoAdvancedModules";
    advancedDetails.className = "pipo-legacy-details pipo-advanced-details";
    advancedDetails.innerHTML = `<summary>${text("advanced")}</summary><p>${text("advancedLead")}</p>`;
    const advancedBody = document.createElement("div");
    advancedBody.className = "pipo-legacy-body";
    advancedDetails.appendChild(advancedBody);
    technicalDetails.after(advancedDetails);
    advancedBody.appendChild(legacyNav);
    advancedBody.appendChild(legacyMain);
  }

  function legacyLabels() {
    return {
      Perspectives: text("legacyPerspectives"),
      "Citizen Closure": text("legacyCitizenClosure"),
      "Incident Assistant": text("legacyAssistant"),
      "Master Console": text("legacyMaster"),
      "Field Operators": text("legacyField"),
      "Individual Acts": text("legacyActs"),
      "Procedure Act": text("legacyProcedure"),
      "Security Status": text("legacySecurity"),
      "Evidence Vault": text("legacyVault"),
      "Access Requests": text("legacyAccess"),
      "Acquisition Records": text("legacyAcquisition"),
      "Transfer History": text("legacyTransfer"),
      "Master Incident Record": text("legacyRecord"),
      Audit: text("legacyAudit"),
      Closure: text("legacyClosure"),
    };
  }

  function legacyHeadingLabels() {
    return {
      "PIPO AI Incident Assistant": {
        "es-AR": "Asistente de incidentes con IA PIPO",
        "en-US": "PIPO AI incident assistant",
      },
      "PIPO Evidence Vault": {
        "es-AR": "Boveda de evidencia PIPO",
        "en-US": "PIPO evidence vault",
      },
      "Security Status": {
        "es-AR": "Estado de seguridad",
        "en-US": "Security status",
      },
      "Access Requests": {
        "es-AR": "Solicitudes de acceso",
        "en-US": "Access requests",
      },
      "Digital Acquisition Records": {
        "es-AR": "Registros de adquisicion digital",
        "en-US": "Digital acquisition records",
      },
      "Transfer History": {
        "es-AR": "Historial de transferencias",
        "en-US": "Transfer history",
      },
      "Procedure Act": {
        "es-AR": "Acta de procedimiento",
        "en-US": "Procedure act",
      },
      "Citizen Closure": {
        "es-AR": "Cierre ciudadano",
        "en-US": "Citizen closure",
      },
      "Field Operator Mobile": {
        "es-AR": "Movil del operador de campo",
        "en-US": "Field operator mobile",
      },
      "Master Console": {
        "es-AR": "Consola maestra",
        "en-US": "Master console",
      },
      "Field Operators": {
        "es-AR": "Operadores de campo",
        "en-US": "Field operators",
      },
      "Individual Acts": {
        "es-AR": "Actas individuales",
        "en-US": "Individual acts",
      },
    };
  }

  function translateLegacyNavigation() {
    const labels = legacyLabels();
    document.querySelectorAll("#pipoAdvancedModules .section-nav a").forEach((link) => {
      const source = link.dataset.pipoSourceLabel || link.textContent.trim();
      link.dataset.pipoSourceLabel = source;
      if (labels[source]) link.textContent = labels[source];
    });
    const nav = document.querySelector("#pipoAdvancedModules .section-nav");
    if (nav) nav.setAttribute("aria-label", text("technicalNav"));

    const headingLabels = legacyHeadingLabels();
    document.querySelectorAll("#pipoAdvancedModules h1, #pipoAdvancedModules h2, #pipoAdvancedModules h3").forEach((heading) => {
      const source = heading.dataset.pipoSourceLabel || heading.textContent.trim();
      heading.dataset.pipoSourceLabel = source;
      const label = headingLabels[source];
      if (label) heading.textContent = label[state.locale];
    });
  }

  function updateLegacyDetailCopy() {
    const technical = document.getElementById("pipoTechnicalInformation");
    const advanced = document.getElementById("pipoAdvancedModules");
    if (technical) {
      technical.querySelector("summary").textContent = text("technical");
      technical.querySelector(":scope > p").textContent = text("technicalLead");
    }
    if (advanced) {
      advanced.querySelector("summary").textContent = text("advanced");
      advanced.querySelector(":scope > p").textContent = text("advancedLead");
    }
    translateLegacyNavigation();
  }

  function formatDuration() {
    if (!state.startedAt) return "00:00";
    const elapsed = Math.max(0, Math.floor((Date.now() - state.startedAt) / 1000));
    return `${String(Math.floor(elapsed / 60)).padStart(2, "0")}:${String(elapsed % 60).padStart(2, "0")}`;
  }

  function updateTimer() {
    if (timerHandle) window.clearInterval(timerHandle);
    const update = () => {
      const timer = document.getElementById("pipoSessionTimer");
      if (timer) timer.textContent = formatDuration();
    };
    update();
    if (state.sessionActive) timerHandle = window.setInterval(update, 1000);
  }

  function openAdvanced(target) {
    const advanced = document.getElementById("pipoAdvancedModules");
    if (!advanced) return;
    advanced.open = true;
    if (target) {
      const element = document.querySelector(target);
      if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      advanced.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function bindEvents() {
    if (!root.dataset.pipoKeyboardBound) {
      root.dataset.pipoKeyboardBound = "true";
      root.addEventListener("keydown", (event) => {
        if (event.key !== "Escape" || !state.menuOpen) return;
        state.menuOpen = false;
        state.message = "";
        render();
        document.getElementById("pipoQuickAccess")?.focus();
      });
    }

    root.querySelectorAll("[data-pipo-action]").forEach((button) => {
      button.addEventListener("click", () => {
        const action = button.dataset.pipoAction;
        if (action === "go-activation") document.getElementById("pipoActivation").scrollIntoView({ behavior: "smooth", block: "start" });
        if (action === "go-coordination") document.getElementById("pipoCoordination").scrollIntoView({ behavior: "smooth", block: "start" });
        if (action === "focus-language") document.getElementById("pipoLocaleSelect").focus();
        if (action === "toggle-access") {
          state.menuOpen = !state.menuOpen;
          if (state.menuOpen) appendEvent("citizen.quick_access.opened", text("openAccess"));
          state.message = state.menuOpen ? text("chooseEmergency") : "";
          render();
        }
        if (action === "select-emergency") {
          state.selectedType = button.dataset.emergencyType;
          state.menuOpen = false;
          appendEvent("citizen.emergency_type.selected", typeLabel(state.selectedType));
          state.message = typeLabel(state.selectedType);
          render();
        }
        if (action === "cancel-alert") {
          state.selectedType = null;
          state.message = text("alertCancelled");
          render();
        }
        if (action === "start-alert" && state.selectedType) {
          state.sessionActive = true;
          state.startedAt = Date.now();
          appendEvent("citizen.alert.confirmed", typeLabel(state.selectedType));
          appendEvent("citizen.live_session.started", currentIncidentId());
          if (state.permissions.location) appendEvent("citizen.location.shared", permissionLabel("location"));
          if (state.permissions.audio) appendEvent("citizen.audio.started", permissionLabel("audio"));
          if (state.permissions.video) appendEvent("citizen.video.started", permissionLabel("video"));
          appendEvent("console.live_context.received", regionDetails().console);
          state.message = text("alertStarted");
          render();
        }
        if (action === "stop-audio" && state.permissions.audio) {
          state.permissions.audio = false;
          appendEvent("citizen.media.stopped", `${permissionLabel("audio")}: ${text("mediaStopped")}`);
          state.message = `${permissionLabel("audio")}: ${text("mediaStopped")}`;
          render();
        }
        if (action === "stop-video" && state.permissions.video) {
          state.permissions.video = false;
          appendEvent("citizen.media.stopped", `${permissionLabel("video")}: ${text("mediaStopped")}`);
          state.message = `${permissionLabel("video")}: ${text("mediaStopped")}`;
          render();
        }
        if (action === "stop-location" && state.permissions.location) {
          state.permissions.location = false;
          appendEvent("citizen.permission.revoked", `${permissionLabel("location")}: ${text("locationStopped")}`);
          state.message = `${permissionLabel("location")}: ${text("locationStopped")}`;
          render();
        }
        if (action === "end-session" && state.sessionActive) {
          state.sessionActive = false;
          appendEvent("citizen.live_session.ended", currentIncidentId());
          state.message = text("sessionEnded");
          state.incidentNumber += 1;
          render();
        }
      });
    });

    root.querySelectorAll("[data-pipo-permission]").forEach((input) => {
      input.addEventListener("change", () => {
        const key = input.dataset.pipoPermission;
        state.permissions[key] = input.checked;
        appendEvent(permissionEventCode(key, input.checked), `${permissionLabel(key)}: ${input.checked ? text("permissionEnabled") : text("permissionDisabled")}`);
        state.message = `${permissionLabel(key)}: ${input.checked ? text("permissionEnabled") : text("permissionDisabled")}`;
        render();
      });
    });

    const localeSelect = root.querySelector("[data-pipo-locale]");
    localeSelect.addEventListener("change", () => {
      state.locale = localeSelect.value;
      persistLocale(state.locale);
      state.message = "";
      render();
    });

    const regionSelect = root.querySelector("[data-pipo-region]");
    regionSelect.addEventListener("change", () => {
      state.region = regionSelect.value;
      state.message = "";
      render();
    });
  }

  function render() {
    document.documentElement.lang = state.locale;
    document.title = text("documentTitle");
    root.innerHTML = renderTemplate();
    updateLegacyDetailCopy();
    bindEvents();
    updateTimer();
    if (state.menuOpen && window.matchMedia("(max-width: 900px)").matches) {
      window.requestAnimationFrame(() => {
        document.getElementById("pipoQuickMenu")?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    }
  }

  organizeLegacyExperience();
  render();
}());
