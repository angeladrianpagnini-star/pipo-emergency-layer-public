(function () {
  "use strict";

  const root = document.getElementById("pipoOperationalJourney");
  if (!root) return;

  const DEFAULT_LOCALE = "es-AR";
  const LOCALE_STORAGE_KEY = "pipo_demo_locale";
  const eventCodes = {
    masterReceived: "master.alert.received",
    masterValidated: "master.alert.validated",
    priorityConfirmed: "master.priority.confirmed",
    routingStarted: "master.multiagency.routing.started",
    agencyReceived: "agency.alert.received",
    resourceSuggested: "agency.resource.suggested",
    resourceAssigned: "agency.resource.assigned",
    fieldContext: "field.context.received",
    fieldDeparted: "field.resource.departed",
    fieldArrived: "field.resource.arrived",
    interventionStarted: "field.intervention.started",
    interventionCompleted: "field.intervention.completed",
    documentationReceived: "master.documentation.received",
    closureValidated: "master.closure.validated",
    packageDelivered: "citizen.final.package.delivered",
  };

  const agencies = ["security", "health", "traffic", "fire"];
  const resources = {
    health: {
      resourceId: "RES-107-04",
      unit: "107-04",
      distance: "1.8 km",
      eta: "4 min",
      specialty: "emergencyHealth",
      operator: "healthOperator",
      capability: "medicalCare",
      mapUnit: "healthMapUnit",
      selectionCriterion: "healthSelectionCriterion",
      mapClass: "health",
    },
    security: {
      resourceId: "RES-911-12",
      unit: "911-12",
      distance: "2.1 km",
      eta: "5 min",
      specialty: "securitySupport",
      operator: "securityOperator",
      capability: "sceneSecurity",
      mapUnit: "securityMapUnit",
      selectionCriterion: "securitySelectionCriterion",
      mapClass: "security",
    },
    traffic: {
      resourceId: "RES-T-08",
      unit: "T-08",
      distance: "0.9 km",
      eta: "3 min",
      specialty: "trafficOrder",
      operator: "trafficOperator",
      capability: "trafficControl",
      mapUnit: "trafficMapUnit",
      selectionCriterion: "trafficSelectionCriterion",
      mapClass: "traffic",
    },
    fire: {
      resourceId: "RES-B-03",
      unit: "B-03",
      distance: "3.4 km",
      eta: "7 min",
      specialty: "fireResponse",
      operator: "fireOperator",
      capability: "spillAndFireRisk",
      mapUnit: "fireMapUnit",
      selectionCriterion: "fireSelectionCriterion",
      mapClass: "fire",
    },
  };

  const copy = {
    "es-AR": {
      kicker: "Recorrido principal",
      title: "Recorrido operativo PIPO",
      lead: "Una demostracion guiada de como una alerta ciudadana puede llegar a una consola maestra, coordinar organismos en paralelo, documentar intervenciones y devolver un cierre comprensible.",
      start: "Iniciar demostracion guiada",
      next: "Siguiente paso",
      previous: "Paso anterior",
      restart: "Reiniciar",
      progress: "Paso {current} de 8 - {label}",
      step1: "Activacion ciudadana",
      step2: "Recepcion maestra",
      step3: "Derivacion simultanea",
      step4: "Asignacion de recursos",
      step5: "Intervencion de campo",
      step6: "Documentacion",
      step7: "Cierre institucional",
      step8: "Devolucion ciudadana",
      scenario: "Escenario de demostracion",
      scenarioTitle: "Accidente vial con respuesta coordinada",
      scenarioLead: "Persona lesionada, posible derrame, riesgo de incendio y necesidad de ordenar el transito.",
      demoOnly: "Todo lo mostrado es simulado. No se usan sensores, ubicacion, medios ni servicios de emergencia reales.",
      citizenZone: "A. Dispositivo ciudadano",
      masterZone: "B. Coordinacion institucional",
      fieldZone: "C. Recursos de campo",
      pipoPoint: "Punto PIPO",
      demoCitizen: "Persona usuaria demo",
      demoRegion: "Argentina - Buenos Aires",
      internationalRegion: "Demostracion internacional",
      citizenAlert: "Accidente vial",
      citizenReport: "Colision simulada. Hay una persona lesionada, posible derrame y circulacion comprometida.",
      simulatedLocation: "Ubicacion simulada",
      simulatedAudio: "Audio simulado",
      simulatedVideo: "Video simulado",
      simulatedText: "Relato escrito",
      permissions: "Permisos concedidos",
      permissionConfirmed: "Consentimiento simulado confirmado",
      connected: "Conexion simulada activa",
      receiver: "Consola receptora",
      connectedOperator: "Operador conectado",
      helpOnWay: "Ayuda en camino",
      incidentId: "Identificador del incidente",
      masterConsole: "Consola Maestra PIPO",
      masterReceived: "Alerta recibida por la Consola Maestra PIPO.",
      preliminaryPriority: "Prioridad preliminar",
      highPriority: "Alta - validacion humana requerida",
      risks: "Riesgos detectados",
      riskList: "Persona lesionada, posible derrame, riesgo de incendio y transito afectado.",
      missing: "Datos faltantes",
      missingList: "Cantidad de vehiculos y condiciones del derrame.",
      validate: "Validar alerta",
      adjustPriority: "Ajustar prioridad",
      routeAgencies: "Derivar a organismos",
      validated: "Alerta validada por operador de consola.",
      priorityConfirmed: "Prioridad confirmada por operador humano.",
      routeNote: "La derivacion puede ocurrir de manera simultanea a varios organismos.",
      agenciesTitle: "Consolas especializadas en paralelo",
      agenciesLead: "Cada consola recibe solo el contexto simulado necesario para su finalidad.",
      security: "911 Seguridad",
      health: "107 Salud",
      traffic: "Transito",
      fire: "Bomberos",
      internationalSecurity: "Seguridad publica",
      internationalHealth: "Salud de emergencia",
      internationalTraffic: "Gestion vial",
      internationalFire: "Respuesta contra incendios",
      alertReceived: "Alerta recibida",
      informationShared: "Informacion compartida",
      resourcesAvailable: "Recurso disponible",
      resourceSelected: "Recurso sugerido",
      confirmation: "Confirmacion humana",
      pending: "Pendiente",
      assigned: "Asignado",
      confirmResource: "Confirmar recurso",
      confirmed: "Confirmado por operador de consola",
      pendingHumanConfirmation: "Pendiente de confirmacion humana",
      selectionRule: "PIPO sugiere recursos mediante proximidad simulada, especialidad, disponibilidad, jurisdiccion y prioridad. La asignacion final requiere confirmacion humana.",
      assignmentRequired: "Confirme los recursos sugeridos antes de continuar con la intervencion de campo.",
      criteria: "Criterios de seleccion",
      criteriaList: "Cercania simulada, especialidad, disponibilidad, jurisdiccion, prioridad y capacidad requerida.",
      mapTitle: "Mapa operativo simulado",
      mapLead: "Representacion abstracta sin coordenadas, ubicacion real ni servicios externos.",
      incident: "Incidente",
      available: "Disponible",
      availability: "Disponibilidad",
      operationalStatus: "Estado operativo",
      mainCriterion: "Criterio principal",
      onWay: "En camino",
      arrived: "Arribado",
      intervening: "Interviniendo",
      completed: "Finalizado",
      resourceId: "ID de recurso",
      organization: "Organismo",
      specialty: "Especialidad",
      operator: "Operador",
      unit: "Unidad",
      distance: "Distancia simulada",
      eta: "Arribo estimado",
      jurisdiction: "Jurisdiccion simulada",
      fieldTitle: "Dispositivos de operadores de campo",
      fieldLead: "Los cuatro operadores pueden mantener estados distintos y consultar solo el contexto autorizado antes del arribo.",
      contextReceived: "Contexto recibido",
      departure: "Salida",
      arrival: "Arribo",
      intervention: "Intervencion",
      action: "Actuacion simulada",
      evidence: "Evidencia simulada",
      support: "Solicitar apoyo",
      finish: "Finalizar intervencion",
      fieldContext: "Contexto simulado compartido con autorizacion del usuario. No se utilizan sensores reales.",
      documentsTitle: "Actas individuales e integracion documental",
      documentsLead: "Cada organismo conserva su propia autoria. La consola maestra integra referencias sin reescribir fuentes.",
      individualAct: "Acta Individual de Intervencion",
      author: "Autor",
      version: "Version",
      time: "Hora simulada",
      integrity: "Referencia de integridad",
      source: "Fuente",
      actReady: "Acta lista para integracion",
      integration: "Actas individuales -> Acta Digital de Procedimiento -> Expediente maestro -> Cierre trazable",
      noAbsorption: "Integracion sin absorcion documental.",
      closureTitle: "Cierre institucional",
      closureLead: "La consola maestra valida documentos y separa el material entregable de la informacion restringida.",
      validateClosure: "Validar cierre",
      closureReady: "Cierre trazable validado por operador humano.",
      closureFlowMaster: "Consola maestra",
      closureFlowValidation: "Validacion del cierre",
      closureFlowPackage: "Paquete ciudadano",
      closureFlowDevice: "Dispositivo ciudadano",
      packageTitle: "Devolucion ciudadana simulada",
      packageLead: "El dispositivo recibe un resumen claro, proximos pasos y solo documentos habilitados.",
      incidentClosed: "Incidente finalizado",
      finalized: "Finalizado",
      closedAt: "Fecha y hora de cierre",
      simulatedClosureTime: "18/07/2026 - 10:20 (simulado)",
      participatingAgencies: "Organismos intervinientes",
      relevantActions: "Acciones relevantes",
      availableDocuments: "Documentos disponibles",
      nextMedicalStep: "Proximo paso medico",
      referenceNumber: "Numero de referencia",
      followUpOwner: "Organismo responsable del seguimiento",
      followUpValue: "107 Salud - seguimiento clinico simulado",
      packageIntegrity: "Referencia de integridad",
      receiptConfirmation: "Confirmacion de recepcion",
      receiptPending: "Pendiente de confirmacion",
      packageReceived: "Paquete ciudadano recibido",
      documentationAvailable: "Documentacion disponible",
      followUpPending: "Seguimiento pendiente",
      emergencySessionEnded: "Sesion de emergencia finalizada",
      viewSummary: "Ver resumen",
      viewDocuments: "Ver documentos",
      nextSteps: "Proximos pasos",
      confirmReceipt: "Confirmar recepcion",
      observation: "Presentar observacion",
      packageDelivered: "Paquete ciudadano simulado entregado. La informacion restringida no se muestra.",
      eventLedger: "Bitacora del recorrido operativo",
      noEvents: "Inicie la demostracion para ver eventos simulados append-only.",
      operationMessage: "",
      emergencyHealth: "Atencion prehospitalaria",
      securitySupport: "Seguridad de escena",
      trafficOrder: "Ordenamiento vial",
      fireResponse: "Prevencion de incendio",
      medicalCare: "Atencion a persona lesionada",
      sceneSecurity: "Resguardo del lugar",
      trafficControl: "Control de circulacion",
      spillAndFireRisk: "Control de derrame y riesgo de incendio",
      healthOperator: "Operadora 107 Demo",
      securityOperator: "Oficial Movil Demo",
      trafficOperator: "Agente Transito Demo",
      fireOperator: "Jefe de Dotacion Demo",
      healthMapUnit: "Ambulancia 107-04",
      securityMapUnit: "Movil 911-12",
      trafficMapUnit: "Unidad T-08",
      fireMapUnit: "Dotacion B-03",
      healthSelectionCriterion: "Cercania + capacidad sanitaria",
      securitySelectionCriterion: "Jurisdiccion + prioridad",
      trafficSelectionCriterion: "Mayor proximidad",
      fireSelectionCriterion: "Capacidad especializada",
      fieldInstruction: "Prioridad de vida, seguridad de escena y coordinacion interinstitucional.",
      packageActions: "Asistencia sanitaria iniciada, escena resguardada, transito ordenado y riesgo de incendio contenido.",
      packageDocuments: "Resumen ciudadano y constancia de atencion simulada.",
      packageNext: "Continuar control medico segun indicacion del equipo tratante.",
      status: "Estado",
      guidedMessage: "La demostracion guiada enfoca la etapa actual; los cambios son solo visuales y de demostracion.",
      advanced: "Explorar funcionamiento avanzado",
    },
    "en-US": {
      kicker: "Primary journey",
      title: "PIPO Operational Journey",
      lead: "A guided demonstration of how a citizen alert can reach a master console, coordinate agencies in parallel, document interventions, and provide a clear closure back to the citizen.",
      start: "Start guided demonstration",
      next: "Next step",
      previous: "Previous step",
      restart: "Restart",
      progress: "Step {current} of 8 - {label}",
      step1: "Citizen activation",
      step2: "Master reception",
      step3: "Parallel routing",
      step4: "Resource assignment",
      step5: "Field intervention",
      step6: "Documentation",
      step7: "Institutional closure",
      step8: "Citizen return",
      scenario: "Demonstration scenario",
      scenarioTitle: "Road incident with coordinated response",
      scenarioLead: "An injured person, a possible spill, fire risk, and a need to organize traffic.",
      demoOnly: "Everything shown is simulated. No real sensors, location, media, or emergency services are used.",
      citizenZone: "A. Citizen device",
      masterZone: "B. Institutional coordination",
      fieldZone: "C. Field resources",
      pipoPoint: "PIPO point",
      demoCitizen: "Demo citizen",
      demoRegion: "Argentina - Buenos Aires",
      internationalRegion: "International demonstration",
      citizenAlert: "Road incident",
      citizenReport: "Simulated collision. There is an injured person, a possible spill, and disrupted traffic.",
      simulatedLocation: "Simulated location",
      simulatedAudio: "Simulated audio",
      simulatedVideo: "Simulated video",
      simulatedText: "Written report",
      permissions: "Granted permissions",
      permissionConfirmed: "Simulated consent confirmed",
      connected: "Simulated connection active",
      receiver: "Receiving console",
      connectedOperator: "Connected operator",
      helpOnWay: "Help on the way",
      incidentId: "Incident identifier",
      masterConsole: "PIPO Master Console",
      masterReceived: "Alert received by the PIPO Master Console.",
      preliminaryPriority: "Preliminary priority",
      highPriority: "High - human validation required",
      risks: "Detected risks",
      riskList: "Injured person, possible spill, fire risk, and affected traffic.",
      missing: "Missing information",
      missingList: "Number of vehicles and spill conditions.",
      validate: "Validate alert",
      adjustPriority: "Adjust priority",
      routeAgencies: "Route to agencies",
      validated: "Alert validated by console operator.",
      priorityConfirmed: "Priority confirmed by human operator.",
      routeNote: "Routing can happen simultaneously to several agencies.",
      agenciesTitle: "Specialized consoles in parallel",
      agenciesLead: "Each console receives only the simulated context necessary for its purpose.",
      security: "911 Security",
      health: "107 Health",
      traffic: "Traffic",
      fire: "Fire response",
      internationalSecurity: "Public safety",
      internationalHealth: "Emergency health",
      internationalTraffic: "Road management",
      internationalFire: "Fire response",
      alertReceived: "Alert received",
      informationShared: "Shared information",
      resourcesAvailable: "Available resource",
      resourceSelected: "Suggested resource",
      confirmation: "Human confirmation",
      pending: "Pending",
      assigned: "Assigned",
      confirmResource: "Confirm resource",
      confirmed: "Confirmed by console operator",
      pendingHumanConfirmation: "Pending human confirmation",
      selectionRule: "PIPO suggests resources through simulated proximity, specialty, availability, jurisdiction, and priority. Final assignment requires human confirmation.",
      assignmentRequired: "Confirm the suggested resources before continuing to field intervention.",
      criteria: "Selection criteria",
      criteriaList: "Simulated proximity, specialty, availability, jurisdiction, priority, and required capability.",
      mapTitle: "Simulated operational map",
      mapLead: "Abstract representation with no coordinates, real location, or external services.",
      incident: "Incident",
      available: "Available",
      availability: "Availability",
      operationalStatus: "Operational status",
      mainCriterion: "Primary selection criterion",
      onWay: "On the way",
      arrived: "Arrived",
      intervening: "Intervening",
      completed: "Completed",
      resourceId: "Resource ID",
      organization: "Organization",
      specialty: "Specialty",
      operator: "Operator",
      unit: "Unit",
      distance: "Simulated distance",
      eta: "Estimated arrival",
      jurisdiction: "Simulated jurisdiction",
      fieldTitle: "Field operator devices",
      fieldLead: "The four operators can keep different states and consult only authorized context before arrival.",
      contextReceived: "Context received",
      departure: "Departure",
      arrival: "Arrival",
      intervention: "Intervention",
      action: "Simulated action",
      evidence: "Simulated evidence",
      support: "Request support",
      finish: "Complete intervention",
      fieldContext: "Simulated context shared with user authorization. No real sensors are used.",
      documentsTitle: "Individual records and documentary integration",
      documentsLead: "Each agency retains its own authorship. The master console integrates references without rewriting sources.",
      individualAct: "Individual intervention record",
      author: "Author",
      version: "Version",
      time: "Simulated time",
      integrity: "Integrity reference",
      source: "Source",
      actReady: "Record ready for integration",
      integration: "Individual records -> Digital procedure record -> Master incident record -> Traceable closure",
      noAbsorption: "Integration without documentary absorption.",
      closureTitle: "Institutional closure",
      closureLead: "The master console validates documents and separates deliverable material from restricted information.",
      validateClosure: "Validate closure",
      closureReady: "Traceable closure validated by human operator.",
      closureFlowMaster: "Master console",
      closureFlowValidation: "Closure validation",
      closureFlowPackage: "Citizen package",
      closureFlowDevice: "Citizen device",
      packageTitle: "Simulated citizen return",
      packageLead: "The device receives a clear summary, next steps, and only enabled documents.",
      incidentClosed: "Incident closed",
      finalized: "Finalized",
      closedAt: "Closure date and time",
      simulatedClosureTime: "Jul 18, 2026 - 10:20 (simulated)",
      participatingAgencies: "Participating agencies",
      relevantActions: "Relevant actions",
      availableDocuments: "Available documents",
      nextMedicalStep: "Next medical step",
      referenceNumber: "Reference number",
      followUpOwner: "Follow-up responsible agency",
      followUpValue: "107 Health - simulated clinical follow-up",
      packageIntegrity: "Integrity reference",
      receiptConfirmation: "Receipt confirmation",
      receiptPending: "Pending confirmation",
      packageReceived: "Citizen package received",
      documentationAvailable: "Documentation available",
      followUpPending: "Follow-up pending",
      emergencySessionEnded: "Emergency session ended",
      viewSummary: "View summary",
      viewDocuments: "View documents",
      nextSteps: "Next steps",
      confirmReceipt: "Confirm receipt",
      observation: "Submit observation",
      packageDelivered: "Simulated citizen package delivered. Restricted information is not displayed.",
      eventLedger: "Operational journey ledger",
      noEvents: "Start the demonstration to view append-only simulated events.",
      operationMessage: "",
      emergencyHealth: "Prehospital care",
      securitySupport: "Scene security",
      trafficOrder: "Traffic organization",
      fireResponse: "Fire prevention",
      medicalCare: "Care for injured person",
      sceneSecurity: "Scene protection",
      trafficControl: "Traffic control",
      spillAndFireRisk: "Spill and fire risk control",
      healthOperator: "Demo health operator",
      securityOperator: "Demo field officer",
      trafficOperator: "Demo traffic agent",
      fireOperator: "Demo fire lead",
      healthMapUnit: "Ambulance 107-04",
      securityMapUnit: "Vehicle 911-12",
      trafficMapUnit: "Unit T-08",
      fireMapUnit: "Fire unit B-03",
      healthSelectionCriterion: "Proximity + health capacity",
      securitySelectionCriterion: "Jurisdiction + priority",
      trafficSelectionCriterion: "Highest proximity",
      fireSelectionCriterion: "Specialized capacity",
      fieldInstruction: "Life priority, scene safety, and interagency coordination.",
      packageActions: "Health care initiated, scene protected, traffic organized, and fire risk contained.",
      packageDocuments: "Citizen summary and simulated care certificate.",
      packageNext: "Continue medical follow-up according to the treating team guidance.",
      status: "Status",
      guidedMessage: "The guided demonstration focuses the current stage; all changes are visual and for demonstration only.",
      advanced: "Explore advanced operation",
    },
  };

  const state = {
    locale: detectLocale(),
    region: "AR_BUENOS_AIRES",
    run: 0,
    step: 0,
    events: [],
    assignments: Object.fromEntries(agencies.map((agency) => [agency, false])),
    routed: false,
    message: "",
  };

  function detectLocale() {
    try {
      const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
      if (stored === "es-AR" || stored === "en-US") return stored;
    } catch (error) {
      // The demo remains functional when storage access is unavailable.
    }
    const preferred = String(navigator.language || "").toLowerCase();
    return preferred.startsWith("en") ? "en-US" : DEFAULT_LOCALE;
  }

  function text(key) {
    return copy[state.locale][key] || key;
  }

  function template(value, values) {
    return value.replace(/\{(\w+)\}/g, (match, key) => values[key] ?? match);
  }

  function agencyName(agency) {
    const international = state.region === "INTERNATIONAL";
    return text(international ? `international${agency.charAt(0).toUpperCase()}${agency.slice(1)}` : agency);
  }

  function regionLabel() {
    return text(state.region === "INTERNATIONAL" ? "internationalRegion" : "demoRegion");
  }

  function incidentId() {
    return `PIPO-OPS-${String(Math.max(state.run, 1)).padStart(6, "0")}`;
  }

  function shortHash(value) {
    let hash = 2166136261;
    for (let index = 0; index < value.length; index += 1) {
      hash ^= value.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return (hash >>> 0).toString(16).padStart(8, "0");
  }

  function appendEvent(code, label, agency = "MASTER") {
    const previous = state.events[state.events.length - 1];
    const timestamp = new Date().toISOString();
    const reference = `ops-ref-${shortHash(`${state.run}|${previous?.reference || "GENESIS"}|${code}|${state.events.length + 1}`)}`;
    state.events.push({
      id: `OPS-${String(state.events.length + 1).padStart(4, "0")}`,
      code,
      label,
      agency,
      timestamp,
      previous: previous?.reference || "GENESIS",
      reference,
    });
  }

  function currentStepLabel() {
    return text(`step${Math.max(state.step, 1)}`);
  }

  function isAtLeast(step) {
    return state.step >= step;
  }

  function fieldStatus(agency) {
    if (!state.assignments[agency]) return text("available");
    if (!isAtLeast(5)) return text("assigned");
    if (state.step === 5) {
      return {
        health: text("onWay"),
        security: text("assigned"),
        traffic: text("arrived"),
        fire: text("onWay"),
      }[agency];
    }
    if (state.step === 6) {
      return {
        health: text("intervening"),
        security: text("arrived"),
        traffic: text("completed"),
        fire: text("onWay"),
      }[agency];
    }
    return text("completed");
  }

  function stepTarget() {
    return {
      1: "journeyCitizenZone",
      2: "journeyMasterZone",
      3: "journeyAgencyZone",
      4: "journeyResourceZone",
      5: "journeyFieldZone",
      6: "journeyDocumentZone",
      7: "journeyClosureZone",
      8: "journeyPackageZone",
    }[state.step];
  }

  function recordStep(step) {
    if (step === 1) {
      appendEvent(eventCodes.masterReceived, text("masterReceived"));
      appendEvent(eventCodes.masterValidated, text("validated"));
      appendEvent(eventCodes.priorityConfirmed, text("priorityConfirmed"));
    }
    if (step === 3) startRouting();
    if (step === 4) agencies.forEach((agency) => suggestResource(agency));
    if (step === 5) {
      agencies.forEach((agency) => {
        appendEvent(eventCodes.fieldContext, text("fieldContext"), agency.toUpperCase());
      });
      appendEvent(eventCodes.fieldDeparted, `${resources.health.unit}: ${text("onWay")}`, "HEALTH");
      appendEvent(eventCodes.fieldDeparted, `${resources.fire.unit}: ${text("onWay")}`, "FIRE");
      appendEvent(eventCodes.fieldArrived, `${resources.traffic.unit}: ${text("arrived")}`, "TRAFFIC");
    }
    if (step === 6) {
      agencies.forEach((agency) => appendEvent(eventCodes.interventionCompleted, `${resources[agency].unit}: ${text("completed")}`, agency.toUpperCase()));
      appendEvent(eventCodes.documentationReceived, text("actReady"));
    }
    if (step === 7) appendEvent(eventCodes.closureValidated, text("closureReady"));
    if (step === 8) appendEvent(eventCodes.packageDelivered, text("packageDelivered"));
  }

  function startRouting() {
    if (state.routed) return;
    state.routed = true;
    appendEvent(eventCodes.routingStarted, text("routeNote"));
    agencies.forEach((agency) => appendEvent(eventCodes.agencyReceived, `${agencyName(agency)}: ${text("alertReceived")}`, agency.toUpperCase()));
  }

  function suggestResource(agency) {
    const alreadySuggested = state.events.some((event) => event.code === eventCodes.resourceSuggested && event.agency === agency.toUpperCase());
    if (!alreadySuggested) appendEvent(eventCodes.resourceSuggested, `${resources[agency].unit}: ${text("selectionRule")}`, agency.toUpperCase());
  }

  function confirmResource(agency) {
    if (state.assignments[agency]) return;
    state.assignments[agency] = true;
    appendEvent(eventCodes.resourceAssigned, `${resources[agency].unit}: ${text("confirmed")}`, agency.toUpperCase());
    state.message = `${agencyName(agency)}: ${text("confirmed")}`;
    render();
  }

  function confirmOutstandingResources() {
    return agencies.every((agency) => state.assignments[agency]);
  }

  function startJourney() {
    state.run += 1;
    state.step = 1;
    state.events = [];
    state.assignments = Object.fromEntries(agencies.map((agency) => [agency, false]));
    state.routed = false;
    state.message = text("guidedMessage");
    recordStep(1);
    render();
    focusCurrentStep();
  }

  function moveStep(direction) {
    if (!state.step) return startJourney();
    const next = Math.max(1, Math.min(8, state.step + direction));
    if (next === state.step) return;
    if (direction > 0) {
      if (next >= 5 && !confirmOutstandingResources()) {
        state.step = 4;
        state.message = text("assignmentRequired");
        render();
        focusCurrentStep();
        return;
      }
      recordStep(next);
    }
    state.step = next;
    state.message = text("guidedMessage");
    render();
    focusCurrentStep();
  }

  function restartJourney() {
    state.step = 0;
    state.events = [];
    state.assignments = Object.fromEntries(agencies.map((agency) => [agency, false]));
    state.routed = false;
    state.message = "";
    render();
  }

  function focusCurrentStep() {
    const target = document.getElementById(stepTarget());
    if (!target) return;
    window.requestAnimationFrame(() => target.scrollIntoView({ behavior: "smooth", block: "center" }));
  }

  function resourceDetails(agency) {
    const resource = resources[agency];
    return `
      <dl class="journey-resource-details">
        <div><dt>${text("resourceId")}</dt><dd>${resource.resourceId}</dd></div>
        <div><dt>${text("unit")}</dt><dd>${resource.unit}</dd></div>
        <div><dt>${text("specialty")}</dt><dd>${text(resource.specialty)}</dd></div>
        <div><dt>${text("operator")}</dt><dd>${text(resource.operator)}</dd></div>
        <div><dt>${text("distance")}</dt><dd>${resource.distance}</dd></div>
        <div><dt>${text("eta")}</dt><dd>${resource.eta}</dd></div>
      </dl>`;
  }

  function renderCitizenZone() {
    const active = isAtLeast(1);
    return `
      <article id="journeyCitizenZone" class="journey-zone journey-citizen ${state.step === 1 ? "is-focused" : ""}">
        <p class="journey-zone-label">${text("citizenZone")}</p>
        <div class="journey-mini-phone">
          <div class="journey-phone-bar"><span>9:41</span><span aria-hidden="true">&#9679; &#9679; &#9679;</span></div>
          <div class="journey-phone-content">
            <button type="button" class="journey-pipo-point" data-journey-action="start" aria-label="${text("start")}">P</button>
            <span>${text("pipoPoint")}</span>
            <span class="journey-phone-user">${text("demoCitizen")} | ${regionLabel()}</span>
            <strong>${text("citizenAlert")}</strong>
            <p>${text("citizenReport")}</p>
            <div class="journey-permission-list">
              <span>${text("simulatedLocation")}</span><span>${text("simulatedAudio")}</span><span>${text("simulatedVideo")}</span><span>${text("simulatedText")}</span>
            </div>
          </div>
        </div>
        <dl class="journey-key-values">
          <div><dt>${text("permissions")}</dt><dd>${active ? text("permissionConfirmed") : text("pending")}</dd></div>
          <div><dt>${text("incidentId")}</dt><dd>${active ? incidentId() : "-"}</dd></div>
          <div><dt>${text("receiver")}</dt><dd>${text("masterConsole")}</dd></div>
          <div><dt>${text("connectedOperator")}</dt><dd>${active ? "Turno A / Demo" : "-"}</dd></div>
        </dl>
        <p class="journey-state-note ${active ? "is-active" : ""}">${active ? text("masterReceived") : text("demoOnly")}</p>
      </article>`;
  }

  function renderMasterZone() {
    const active = isAtLeast(2);
    return `
      <article id="journeyMasterZone" class="journey-zone journey-master ${state.step === 2 ? "is-focused" : ""}">
        <p class="journey-zone-label">${text("masterZone")}</p>
        <h3>${text("masterConsole")}</h3>
        <div class="journey-master-alert">
          <strong>${active ? text("masterReceived") : text("alertReceived")}</strong>
          <span>${text("incidentId")}: ${active ? incidentId() : "-"}</span>
        </div>
        <dl class="journey-key-values">
          <div><dt>${text("preliminaryPriority")}</dt><dd>${text("highPriority")}</dd></div>
          <div><dt>${text("simulatedLocation")}</dt><dd>${active ? text("connected") : text("pending")}</dd></div>
          <div><dt>${text("risks")}</dt><dd>${text("riskList")}</dd></div>
          <div><dt>${text("missing")}</dt><dd>${text("missingList")}</dd></div>
        </dl>
        <div class="journey-action-row">
          <button type="button" data-journey-action="validate" ${state.step ? "" : "disabled"}>${text("validate")}</button>
          <button type="button" class="is-secondary" data-journey-action="priority" ${state.step ? "" : "disabled"}>${text("adjustPriority")}</button>
          <button type="button" class="is-primary" data-journey-action="route" ${state.step >= 2 ? "" : "disabled"}>${text("routeAgencies")}</button>
        </div>
        <p class="journey-note">${text("routeNote")}</p>
      </article>`;
  }

  function renderFieldZone() {
    const active = isAtLeast(4);
    return `
      <article id="journeyFieldZone" class="journey-zone journey-field ${state.step === 5 ? "is-focused" : ""}">
        <p class="journey-zone-label">${text("fieldZone")}</p>
        <h3>${text("fieldTitle")}</h3>
        <p>${text("fieldLead")}</p>
        <div class="journey-field-summary">
          ${agencies.map((agency) => `<div><span>${agencyName(agency)}</span><strong>${active ? fieldStatus(agency) : text("pending")}</strong></div>`).join("")}
        </div>
        <div class="journey-field-context">
          <strong>${text("contextReceived")}</strong>
          <span>${text("simulatedLocation")} | ${text("simulatedAudio")} | ${text("simulatedVideo")}</span>
          <p>${text("fieldContext")}</p>
        </div>
      </article>`;
  }

  function renderAgencyCard(agency) {
    const resource = resources[agency];
    const received = isAtLeast(3);
    const assigned = state.assignments[agency];
    return `
      <article class="journey-agency-card ${state.step === 3 ? "is-focused" : ""}">
        <header><h3>${agencyName(agency)}</h3><span class="journey-status ${assigned ? "is-assigned" : ""}">${assigned ? text("assigned") : text("pending")}</span></header>
        <dl class="journey-key-values compact">
          <div><dt>${text("alertReceived")}</dt><dd>${received ? text("connected") : text("pending")}</dd></div>
          <div><dt>${text("informationShared")}</dt><dd>${received ? `${text("citizenAlert")}, ${text("risks")}` : "-"}</dd></div>
          <div><dt>${text("resourcesAvailable")}</dt><dd>${resource.unit}</dd></div>
          <div><dt>${text("resourceSelected")}</dt><dd>${resource.distance} / ${resource.eta}</dd></div>
        </dl>
        <p class="journey-agency-capability">${text(resource.capability)}</p>
        <p class="journey-confirmation-state"><span>${text("resourceSelected")}</span><strong>${assigned ? text("confirmed") : text("pendingHumanConfirmation")}</strong></p>
        <button type="button" data-journey-action="confirm-resource" data-agency="${agency}" ${received && !assigned ? "" : "disabled"}>${assigned ? text("confirmed") : text("confirmResource")}</button>
      </article>`;
  }

  function renderMapResourceDetails(agency) {
    const resource = resources[agency];
    const assigned = state.assignments[agency];
    return `
      <article class="journey-map-resource-card ${resources[agency].mapClass}">
        <header><div><span>${agencyName(agency)}</span><h3>${text(resource.mapUnit)}</h3></div><strong>${assigned ? text("confirmed") : text("pendingHumanConfirmation")}</strong></header>
        <dl class="journey-map-resource-data">
          <div><dt>${text("specialty")}</dt><dd>${text(resource.specialty)}</dd></div>
          <div><dt>${text("distance")}</dt><dd>${resource.distance}</dd></div>
          <div><dt>${text("eta")}</dt><dd>${resource.eta}</dd></div>
          <div><dt>${text("availability")}</dt><dd>${text("available")}</dd></div>
          <div><dt>${text("operationalStatus")}</dt><dd>${assigned ? fieldStatus(agency) : text("pending")}</dd></div>
          <div><dt>${text("mainCriterion")}</dt><dd>${text(resource.selectionCriterion)}</dd></div>
        </dl>
        <p class="journey-map-assignment"><span>${text("resourceSelected")}</span><strong>${assigned ? text("confirmed") : text("pendingHumanConfirmation")}</strong></p>
      </article>`;
  }

  function renderMap() {
    return `
      <section id="journeyResourceZone" class="journey-map-section ${state.step === 4 ? "is-focused" : ""}" aria-labelledby="journeyMapTitle">
        <div class="journey-section-heading"><div><p>${text("step4")}</p><h2 id="journeyMapTitle">${text("mapTitle")}</h2></div><span>${text("mapLead")}</span></div>
        <div class="journey-map" aria-label="${text("mapTitle")}">
          <div class="journey-map-incident"><span>${text("incident")}</span></div>
          ${agencies.map((agency) => `<div class="journey-map-resource ${resources[agency].mapClass} ${state.assignments[agency] ? "is-moving" : ""}"><b>${resources[agency].unit}</b><span>${fieldStatus(agency)}</span></div>`).join("")}
          <i class="journey-route route-health" aria-hidden="true"></i><i class="journey-route route-security" aria-hidden="true"></i><i class="journey-route route-traffic" aria-hidden="true"></i><i class="journey-route route-fire" aria-hidden="true"></i>
        </div>
        <div class="journey-selection-note"><strong>${text("criteria")}</strong><span>${text("criteriaList")}</span></div>
        <div class="journey-map-resource-grid">${agencies.map(renderMapResourceDetails).join("")}</div>
        <p class="journey-map-human-note">${text("selectionRule")}</p>
      </section>`;
  }

  function renderFieldCards() {
    return `
      <section class="journey-field-section" aria-labelledby="journeyFieldTitle">
        <div class="journey-section-heading"><div><p>${text("step5")}</p><h2 id="journeyFieldTitle">${text("fieldTitle")}</h2></div><span>${text("fieldLead")}</span></div>
        <div class="journey-field-cards">
          ${agencies.map((agency) => {
            const resource = resources[agency];
            const status = fieldStatus(agency);
            return `<article class="journey-operator-card ${state.step === 5 ? "is-focused" : ""}">
              <header><h3>${resource.unit}</h3><span class="journey-status">${status}</span></header>
              <p>${agencyName(agency)} - ${text(resource.operator)}</p>
              ${resourceDetails(agency)}
              <p class="journey-operator-instruction">${text("fieldInstruction")}</p>
              <div class="journey-operator-actions"><button type="button" disabled>${text("departure")}</button><button type="button" disabled>${text("arrival")}</button><button type="button" disabled>${text("action")}</button></div>
            </article>`;
          }).join("")}
        </div>
      </section>`;
  }

  function renderDocuments() {
    return `
      <section id="journeyDocumentZone" class="journey-document-section ${state.step === 6 ? "is-focused" : ""}" aria-labelledby="journeyDocsTitle">
        <div class="journey-section-heading"><div><p>${text("step6")}</p><h2 id="journeyDocsTitle">${text("documentsTitle")}</h2></div><span>${text("documentsLead")}</span></div>
        <div class="journey-acts-grid">
          ${agencies.map((agency, index) => `<article class="journey-act-card">
            <span>${text("individualAct")}</span><h3>${agencyName(agency)}</h3>
            <dl class="journey-key-values compact"><div><dt>${text("author")}</dt><dd>${text(resources[agency].operator)}</dd></div><div><dt>${text("version")}</dt><dd>v1.0</dd></div><div><dt>${text("time")}</dt><dd>10:${String(12 + index).padStart(2, "0")}</dd></div><div><dt>${text("integrity")}</dt><dd>act-${resources[agency].resourceId.slice(-2)}-demo</dd></div><div><dt>${text("source")}</dt><dd>${resources[agency].resourceId}</dd></div></dl>
            <strong>${isAtLeast(6) ? text("actReady") : text("pending")}</strong>
          </article>`).join("")}
        </div>
        <p class="journey-integration">${text("integration")} <strong>${text("noAbsorption")}</strong></p>
      </section>`;
  }

  function renderClosure() {
    const closed = isAtLeast(7);
    const delivered = isAtLeast(8);
    return `
      <section id="journeyClosureZone" class="journey-closure-section ${state.step === 7 ? "is-focused" : ""}" aria-labelledby="journeyClosureTitle">
        <div><p>${text("step7")}</p><h2 id="journeyClosureTitle">${text("closureTitle")}</h2><p>${text("closureLead")}</p><button type="button" data-journey-action="closure" ${isAtLeast(6) && !closed ? "" : "disabled"}>${text("validateClosure")}</button><span class="journey-closure-status">${closed ? text("closureReady") : text("pending")}</span></div>
        <div id="journeyPackageZone" class="journey-citizen-package ${state.step === 8 ? "is-focused" : ""}">
          <p>${text("step8")}</p>
          <div class="journey-closure-flow" aria-label="${text("step8")}"><span>${text("closureFlowMaster")}</span><b aria-hidden="true">&#8594;</b><span>${text("closureFlowValidation")}</span><b aria-hidden="true">&#8594;</b><span>${text("closureFlowPackage")}</span><b aria-hidden="true">&#8594;</b><strong>${text("closureFlowDevice")}</strong></div>
          <div class="journey-mini-phone journey-final-phone">
            <div class="journey-phone-bar"><span>9:41</span><span aria-hidden="true">&#9679; &#9679; &#9679;</span></div>
            <div class="journey-final-phone-content">
              <span class="journey-phone-user">${text("demoCitizen")} | ${regionLabel()}</span>
              <span class="journey-final-scenario">${text("citizenAlert")}</span>
              <strong>${text("incidentClosed")}</strong>
              <p>${text("packageLead")}</p>
              <dl class="journey-final-summary">
                <div><dt>${text("incidentId")}</dt><dd>${incidentId()}</dd></div>
                <div><dt>${text("status")}</dt><dd>${delivered ? text("finalized") : text("pending")}</dd></div>
                <div><dt>${text("closedAt")}</dt><dd>${text("simulatedClosureTime")}</dd></div>
                <div><dt>${text("participatingAgencies")}</dt><dd>${agencies.map(agencyName).join(", ")}</dd></div>
                <div><dt>${text("relevantActions")}</dt><dd>${text("packageActions")}</dd></div>
                <div><dt>${text("packageReceived")}</dt><dd>${delivered ? text("packageDelivered") : text("pending")}</dd></div>
                <div><dt>${text("availableDocuments")}</dt><dd>${text("packageDocuments")}</dd></div>
                <div><dt>${text("nextSteps")}</dt><dd>${text("packageNext")}</dd></div>
                <div><dt>${text("followUpOwner")}</dt><dd>${text("followUpValue")}</dd></div>
                <div><dt>${text("packageIntegrity")}</dt><dd>pkg-${shortHash(incidentId())}</dd></div>
                <div><dt>${text("receiptConfirmation")}</dt><dd>${text("receiptPending")}</dd></div>
              </dl>
              <div class="journey-return-indicators"><span>${text("packageReceived")}</span><span>${text("documentationAvailable")}</span><span>${text("followUpPending")}</span><span>${text("emergencySessionEnded")}</span></div>
              <div class="journey-action-row journey-final-actions"><button type="button" data-journey-action="package" ${delivered ? "" : "disabled"}>${text("viewSummary")}</button><button type="button" data-journey-action="package" ${delivered ? "" : "disabled"}>${text("viewDocuments")}</button><button type="button" disabled>${text("nextSteps")}</button><button type="button" disabled>${text("confirmReceipt")}</button><button type="button" class="is-secondary" data-journey-action="observation" ${delivered ? "" : "disabled"}>${text("observation")}</button></div>
            </div>
          </div>
        </div>
      </section>`;
  }

  function renderLedger() {
    if (!state.events.length) return `<p class="journey-empty">${text("noEvents")}</p>`;
    return `<ol class="journey-ledger">${state.events.slice().reverse().map((event) => `<li><strong>${event.code}</strong><span>${displayEventLabel(event)}</span><code>${event.reference} / prev: ${event.previous}</code></li>`).join("")}</ol>`;
  }

  function displayEventLabel(event) {
    const agency = String(event.agency || "").toLowerCase();
    const resource = resources[agency];
    if (event.code === eventCodes.masterReceived) return text("masterReceived");
    if (event.code === eventCodes.masterValidated) return text("validated");
    if (event.code === eventCodes.priorityConfirmed) return text("priorityConfirmed");
    if (event.code === eventCodes.routingStarted) return text("routeNote");
    if (event.code === eventCodes.agencyReceived) return `${agencyName(agency)}: ${text("alertReceived")}`;
    if (event.code === eventCodes.resourceSuggested && resource) return `${resource.unit}: ${text("selectionRule")}`;
    if (event.code === eventCodes.resourceAssigned && resource) return `${resource.unit}: ${text("confirmed")}`;
    if (event.code === eventCodes.fieldContext) return text("fieldContext");
    if (event.code === eventCodes.fieldDeparted && resource) return `${resource.unit}: ${text("onWay")}`;
    if (event.code === eventCodes.fieldArrived && resource) return `${resource.unit}: ${text("arrived")}`;
    if (event.code === eventCodes.interventionStarted && resource) return `${resource.unit}: ${text("intervening")}`;
    if (event.code === eventCodes.interventionCompleted && resource) return `${resource.unit}: ${text("completed")}`;
    if (event.code === eventCodes.documentationReceived) return text("actReady");
    if (event.code === eventCodes.closureValidated) return text("closureReady");
    if (event.code === eventCodes.packageDelivered) return text("packageDelivered");
    return event.label;
  }

  function renderTemplate() {
    const stepLabel = currentStepLabel();
    return `
      <section class="journey-shell" aria-labelledby="journeyTitle">
        <header class="journey-header">
          <div><p class="journey-kicker">${text("kicker")}</p><h1 id="journeyTitle">${text("title")}</h1><p>${text("lead")}</p></div>
          <aside><strong>${text("scenario")}</strong><span>${text("scenarioTitle")}</span><p>${text("scenarioLead")}</p><button type="button" data-journey-action="start">${text("start")}</button></aside>
        </header>
        <div class="journey-controls" aria-label="${text("title")}">
          <strong>${template(text("progress"), { current: Math.max(state.step, 1), label: stepLabel })}</strong>
          <div><button type="button" data-journey-action="previous" ${state.step > 1 ? "" : "disabled"}>${text("previous")}</button><button type="button" class="is-primary" data-journey-action="next">${state.step ? text("next") : text("start")}</button><button type="button" class="is-secondary" data-journey-action="restart">${text("restart")}</button></div>
        </div>
        <p id="journeyLiveMessage" class="journey-live-message" role="status" aria-live="polite">${state.message}</p>
        <div class="journey-main-grid">
          ${renderCitizenZone()}
          ${renderMasterZone()}
          ${renderFieldZone()}
        </div>
        <section id="journeyAgencyZone" class="journey-agency-section ${state.step === 3 ? "is-focused" : ""}" aria-labelledby="journeyAgenciesTitle">
          <div class="journey-section-heading"><div><p>${text("step3")}</p><h2 id="journeyAgenciesTitle">${text("agenciesTitle")}</h2></div><span>${text("agenciesLead")}</span></div>
          <div class="journey-agency-grid">${agencies.map(renderAgencyCard).join("")}</div>
        </section>
        ${renderMap()}
        ${renderFieldCards()}
        ${renderDocuments()}
        ${renderClosure()}
        <section class="journey-ledger-section" aria-labelledby="journeyLedgerTitle"><div class="journey-section-heading"><div><p>${text("step6")}</p><h2 id="journeyLedgerTitle">${text("eventLedger")}</h2></div><span>${text("guidedMessage")}</span></div>${renderLedger()}</section>
        <details class="journey-advanced-link"><summary>${text("advanced")}</summary><p>${text("demoOnly")}</p><button type="button" data-journey-action="advanced">${text("advanced")}</button></details>
      </section>`;
  }

  function openAdvanced() {
    const advanced = document.getElementById("pipoAdvancedModules");
    if (!advanced) return;
    advanced.open = true;
    advanced.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function bindEvents() {
    root.querySelectorAll("[data-journey-action]").forEach((button) => {
      button.addEventListener("click", () => {
        const action = button.dataset.journeyAction;
        if (action === "start") startJourney();
        if (action === "next") moveStep(1);
        if (action === "previous") moveStep(-1);
        if (action === "restart") restartJourney();
        if (action === "route") {
          startRouting();
          state.message = text("routeNote");
          render();
        }
        if (action === "validate") {
          appendEvent(eventCodes.masterValidated, text("validated"));
          state.message = text("validated");
          render();
        }
        if (action === "priority") {
          appendEvent(eventCodes.priorityConfirmed, text("priorityConfirmed"));
          state.message = text("priorityConfirmed");
          render();
        }
        if (action === "confirm-resource") confirmResource(button.dataset.agency);
        if (action === "closure") {
          appendEvent(eventCodes.closureValidated, text("closureReady"));
          state.message = text("closureReady");
          render();
        }
        if (action === "package") {
          appendEvent(eventCodes.packageDelivered, text("packageDelivered"));
          state.message = text("packageDelivered");
          render();
        }
        if (action === "observation") {
          state.message = text("observation");
          render();
        }
        if (action === "advanced") openAdvanced();
      });
    });
  }

  function render() {
    root.innerHTML = renderTemplate();
    bindEvents();
  }

  window.addEventListener("pipo-demo-locale-change", (event) => {
    if (event.detail?.locale !== "es-AR" && event.detail?.locale !== "en-US") return;
    state.locale = event.detail.locale;
    state.message = "";
    render();
  });

  window.addEventListener("pipo-demo-region-change", (event) => {
    if (event.detail?.region !== "AR_BUENOS_AIRES" && event.detail?.region !== "INTERNATIONAL") return;
    state.region = event.detail.region;
    render();
  });

  render();
}());
