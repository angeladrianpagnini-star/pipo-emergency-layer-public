(function () {
  const AI_MODES = {
    SIMULATED_DEMO: "SIMULATED_DEMO",
    OPENAI_SECURE_BACKEND: "OPENAI_SECURE_BACKEND",
  };

  const PRIORITIES = ["GREEN", "YELLOW", "RED", "UNDETERMINED"];
  const CONFIDENCE_LEVELS = ["LOW", "MEDIUM", "HIGH"];
  const AI_SERVICE_VERSION = "4A.0.0";
  const AI_ENGINE_LABEL = "PIPO deterministic rule engine";
  const SECURE_BACKEND_ENDPOINT = "/api/analyze-incident";
  const SECURE_BACKEND_STATUS_ENDPOINT = "/api/backend-status";

  const AI_SERVICE_BACKEND_CONTRACT = {
    status: "experimental",
    mode: AI_MODES.OPENAI_SECURE_BACKEND,
    transport: "server-side only",
    frontendPolicy: "No provider credential and no direct provider call from the browser.",
    endpoint: SECURE_BACKEND_ENDPOINT,
    statusEndpoint: SECURE_BACKEND_STATUS_ENDPOINT,
    input: [
      "incidentId",
      "freeText",
      "channel",
      "estimatedLocation",
      "riskIndicators",
      "existingContext",
      "requestedMode",
    ],
    output: [
      "suggestionId",
      "incidentId",
      "neutralSummary",
      "suggestedIncidentType",
      "suggestedPriority",
      "detectedRiskFactors",
      "missingCriticalInformation",
      "followUpQuestions",
      "suggestedConsoles",
      "suggestedSpecialties",
      "safetyWarnings",
      "authorizationRequirements",
      "confidenceLevel",
      "reasoningSummary",
      "sourceFacts",
      "unsupportedClaims",
      "requiresHumanValidation",
    ],
  };

  const CONSOLE_BY_TYPE = {
    MASTER_MONITORING: {
      consoleId: "CON-MASTER",
      name: "Consola Maestra PIPO",
      purpose: "coordinar, auditar y sostener el hilo documental maestro",
      minimumInfoToShare: ["ID de incidente", "prioridad preliminar", "estado de validacion"],
      classification: "OPERATIONAL",
      additionalAuthorizationRequired: false,
    },
    SECURITY_911: {
      consoleId: "CON-911",
      name: "911 Seguridad",
      purpose: "evaluar riesgo fisico, preservar lugar y coordinar respuesta de seguridad",
      minimumInfoToShare: ["ubicacion declarada", "riesgo actual", "posibilidad de hablar", "personas involucradas"],
      classification: "SENSITIVE",
      additionalAuthorizationRequired: false,
    },
    HEALTH_107: {
      consoleId: "CON-107",
      name: "107 Salud",
      purpose: "triage sanitario, ambulancia y orientacion de primeros cuidados",
      minimumInfoToShare: ["ubicacion declarada", "estado de conciencia", "respiracion", "lesiones informadas"],
      classification: "SENSITIVE",
      additionalAuthorizationRequired: false,
    },
    FIRE_DEPARTMENT: {
      consoleId: "CON-BOMBEROS",
      name: "Bomberos",
      purpose: "incendio, rescate tecnico, humo, gas o materiales peligrosos",
      minimumInfoToShare: ["ubicacion declarada", "tipo de riesgo", "personas atrapadas", "material peligroso informado"],
      classification: "SENSITIVE",
      additionalAuthorizationRequired: false,
    },
    CIVIL_DEFENSE: {
      consoleId: "CON-DC",
      name: "Defensa Civil",
      purpose: "evacuacion, proteccion civil, anegamiento, derrumbe o riesgo estructural",
      minimumInfoToShare: ["zona estimada", "riesgo ambiental", "personas afectadas", "necesidad de evacuacion"],
      classification: "SENSITIVE",
      additionalAuthorizationRequired: false,
    },
    GENDER_RESPONSE: {
      consoleId: "CON-GENERO",
      name: "Genero",
      purpose: "resguardo, acompanamiento y medidas de proteccion para victimas",
      minimumInfoToShare: ["situacion declarada", "riesgo actual", "necesidad de contacto reservado"],
      classification: "SENSITIVE",
      additionalAuthorizationRequired: false,
    },
    CHILD_PROTECTION: {
      consoleId: "CON-NINEZ",
      name: "Ninez",
      purpose: "resguardo de menores y coordinacion con organismos competentes",
      minimumInfoToShare: ["presencia de menores", "riesgo declarado", "adulto referente disponible"],
      classification: "SENSITIVE",
      additionalAuthorizationRequired: false,
    },
    TRAFFIC: {
      consoleId: "CON-TRANSITO",
      name: "Transito vial",
      purpose: "ordenamiento vial, cortes, corredores sanitarios y seguridad en calzada",
      minimumInfoToShare: ["ubicacion", "obstruccion vial", "lesiones", "derrame o fuego informado"],
      classification: "OPERATIONAL",
      additionalAuthorizationRequired: false,
    },
    PROSECUTOR_JUSTICE: {
      consoleId: "CON-FISCALIA",
      name: "Fiscalia / Justicia",
      purpose: "medidas judiciales, preservacion probatoria y autorizaciones excepcionales",
      minimumInfoToShare: ["ID de incidente", "evidencia seleccionada", "fundamento de derivacion"],
      classification: "RESTRICTED_JUDICIAL",
      additionalAuthorizationRequired: true,
    },
    CVGRT: {
      consoleId: "CON-CVGRT",
      name: "CVGRT territorial",
      purpose: "escucha, orientacion, acompanamiento y seguimiento comunitario",
      minimumInfoToShare: ["zona general", "necesidad social", "estado de seguimiento"],
      classification: "OPERATIONAL",
      additionalAuthorizationRequired: false,
    },
    CYBERCRIME: {
      consoleId: "CON-CIBER",
      name: "Ciberdelitos",
      purpose: "preservacion selectiva de evidencia digital y derivacion tecnica",
      minimumInfoToShare: ["capturas seleccionadas", "URLs", "identificadores", "fechas y horas"],
      classification: "RESTRICTED_JUDICIAL",
      additionalAuthorizationRequired: true,
    },
    POLICE_STATION: {
      consoleId: "CON-COMISARIA",
      name: "Comisaria receptora",
      purpose: "recepcion de denuncia, constancias, actas y circuito formal",
      minimumInfoToShare: ["identificacion declarada", "hecho denunciado", "dispositivo o bien afectado"],
      classification: "SENSITIVE",
      additionalAuthorizationRequired: false,
    },
  };

  function stripAccents(value) {
    return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function normalizeText(value) {
    return stripAccents(value).toLowerCase();
  }

  function hasAny(text, terms) {
    return terms.some((term) => text.includes(term));
  }

  function asChoice(value) {
    const normalized = String(value || "UNKNOWN").toUpperCase();
    return ["YES", "NO", "UNKNOWN"].includes(normalized) ? normalized : "UNKNOWN";
  }

  function isYes(value) {
    return asChoice(value) === "YES";
  }

  function isNo(value) {
    return asChoice(value) === "NO";
  }

  function isUnknown(value) {
    return asChoice(value) === "UNKNOWN";
  }

  function normalizeIncidentInput(input, context = {}) {
    return {
      incidentId: input?.incidentId || context?.incident?.id || "PIPO-BW-AI-DEMO",
      description: String(input?.description || "").trim(),
      channel: String(input?.channel || "PIPO Layer").trim(),
      location: String(input?.location || "").trim(),
      canSpeak: asChoice(input?.canSpeak),
      currentRisk: asChoice(input?.currentRisk),
      injuredPersons: asChoice(input?.injuredPersons),
      minorsPresent: asChoice(input?.minorsPresent),
      weaponsPresent: asChoice(input?.weaponsPresent),
      possibleDigitalIncident: asChoice(input?.possibleDigitalIncident),
      stolenOrLostDevice: asChoice(input?.stolenOrLostDevice),
      additionalInfo: String(input?.additionalInfo || "").trim(),
      reportedBy: String(input?.reportedBy || "usuario u operador demo").trim(),
    };
  }

  function makeSuggestionId(incidentId) {
    const stamp = Date.now().toString(36).toUpperCase();
    return `AI-${incidentId.replace(/[^A-Z0-9]/gi, "").slice(-8)}-${stamp}`;
  }

  function addUnique(list, value) {
    if (!value) return;
    if (!list.includes(value)) list.push(value);
  }

  function addConsole(target, consoleType, incorporationPriority = "REVIEW", overrides = {}) {
    const base = CONSOLE_BY_TYPE[consoleType];
    if (!base || target.some((item) => item.consoleType === consoleType)) return;
    target.push({
      consoleType,
      consoleId: base.consoleId,
      consoleName: base.name,
      purpose: overrides.purpose || base.purpose,
      incorporationPriority,
      minimumInfoToShare: overrides.minimumInfoToShare || base.minimumInfoToShare,
      classification: overrides.classification || base.classification,
      additionalAuthorizationRequired: overrides.additionalAuthorizationRequired ?? base.additionalAuthorizationRequired,
    });
  }

  function detectCategories(input) {
    const text = normalizeText(`${input.description} ${input.additionalInfo}`);
    const categories = [];
    if (isNo(input.canSpeak) || hasAny(text, ["no puedo hablar", "alerta silenciosa", "silenciosa"])) {
      addUnique(categories, "Persona que no puede hablar");
    }
    if (hasAny(text, ["violencia", "agresion", "agresor", "golpe", "amenaza presencial", "victima", "resguardo"])) {
      addUnique(categories, "Violencia o amenaza presencial");
    }
    if (hasAny(text, ["descompens", "respira", "ambulancia", "salud", "pecho", "conciencia", "mareo"]) || isYes(input.injuredPersons)) {
      addUnique(categories, "Emergencia medica");
    }
    if (hasAny(text, ["incendio", "humo", "gas", "fuego", "rescate", "explosion", "derrame"])) {
      addUnique(categories, "Incendio o rescate");
    }
    if (hasAny(text, ["choque", "accidente", "siniestro vial", "transito", "calzada", "vehiculo", "corredor sanitario"])) {
      addUnique(categories, "Accidente vial");
    }
    if (isYes(input.possibleDigitalIncident) || hasAny(text, ["fraude", "suplantacion", "extorsion", "ciber", "captura", "url", "malware", "cuenta", "enlace falso", "amenaza digital"])) {
      addUnique(categories, "Ciberdelito");
    }
    if (isYes(input.stolenOrLostDevice) || hasAny(text, ["telefono robado", "dispositivo robado", "celular robado", "movil robado", "perdido", "ultima ubicacion"])) {
      addUnique(categories, "Dispositivo robado o perdido");
    }
    if (hasAny(text, ["derrumbe", "inundacion", "anegamiento", "evacuacion", "riesgo estructural", "clima"])) {
      addUnique(categories, "Proteccion civil");
    }
    return categories;
  }

  function chooseIncidentType(categories) {
    if (!categories.length) return "Informacion insuficiente";
    const nonDerivative = categories.filter((category) => !(category === "Ciberdelito" && categories.includes("Dispositivo robado o perdido")));
    const distinctDomains = nonDerivative.filter((category) => category !== "Persona que no puede hablar");
    if (distinctDomains.length > 1) return "Incidente multidisciplinario";
    return nonDerivative[0] || categories[0];
  }

  function detectRiskFactors(input, categories) {
    const risks = [];
    if (isNo(input.canSpeak)) addUnique(risks, "persona sin posibilidad de hablar");
    if (isYes(input.currentRisk)) addUnique(risks, "riesgo actual informado");
    if (isYes(input.injuredPersons)) addUnique(risks, "personas lesionadas informadas");
    if (isYes(input.minorsPresent)) addUnique(risks, "presencia de menores");
    if (isYes(input.weaponsPresent)) addUnique(risks, "presencia de armas informada");
    if (categories.includes("Incendio o rescate")) addUnique(risks, "humo, fuego, gas o rescate tecnico");
    if (categories.includes("Ciberdelito")) addUnique(risks, "posible evidencia digital sensible");
    if (categories.includes("Dispositivo robado o perdido")) addUnique(risks, "dispositivo denunciado como robado o perdido");
    if (!input.location) addUnique(risks, "ubicacion no informada");
    return risks;
  }

  function detectMissingInfo(input, categories) {
    const missing = [];
    if (!input.description) addUnique(missing, "descripcion libre del incidente");
    if (!input.location) addUnique(missing, "ubicacion estimada o declarada");
    if (isUnknown(input.currentRisk)) addUnique(missing, "existencia de riesgo actual");
    if (isUnknown(input.canSpeak)) addUnique(missing, "posibilidad de hablar");
    if (isUnknown(input.injuredPersons)) addUnique(missing, "presencia de personas lesionadas");
    if (isUnknown(input.weaponsPresent)) addUnique(missing, "presencia de armas");
    if (isUnknown(input.minorsPresent)) addUnique(missing, "presencia de menores");
    if (categories.includes("Emergencia medica")) {
      addUnique(missing, "estado de conciencia");
      addUnique(missing, "respiracion normal o dificultad respiratoria");
      addUnique(missing, "edad aproximada");
    }
    if (categories.includes("Violencia o amenaza presencial") || categories.includes("Persona que no puede hablar")) {
      addUnique(missing, "si la persona agresora esta presente");
      addUnique(missing, "si la persona puede retirarse sin exponerse");
    }
    if (categories.includes("Incendio o rescate")) {
      addUnique(missing, "si hay personas atrapadas");
      addUnique(missing, "si existe gas, combustible o material peligroso");
    }
    if (categories.includes("Accidente vial")) {
      addUnique(missing, "cantidad de vehiculos involucrados");
      addUnique(missing, "obstruccion de calzada o corredor sanitario");
    }
    if (categories.includes("Ciberdelito")) {
      addUnique(missing, "URLs, alias o identificadores declarados");
      addUnique(missing, "fechas y horas aproximadas");
      addUnique(missing, "evidencia preservada sin modificar originales");
    }
    if (categories.includes("Dispositivo robado o perdido")) {
      addUnique(missing, "titularidad del dispositivo");
      addUnique(missing, "numero de denuncia");
      addUnique(missing, "autoridad receptora");
      addUnique(missing, "autorizacion competente vigente");
    }
    return missing;
  }

  function buildFollowUpQuestions(input, categories, missing) {
    const questions = [];
    if (isUnknown(input.currentRisk)) addUnique(questions, "Hay riesgo inmediato para la vida o integridad fisica?");
    if (isUnknown(input.injuredPersons)) addUnique(questions, "Hay personas lesionadas o con dificultad para respirar?");
    if (!input.location) addUnique(questions, "Cual es la ubicacion estimada o un punto de referencia seguro?");
    if (isUnknown(input.canSpeak)) addUnique(questions, "La persona puede hablar o responder sin exponerse?");
    if (isUnknown(input.weaponsPresent)) addUnique(questions, "Se informa presencia de armas o elementos peligrosos?");
    if (isUnknown(input.minorsPresent)) addUnique(questions, "Hay menores, personas mayores o personas vulnerables presentes?");
    if (categories.includes("Emergencia medica")) {
      addUnique(questions, "La persona esta consciente y respira con normalidad?");
      addUnique(questions, "Hay dolor de pecho, convulsiones, sangrado o perdida de conocimiento?");
    }
    if (categories.includes("Violencia o amenaza presencial") || categories.includes("Persona que no puede hablar")) {
      addUnique(questions, "La persona agresora esta en el lugar?");
      addUnique(questions, "La persona puede esperar asistencia sin delatar la alerta?");
    }
    if (categories.includes("Incendio o rescate")) {
      addUnique(questions, "Todas las personas pudieron salir del lugar?");
      addUnique(questions, "Hay olor a gas, combustible o riesgo electrico?");
    }
    if (categories.includes("Accidente vial")) {
      addUnique(questions, "El siniestro bloquea la calzada o requiere corte de transito?");
      addUnique(questions, "Hay derrame, humo o personas atrapadas?");
    }
    if (categories.includes("Ciberdelito")) {
      addUnique(questions, "Que capturas, URLs, alias, correos o telefonos se pueden preservar sin alterar originales?");
      addUnique(questions, "Ya se realizo denuncia o comunicacion formal?");
    }
    if (categories.includes("Dispositivo robado o perdido")) {
      addUnique(questions, "Existe denuncia y autoridad receptora identificada?");
      addUnique(questions, "La ultima ubicacion fue aportada por el titular y esta documentada?");
      addUnique(questions, "Hay autorizacion competente vigente para medidas excepcionales?");
    }
    if (!questions.length && missing.length) {
      addUnique(questions, `Completar dato faltante: ${missing[0]}.`);
    }
    return questions.slice(0, 10);
  }

  function choosePriority(input, categories) {
    if (!input.description && !input.location && categories.length === 0) return "UNDETERMINED";
    if (categories.length === 0 && ["UNKNOWN", ""].includes(input.currentRisk)) return "UNDETERMINED";
    if (isNo(input.canSpeak)) return "RED";
    if (isYes(input.weaponsPresent)) return "RED";
    if (categories.includes("Incendio o rescate") && !isNo(input.currentRisk)) return "RED";
    if (isYes(input.currentRisk) && (isYes(input.injuredPersons) || categories.includes("Violencia o amenaza presencial"))) return "RED";
    if (isYes(input.minorsPresent) && categories.includes("Violencia o amenaza presencial")) return "RED";
    if (isYes(input.injuredPersons)) return "YELLOW";
    if (isYes(input.currentRisk)) return "YELLOW";
    if (categories.includes("Ciberdelito") || categories.includes("Dispositivo robado o perdido")) return "YELLOW";
    if (categories.length === 0) return "UNDETERMINED";
    return "GREEN";
  }

  function chooseConfidence(input, categories, missing) {
    if (!categories.length || missing.length >= 7) return "LOW";
    if (input.description && input.location && missing.length <= 3) return "HIGH";
    return "MEDIUM";
  }

  function buildAvailableInformation(input, categories) {
    const available = [];
    if (input.description) addUnique(available, "descripcion libre aportada");
    if (input.channel) addUnique(available, `canal de ingreso: ${input.channel}`);
    if (input.location) addUnique(available, `ubicacion declarada: ${input.location}`);
    if (!isUnknown(input.canSpeak)) addUnique(available, `posibilidad de hablar: ${isYes(input.canSpeak) ? "si" : "no"}`);
    if (!isUnknown(input.currentRisk)) addUnique(available, `riesgo actual: ${isYes(input.currentRisk) ? "si" : "no"}`);
    if (!isUnknown(input.injuredPersons)) addUnique(available, `personas lesionadas: ${isYes(input.injuredPersons) ? "si" : "no"}`);
    if (!isUnknown(input.minorsPresent)) addUnique(available, `menores presentes: ${isYes(input.minorsPresent) ? "si" : "no"}`);
    if (!isUnknown(input.weaponsPresent)) addUnique(available, `armas presentes: ${isYes(input.weaponsPresent) ? "si" : "no"}`);
    if (!isUnknown(input.possibleDigitalIncident)) addUnique(available, `posible incidente digital: ${isYes(input.possibleDigitalIncident) ? "si" : "no"}`);
    if (!isUnknown(input.stolenOrLostDevice)) addUnique(available, `dispositivo robado o perdido: ${isYes(input.stolenOrLostDevice) ? "si" : "no"}`);
    if (categories.length) addUnique(available, `senales detectadas: ${categories.join(", ")}`);
    return available;
  }

  function buildConsoleSuggestions(input, categories, priority) {
    const consoles = [];
    addConsole(consoles, "MASTER_MONITORING", "IMMEDIATE");
    if (categories.includes("Persona que no puede hablar") || categories.includes("Violencia o amenaza presencial") || isYes(input.weaponsPresent)) {
      addConsole(consoles, "SECURITY_911", "IMMEDIATE");
    }
    if (categories.includes("Emergencia medica") || isYes(input.injuredPersons)) {
      addConsole(consoles, "HEALTH_107", priority === "RED" ? "IMMEDIATE" : "REVIEW");
    }
    if (categories.includes("Incendio o rescate")) {
      addConsole(consoles, "FIRE_DEPARTMENT", "IMMEDIATE");
      addConsole(consoles, "CIVIL_DEFENSE", "REVIEW");
    }
    if (categories.includes("Proteccion civil")) {
      addConsole(consoles, "CIVIL_DEFENSE", "IMMEDIATE");
    }
    if (categories.includes("Accidente vial")) {
      addConsole(consoles, "TRAFFIC", "IMMEDIATE");
      if (isYes(input.injuredPersons)) addConsole(consoles, "HEALTH_107", "IMMEDIATE");
      if (hasAny(normalizeText(`${input.description} ${input.additionalInfo}`), ["derrame", "combustible", "fuego", "humo", "atrapad"])) {
        addConsole(consoles, "FIRE_DEPARTMENT", "IMMEDIATE");
      }
      addConsole(consoles, "SECURITY_911", "REVIEW");
    }
    if (categories.includes("Violencia o amenaza presencial")) {
      addConsole(consoles, "GENDER_RESPONSE", "REVIEW");
      if (isYes(input.minorsPresent)) addConsole(consoles, "CHILD_PROTECTION", "IMMEDIATE");
      if (priority === "RED") addConsole(consoles, "PROSECUTOR_JUSTICE", "REVIEW");
    }
    if (isYes(input.minorsPresent) && !categories.includes("Violencia o amenaza presencial")) {
      addConsole(consoles, "CHILD_PROTECTION", "REVIEW");
    }
    if (categories.includes("Ciberdelito")) {
      addConsole(consoles, "CYBERCRIME", "REVIEW");
      addConsole(consoles, "PROSECUTOR_JUSTICE", "REVIEW");
    }
    if (categories.includes("Dispositivo robado o perdido")) {
      addConsole(consoles, "POLICE_STATION", "REVIEW");
      addConsole(consoles, "CYBERCRIME", "REVIEW");
      addConsole(consoles, "PROSECUTOR_JUSTICE", "REVIEW");
    }
    if (priority !== "RED" && categories.length && !categories.includes("Ciberdelito")) {
      addConsole(consoles, "CVGRT", "FOLLOW_UP");
    }
    return consoles;
  }

  function buildActions(categories) {
    const actions = [
      "Registrar entrada original en bitacora append-only.",
      "Solicitar validacion humana antes de derivacion o cambio de prioridad.",
      "Compartir solo informacion minima necesaria con cada consola sugerida.",
    ];
    if (categories.includes("Ciberdelito")) {
      actions.push("Preservar capturas seleccionadas, URLs, identificadores, fechas y horas.");
      actions.push("Generar hash de archivos seleccionados cuando sean incorporados al circuito documental.");
    }
    if (categories.includes("Dispositivo robado o perdido")) {
      actions.push("Crear DeviceRecoveryProtocol solo si existen denuncia, titularidad y autorizacion competente simulada.");
      actions.push("Mantener deshabilitada cualquier capacidad de ubicacion, audio o video hasta cumplir requisitos simulados.");
    }
    if (categories.includes("Persona que no puede hablar")) {
      actions.push("Mantener canal discreto y priorizar preguntas de minima exposicion.");
    }
    return actions;
  }

  function buildWarnings(categories, input) {
    const warnings = [
      "AI-assisted analysis - human validation required.",
      "Human verification required.",
      "La IA no despacha recursos, no cierra incidentes y no activa sensores.",
    ];
    if (categories.includes("Ciberdelito")) {
      warnings.push("No recomendar acceso sin autorizacion, confrontacion o modificacion de evidencia original.");
    }
    if (categories.includes("Dispositivo robado o perdido")) {
      warnings.push("Authorization required.");
      warnings.push("Location, audio and video capabilities remain disabled until the simulated authorization requirements are met.");
    }
    if (!input.location) warnings.push("Ubicacion no confirmada.");
    return warnings;
  }

  function buildLegalRequirements(categories) {
    const requirements = [
      "Decision operativa confirmada por operador autorizado.",
      "Registro de finalidad, rol, sesion y trazabilidad en bitacora.",
      "Proteccion de datos sensibles y minimizacion de informacion compartida.",
    ];
    if (categories.includes("Ciberdelito")) {
      requirements.push("Preservacion selectiva de evidencia y eventual derivacion a CYBERCRIME o PROSECUTOR_JUSTICE.");
    }
    if (categories.includes("Dispositivo robado o perdido")) {
      requirements.push("Denuncia, titularidad, autoridad receptora, alcance, finalidad, operadores autorizados y vencimiento de autorizacion.");
    }
    return requirements;
  }

  function buildUnsupportedClaims(input, categories) {
    const text = normalizeText(`${input.description} ${input.additionalInfo}`);
    const claims = [];
    if (hasAny(text, ["delincuente", "culpable", "seguro fue", "esta en la ubicacion"])) {
      claims.push("Unsupported claim: no se atribuye culpabilidad ni ubicacion de una persona sin verificacion institucional.");
    }
    if (categories.includes("Dispositivo robado o perdido") && hasAny(text, ["ultima ubicacion", "aparece conectado", "rastreo"])) {
      claims.push("Ubicacion no confirmada: la ultima ubicacion es una manifestacion del usuario hasta validacion y autorizacion competente.");
    }
    if (hasAny(text, ["activar camara", "activar microfono", "rastreo silencioso"])) {
      claims.push("Authorization required: capacidad restringida no habilitada por el asistente.");
    }
    return claims;
  }

  function buildNeutralSummary(input, categories) {
    const source = input.reportedBy || "usuario u operador demo";
    const typeText = categories.length ? categories.join(", ") : "tipo no informado";
    const locationText = input.location || "no informado";
    const speechText = isUnknown(input.canSpeak) ? "no informado" : (isYes(input.canSpeak) ? "si puede hablar" : "no puede hablar");
    const riskText = isUnknown(input.currentRisk) ? "no informado" : (isYes(input.currentRisk) ? "riesgo actual informado" : "sin riesgo actual informado");
    const injuryText = isUnknown(input.injuredPersons) ? "no informado" : (isYes(input.injuredPersons) ? "lesiones informadas" : "sin lesiones informadas");
    const descriptionText = input.description || "no informado";
    return `El relato proviene de ${source}. Se informa: ${descriptionText}. Tipo preliminar observado: ${typeText}. Ubicacion declarada: ${locationText}. Posibilidad de hablar: ${speechText}. Riesgo actual: ${riskText}. Personas lesionadas: ${injuryText}. No se atribuye culpabilidad ni se completan datos no informados.`;
  }

  function buildSourceFacts(input) {
    return [
      { field: "description", value: input.description || "no informado", source: "incident_input" },
      { field: "channel", value: input.channel || "no informado", source: "incident_input" },
      { field: "location", value: input.location || "no informado", source: "incident_input" },
      { field: "canSpeak", value: input.canSpeak, source: "incident_input" },
      { field: "currentRisk", value: input.currentRisk, source: "incident_input" },
      { field: "injuredPersons", value: input.injuredPersons, source: "incident_input" },
      { field: "minorsPresent", value: input.minorsPresent, source: "incident_input" },
      { field: "weaponsPresent", value: input.weaponsPresent, source: "incident_input" },
      { field: "possibleDigitalIncident", value: input.possibleDigitalIncident, source: "incident_input" },
      { field: "stolenOrLostDevice", value: input.stolenOrLostDevice, source: "incident_input" },
    ];
  }

  function analyzeIncident(input, context = {}, options = {}) {
    const mode = options.mode || AI_MODES.SIMULATED_DEMO;
    if (mode !== AI_MODES.SIMULATED_DEMO) {
      if (typeof window.fetch !== "function" && typeof options.fetchImpl !== "function") {
        throw new Error("Secure backend unavailable: fetch is not available.");
      }
      return callSecureBackend(input, context, options);
    }

    const normalizedInput = normalizeIncidentInput(input, context);
    const categories = detectCategories(normalizedInput);
    const suggestedPriority = choosePriority(normalizedInput, categories);
    const detectedRiskFactors = detectRiskFactors(normalizedInput, categories);
    const missingCriticalInformation = detectMissingInfo(normalizedInput, categories);
    const followUpQuestions = buildFollowUpQuestions(normalizedInput, categories, missingCriticalInformation);
    const suggestedConsoles = buildConsoleSuggestions(normalizedInput, categories, suggestedPriority);
    const suggestedIncidentType = chooseIncidentType(categories);
    const confidenceLevel = chooseConfidence(normalizedInput, categories, missingCriticalInformation);
    const unsupportedClaims = buildUnsupportedClaims(normalizedInput, categories);

    return {
      suggestionId: makeSuggestionId(normalizedInput.incidentId),
      id: null,
      incidentId: normalizedInput.incidentId,
      originalInput: normalizedInput,
      inputText: normalizedInput.description,
      neutralSummary: buildNeutralSummary(normalizedInput, categories),
      summary: null,
      suggestedIncidentType,
      suggestedType: suggestedIncidentType,
      suggestedPriority,
      detectedRiskFactors,
      riskFactors: detectedRiskFactors,
      availableInformation: buildAvailableInformation(normalizedInput, categories),
      availableInfo: null,
      missingCriticalInformation,
      missingInfo: null,
      followUpQuestions,
      suggestedQuestions: null,
      suggestedConsoles,
      competentAgencies: suggestedConsoles.map((item) => item.consoleName),
      suggestedSpecialties: categories,
      suggestedActions: buildActions(categories),
      safetyWarnings: buildWarnings(categories, normalizedInput),
      legalOrAuthorizationRequirements: buildLegalRequirements(categories),
      confidenceLevel,
      confidence: confidenceLevel,
      reasoningSummary: `Reglas deterministicas de demo aplicadas sobre ${categories.length ? categories.join(", ") : "informacion insuficiente"}. La prioridad puede modificarse por validacion humana.`,
      explanation: null,
      sourceFacts: buildSourceFacts(normalizedInput),
      unsupportedClaims,
      requiresHumanValidation: true,
      generatedAt: new Date().toISOString(),
      mode: AI_MODES.SIMULATED_DEMO,
      provider: "simulated-ai-demo",
      modelOrEngineLabel: AI_ENGINE_LABEL,
      version: AI_SERVICE_VERSION,
      allowedPriorities: PRIORITIES,
      allowedConfidenceLevels: CONFIDENCE_LEVELS,
    };
  }

  function buildBackendRequest(input, context = {}, requestedMode = AI_MODES.OPENAI_SECURE_BACKEND) {
    const normalizedInput = normalizeIncidentInput(input, context);
    return {
      incidentId: normalizedInput.incidentId,
      freeText: normalizedInput.description,
      channel: normalizedInput.channel,
      estimatedLocation: normalizedInput.location,
      riskIndicators: {
        canSpeak: normalizedInput.canSpeak,
        currentRisk: normalizedInput.currentRisk,
        injuredPersons: normalizedInput.injuredPersons,
        minorsPresent: normalizedInput.minorsPresent,
        weaponsPresent: normalizedInput.weaponsPresent,
        possibleDigitalIncident: normalizedInput.possibleDigitalIncident,
        stolenOrLostDevice: normalizedInput.stolenOrLostDevice,
      },
      existingContext: {
        incidentStatus: context?.incident?.status || "",
        currentPriority: context?.incident?.priority || "",
        availableConsoles: (context?.operationalConsoles || []).map((item) => ({
          consoleId: item.id,
          consoleType: item.type,
          consoleName: item.name,
        })),
      },
      requestedMode,
      additionalInfo: normalizedInput.additionalInfo,
    };
  }

  function normalizeBackendSuggestion(suggestion, fallbackInput) {
    const normalized = {
      ...suggestion,
      id: suggestion.id || suggestion.suggestionId,
      originalInput: suggestion.originalInput || normalizeIncidentInput(fallbackInput),
      summary: suggestion.summary || suggestion.neutralSummary,
      suggestedType: suggestion.suggestedType || suggestion.suggestedIncidentType,
      riskFactors: suggestion.riskFactors || suggestion.detectedRiskFactors || [],
      availableInfo: suggestion.availableInfo || suggestion.availableInformation || [],
      missingInfo: suggestion.missingInfo || suggestion.missingCriticalInformation || [],
      suggestedQuestions: suggestion.suggestedQuestions || suggestion.followUpQuestions || [],
      competentAgencies: suggestion.competentAgencies || (suggestion.suggestedConsoles || []).map((item) => item.consoleName),
      confidence: suggestion.confidence || suggestion.confidenceLevel,
      explanation: suggestion.explanation || suggestion.reasoningSummary,
      requiresHumanValidation: true,
      mode: AI_MODES.OPENAI_SECURE_BACKEND,
      provider: suggestion.provider || "secure-openai-backend",
      version: suggestion.version || AI_SERVICE_VERSION,
      analysisVersion: suggestion.analysisVersion || suggestion.version || AI_SERVICE_VERSION,
    };
    normalized.safetyWarnings = [
      "Secure backend analysis - human validation required.",
      ...(normalized.safetyWarnings || []),
    ];
    return normalized;
  }

  async function callSecureBackend(input, context = {}, options = {}) {
    const endpoint = options.endpoint || SECURE_BACKEND_ENDPOINT;
    const fetchImpl = options.fetchImpl || window.fetch?.bind(window);
    if (typeof fetchImpl !== "function") {
      const error = new Error("Secure backend unavailable: fetch is not available.");
      error.code = "frontend_fetch_unavailable";
      throw error;
    }

    const requestBody = buildBackendRequest(input, context, AI_MODES.OPENAI_SECURE_BACKEND);
    const response = await fetchImpl(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    let payload = null;
    try {
      payload = await response.json();
    } catch (error) {
      payload = null;
    }

    if (!response.ok || !payload?.ok || !payload?.suggestion) {
      const backendError = payload?.error || {};
      const error = new Error(backendError.message || "Secure backend unavailable.");
      error.code = backendError.code || "backend_unavailable";
      error.requestId = backendError.requestId || payload?.audit?.requestId || null;
      error.audit = payload?.audit || null;
      throw error;
    }

    return normalizeBackendSuggestion(payload.suggestion, input);
  }

  async function getBackendStatus(options = {}) {
    const endpoint = options.endpoint || SECURE_BACKEND_STATUS_ENDPOINT;
    const fetchImpl = options.fetchImpl || window.fetch?.bind(window);
    if (typeof fetchImpl !== "function") {
      throw new Error("Secure backend status unavailable.");
    }
    const response = await fetchImpl(endpoint, { method: "GET" });
    if (!response.ok) {
      throw new Error("Secure backend status unavailable.");
    }
    const payload = await response.json();
    return payload.backend || payload;
  }

  function createIncidentAnalysisService(config = {}) {
    const mode = config.mode || AI_MODES.SIMULATED_DEMO;
    return {
      mode,
      analyzeIncident(input, context = {}, options = {}) {
        return analyzeIncident(input, context, { ...options, mode: options.mode || mode });
      },
      getBackendContract() {
        return { ...AI_SERVICE_BACKEND_CONTRACT };
      },
      getBackendStatus,
    };
  }

  window.PIPOAIService = {
    AI_MODES,
    PRIORITIES,
    CONFIDENCE_LEVELS,
    AI_SERVICE_VERSION,
    AI_SERVICE_BACKEND_CONTRACT,
    createIncidentAnalysisService,
    analyzeIncident,
    buildBackendRequest,
    callSecureBackend,
    getBackendStatus,
  };
}());
