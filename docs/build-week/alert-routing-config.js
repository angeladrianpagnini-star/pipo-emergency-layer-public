(function (root, factory) {
  const config = factory();
  if (typeof module !== "undefined" && module.exports) module.exports = config;
  root.PIPOAlertRoutingConfig = config;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const consoles = {
    master: { id: "master", label: { "es-AR": "Consola Maestra", "en-US": "Master Console" }, kind: "coordination" },
    security: { id: "security", label: { "es-AR": "911 Seguridad", "en-US": "911 Security" }, kind: "security" },
    health: { id: "health", label: { "es-AR": "107 Salud", "en-US": "107 Health" }, kind: "health" },
    fire: { id: "fire", label: { "es-AR": "Bomberos", "en-US": "Fire Service" }, kind: "fire" },
    civil: { id: "civil", label: { "es-AR": "Defensa Civil", "en-US": "Civil Protection" }, kind: "civil" },
    gender: { id: "gender", label: { "es-AR": "Área de Género", "en-US": "Gender Response" }, kind: "gender" },
    childhood: { id: "childhood", label: { "es-AR": "Área de Niñez", "en-US": "Children and Youth" }, kind: "childhood" },
    traffic: { id: "traffic", label: { "es-AR": "Tránsito", "en-US": "Traffic" }, kind: "traffic" },
    prosecution: { id: "prosecution", label: { "es-AR": "Fiscalía / Acceso a Justicia", "en-US": "Prosecution / Justice Access" }, kind: "justice" },
    cvgrt: { id: "cvgrt", label: { "es-AR": "CVGRT", "en-US": "Territorial Response" }, kind: "community" },
    cybercrime: { id: "cybercrime", label: { "es-AR": "Ciberdelitos", "en-US": "Cybercrime" }, kind: "cyber" },
    station: { id: "station", label: { "es-AR": "Comisaría", "en-US": "Police Station" }, kind: "station" },
    municipal147: { id: "municipal147", label: { "es-AR": "147 Municipal", "en-US": "147 Municipal Services" }, kind: "municipal" },
  };

  const alerts = [
    {
      id: "general",
      label: { "es-AR": "Emergencia general", "en-US": "General emergency" },
      route: ["master", "security", "health"],
      priority: "high",
      icon: "!",
    },
    {
      id: "security",
      label: { "es-AR": "Seguridad / Policía", "en-US": "Security / Police" },
      route: ["master", "security", "station", "prosecution"],
      routeWhen: { injured: ["health"] },
      priority: "critical",
      icon: "S",
      subtypes: [
        "Robo o intento de robo",
        "Persona armada",
        "Amenaza o agresión",
        "Hecho ilícito en desarrollo",
        "Violación de domicilio",
        "Actividad sospechosa",
        "Necesito presencia policial",
        "Aportar información o evidencia",
      ],
    },
    {
      id: "health",
      label: { "es-AR": "Salud", "en-US": "Health" },
      route: ["health", "security"],
      priority: "high",
      icon: "+",
    },
    {
      id: "fire",
      label: { "es-AR": "Incendio", "en-US": "Fire" },
      route: ["fire", "security", "health", "civil"],
      priority: "critical",
      icon: "F",
    },
    {
      id: "violence",
      label: { "es-AR": "Violencia o género", "en-US": "Violence or gender-based violence" },
      route: ["security", "gender", "prosecution"],
      priority: "critical",
      icon: "V",
    },
    {
      id: "childhood",
      label: { "es-AR": "Niñez", "en-US": "Children and youth" },
      route: ["childhood", "security", "prosecution"],
      priority: "high",
      icon: "N",
    },
    {
      id: "traffic",
      label: { "es-AR": "Accidente vial", "en-US": "Road incident" },
      route: ["security", "health", "traffic", "fire"],
      priority: "high",
      icon: "T",
    },
    {
      id: "cybercrime",
      label: { "es-AR": "Ciberdelito", "en-US": "Cybercrime" },
      route: ["cybercrime", "prosecution", "station"],
      priority: "medium",
      icon: "C",
    },
    {
      id: "stolenDevice",
      label: { "es-AR": "Dispositivo robado", "en-US": "Stolen device" },
      route: ["station", "cybercrime", "prosecution"],
      priority: "medium",
      icon: "D",
    },
    {
      id: "cannotSpeak",
      label: { "es-AR": "No puedo hablar", "en-US": "I cannot speak" },
      route: ["master", "security"],
      priority: "high",
      icon: "•",
      silent: true,
    },
    {
      id: "confidential",
      label: { "es-AR": "Información confidencial", "en-US": "Confidential information" },
      route: ["prosecution", "station"],
      priority: "restricted",
      icon: "R",
      restricted: true,
    },
    {
      id: "municipal147",
      label: { "es-AR": "Reclamo municipal 147", "en-US": "147 municipal request" },
      route: ["municipal147", "traffic", "civil"],
      priority: "standard",
      icon: "147",
      municipalCategories: [
        "Luminarias", "Residuos", "Arbolado", "Vía pública", "Ruidos molestos", "Ocupación indebida",
        "Animales", "Infraestructura", "Ordenanzas", "Comercio", "Tránsito municipal", "Riesgo urbano no vital",
      ],
    },
  ];

  const resources = {
    security: { unit: { "es-AR": "Móvil 911-12", "en-US": "911-12 Mobile Unit" }, specialty: { "es-AR": "Seguridad de escena", "en-US": "Scene safety" }, distance: "2.1 km", eta: "06 min" },
    health: { unit: { "es-AR": "Unidad sanitaria 107-04", "en-US": "107-04 Medical Unit" }, specialty: { "es-AR": "Atención prehospitalaria", "en-US": "Pre-hospital care" }, distance: "1.8 km", eta: "05 min" },
    fire: { unit: { "es-AR": "Dotación B-03", "en-US": "Fire Crew B-03" }, specialty: { "es-AR": "Riesgo de incendio", "en-US": "Fire risk" }, distance: "3.4 km", eta: "09 min" },
    traffic: { unit: { "es-AR": "Unidad T-08", "en-US": "Traffic Unit T-08" }, specialty: { "es-AR": "Corredor y ordenamiento", "en-US": "Traffic corridor" }, distance: "0.9 km", eta: "03 min" },
  };

  const accessMatrix = {
    master: {
      fields: ["location", "audio", "video", "narrative", "priority", "agencies", "permissions", "timeline"],
      restricted: [],
      onRequest: [],
    },
    security: {
      fields: ["location", "audio", "video", "securityRisk", "operationalNarrative", "assignedResource"],
      restricted: ["timeline"],
      onRequest: ["evidence"],
    },
    health: {
      fields: ["location", "audio", "injuryVideo", "minimumHealth", "safeAccess"],
      restricted: ["securityRisk", "timeline"],
      onRequest: ["evidence"],
    },
    prosecution: {
      fields: ["narrative", "evidenceReferences", "communications", "consultations", "documents"],
      restricted: ["evidenceContent", "audio", "video"],
      onRequest: ["restrictedContent"],
    },
    station: {
      fields: ["location", "incidentDescription", "documentReference", "ownAct", "enabledEvidence", "prosecutionResponse"],
      restricted: ["audio", "video", "timeline"],
      onRequest: ["evidence"],
    },
  };

  const defaultAccess = {
    fields: ["location", "narrative", "priority"],
    restricted: ["audio", "video", "evidenceContent"],
    onRequest: ["evidence"],
  };

  const fieldService = Object.freeze({
    operatorId: "OP-DEMO-911-04",
    operator: { "es-AR": "Oficial Móvil Demo 911-04", "en-US": "Demo Mobile Officer 911-04" },
    role: { "es-AR": "Prevención y primera respuesta", "en-US": "Prevention and first response" },
    agency: "security",
    unit: { "es-AR": "Móvil 911-12", "en-US": "911-12 Mobile Unit" },
    shift: "08:00–16:00",
    console: "CON-911",
    start: "08:00",
    expectedEnd: "16:00",
    device: "PIPO-FIELD-DEMO-04",
    operationalLocation: { "es-AR": "Activa — simulada", "en-US": "Active — simulated" },
  });

  const communicationTemplates = [
    {
      id: "COM-DEMO-001",
      sender: "health",
      recipient: "security",
      purpose: "supportRequest",
      status: "read",
      message: {
        "es-AR": "Se informa prioridad sanitaria y necesidad de acceso seguro.",
        "en-US": "Health priority and a need for safe access are reported.",
      },
    },
    {
      id: "COM-DEMO-002",
      sender: "security",
      recipient: "health",
      purpose: "operationalMessage",
      status: "acceptance",
      message: {
        "es-AR": "Escena en proceso de aseguramiento.",
        "en-US": "The scene is being secured.",
      },
    },
    {
      id: "COM-DEMO-003",
      sender: "prosecution",
      recipient: "security",
      purpose: "diligenceRequest",
      status: "response",
      message: {
        "es-AR": "Preservar el lugar y ampliar información.",
        "en-US": "Preserve the scene and expand the information.",
      },
    },
    {
      id: "COM-DEMO-004",
      sender: "station",
      recipient: "prosecution",
      purpose: "sharedDocument",
      status: "read",
      message: {
        "es-AR": "Actuación y referencia de denuncia simulada recibidas.",
        "en-US": "Simulated action and report reference received.",
      },
    },
    {
      id: "COM-DEMO-005",
      sender: "master",
      recipient: "activeRoute",
      purpose: "priorityUpdate",
      status: "read",
      message: {
        "es-AR": "Prioridad actualizada y recursos confirmados.",
        "en-US": "Priority updated and resources confirmed.",
      },
    },
    {
      id: "COM-DEMO-006",
      sender: "health",
      recipient: "traffic",
      purpose: "supportRequest",
      status: "read",
      message: {
        "es-AR": "Se solicita corredor seguro para la atención sanitaria.",
        "en-US": "A safe corridor is requested for health care.",
      },
    },
    {
      id: "COM-DEMO-007",
      sender: "security",
      recipient: "fire",
      purpose: "operationalMessage",
      status: "acceptance",
      message: {
        "es-AR": "Se informa riesgo de incendio y se solicita evaluación técnica.",
        "en-US": "A fire risk is reported and a technical assessment is requested.",
      },
    },
    {
      id: "COM-DEMO-008",
      sender: "fire",
      recipient: "civil",
      purpose: "supportRequest",
      status: "read",
      message: {
        "es-AR": "Se solicita apoyo para perímetro y evaluación del riesgo.",
        "en-US": "Support is requested for the perimeter and risk assessment.",
      },
    },
  ];

  function getAlert(id) {
    return alerts.find((alert) => alert.id === id) || alerts[0];
  }

  function getConsole(id) {
    return consoles[id] || consoles.master;
  }

  function label(item, locale) {
    return item.label[locale] || item.label["es-AR"];
  }

  function isCommunicationAllowed(template, route) {
    const active = new Set(route);
    if (template.sender === "master" && template.recipient === "activeRoute") return active.has("master");
    return active.has(template.sender) && active.has(template.recipient);
  }

  function getCommunicationRows(route, locale) {
    return communicationTemplates
      .filter((template) => isCommunicationAllowed(template, route))
      .map((template) => ({ ...template, message: template.message[locale] || template.message["es-AR"] }));
  }

  function getAccessMatrix(consoleId) {
    return accessMatrix[consoleId] || defaultAccess;
  }

  function getSuggestedDestination(route, locale) {
    if (route.includes("prosecution")) return locale === "es-AR" ? "Fiscalía / autoridad judicial competente" : "Prosecution / competent judicial authority";
    if (route.includes("health")) return locale === "es-AR" ? "Coordinación sanitaria competente" : "Competent health coordination";
    if (route.includes("civil")) return locale === "es-AR" ? "Defensa Civil competente" : "Competent civil protection";
    return locale === "es-AR" ? "Organismo competente según la ruta simulada" : "Competent agency according to the simulated route";
  }

  return Object.freeze({
    version: "presentation-unified-1",
    consoles: Object.freeze(consoles),
    alerts: Object.freeze(alerts),
    resources: Object.freeze(resources),
    accessMatrix: Object.freeze(accessMatrix),
    fieldService,
    communicationTemplates: Object.freeze(communicationTemplates),
    getAlert,
    getConsole,
    isCommunicationAllowed,
    getCommunicationRows,
    getAccessMatrix,
    getSuggestedDestination,
    label,
  });
});
