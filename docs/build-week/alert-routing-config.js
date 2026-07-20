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
    security: { unit: "Móvil 911-12", specialty: { "es-AR": "Seguridad de escena", "en-US": "Scene safety" }, distance: "2.1 km", eta: "06 min" },
    health: { unit: "Unidad sanitaria 107-04", specialty: { "es-AR": "Atención prehospitalaria", "en-US": "Pre-hospital care" }, distance: "1.8 km", eta: "05 min" },
    fire: { unit: "Dotación B-03", specialty: { "es-AR": "Riesgo de incendio", "en-US": "Fire risk" }, distance: "3.4 km", eta: "09 min" },
    traffic: { unit: "Unidad T-08", specialty: { "es-AR": "Corredor y ordenamiento", "en-US": "Traffic corridor" }, distance: "0.9 km", eta: "03 min" },
  };

  function getAlert(id) {
    return alerts.find((alert) => alert.id === id) || alerts[0];
  }

  function getConsole(id) {
    return consoles[id] || consoles.master;
  }

  function label(item, locale) {
    return item.label[locale] || item.label["es-AR"];
  }

  return Object.freeze({
    version: "presentation-unified-1",
    consoles: Object.freeze(consoles),
    alerts: Object.freeze(alerts),
    resources: Object.freeze(resources),
    getAlert,
    getConsole,
    label,
  });
});
