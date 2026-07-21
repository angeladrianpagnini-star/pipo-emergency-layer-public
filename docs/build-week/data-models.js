(function () {
const MODEL_DEFINITIONS = [
  {
    key: "incident",
    name: "Incidente",
    purpose: "Ficha principal del caso desde la alerta hasta el cierre.",
    required: ["id", "threadId", "source", "status", "priority", "jurisdiction", "createdAt"],
    fields: [
      ["id", "Identificador publico del incidente"],
      ["threadId", "Hilo documental asociado"],
      ["source", "Canal simulado de ingreso"],
      ["initialDescription", "Texto libre recibido o cargado por operador"],
      ["status", "Estado operativo actual"],
      ["priority", "Prioridad humana vigente"],
      ["jurisdiction", "Jurisdiccion o zona estimada"],
      ["location", "Ubicacion estimada o declarada"],
      ["createdAt", "Fecha y hora de creacion"],
      ["updatedAt", "Ultima actualizacion"],
    ],
  },
  {
    key: "event",
    name: "Evento de bitacora",
    purpose: "Registro cronologico inalterable de acciones y cambios.",
    required: ["id", "incidentId", "timestamp", "type", "actor", "classification"],
    fields: [
      ["id", "Identificador del evento"],
      ["incidentId", "Incidente relacionado"],
      ["timestamp", "Sello temporal"],
      ["type", "Tipo: alerta, IA, validacion, derivacion, arribo, actuacion, cierre"],
      ["actor", "Usuario, sistema o base que genera el evento"],
      ["classification", "Dato del sistema, actuacion realizada, hecho observado, manifestacion o inferencia"],
      ["summary", "Descripcion breve"],
      ["immutable", "Indica que no se edita ni elimina silenciosamente"],
      ["correctionOf", "Referencia opcional si rectifica un evento anterior"],
    ],
  },
  {
    key: "aiSuggestion",
    name: "AISuggestion",
    purpose: "Propuesta estructurada generada por el asistente simulado; siempre requiere validacion humana.",
    required: [
      "suggestionId",
      "incidentId",
      "originalInput",
      "neutralSummary",
      "suggestedIncidentType",
      "suggestedPriority",
      "requiresHumanValidation",
      "generatedAt",
      "mode",
    ],
    fields: [
      ["suggestionId", "Identificador de sugerencia"],
      ["id", "Alias de compatibilidad para sugerencias previas"],
      ["incidentId", "Incidente asociado"],
      ["originalInput", "Entrada original estructurada"],
      ["inputText", "Descripcion libre original"],
      ["neutralSummary", "Resumen neutral sin completar datos faltantes"],
      ["summary", "Alias de compatibilidad del resumen neutral"],
      ["suggestedIncidentType", "Tipo preliminar propuesto"],
      ["suggestedType", "Alias de compatibilidad del tipo preliminar"],
      ["suggestedPriority", "GREEN, YELLOW, RED o UNDETERMINED"],
      ["detectedRiskFactors", "Factores de riesgo detectados"],
      ["riskFactors", "Alias de compatibilidad para factores de riesgo"],
      ["availableInformation", "Informacion critica disponible"],
      ["availableInfo", "Alias de compatibilidad para informacion disponible"],
      ["missingCriticalInformation", "Informacion critica faltante"],
      ["missingInfo", "Alias de compatibilidad para informacion faltante"],
      ["followUpQuestions", "Preguntas de seguimiento"],
      ["suggestedQuestions", "Alias de compatibilidad para preguntas"],
      ["suggestedConsoles", "Consolas potencialmente competentes con finalidad y minimo a compartir"],
      ["competentAgencies", "Alias de compatibilidad para organismos potenciales"],
      ["suggestedSpecialties", "Especialidades o dominios detectados"],
      ["suggestedActions", "Acciones sugeridas no ejecutivas"],
      ["safetyWarnings", "Advertencias de seguridad"],
      ["legalOrAuthorizationRequirements", "Requisitos juridicos u operativos antes de medidas sensibles"],
      ["confidenceLevel", "LOW, MEDIUM o HIGH"],
      ["confidence", "Alias de compatibilidad para confianza"],
      ["reasoningSummary", "Fundamento resumido de la sugerencia"],
      ["explanation", "Alias de compatibilidad del fundamento"],
      ["sourceFacts", "Datos fuente utilizados"],
      ["unsupportedClaims", "Afirmaciones no respaldadas o advertencias de verificacion"],
      ["requiresHumanValidation", "Siempre true en la demo"],
      ["generatedAt", "Fecha de generacion"],
      ["mode", "SIMULATED_DEMO u OPENAI_SECURE_BACKEND"],
      ["modelOrEngineLabel", "Motor utilizado"],
      ["version", "Version del contrato de sugerencia"],
    ],
  },
  {
    key: "humanDecision",
    name: "Decision humana",
    purpose: "Version validada por operador o funcionario.",
    required: ["id", "incidentId", "operator", "sessionId", "decisionStatus", "finalPriority", "finalRouting", "decisionAt"],
    fields: [
      ["id", "Identificador de decision"],
      ["decisionId", "Identificador temporal antes de confirmacion"],
      ["incidentId", "Incidente asociado"],
      ["operatorId", "Identificador del operador responsable"],
      ["operator", "Responsable humano"],
      ["sessionId", "Sesion validada"],
      ["aiSuggestionId", "Sugerencia evaluada"],
      ["decisionStatus", "ACCEPTED, MODIFIED, REJECTED o MANUAL_WITHOUT_AI"],
      ["accepted", "Sugerencias aceptadas"],
      ["modified", "Sugerencias modificadas"],
      ["rejected", "Sugerencias rechazadas"],
      ["finalIncidentType", "Tipo final definido por operador"],
      ["finalPriority", "Prioridad definitiva"],
      ["finalConsoles", "Consolas finales validadas"],
      ["finalRouting", "Derivacion definitiva"],
      ["reason", "Motivo humano de aceptacion o modificacion"],
      ["materialDifferences", "Diferencias materiales entre IA y decision humana"],
      ["followUpAnswers", "Respuestas a preguntas de seguimiento"],
      ["addedInformation", "Informacion agregada por operador"],
      ["validationStatus", "Draft o Confirmed"],
      ["comparison", "Registro AI vs Human Decision"],
      ["decisionAt", "Fecha y hora de confirmacion"],
    ],
  },
  {
    key: "routing",
    name: "Derivacion",
    purpose: "Transferencia del caso a organismo o base competente.",
    required: ["id", "incidentId", "targetAgency", "status", "createdAt"],
    fields: [
      ["id", "Identificador de derivacion"],
      ["incidentId", "Incidente asociado"],
      ["sourceAgency", "Base que deriva"],
      ["targetAgency", "Organismo receptor"],
      ["fieldReceiver", "Funcionario o movil receptor"],
      ["status", "Propuesta, enviada, aceptada, observada o cerrada"],
      ["createdAt", "Fecha de derivacion"],
      ["acceptedAt", "Fecha de aceptacion"],
      ["notes", "Observaciones"],
    ],
  },
  {
    key: "fieldAction",
    name: "Actuacion",
    purpose: "Acciones registradas por operador o movil de campo.",
    required: ["id", "incidentId", "actor", "actionType", "timestamp"],
    fields: [
      ["id", "Identificador de actuacion"],
      ["incidentId", "Incidente asociado"],
      ["actor", "Funcionario, movil o base"],
      ["actionType", "Salida, arribo, intervencion, comunicacion, traslado, resguardo"],
      ["timestamp", "Fecha y hora"],
      ["description", "Descripcion neutral"],
      ["agenciesInvolved", "Organismos intervinientes"],
      ["linkedEvidence", "Evidencia asociada"],
    ],
  },
  {
    key: "evidence",
    name: "Evidencia",
    purpose: "Elemento simulado vinculado al caso con origen y control de acceso.",
    required: ["id", "incidentId", "type", "origin", "createdAt", "integrityRef"],
    fields: [
      ["id", "Identificador de evidencia"],
      ["incidentId", "Incidente asociado"],
      ["type", "Foto, video, audio, ubicacion, mensaje, informe, acta externa"],
      ["origin", "Usuario, movil, sistema o carga documental"],
      ["createdAt", "Fecha y hora"],
      ["responsibleUser", "Usuario responsable"],
      ["status", "Registrada, revisada, incorporada o restringida"],
      ["integrityRef", "Referencia de integridad de la demo"],
      ["viewPermissions", "Roles autorizados"],
    ],
  },
  {
    key: "digitalAct",
    name: "Registro Integrado de Procedimiento",
    purpose: "Documento institucional estructurado a partir de bitacora y datos validados.",
    required: ["id", "incidentId", "threadId", "version", "status", "author", "startedAt"],
    fields: [
      ["id", "Numero de acta"],
      ["incidentId", "Incidente asociado"],
      ["threadId", "Hilo documental"],
      ["agency", "Organismo o base operativa"],
      ["author", "Funcionario u operador responsable"],
      ["role", "Rol del autor"],
      ["device", "Dispositivo simulado"],
      ["jurisdiction", "Jurisdiccion"],
      ["location", "Lugar estimado o declarado"],
      ["version", "Version documental"],
      ["status", "Borrador, revision, finalizada, ampliada, rectificada o anulada"],
      ["startedAt", "Inicio del acta"],
      ["finishedAt", "Finalizacion"],
      ["sections", "Contenido narrativo clasificado"],
      ["completion", "Indicador de completitud verificable"],
    ],
  },
  {
    key: "actVersion",
    name: "Version del acta",
    purpose: "Historial de cambios sin sobrescribir una version finalizada.",
    required: ["id", "actId", "version", "author", "createdAt", "status"],
    fields: [
      ["id", "Identificador de version"],
      ["actId", "Acta asociada"],
      ["version", "Ejemplo: v1, v2, v3.1"],
      ["author", "Autor del cambio"],
      ["createdAt", "Fecha y hora"],
      ["changeReason", "Motivo del cambio"],
      ["previousHash", "Referencia anterior si existe"],
      ["contentHash", "Referencia de integridad de la demo"],
      ["status", "Borrador, revisada, finalizada, ampliacion, rectificacion"],
    ],
  },
  {
    key: "review",
    name: "Revision",
    purpose: "Circuito de supervision segun riesgo y contenido sensible.",
    required: ["id", "incidentId", "reviewer", "status", "createdAt"],
    fields: [
      ["id", "Identificador de revision"],
      ["incidentId", "Incidente asociado"],
      ["actId", "Acta revisada"],
      ["reviewer", "Supervisor o perfil autorizado"],
      ["status", "No requerida, pendiente, en revision, observada, devuelta o validada"],
      ["observations", "Observaciones sin borrar contenido del operador"],
      ["createdAt", "Fecha de apertura"],
      ["resolvedAt", "Fecha de resolucion"],
    ],
  },
  {
    key: "closure",
    name: "Cierre",
    purpose: "Resultado final obligatorio del incidente.",
    required: ["id", "incidentId", "result", "responsible", "closedAt", "associatedAct"],
    fields: [
      ["id", "Identificador de cierre"],
      ["incidentId", "Incidente asociado"],
      ["result", "Cerrado con reporte, acta, derivacion externa, seguimiento o cancelacion fundada"],
      ["responsible", "Responsable del cierre"],
      ["summary", "Observacion de cierre"],
      ["followUp", "Seguimiento definido o descartado con fundamento"],
      ["associatedAct", "Acta o reporte asociado"],
      ["closedAt", "Fecha y hora"],
    ],
  },
  {
    key: "auditRecord",
    name: "Auditoria",
    purpose: "Registro de acceso, cambios, validaciones y exportaciones.",
    required: ["id", "timestamp", "actor", "action", "targetType", "targetId"],
    fields: [
      ["id", "Identificador de auditoria"],
      ["timestamp", "Fecha y hora"],
      ["actor", "Usuario o sistema"],
      ["role", "Rol actuante"],
      ["action", "Consulta, creacion, validacion, exportacion, cierre"],
      ["targetType", "Incidente, evento, acta, evidencia, revision"],
      ["targetId", "Objeto afectado"],
      ["reason", "Motivo declarado cuando corresponde"],
      ["result", "Exitoso, observado o bloqueado"],
    ],
  },
];

const BUILD_WEEK_STATE = {
  incident: {
    id: "PIPO-BW-000001",
    threadId: "TRACE-BW-000001",
    source: "PIPO public simulated demo",
    initialDescription: "Persona descompensada en parada de colectivo. Esta consciente, pero no puede levantarse.",
    status: "En validacion humana",
    priority: "Amarillo",
    jurisdiction: "Zona simulada",
    location: "Ubicacion estimada de demostracion",
    createdAt: "2026-07-17T10:15:00-03:00",
    updatedAt: "2026-07-17T10:18:00-03:00",
  },
  events: [
    {
      id: "EVT-BW-001",
      incidentId: "PIPO-BW-000001",
      timestamp: "2026-07-17T10:15:00-03:00",
      type: "alert_created",
      actor: "Sistema PIPO demo",
      classification: "Dato del sistema",
      summary: "Alerta simulada creada desde descripcion libre.",
      immutable: true,
      correctionOf: null,
    },
    {
      id: "EVT-BW-002",
      incidentId: "PIPO-BW-000001",
      timestamp: "2026-07-17T10:16:00-03:00",
      type: "ai_suggestion_created",
      actor: "PIPO AI Incident Assistant demo",
      classification: "Inferencia o evaluacion",
      summary: "IA simulada propone prioridad amarilla y derivacion sanitaria.",
      immutable: true,
      correctionOf: null,
    },
  ],
  aiSuggestion: {
    id: "AI-BW-001",
    suggestionId: "AI-BW-001",
    incidentId: "PIPO-BW-000001",
    provider: "simulated-ai-demo",
    mode: "SIMULATED_DEMO",
    modelOrEngineLabel: "PIPO deterministic rule engine",
    version: "3.0.0",
    generatedAt: "2026-07-17T10:16:00-03:00",
    originalInput: {
      incidentId: "PIPO-BW-000001",
      description: "Persona descompensada en parada de colectivo. Esta consciente, pero no puede levantarse.",
      channel: "PIPO Layer",
      location: "Ubicacion estimada de demostracion",
      canSpeak: "YES",
      currentRisk: "UNKNOWN",
      injuredPersons: "YES",
      minorsPresent: "UNKNOWN",
      weaponsPresent: "UNKNOWN",
      possibleDigitalIncident: "NO",
      stolenOrLostDevice: "NO",
      additionalInfo: "Dato ficticio de etapa inicial.",
    },
    inputText: "Persona descompensada en parada de colectivo. Esta consciente, pero no puede levantarse.",
    neutralSummary: "El usuario u operador demo informa una persona consciente con imposibilidad de incorporarse en espacio publico. No se informa edad, signos vitales completos ni si respira con normalidad. No se atribuye culpabilidad ni se completan datos faltantes.",
    summary: "Se informa una persona consciente con imposibilidad de incorporarse en espacio publico.",
    suggestedIncidentType: "Emergencia medica",
    suggestedType: "Emergencia medica",
    suggestedPriority: "YELLOW",
    detectedRiskFactors: ["posible descompensacion", "espacio publico", "movilidad limitada"],
    riskFactors: ["posible descompensacion", "espacio publico", "movilidad limitada"],
    availableInformation: ["persona consciente", "no puede levantarse", "ubicacion aproximada"],
    availableInfo: ["persona consciente", "no puede levantarse", "ubicacion aproximada"],
    missingCriticalInformation: ["edad aproximada", "signos vitales", "si respira normalmente", "si hay acompanante"],
    missingInfo: ["edad aproximada", "signos vitales", "si respira normalmente", "si hay acompanante"],
    followUpQuestions: ["Respira con normalidad?", "Tiene dolor en pecho?", "Hay personal sanitario cerca?"],
    suggestedQuestions: ["Respira con normalidad?", "Tiene dolor en pecho?", "Hay personal sanitario cerca?"],
    suggestedConsoles: [
      {
        consoleType: "MASTER_MONITORING",
        consoleId: "CON-MASTER",
        consoleName: "Consola Maestra PIPO",
        purpose: "coordinar, auditar y sostener el hilo documental maestro",
        incorporationPriority: "IMMEDIATE",
        minimumInfoToShare: ["ID de incidente", "prioridad preliminar", "estado de validacion"],
        classification: "OPERATIONAL",
        additionalAuthorizationRequired: false,
      },
      {
        consoleType: "HEALTH_107",
        consoleId: "CON-107",
        consoleName: "107 Salud",
        purpose: "triage sanitario, ambulancia y orientacion de primeros cuidados",
        incorporationPriority: "REVIEW",
        minimumInfoToShare: ["ubicacion declarada", "estado de conciencia", "respiracion", "lesiones informadas"],
        classification: "SENSITIVE",
        additionalAuthorizationRequired: false,
      },
    ],
    competentAgencies: ["107 / Salud", "Centro de Monitoreo", "Transito si afecta circulacion"],
    suggestedSpecialties: ["Emergencia medica"],
    suggestedActions: ["Registrar entrada original en bitacora append-only.", "Solicitar validacion humana antes de derivacion o cambio de prioridad."],
    safetyWarnings: ["No mover a la persona si no es necesario", "Confirmar riesgo vital con operador humano"],
    legalOrAuthorizationRequirements: ["Decision operativa confirmada por operador autorizado.", "Registro de finalidad, rol, sesion y trazabilidad en bitacora."],
    confidenceLevel: "MEDIUM",
    confidence: "MEDIUM",
    reasoningSummary: "Reglas deterministicas de demo aplicadas sobre emergencia medica. La prioridad puede modificarse por validacion humana.",
    explanation: "La descripcion refiere una posible emergencia sanitaria sin datos de riesgo vital inmediato.",
    sourceFacts: [
      { field: "description", value: "Persona descompensada en parada de colectivo. Esta consciente, pero no puede levantarse.", source: "incident_input" },
      { field: "location", value: "Ubicacion estimada de demostracion", source: "incident_input" },
    ],
    unsupportedClaims: [],
    requiresHumanValidation: true,
  },
  humanDecision: {
    id: "HD-BW-001",
    decisionId: "HD-BW-001",
    incidentId: "PIPO-BW-000001",
    operatorId: "OP-MASTER-01",
    operator: "Operador demo Turno A",
    sessionId: "SES-MASTER-20260718",
    aiSuggestionId: "AI-BW-001",
    decisionStatus: "MODIFIED",
    accepted: ["tipo de incidente", "organismo sanitario"],
    modified: ["prioridad se mantiene bajo revision"],
    rejected: [],
    finalIncidentType: "Emergencia medica",
    finalPriority: "YELLOW",
    finalConsoles: [
      {
        consoleType: "HEALTH_107",
        consoleId: "CON-107",
        consoleName: "107 Salud",
      },
    ],
    finalRouting: "107 / Salud",
    reason: "La informacion disponible no confirma riesgo vital, pero requiere asistencia sanitaria.",
    materialDifferences: [],
    followUpAnswers: [],
    addedInformation: "Decision inicial de demostracion previa a Etapa 3.",
    validationStatus: "Confirmed",
    comparison: null,
    decisionAt: "2026-07-17T10:18:00-03:00",
  },
  routing: {
    id: "DER-BW-001",
    incidentId: "PIPO-BW-000001",
    sourceAgency: "Centro de Monitoreo demo",
    targetAgency: "107 / Salud",
    fieldReceiver: "Movil sanitario simulado",
    status: "Preparada para envio",
    createdAt: "2026-07-17T10:18:00-03:00",
    acceptedAt: null,
    notes: "Requiere validacion humana antes de despacho real.",
  },
  fieldActions: [],
  evidence: [
    {
      id: "EVI-BW-001",
      incidentId: "PIPO-BW-000001",
      type: "ubicacion estimada",
      origin: "Sistema PIPO demo",
      createdAt: "2026-07-17T10:15:00-03:00",
      responsibleUser: "Sistema demo",
      status: "Registrada",
      integrityRef: "demo-sha256-pending",
      viewPermissions: ["operador", "supervisor"],
    },
  ],
  digitalAct: {
    id: "ACTA-BW-000001",
    incidentId: "PIPO-BW-000001",
    threadId: "TRACE-BW-000001",
    agency: "Centro de Monitoreo demo",
    author: "Funcionario demo",
    role: "Operador actuante",
    device: "Dispositivo simulado",
    jurisdiction: "Zona simulada",
    location: "Ubicacion estimada de demostracion",
    version: "v1",
    status: "Borrador",
    startedAt: "2026-07-17T10:19:00-03:00",
    finishedAt: null,
    sections: {
      identification: "Pendiente de completar",
      reason: "Emergencia medica simulada",
      narrative: "Borrador pendiente de asistencia IA y revision humana.",
      actions: [],
      chronology: ["EVT-BW-001", "EVT-BW-002"],
    },
    completion: {
      percent: 28,
      completed: ["incidente", "motivo", "ubicacion estimada"],
      pending: ["responsable final", "relato", "actuaciones", "resultado", "confirmacion humana"],
    },
  },
  actVersions: [
    {
      id: "ACTV-BW-001",
      actId: "ACTA-BW-000001",
      version: "v1",
      author: "Sistema PIPO demo",
      createdAt: "2026-07-17T10:19:00-03:00",
      changeReason: "Creacion de borrador inicial",
      previousHash: null,
      contentHash: "demo-sha256-pending",
      status: "Borrador",
    },
  ],
  review: {
    id: "REV-BW-001",
    incidentId: "PIPO-BW-000001",
    actId: "ACTA-BW-000001",
    reviewer: "Supervisor demo",
    status: "No requerida",
    observations: "La revision podra requerirse si escala a prioridad roja o intervienen evidencias sensibles.",
    createdAt: "2026-07-17T10:19:00-03:00",
    resolvedAt: null,
  },
  closure: {
    id: "CIE-BW-001",
    incidentId: "PIPO-BW-000001",
    result: "Pendiente",
    responsible: "Sin cierre",
    summary: "El incidente aun no puede cerrarse.",
    followUp: "Pendiente de definicion",
    associatedAct: "ACTA-BW-000001",
    closedAt: null,
  },
  auditRecords: [
    {
      id: "AUD-BW-001",
      timestamp: "2026-07-17T10:15:00-03:00",
      actor: "Sistema PIPO demo",
      role: "sistema",
      action: "crear_incidente",
      targetType: "incident",
      targetId: "PIPO-BW-000001",
      reason: "Inicio de demostracion Build Week",
      result: "exitoso",
    },
  ],
};

const INFORMATION_LEVELS = ["PUBLIC", "OPERATIONAL", "SENSITIVE", "RESTRICTED_JUDICIAL"];

const AUTHORIZED_ACCESS_PURPOSES = [
  "OPERATIONAL_RESPONSE",
  "MEDICAL_ASSISTANCE",
  "JUDICIAL_REVIEW",
  "CYBERCRIME_ANALYSIS",
  "FIELD_DOCUMENTATION",
  "SUPERVISORY_REVIEW",
  "CITIZEN_DELIVERY",
  "QUALITY_AUDIT",
];

const PURPOSE_ALIASES = {
  "coordinacion operativa": "OPERATIONAL_RESPONSE",
  "trazabilidad operativa": "OPERATIONAL_RESPONSE",
  "expediente maestro": "OPERATIONAL_RESPONSE",
  "preservacion digital": "CYBERCRIME_ANALYSIS",
  "recepcion de denuncia": "JUDICIAL_REVIEW",
  "orientacion comunitaria": "FIELD_DOCUMENTATION",
  "entrega ciudadana": "CITIZEN_DELIVERY",
  "auditoria de calidad": "QUALITY_AUDIT",
};

function normalizeAccessPurpose(purpose) {
  if (!purpose) return "";
  const normalized = String(purpose).trim();
  return PURPOSE_ALIASES[normalized.toLowerCase()] || normalized;
}

const FEDERATED_CONSOLE_TYPES = [
  "MASTER_MONITORING",
  "SECURITY_911",
  "HEALTH_107",
  "FIRE_DEPARTMENT",
  "CIVIL_DEFENSE",
  "GENDER_RESPONSE",
  "CHILD_PROTECTION",
  "TRAFFIC",
  "PROSECUTOR_JUSTICE",
  "CVGRT",
  "CYBERCRIME",
  "POLICE_STATION",
];

const FEDERATED_ACTIONS = [
  "solicitar apoyo",
  "invitar organismo",
  "compartir evidencia",
  "solicitar evidencia",
  "actualizar estado",
  "aceptar intervencion",
  "rechazar con fundamento",
  "transferir responsabilidad",
  "solicitar aclaracion",
  "cerrar participacion",
];

const FEDERATED_MODEL_DEFINITIONS = [
  {
    key: "operationalConsole",
    name: "OperationalConsole",
    purpose: "Configuracion reutilizable para representar cada base operativa con permisos propios.",
    required: ["id", "type", "name", "jurisdiction", "securityLevel", "retentionPolicy", "status"],
    fields: [
      ["id", "Identificador de consola"],
      ["type", "Tipo federado: MASTER_MONITORING, SECURITY_911, CYBERCRIME, etc."],
      ["name", "Nombre visible"],
      ["jurisdiction", "Ambito operativo"],
      ["specialties", "Especialidades habilitadas"],
      ["securityLevel", "Nivel de seguridad operativo"],
      ["retentionPolicy", "Politica de conservacion simulada"],
      ["status", "Activa, disponible, observada o fuera de servicio"],
      ["roles", "Roles configurados"],
      ["allowedActions", "Acciones permitidas"],
      ["forms", "Formularios habilitados"],
      ["evidenceTypes", "Tipos de evidencia gestionables"],
      ["accessLevel", "Nivel maximo de informacion accesible"],
      ["canClose", "Si puede cerrar su participacion o el incidente"],
      ["requiresSupervision", "Si requiere supervision por defecto"],
    ],
  },
  {
    key: "operatorIdentity",
    name: "OperatorIdentity",
    purpose: "Identidad simulada de operador con MFA, biometria local y sesion.",
    required: ["id", "fictitiousName", "organization", "rankOrRole", "consoleId", "sessionId"],
    fields: [
      ["id", "Identificador del operador"],
      ["fictitiousName", "Nombre ficticio para demo"],
      ["organization", "Organismo al que pertenece"],
      ["rankOrRole", "Rango o rol"],
      ["specialty", "Especialidad principal"],
      ["consoleId", "Consola asociada"],
      ["enrolledDeviceId", "Dispositivo enrolado simulado"],
      ["mfaVerified", "MFA verificado true/false"],
      ["localBiometricVerified", "Biometria local verificada true/false, sin dato biometrico real"],
      ["sessionId", "Sesion activa"],
      ["sessionStartedAt", "Inicio de sesion"],
    ],
  },
  {
    key: "incidentParticipant",
    name: "IncidentParticipant",
    purpose: "Participacion de consola u operador dentro de un incidente multiintervencion.",
    required: ["incidentId", "operatorId", "consoleId", "role", "joinedAt", "permissions", "status"],
    fields: [
      ["incidentId", "Incidente asociado"],
      ["operatorId", "Operador participante"],
      ["consoleId", "Consola participante"],
      ["role", "Rol en el incidente"],
      ["joinedAt", "Fecha de incorporacion"],
      ["leftAt", "Fecha de salida si corresponde"],
      ["permissions", "Permisos de esa participacion"],
      ["status", "Activo, pendiente, cerrado u observado"],
    ],
  },
  {
    key: "consoleIntervention",
    name: "ConsoleIntervention",
    purpose: "Intervencion documentada por una consola sin absorber documentos de otra.",
    required: ["id", "incidentId", "consoleId", "operatorId", "type", "startedAt", "status"],
    fields: [
      ["id", "Identificador de intervencion"],
      ["incidentId", "Incidente asociado"],
      ["consoleId", "Consola interviniente"],
      ["operatorId", "Operador responsable"],
      ["type", "Tipo de intervencion"],
      ["summary", "Resumen neutral"],
      ["startedAt", "Inicio"],
      ["completedAt", "Finalizacion"],
      ["status", "Activa, completada, en ampliacion u observada"],
      ["linkedActId", "Acta individual vinculada"],
      ["linkedEvidenceIds", "Evidencia referenciada"],
    ],
  },
  {
    key: "individualInterventionAct",
    name: "IndividualInterventionAct",
    purpose: "Acta individual de un organismo. No puede ser editada por otra consola.",
    required: ["id", "incidentId", "consoleId", "operatorId", "specialty", "status", "version"],
    fields: [
      ["id", "Identificador de acta individual"],
      ["incidentId", "Incidente asociado"],
      ["consoleId", "Consola titular"],
      ["operatorId", "Operador autor"],
      ["specialty", "Especialidad"],
      ["chronology", "Eventos propios referenciados"],
      ["observations", "Observaciones"],
      ["actions", "Actuaciones"],
      ["evidenceReferences", "Referencias a evidencia"],
      ["status", "Borrador, finalizada, ampliada o rectificada"],
      ["version", "Version documental"],
      ["integrityReference", "Referencia de integridad de la demo"],
    ],
  },
  {
    key: "masterIncidentRecord",
    name: "Informe Maestro Interno",
    purpose: "Informe Maestro Interno del incidente: integra sin sustituir fuentes originales.",
    required: ["id", "incidentId", "participatingConsoles", "individualActs", "integratedTimeline", "closureStatus"],
    fields: [
      ["id", "Identificador del Informe Maestro Interno"],
      ["incidentId", "Incidente asociado"],
      ["participatingConsoles", "Consolas participantes"],
      ["individualActs", "Actas individuales referenciadas"],
      ["evidenceIndex", "Indice de evidencia"],
      ["integratedTimeline", "Cronologia general referenciada"],
      ["clarificationRequests", "Solicitudes de aclaracion/ampliacion"],
      ["contradictions", "Contradicciones documentales marcadas"],
      ["closureStatus", "Estado general de cierre"],
    ],
  },
  {
    key: "clarificationRequest",
    name: "ClarificationRequest",
    purpose: "Pedido de aclaracion, ampliacion u observacion sin reescribir el acta fuente.",
    required: ["id", "incidentId", "sourceActId", "requestingOperatorId", "recipientOperatorId", "reason", "status", "createdAt"],
    fields: [
      ["id", "Identificador de solicitud"],
      ["incidentId", "Incidente asociado"],
      ["sourceActId", "Acta fuente"],
      ["requestingOperatorId", "Operador solicitante"],
      ["recipientOperatorId", "Operador destinatario"],
      ["reason", "Motivo"],
      ["referencedEvents", "Eventos referenciados"],
      ["status", "Pendiente, respondida, observada o cerrada"],
      ["responseActVersion", "Version o anexo de respuesta"],
      ["createdAt", "Fecha de solicitud"],
      ["resolvedAt", "Fecha de resolucion"],
    ],
  },
  {
    key: "evidenceSharingGrant",
    name: "EvidenceSharingGrant",
    purpose: "Permiso temporal y finalista para compartir evidencia entre consolas.",
    required: ["id", "incidentId", "evidenceId", "sourceConsoleId", "destinationConsoleId", "purpose", "authorizedBy", "expiresAt"],
    fields: [
      ["id", "Identificador de permiso"],
      ["incidentId", "Incidente asociado"],
      ["evidenceId", "Evidencia compartida"],
      ["sourceConsoleId", "Consola origen"],
      ["destinationConsoleId", "Consola destino"],
      ["purpose", "Finalidad autorizada"],
      ["fieldsAllowed", "Campos visibles"],
      ["viewAllowed", "Visualizacion autorizada true/false"],
      ["downloadAllowed", "Descarga autorizada true/false"],
      ["authorizedBy", "Operador autorizante"],
      ["startedAt", "Inicio de vigencia"],
      ["expiresAt", "Vencimiento"],
      ["revokedAt", "Revocacion si corresponde"],
      ["revocationReason", "Motivo de revocacion"],
      ["accessLog", "Visualizaciones y descargas simuladas"],
    ],
  },
  {
    key: "judicialAuthorization",
    name: "JudicialAuthorization",
    purpose: "Autorizacion judicial simulada para capacidades excepcionales y temporales.",
    required: ["id", "incidentId", "simulatedOrderNumber", "authority", "scope", "validFrom", "expiresAt", "status"],
    fields: [
      ["id", "Identificador de autorizacion"],
      ["incidentId", "Incidente asociado"],
      ["simulatedOrderNumber", "Numero simulado"],
      ["authority", "Autoridad competente simulada"],
      ["scope", "Alcance limitado"],
      ["permittedCapabilities", "location, audio, video, connectionMetadata"],
      ["validFrom", "Inicio de vigencia"],
      ["expiresAt", "Vencimiento automatico"],
      ["authorizedOperators", "Operadores autorizados"],
      ["status", "Activa, vencida, revocada o pendiente"],
    ],
  },
  {
    key: "deviceRecoveryProtocol",
    name: "DeviceRecoveryProtocol",
    purpose: "Flujo simulado para robo/perdida de dispositivo con base legal y auditoria.",
    required: ["id", "incidentId", "deviceId", "complaintNumber", "receivingAuthority", "judicialAuthorizationId", "trackingStatus"],
    fields: [
      ["id", "Identificador del protocolo"],
      ["incidentId", "Incidente asociado"],
      ["deviceId", "Dispositivo enrolado simulado"],
      ["ownerConsentRecorded", "Consentimiento previo registrado"],
      ["complaintNumber", "Numero de denuncia simulado"],
      ["receivingAuthority", "Comisaria o fiscalia receptora"],
      ["lastKnownLocation", "Ultima ubicacion disponible simulada"],
      ["judicialAuthorizationId", "Autorizacion judicial vinculada"],
      ["trackingStatus", "Pendiente, autorizado, activo, vencido o cerrado"],
      ["activatedAt", "Inicio de ventana temporal"],
      ["deactivatedAt", "Fin de ventana temporal"],
      ["actionsLog", "Consultas registradas"],
    ],
  },
  {
    key: "cybercrimeReport",
    name: "CybercrimeReport",
    purpose: "Registro selectivo y voluntario de incidente digital con preservacion simulada.",
    required: ["id", "incidentId", "category", "preservationActions", "referralAuthority", "status"],
    fields: [
      ["id", "Identificador del reporte"],
      ["incidentId", "Incidente asociado"],
      ["category", "Fraude digital, suplantacion, ciberacoso, robo de dispositivo, etc."],
      ["affectedAccounts", "Cuentas afectadas declaradas"],
      ["urls", "URLs aportadas"],
      ["identifiers", "Usuarios, alias o identificadores declarados"],
      ["selectedFiles", "Archivos simulados seleccionados voluntariamente"],
      ["metadataSources", "Fuentes de metadatos visibles"],
      ["hashes", "Referencias de integridad de la demo"],
      ["preservationActions", "Capturas, hash, acta individual, derivacion"],
      ["referralAuthority", "Fiscalia u organismo de derivacion"],
      ["status", "Borrador, preservado, derivado o cerrado"],
    ],
  },
  {
    key: "policeStationReceptionRecord",
    name: "PoliceStationReceptionRecord",
    purpose: "Documento separado de comisaria para recepcion, constancias y traslados.",
    required: ["id", "incidentId", "consoleId", "operatorId", "status", "createdAt"],
    fields: [
      ["id", "Identificador del registro"],
      ["incidentId", "Incidente asociado"],
      ["consoleId", "Comisaria interviniente"],
      ["operatorId", "Funcionario receptor"],
      ["authorityBasis", "Autoridad y fundamento"],
      ["personReception", "Recepcion de persona si corresponde"],
      ["temporaryLodging", "Alojamiento transitorio documentado"],
      ["belongingsInventory", "Inventario de pertenencias"],
      ["healthControl", "Control de salud registrado"],
      ["transferInfo", "Traslado y autoridad receptora"],
      ["status", "Borrador, registrado, ampliado o cerrado"],
      ["createdAt", "Fecha de creacion"],
    ],
  },
];

MODEL_DEFINITIONS.push(...FEDERATED_MODEL_DEFINITIONS);

const SECURITY_EVIDENCE_MODEL_DEFINITIONS = [
  {
    key: "evidenceVaultItem",
    name: "EvidenceVaultItem",
    purpose: "Elemento ficticio de la boveda con cifrado de demostracion, integridad, retencion y acceso finalista.",
    required: [
      "evidenceId",
      "incidentId",
      "ownerConsoleId",
      "createdByOperatorId",
      "type",
      "fileName",
      "classification",
      "createdAt",
      "integrityHash",
      "encryptionStatus",
      "accessPolicy",
      "retentionPolicy",
      "status",
    ],
    fields: [
      ["evidenceId", "Identificador del elemento de evidencia ficticia"],
      ["incidentId", "Incidente asociado"],
      ["ownerConsoleId", "Consola titular"],
      ["createdByOperatorId", "Operador que registra el elemento"],
      ["type", "Tipo: audio, video, imagen, ubicacion, documento, captura o registro"],
      ["fileName", "Nombre ficticio del archivo"],
      ["simulatedSize", "Tamano simulado"],
      ["classification", "Nivel de informacion"],
      ["createdAt", "Fecha de creacion"],
      ["integrityHash", "Referencia SHA-256 del contenido ficticio original"],
      ["encryptedHash", "Referencia SHA-256 de la representacion cifrada si existe"],
      ["encryptionStatus", "UNENCRYPTED_DEMO, ENCRYPTED_DEMO o DECRYPTED_FOR_AUTHORIZED_VIEW"],
      ["accessPolicy", "Politica de roles, finalidades y campos visibles"],
      ["retentionPolicy", "Politica de retencion aplicada"],
      ["expirationDate", "Fecha de vencimiento segun retencion simulada"],
      ["authorizedConsoles", "Consolas autorizadas"],
      ["authorizedOperators", "Operadores autorizados"],
      ["accessHistory", "Historial de accesos"],
      ["sharingHistory", "Historial de permisos temporales"],
      ["downloadPolicy", "Politica de descarga"],
      ["status", "ACTIVE, RESTRICTED, SHARED_TEMPORARILY, ACCESS_REVOKED, RETENTION_HOLD, EXPIRED, DELETION_SCHEDULED o DELETED_SIMULATED"],
    ],
  },
  {
    key: "evidenceAccessRequest",
    name: "EvidenceAccessRequest",
    purpose: "Solicitud de acceso a evidencia por finalidad, vencimiento, supervision y autorizacion.",
    required: ["requestId", "evidenceId", "incidentId", "operatorId", "consoleId", "purpose", "status", "requestedAt"],
    fields: [
      ["requestId", "Identificador de solicitud"],
      ["evidenceId", "Evidencia solicitada"],
      ["incidentId", "Incidente asociado"],
      ["operatorId", "Operador solicitante"],
      ["consoleId", "Consola solicitante"],
      ["purpose", "Finalidad normalizada"],
      ["authorizationId", "Autorizacion asociada si aplica"],
      ["supervision", "Estado de supervision o segunda aprobacion"],
      ["status", "REQUESTED, GRANTED, DENIED, EXPIRED o REVOKED"],
      ["decision", "Resultado de canAccessResource"],
      ["requestedAt", "Fecha de solicitud"],
      ["expiresAt", "Vencimiento del permiso si existe"],
    ],
  },
  {
    key: "evidenceAccessHistory",
    name: "EvidenceAccessHistory",
    purpose: "Registro de cada vista, solicitud, descarga o denegacion de evidencia.",
    required: ["evidenceId", "operatorId", "consoleId", "sessionId", "purpose", "timestamp", "action", "result"],
    fields: [
      ["evidenceId", "Evidencia afectada"],
      ["operatorId", "Operador actuante"],
      ["consoleId", "Consola actuante"],
      ["sessionId", "Sesion operativa"],
      ["purpose", "Finalidad declarada"],
      ["timestamp", "Fecha y hora"],
      ["action", "view, decrypt, download, grant, revoke o expire"],
      ["result", "allowed, denied, expired o revoked"],
      ["authorizationId", "Autorizacion vinculada"],
      ["deviceId", "Dispositivo enrolado simulado"],
      ["reason", "Motivo controlado sin contenido sensible"],
    ],
  },
  {
    key: "evidenceRetentionPolicy",
    name: "EvidenceRetentionPolicy",
    purpose: "Politica simulada de conservacion, bloqueo, expiracion y eliminacion documentada.",
    required: ["id", "retentionDays", "deletionRule", "holdAllowed", "legalReviewRequired", "citizenAccessRule", "auditRequired"],
    fields: [
      ["id", "SHORT_OPERATIONAL, STANDARD_INCIDENT, MEDICAL_SENSITIVE, CYBERCRIME_PRESERVATION, JUDICIAL_HOLD, CITIZEN_COPY o TRAINING_DEMO"],
      ["retentionDays", "Dias simulados de conservacion"],
      ["deletionRule", "Regla de eliminacion o bloqueo"],
      ["holdAllowed", "Permite retencion por orden o supervision"],
      ["legalReviewRequired", "Requiere revision legal antes de borrar"],
      ["citizenAccessRule", "Regla de acceso ciudadano"],
      ["auditRequired", "Requiere evento de auditoria"],
    ],
  },
  {
    key: "digitalAcquisitionRecord",
    name: "DigitalAcquisitionRecord",
    purpose: "Registro conceptual de entrega voluntaria, preservacion guiada o adquisicion forense autorizada.",
    required: ["acquisitionId", "incidentId", "acquisitionType", "authority", "authorizationId", "operatorId", "consoleId", "status"],
    fields: [
      ["acquisitionId", "Identificador de adquisicion"],
      ["incidentId", "Incidente asociado"],
      ["acquisitionType", "VOLUNTARY_USER_SUBMISSION, GUIDED_PRESERVATION o AUTHORIZED_FORENSIC_ACQUISITION"],
      ["authority", "Autoridad o area competente"],
      ["authorizationId", "Autorizacion formal o registro de consentimiento"],
      ["operatorId", "Operador responsable"],
      ["consoleId", "Consola responsable"],
      ["specialty", "Especialidad interviniente"],
      ["simulatedDeviceId", "Dispositivo ficticio o enrolado simulado"],
      ["sourceDescription", "Fuente declarada sin contenido sensible"],
      ["scope", "Alcance autorizado"],
      ["startedAt", "Inicio"],
      ["completedAt", "Finalizacion"],
      ["toolName", "Herramienta especializada declarada para arquitectura futura"],
      ["toolVersion", "Version declarada"],
      ["method", "Metodo documentado"],
      ["acquiredItemIds", "Evidencias creadas o asociadas"],
      ["originalHash", "Hash de origen si aplica"],
      ["copyHash", "Hash de copia si aplica"],
      ["integrityStatus", "INTEGRITY_VERIFIED, INTEGRITY_MISMATCH o NOT_VERIFIED"],
      ["transferHistory", "Demonstration evidence transfer chain"],
      ["storageLocationReference", "Referencia interna no sensible"],
      ["limitations", "Limitaciones declaradas"],
      ["status", "REQUESTED, AUTHORIZED, IN_PROGRESS, COMPLETED, REJECTED, EXPIRED o CANCELLED_WITH_REASON"],
      ["integrityReference", "Referencia de integridad del registro"],
    ],
  },
  {
    key: "evidenceTransferRecord",
    name: "EvidenceTransferRecord",
    purpose: "Demonstration evidence transfer chain entre consolas o funcionarios.",
    required: ["transferId", "evidenceId", "origin", "receiver", "timestamp", "purpose", "status", "integrityReference"],
    fields: [
      ["transferId", "Identificador de transferencia"],
      ["evidenceId", "Evidencia transferida o referenciada"],
      ["origin", "Operador y consola origen"],
      ["receiver", "Operador, consola u organismo receptor"],
      ["timestamp", "Fecha y hora"],
      ["purpose", "Finalidad"],
      ["status", "RECORDED, ACCEPTED, OBSERVED o REVOKED"],
      ["integrityReference", "Referencia de integridad del acto de transferencia"],
    ],
  },
  {
    key: "citizenSanitizedEvidenceCopy",
    name: "CitizenSanitizedEvidenceCopy",
    purpose: "Copia ciudadana depurada, separada de la evidencia interna y sin metadatos protegidos.",
    required: ["documentId", "incidentId", "version", "hash", "deliveryReceipt", "classification"],
    fields: [
      ["documentId", "Identificador de documento ciudadano"],
      ["incidentId", "Incidente asociado"],
      ["version", "Version entregable"],
      ["hash", "Hash de la copia depurada"],
      ["deliveryReceipt", "Recibo de entrega"],
      ["classification", "Clasificacion de la copia"],
      ["redactions", "Campos excluidos o anonimizados"],
      ["deliveredAt", "Fecha de entrega si corresponde"],
    ],
  },
  {
    key: "communicationSecurityStatus",
    name: "CommunicationSecurityStatus",
    purpose: "Estado de transporte de la demo sin afirmar proteccion TLS cuando corre localmente por HTTP.",
    required: ["status", "label", "description"],
    fields: [
      ["status", "LOCAL_DEVELOPMENT, HTTPS_PROTECTED o TRANSPORT_NOT_VERIFIED"],
      ["label", "Etiqueta visible"],
      ["description", "Descripcion del alcance"],
      ["productiveRequirement", "Requisitos productivos: TLS, WSS, certificados, cabeceras, origen y sesiones"],
    ],
  },
];

MODEL_DEFINITIONS.push(...SECURITY_EVIDENCE_MODEL_DEFINITIONS);

const CITIZEN_MODEL_COMMON_FIELDS = [
  ["id", "Identificador del registro"],
  ["incidentId", "Incidente asociado"],
  ["createdAt", "Fecha de creacion"],
  ["createdBy", "Actor que genera el registro"],
  ["status", "Estado del registro"],
  ["version", "Version del contrato de datos"],
  ["classification", "Nivel de informacion"],
  ["integrityReference", "Referencia de integridad de demostracion"],
];

const CITIZEN_MODEL_DEFINITIONS = [
  {
    key: "demoPerspectiveSession",
    name: "DemoPerspectiveSession",
    purpose: "Sesion de vista multiperspectiva que cambia rol sin reiniciar el incidente.",
    required: ["id", "incidentId", "createdAt", "createdBy", "status", "version", "classification", "integrityReference", "perspective"],
    fields: [
      ...CITIZEN_MODEL_COMMON_FIELDS,
      ["perspective", "CITIZEN, FIELD_OPERATOR, FEDERATED_CONSOLE o MASTER_CONSOLE"],
      ["role", "Rol visible para la vista activa"],
      ["selectedConsoleId", "Consola federada activa si corresponde"],
      ["selectedFieldOperatorId", "Operador de campo activo si corresponde"],
      ["permissions", "Funciones habilitadas para la perspectiva"],
      ["availableInformation", "Informacion disponible para la perspectiva"],
      ["restrictedFunctions", "Funciones o datos ocultos para la perspectiva"],
      ["preservedStateMarkers", "Indicadores de que el estado no se reinicio al cambiar vista"],
    ],
  },
  {
    key: "citizenClosureSummary",
    name: "CitizenClosureSummary",
    purpose: "Resumen ciudadano en lenguaje claro, minimizado y separado del Informe Maestro Interno.",
    required: ["id", "incidentId", "createdAt", "createdBy", "status", "version", "classification", "integrityReference", "generatedAt"],
    fields: [
      ...CITIZEN_MODEL_COMMON_FIELDS,
      ["title", "Resumen ciudadano de actuacion y continuidad"],
      ["generatedAt", "Fecha de generacion"],
      ["reviewedAt", "Fecha de revision institucional"],
      ["incidentDateStart", "Fecha inicial del incidente"],
      ["incidentDateEnd", "Fecha de cierre o continuidad"],
      ["initialDescription", "Descripcion inicial depurada"],
      ["finalState", "Estado final informado al ciudadano"],
      ["participatingOrganizations", "Organismos intervinientes visibles"],
      ["relevantActions", "Acciones relevantes sin informacion interna"],
      ["derivations", "Derivaciones informables"],
      ["simulatedReferences", "Referencias de actas, constancias o denuncia simulada"],
      ["enabledDocuments", "Documentos habilitados para entrega"],
      ["pendingMeasures", "Medidas o consultas posteriores"],
      ["responsibleOrganization", "Organismo responsable de continuidad"],
      ["nextSteps", "Proximos pasos ciudadanos"],
      ["careRecommendations", "Recomendaciones de cuidado"],
      ["queryChannels", "Canales de consulta"],
      ["aiAssistedNotice", "Aviso de resumen asistido y revisado"],
    ],
  },
  {
    key: "citizenIncidentPackage",
    name: "CitizenIncidentPackage",
    purpose: "Paquete de entrega ciudadana con resumen, documentos habilitados, recibo e integridad.",
    required: ["id", "incidentId", "createdAt", "createdBy", "status", "version", "classification", "integrityReference", "summary"],
    fields: [
      ...CITIZEN_MODEL_COMMON_FIELDS,
      ["summary", "Resumen ciudadano incluido"],
      ["nextSteps", "Proximos pasos incluidos"],
      ["enabledDocuments", "Documentos disponibles"],
      ["referenceNumbers", "Numeros de referencia simulados"],
      ["followUpChannel", "Canal de seguimiento"],
      ["deliveredAt", "Fecha de entrega"],
      ["receipt", "Recibo de entrega"],
      ["browserPdfAvailable", "Indica que puede imprimirse como PDF desde el navegador"],
      ["printView", "Vista de impresion"],
      ["sanitizedJsonExport", "Exportacion JSON depurada"],
    ],
  },
  {
    key: "citizenDocumentAccess",
    name: "CitizenDocumentAccess",
    purpose: "Solicitud y descarga simulada de documentos habilitados para el ciudadano.",
    required: ["id", "incidentId", "createdAt", "createdBy", "status", "version", "classification", "integrityReference", "documentId"],
    fields: [
      ...CITIZEN_MODEL_COMMON_FIELDS,
      ["documentId", "Documento solicitado"],
      ["label", "Nombre visible"],
      ["source", "Organismo fuente"],
      ["decision", "Habilitado o no habilitado"],
      ["reason", "Motivo generico de entrega o restriccion"],
      ["requestedAt", "Fecha de solicitud"],
      ["downloadedAt", "Fecha de descarga simulada"],
    ],
  },
  {
    key: "citizenServiceFeedback",
    name: "CitizenServiceFeedback",
    purpose: "Opinion de calidad separada del expediente y sin modificar actas ni cierre.",
    required: ["id", "incidentId", "createdAt", "createdBy", "status", "version", "classification", "integrityReference", "ratings"],
    fields: [
      ...CITIZEN_MODEL_COMMON_FIELDS,
      ["ratings", "Calificaciones 1 a 5 sobre rapidez, claridad, trato, coordinacion y comprension"],
      ["optionalComment", "Comentario opcional depurado"],
      ["qualityDataOnly", "Indica que no modifica el expediente"],
      ["doesNotModifyProcedure", "Indica que no altera actas ni sanciones"],
      ["operatorEvaluatedPublicly", "Siempre false en la demo publica"],
    ],
  },
  {
    key: "citizenFormalObservation",
    name: "CitizenFormalObservation",
    purpose: "Observacion formal ciudadana separada de la opinion de servicio.",
    required: ["id", "incidentId", "createdAt", "createdBy", "status", "version", "classification", "integrityReference", "observationId"],
    fields: [
      ...CITIZEN_MODEL_COMMON_FIELDS,
      ["observationId", "Identificador de observacion"],
      ["category", "Categoria de observacion"],
      ["description", "Descripcion ciudadana"],
      ["referencedActIds", "Actas referenciadas"],
      ["referencedEventIds", "Eventos referenciados"],
      ["attachedSimulatedFiles", "Adjuntos simulados"],
      ["assignedConsole", "Consola asignada"],
      ["response", "Respuesta o pedido de aclaracion"],
      ["resolvedAt", "Fecha de respuesta o cierre"],
      ["effectNotice", "Indica que no modifica registros previos por si misma"],
    ],
  },
  {
    key: "citizenFollowUpAction",
    name: "CitizenFollowUpAction",
    purpose: "Accion posterior indicada al ciudadano con categoria y responsable.",
    required: ["id", "incidentId", "createdAt", "createdBy", "status", "version", "classification", "integrityReference", "category"],
    fields: [
      ...CITIZEN_MODEL_COMMON_FIELDS,
      ["category", "Categoria normalizada de proximo paso"],
      ["label", "Indicacion en lenguaje claro"],
      ["responsibleOrganization", "Organismo o persona responsable"],
      ["dueMode", "Modo de plazo segun organismo competente"],
      ["disclaimer", "Aviso sobre variacion de gestiones posteriores"],
      ["completedAt", "Fecha de cumplimiento si corresponde"],
    ],
  },
  {
    key: "citizenDeliveryReceipt",
    name: "CitizenDeliveryReceipt",
    purpose: "Recibo de entrega, apertura y confirmacion de recepcion ciudadana.",
    required: ["id", "incidentId", "createdAt", "createdBy", "status", "version", "classification", "integrityReference", "deliveredAt"],
    fields: [
      ...CITIZEN_MODEL_COMMON_FIELDS,
      ["packageId", "Paquete ciudadano entregado"],
      ["deliveredAt", "Fecha de entrega"],
      ["openedAt", "Fecha de apertura"],
      ["acknowledgedAt", "Fecha de confirmacion ciudadana"],
      ["deliveryMethod", "Metodo de entrega"],
      ["documentVersion", "Version documental entregada"],
    ],
  },
];

MODEL_DEFINITIONS.push(...CITIZEN_MODEL_DEFINITIONS);

MODEL_DEFINITIONS.push({
  key: "ledgerEvent",
  name: "LedgerEvent append-only",
  purpose: "Evento operativo inalterable con referencia previa e integridad de demostracion.",
  required: [
    "eventId",
    "incidentId",
    "type",
    "timestamp",
    "operatorId",
    "consoleId",
    "sessionId",
    "payload",
    "classification",
    "integrityReference",
    "previousEventReference",
  ],
  fields: [
    ["eventId", "Identificador unico del evento"],
    ["incidentId", "Incidente asociado"],
    ["type", "Tipo controlado de evento"],
    ["timestamp", "Sello temporal"],
    ["operatorId", "Operador responsable"],
    ["consoleId", "Consola responsable"],
    ["sessionId", "Sesion asociada"],
    ["payload", "Datos especificos del evento"],
    ["classification", "Nivel de sensibilidad"],
    ["integrityReference", "Referencia de integridad de la demo"],
    ["previousEventReference", "Referencia al evento anterior"],
  ],
});

const governanceFields = [
  ["classification", "Nivel PUBLIC, OPERATIONAL, SENSITIVE o RESTRICTED_JUDICIAL"],
  ["ownerConsole", "Consola titular del recurso"],
  ["permittedRoles", "Roles permitidos en combinacion con finalidad y permisos temporales"],
  ["sharingPurpose", "Finalidad autorizada de uso o intercambio"],
  ["retentionRule", "Regla de conservacion simulada"],
];

["incident", "event", "evidence", "digitalAct"].forEach((modelKey) => {
  const model = MODEL_DEFINITIONS.find((item) => item.key === modelKey);
  if (model) model.fields.push(...governanceFields);
});

const operationalConsoles = [
  {
    id: "CON-MASTER",
    type: "MASTER_MONITORING",
    name: "Consola Maestra PIPO",
    jurisdiction: "Coordinacion general simulada",
    specialties: ["coordinacion", "triage", "auditoria operativa"],
    roles: ["coordinador", "operador", "supervisor"],
    allowedActions: ["consultar", "invitar organismo", "solicitar aclaracion", "marcar contradiccion", "coordinar cierre"],
    forms: ["Informe Maestro Interno", "observacion de coordinacion"],
    evidenceTypes: ["indice", "referencia", "metadatos"],
    securityLevel: "high",
    accessLevel: "SENSITIVE",
    retentionPolicy: "conservacion proporcional segun incidente",
    canClose: true,
    requiresSupervision: true,
    status: "Activa",
  },
  {
    id: "CON-911",
    type: "SECURITY_911",
    name: "911 Seguridad",
    jurisdiction: "Seguridad publica simulada",
    specialties: ["movil policial", "personal a pie", "Policia Cientifica", "busqueda de personas", "genero"],
    roles: ["despachante", "movil", "supervisor policial"],
    allowedActions: ["aceptar intervencion", "registrar salida", "registrar arribo", "adjuntar evidencia", "acta individual"],
    forms: ["acta de intervencion policial"],
    evidenceTypes: ["foto simulada", "video simulado", "audio simulado", "ubicacion"],
    securityLevel: "high",
    accessLevel: "SENSITIVE",
    retentionPolicy: "retencion operativa restringida",
    canClose: false,
    requiresSupervision: true,
    status: "Activa",
  },
  {
    id: "CON-107",
    type: "HEALTH_107",
    name: "107 Salud",
    jurisdiction: "Emergencia sanitaria simulada",
    specialties: ["triage", "ambulancia", "traslado", "ingreso hospitalario"],
    roles: ["operador sanitario", "movil sanitario", "supervisor medico"],
    allowedActions: ["aceptar intervencion", "registrar triage", "informar traslado", "acta individual"],
    forms: ["registro sanitario de intervencion"],
    evidenceTypes: ["informe", "ubicacion", "constancia"],
    securityLevel: "high",
    accessLevel: "SENSITIVE",
    retentionPolicy: "retencion sanitaria restringida",
    canClose: false,
    requiresSupervision: true,
    status: "Disponible",
  },
  {
    id: "CON-BOMBEROS",
    type: "FIRE_DEPARTMENT",
    name: "Bomberos",
    jurisdiction: "Rescate e incendio simulado",
    specialties: ["incendio", "rescate", "materiales peligrosos"],
    roles: ["guardia", "dotacion", "jefe de dotacion"],
    allowedActions: ["aceptar intervencion", "registrar dotacion", "adjuntar informe", "cerrar participacion"],
    forms: ["parte tecnico"],
    evidenceTypes: ["foto simulada", "informe", "croquis"],
    securityLevel: "medium",
    accessLevel: "OPERATIONAL",
    retentionPolicy: "retencion tecnica proporcional",
    canClose: false,
    requiresSupervision: false,
    status: "Disponible",
  },
  {
    id: "CON-DC",
    type: "CIVIL_DEFENSE",
    name: "Defensa Civil",
    jurisdiction: "Proteccion civil simulada",
    specialties: ["evacuacion", "clima", "riesgo estructural"],
    roles: ["operador", "brigada", "coordinador"],
    allowedActions: ["registrar zona", "coordinar recursos", "cerrar participacion"],
    forms: ["reporte de proteccion civil"],
    evidenceTypes: ["mapa", "foto simulada", "informe"],
    securityLevel: "medium",
    accessLevel: "OPERATIONAL",
    retentionPolicy: "retencion administrativa proporcional",
    canClose: false,
    requiresSupervision: false,
    status: "Disponible",
  },
  {
    id: "CON-GENERO",
    type: "GENDER_RESPONSE",
    name: "Genero",
    jurisdiction: "Proteccion de victimas simulada",
    specialties: ["acompanamiento", "medidas de proteccion", "seguimiento"],
    roles: ["operador protegido", "equipo territorial", "supervisor"],
    allowedActions: ["aceptar intervencion", "solicitar resguardo", "adjuntar constancia", "acta individual"],
    forms: ["informe reservado"],
    evidenceTypes: ["constancia", "ubicacion", "comunicacion"],
    securityLevel: "restricted",
    accessLevel: "SENSITIVE",
    retentionPolicy: "retencion sensible con acceso minimo",
    canClose: false,
    requiresSupervision: true,
    status: "Disponible",
  },
  {
    id: "CON-NINEZ",
    type: "CHILD_PROTECTION",
    name: "Ninez",
    jurisdiction: "Proteccion de menores simulada",
    specialties: ["resguardo", "intervencion social", "medidas urgentes"],
    roles: ["operador", "equipo tecnico", "supervisor"],
    allowedActions: ["aceptar intervencion", "solicitar informacion", "acta individual"],
    forms: ["informe de resguardo"],
    evidenceTypes: ["informe", "constancia"],
    securityLevel: "restricted",
    accessLevel: "SENSITIVE",
    retentionPolicy: "retencion reforzada por menores",
    canClose: false,
    requiresSupervision: true,
    status: "Disponible",
  },
  {
    id: "CON-TRANSITO",
    type: "TRAFFIC",
    name: "Transito vial",
    jurisdiction: "Movilidad y siniestros simulados",
    specialties: ["corte", "corredor sanitario", "siniestro vial"],
    roles: ["operador vial", "movil vial"],
    allowedActions: ["aceptar intervencion", "informar corte", "cerrar participacion"],
    forms: ["reporte vial"],
    evidenceTypes: ["foto simulada", "croquis", "ubicacion"],
    securityLevel: "medium",
    accessLevel: "OPERATIONAL",
    retentionPolicy: "retencion operativa vial",
    canClose: false,
    requiresSupervision: false,
    status: "Disponible",
  },
  {
    id: "CON-FISCALIA",
    type: "PROSECUTOR_JUSTICE",
    name: "Fiscalia / Justicia",
    jurisdiction: "Autoridad judicial simulada",
    specialties: ["medidas", "preservacion", "autorizacion"],
    roles: ["receptor judicial", "fiscal simulado", "auxiliar judicial"],
    allowedActions: ["recibir derivacion", "registrar autorizacion", "solicitar aclaracion", "cerrar participacion"],
    forms: ["constancia judicial simulada"],
    evidenceTypes: ["acta", "hash", "constancia", "oficio simulado"],
    securityLevel: "restricted",
    accessLevel: "RESTRICTED_JUDICIAL",
    retentionPolicy: "retencion judicial simulada restringida",
    canClose: false,
    requiresSupervision: true,
    status: "Disponible",
  },
  {
    id: "CON-CVGRT",
    type: "CVGRT",
    name: "CVGRT territorial",
    jurisdiction: "Respuesta territorial simulada",
    specialties: ["escucha", "orientacion", "seguimiento comunitario"],
    roles: ["guia territorial", "coordinador"],
    allowedActions: ["registrar acompanamiento", "informar seguimiento", "cerrar participacion"],
    forms: ["reporte territorial"],
    evidenceTypes: ["informe", "observacion"],
    securityLevel: "medium",
    accessLevel: "OPERATIONAL",
    retentionPolicy: "retencion comunitaria minima",
    canClose: false,
    requiresSupervision: false,
    status: "Disponible",
  },
  {
    id: "CON-CIBER",
    type: "CYBERCRIME",
    name: "Ciberdelitos",
    jurisdiction: "Preservacion digital simulada",
    specialties: ["fraude digital", "suplantacion", "extorsion", "robo de dispositivo", "preservacion de evidencia"],
    roles: ["analista digital", "operador ciber", "supervisor ciber"],
    allowedActions: ["flujo ciberdelito", "generar hash", "preservar evidencia", "derivar a fiscalia", "acta individual"],
    forms: ["Acta de Intervencion Digital"],
    evidenceTypes: ["URL", "captura simulada", "archivo seleccionado", "hash", "metadatos visibles"],
    securityLevel: "restricted",
    accessLevel: "RESTRICTED_JUDICIAL",
    retentionPolicy: "retencion digital restringida y finalista",
    canClose: false,
    requiresSupervision: true,
    status: "Activa",
  },
  {
    id: "CON-COMISARIA",
    type: "POLICE_STATION",
    name: "Comisaria receptora",
    jurisdiction: "Dependencia policial simulada",
    specialties: ["denuncia", "recepcion", "constancias", "traslado"],
    roles: ["oficial de servicio", "sumariante", "supervisor"],
    allowedActions: ["recibir denuncia", "inventariar pertenencias", "registrar traslado", "adjuntar constancia"],
    forms: ["PoliceStationReceptionRecord"],
    evidenceTypes: ["constancia", "inventario", "acta externa"],
    securityLevel: "high",
    accessLevel: "SENSITIVE",
    retentionPolicy: "retencion documental policial",
    canClose: false,
    requiresSupervision: true,
    status: "Activa",
  },
];

const operatorIdentities = [
  {
    id: "OP-MASTER-01",
    fictitiousName: "Coordinadora Maestra Demo",
    organization: "Centro de Monitoreo",
    rankOrRole: "Coordinacion",
    specialty: "integracion documental",
    consoleId: "CON-MASTER",
    enrolledDeviceId: "DEV-MASTER-01",
    mfaVerified: true,
    localBiometricVerified: true,
    sessionId: "SES-MASTER-20260718",
    sessionStartedAt: "2026-07-18T09:00:00-03:00",
    sessionExpiresAt: "2026-07-18T17:00:00-03:00",
    secondApprovalVerified: true,
    supervisionActive: true,
  },
  {
    id: "OP-911-01",
    fictitiousName: "Operador 911 Demo",
    organization: "911 Seguridad",
    rankOrRole: "Despachante",
    specialty: "movil policial",
    consoleId: "CON-911",
    enrolledDeviceId: "DEV-911-01",
    mfaVerified: true,
    localBiometricVerified: true,
    sessionId: "SES-911-20260718",
    sessionStartedAt: "2026-07-18T09:02:00-03:00",
    sessionExpiresAt: "2026-07-18T17:02:00-03:00",
    secondApprovalVerified: true,
    supervisionActive: true,
  },
  {
    id: "OP-CIBER-01",
    fictitiousName: "Analista Ciber Demo",
    organization: "Ciberdelitos",
    rankOrRole: "Analista digital",
    specialty: "preservacion de evidencia",
    consoleId: "CON-CIBER",
    enrolledDeviceId: "DEV-CIBER-01",
    mfaVerified: true,
    localBiometricVerified: true,
    sessionId: "SES-CIBER-20260718",
    sessionStartedAt: "2026-07-18T09:04:00-03:00",
    sessionExpiresAt: "2026-07-18T17:04:00-03:00",
    secondApprovalVerified: true,
    supervisionActive: true,
  },
  {
    id: "OP-COM-01",
    fictitiousName: "Oficial Receptor Demo",
    organization: "Comisaria receptora",
    rankOrRole: "Oficial de servicio",
    specialty: "recepcion de denuncia",
    consoleId: "CON-COMISARIA",
    enrolledDeviceId: "DEV-COM-01",
    mfaVerified: true,
    localBiometricVerified: true,
    sessionId: "SES-COM-20260718",
    sessionStartedAt: "2026-07-18T09:06:00-03:00",
    sessionExpiresAt: "2026-07-18T17:06:00-03:00",
    secondApprovalVerified: true,
    supervisionActive: true,
  },
  {
    id: "OP-FIELD-01",
    fictitiousName: "Movil Campo Demo",
    organization: "911 Seguridad",
    rankOrRole: "Equipo de campo",
    specialty: "respuesta territorial",
    consoleId: "CON-911",
    enrolledDeviceId: "DEV-FIELD-01",
    mfaVerified: true,
    localBiometricVerified: true,
    sessionId: "SES-FIELD-20260718",
    sessionStartedAt: "2026-07-18T09:08:00-03:00",
    sessionExpiresAt: "2026-07-18T17:08:00-03:00",
    secondApprovalVerified: false,
    supervisionActive: true,
  },
];

const incidentParticipants = [
  {
    incidentId: "PIPO-BW-000001",
    operatorId: "OP-MASTER-01",
    consoleId: "CON-MASTER",
    role: "coordinacion",
    joinedAt: "2026-07-18T09:10:00-03:00",
    leftAt: null,
    permissions: ["consultar", "invitar organismo", "solicitar aclaracion", "marcar contradiccion"],
    status: "Activo",
  },
  {
    incidentId: "PIPO-BW-000001",
    operatorId: "OP-911-01",
    consoleId: "CON-911",
    role: "despacho",
    joinedAt: "2026-07-18T09:11:00-03:00",
    leftAt: null,
    permissions: ["aceptar intervencion", "registrar salida", "registrar arribo", "acta individual"],
    status: "Activo",
  },
  {
    incidentId: "PIPO-BW-000001",
    operatorId: "OP-CIBER-01",
    consoleId: "CON-CIBER",
    role: "preservacion digital",
    joinedAt: "2026-07-18T09:12:00-03:00",
    leftAt: null,
    permissions: ["flujo ciberdelito", "generar hash", "preservar evidencia", "derivar a fiscalia"],
    status: "Activo",
  },
  {
    incidentId: "PIPO-BW-000001",
    operatorId: "OP-FIELD-01",
    consoleId: "CON-911",
    role: "movil de campo",
    joinedAt: "2026-07-18T09:13:00-03:00",
    leftAt: null,
    permissions: ["registrar salida", "registrar arribo", "registrar observacion", "adjuntar evidencia"],
    status: "Activo",
  },
];

const consoleInterventions = [
  {
    id: "INT-911-001",
    incidentId: "PIPO-BW-000001",
    consoleId: "CON-911",
    operatorId: "OP-911-01",
    type: "intervencion seguridad",
    summary: "Despacho policial simulado asociado al incidente.",
    startedAt: "2026-07-18T09:14:00-03:00",
    completedAt: null,
    status: "Activa",
    linkedActId: "ACT-IND-911-001",
    linkedEvidenceIds: ["EVI-BW-001"],
  },
  {
    id: "INT-CIBER-001",
    incidentId: "PIPO-BW-000001",
    consoleId: "CON-CIBER",
    operatorId: "OP-CIBER-01",
    type: "preservacion digital",
    summary: "Preservacion selectiva y voluntaria de evidencia digital simulada.",
    startedAt: "2026-07-18T09:16:00-03:00",
    completedAt: null,
    status: "Activa",
    linkedActId: "ACT-IND-CIBER-001",
    linkedEvidenceIds: ["EVI-CIBER-001"],
  },
];

const individualInterventionActs = [
  {
    id: "ACT-IND-911-001",
    incidentId: "PIPO-BW-000001",
    consoleId: "CON-911",
    operatorId: "OP-911-01",
    specialty: "movil policial",
    chronology: ["EVT-BW-001", "EVT-BW-002"],
    observations: ["Acta propia de 911. No editable por consola maestra."],
    actions: ["derivacion aceptada", "movil asignado"],
    evidenceReferences: ["EVI-BW-001"],
    status: "Borrador",
    version: "v1",
    integrityReference: "demo-act-911-hash-pending",
    classification: "SENSITIVE",
    ownerConsole: "CON-911",
    permittedRoles: ["despachante", "supervisor policial", "coordinador"],
    sharingPurpose: "coordinacion operativa",
    retentionRule: "retencion operativa restringida",
  },
  {
    id: "ACT-IND-CIBER-001",
    incidentId: "PIPO-BW-000001",
    consoleId: "CON-CIBER",
    operatorId: "OP-CIBER-01",
    specialty: "preservacion digital",
    chronology: ["EVT-CIBER-001"],
    observations: ["Carga voluntaria y selectiva. No hay extraccion completa del dispositivo."],
    actions: ["hash simulado", "preservacion de URL", "derivacion preparada a fiscalia"],
    evidenceReferences: ["EVI-CIBER-001"],
    status: "Borrador",
    version: "v1",
    integrityReference: "demo-act-ciber-hash-pending",
    classification: "RESTRICTED_JUDICIAL",
    ownerConsole: "CON-CIBER",
    permittedRoles: ["analista digital", "supervisor ciber", "receptor judicial"],
    sharingPurpose: "preservacion digital",
    retentionRule: "retencion digital restringida",
  },
];

const evidenceSharingGrants = [
  {
    id: "GRANT-001",
    incidentId: "PIPO-BW-000001",
    evidenceId: "EVI-CIBER-001",
    sourceConsoleId: "CON-CIBER",
    destinationConsoleId: "CON-FISCALIA",
    purpose: "CYBERCRIME_ANALYSIS",
    fieldsAllowed: ["id", "type", "origin", "createdAt", "integrityRef", "metadataSources"],
    authorizedBy: "OP-CIBER-01",
    startedAt: "2026-07-18T09:30:00-03:00",
    expiresAt: "2026-07-18T12:30:00-03:00",
    revokedAt: null,
    revocationReason: null,
    viewAllowed: true,
    downloadAllowed: false,
    accessLog: [],
  },
  {
    id: "GRANT-EXPIRED",
    incidentId: "PIPO-BW-000001",
    evidenceId: "EVI-CIBER-001",
    sourceConsoleId: "CON-CIBER",
    destinationConsoleId: "CON-CVGRT",
    purpose: "FIELD_DOCUMENTATION",
    fieldsAllowed: ["id", "type"],
    authorizedBy: "OP-MASTER-01",
    startedAt: "2026-07-18T08:00:00-03:00",
    expiresAt: "2026-07-18T08:30:00-03:00",
    revokedAt: null,
    revocationReason: null,
    viewAllowed: true,
    downloadAllowed: false,
    accessLog: [],
  },
];

const judicialAuthorizations = [
  {
    id: "JUD-AUTH-001",
    incidentId: "PIPO-BW-000001",
    simulatedOrderNumber: "OFICIO-SIM-2026-0007",
    authority: "Fiscalia simulada",
    scope: "Ventana temporal para ubicar dispositivo enrolado denunciado como robado.",
    permittedCapabilities: ["location", "connectionMetadata"],
    validFrom: "2026-07-18T09:30:00-03:00",
    expiresAt: "2026-07-18T10:30:00-03:00",
    authorizedOperators: ["OP-CIBER-01", "OP-COM-01"],
    status: "Activa",
  },
];

const deviceRecoveryProtocols = [
  {
    id: "DRP-001",
    incidentId: "PIPO-BW-000001",
    deviceId: "DEV-CITIZEN-001",
    ownerConsentRecorded: true,
    complaintNumber: "DEN-SIM-4427",
    receivingAuthority: "Comisaria receptora simulada",
    lastKnownLocation: "Zona estimada demo",
    judicialAuthorizationId: "JUD-AUTH-001",
    trackingStatus: "Autorizado simulado",
    activatedAt: null,
    deactivatedAt: null,
    actionsLog: ["denuncia registrada", "solicitud de medida generada", "autorizacion judicial simulada cargada"],
  },
];

const cybercrimeReports = [
  {
    id: "CYB-REP-001",
    incidentId: "PIPO-BW-000001",
    category: "robo de dispositivo",
    affectedAccounts: ["cuenta mensajeria demo", "correo demo"],
    urls: ["https://ejemplo.invalid/reporte-simulado"],
    identifiers: ["alias-demo-4427"],
    selectedFiles: ["captura-voluntaria-demo.png"],
    metadataSources: ["fecha declarada", "URL aportada", "archivo seleccionado"],
    hashes: ["demo-sha256-ciber-001"],
    preservationActions: ["preservacion de captura", "hash simulado", "derivacion a fiscalia simulada"],
    referralAuthority: "Fiscalia simulada",
    status: "Preservado",
    classification: "RESTRICTED_JUDICIAL",
    ownerConsole: "CON-CIBER",
    permittedRoles: ["analista digital", "receptor judicial", "supervisor ciber"],
    sharingPurpose: "preservacion digital",
    retentionRule: "retencion digital restringida",
  },
];

const policeStationReceptionRecords = [
  {
    id: "PSR-001",
    incidentId: "PIPO-BW-000001",
    consoleId: "CON-COMISARIA",
    operatorId: "OP-COM-01",
    authorityBasis: "Recepcion de denuncia simulada por robo de dispositivo.",
    personReception: "Sin alojamiento. Atencion documental.",
    temporaryLodging: "No aplica",
    belongingsInventory: "Dispositivo denunciado como sustraido. Sin inventario fisico.",
    healthControl: "No requerido en el escenario simulado.",
    transferInfo: "Derivacion documental a fiscalia simulada.",
    status: "Borrador",
    createdAt: "2026-07-18T09:25:00-03:00",
    classification: "SENSITIVE",
    ownerConsole: "CON-COMISARIA",
    permittedRoles: ["oficial de servicio", "sumariante", "receptor judicial"],
    sharingPurpose: "recepcion de denuncia",
    retentionRule: "retencion documental policial",
  },
];

const clarificationRequests = [
  {
    id: "CLAR-001",
    incidentId: "PIPO-BW-000001",
    sourceActId: "ACT-IND-CIBER-001",
    requestingOperatorId: "OP-MASTER-01",
    recipientOperatorId: "OP-CIBER-01",
    reason: "Ampliar origen de URL aportada sin modificar el acta original.",
    referencedEvents: ["EVT-CIBER-001"],
    status: "Pendiente",
    responseActVersion: null,
    createdAt: "2026-07-18T09:28:00-03:00",
    resolvedAt: null,
  },
];

const masterIncidentRecord = {
  id: "MIR-BW-000001",
  incidentId: "PIPO-BW-000001",
  participatingConsoles: ["CON-MASTER", "CON-911", "CON-CIBER", "CON-COMISARIA"],
  individualActs: ["ACT-IND-911-001", "ACT-IND-CIBER-001", "PSR-001"],
  evidenceIndex: ["EVI-BW-001", "EVI-CIBER-001"],
  integratedTimeline: ["EVT-BW-001", "EVT-BW-002", "EVT-CIBER-001"],
  clarificationRequests: ["CLAR-001"],
  contradictions: [
    {
      id: "CONTRA-001",
      summary: "Diferencia simulada entre horario declarado y horario de captura.",
      sourceRefs: ["ACT-IND-CIBER-001", "EVI-CIBER-001"],
      status: "Marcada para aclaracion",
    },
  ],
  closureStatus: "Abierto - integracion documental sin absorcion",
};

const buildWeekScenarios = {
  general: {
    label: "Emergencia general",
    summary: "Alerta ciudadana con derivacion inicial y coordinacion desde consola maestra.",
    recommendedConsoles: ["CON-MASTER", "CON-911", "CON-107"],
  },
  violence: {
    label: "Violencia",
    summary: "Caso sensible que requiere resguardo, supervision y acceso minimo.",
    recommendedConsoles: ["CON-MASTER", "CON-911", "CON-GENERO"],
  },
  cybercrime: {
    label: "Ciberdelito",
    summary: "Preservacion digital voluntaria, selectiva y derivable a fiscalia.",
    recommendedConsoles: ["CON-MASTER", "CON-CIBER", "CON-FISCALIA"],
  },
  stolenDevice: {
    label: "Dispositivo robado",
    summary: "Protocolo simulado con denuncia, consentimiento previo y autorizacion judicial temporal.",
    recommendedConsoles: ["CON-MASTER", "CON-CIBER", "CON-COMISARIA", "CON-FISCALIA"],
  },
  multidisciplinary: {
    label: "Incidente multidisciplinario",
    summary: "Multiples bases participan con actas propias e Informe Maestro Interno referenciado.",
    recommendedConsoles: ["CON-MASTER", "CON-911", "CON-107", "CON-DC", "CON-CVGRT"],
  },
};

Object.assign(BUILD_WEEK_STATE.incident, {
  classification: "SENSITIVE",
  ownerConsole: "CON-MASTER",
  permittedRoles: ["coordinador", "operador", "supervisor", "despachante", "analista digital"],
  sharingPurpose: "coordinacion operativa",
  retentionRule: "conservacion proporcional del incidente",
});

BUILD_WEEK_STATE.events.forEach((event) => {
  const informationType = event.classification;
  Object.assign(event, {
    classification: event.type.includes("ai") ? "OPERATIONAL" : "OPERATIONAL",
    informationType,
    ownerConsole: "CON-MASTER",
    permittedRoles: ["coordinador", "operador", "supervisor"],
    sharingPurpose: "trazabilidad operativa",
    retentionRule: "append-only demo",
  });
});

BUILD_WEEK_STATE.events.push({
  id: "EVT-CIBER-001",
  incidentId: "PIPO-BW-000001",
  timestamp: "2026-07-18T09:20:00-03:00",
  type: "cybercrime.preservation.created",
  actor: "OP-CIBER-01",
  classification: "RESTRICTED_JUDICIAL",
  informationType: "Actuacion realizada",
  summary: "Ciberdelitos preserva evidencia seleccionada de manera voluntaria y genera hash simulado.",
  immutable: true,
  correctionOf: null,
  ownerConsole: "CON-CIBER",
  permittedRoles: ["analista digital", "supervisor ciber", "receptor judicial"],
  sharingPurpose: "preservacion digital",
  retentionRule: "retencion digital restringida",
});

BUILD_WEEK_STATE.evidence[0] = {
  ...BUILD_WEEK_STATE.evidence[0],
  classification: "SENSITIVE",
  ownerConsole: "CON-MASTER",
  permittedRoles: ["coordinador", "operador", "supervisor"],
  sharingPurpose: "coordinacion operativa",
  retentionRule: "retencion de evidencia simulada",
  authorizedConsoles: ["CON-MASTER", "CON-911"],
  authorizedOperators: ["OP-MASTER-01", "OP-911-01"],
  requiresSecondApproval: false,
  downloadPolicy: "blocked_without_release",
};

BUILD_WEEK_STATE.evidence.push({
  id: "EVI-CIBER-001",
  incidentId: "PIPO-BW-000001",
  type: "captura simulada",
  origin: "Carga voluntaria selectiva",
  createdAt: "2026-07-18T09:20:00-03:00",
  responsibleUser: "OP-CIBER-01",
  status: "Preservada",
  integrityRef: "demo-sha256-ciber-001",
  viewPermissions: ["analista digital", "receptor judicial", "supervisor ciber"],
  classification: "RESTRICTED_JUDICIAL",
  ownerConsole: "CON-CIBER",
  permittedRoles: ["analista digital", "receptor judicial", "supervisor ciber"],
  sharingPurpose: "preservacion digital",
  retentionRule: "retencion digital restringida",
  metadataSources: ["fecha declarada", "URL aportada", "archivo seleccionado"],
  authorizedConsoles: ["CON-CIBER", "CON-FISCALIA"],
  authorizedOperators: ["OP-CIBER-01"],
  requiresSecondApproval: true,
  downloadPolicy: "blocked_without_formal_release",
});

Object.assign(BUILD_WEEK_STATE.digitalAct, {
  classification: "SENSITIVE",
  ownerConsole: "CON-MASTER",
  permittedRoles: ["coordinador", "supervisor"],
  sharingPurpose: "expediente maestro",
  retentionRule: "conservacion documental proporcional",
});

BUILD_WEEK_STATE.aiSuggestions = [BUILD_WEEK_STATE.aiSuggestion];
BUILD_WEEK_STATE.humanDecisions = [BUILD_WEEK_STATE.humanDecision];
BUILD_WEEK_STATE.assistantRuns = [];
const demoPerspectiveSessions = [];
const citizenClosureSummaries = [];
const citizenIncidentPackages = [];
const citizenDocumentAccesses = [];
const citizenServiceFeedback = [];
const citizenFormalObservations = [];
const citizenFollowUpActions = [];
const citizenDeliveryReceipts = [];
const evidenceVaultItems = [];
const evidenceAccessRequests = [];
const evidenceAccessHistory = [];
const evidenceRetentionPolicies = [];
const digitalAcquisitionRecords = [];
const evidenceTransferHistory = [];
const citizenSanitizedEvidenceCopies = [];
const communicationSecurityStatuses = [];

Object.assign(BUILD_WEEK_STATE, {
  informationLevels: INFORMATION_LEVELS,
  authorizedAccessPurposes: AUTHORIZED_ACCESS_PURPOSES,
  federatedConsoleTypes: FEDERATED_CONSOLE_TYPES,
  federatedActions: FEDERATED_ACTIONS,
  operationalConsoles,
  operatorIdentities,
  incidentParticipants,
  consoleInterventions,
  individualInterventionActs,
  masterIncidentRecord,
  clarificationRequests,
  evidenceSharingGrants,
  judicialAuthorizations,
  deviceRecoveryProtocols,
  cybercrimeReports,
  policeStationReceptionRecords,
  demoPerspectiveSessions,
  citizenClosureSummaries,
  citizenIncidentPackages,
  citizenDocumentAccesses,
  citizenServiceFeedback,
  citizenFormalObservations,
  citizenFollowUpActions,
  citizenDeliveryReceipts,
  evidenceVaultItems,
  evidenceAccessRequests,
  evidenceAccessHistory,
  evidenceRetentionPolicies,
  digitalAcquisitionRecords,
  evidenceTransferHistory,
  citizenSanitizedEvidenceCopies,
  communicationSecurityStatuses,
  buildWeekScenarios,
});

function getConsoleById(consoleId) {
  return operationalConsoles.find((item) => item.id === consoleId);
}

function getOperatorById(operatorId) {
  return operatorIdentities.find((item) => item.id === operatorId);
}

function compareInformationLevel(left, right) {
  return INFORMATION_LEVELS.indexOf(left) - INFORMATION_LEVELS.indexOf(right);
}

function isGrantActive(grant, now = "2026-07-18T10:00:00-03:00") {
  if (!grant || grant.revokedAt) return false;
  if (grant.startedAt && new Date(grant.startedAt).getTime() > new Date(now).getTime()) return false;
  return new Date(grant.expiresAt).getTime() > new Date(now).getTime();
}

function getActiveSharingGrant(operator, resource, purpose) {
  const normalizedPurpose = normalizeAccessPurpose(purpose);
  const evidenceId = resource.evidenceId || resource.id;
  return evidenceSharingGrants.find((grant) => (
    grant.evidenceId === evidenceId
    && grant.destinationConsoleId === operator.consoleId
    && normalizeAccessPurpose(grant.purpose) === normalizedPurpose
    && isGrantActive(grant)
  ));
}

function getActiveJudicialAuthorization(operator, resource, purpose, now = "2026-07-18T10:00:00-03:00") {
  const normalizedPurpose = normalizeAccessPurpose(purpose);
  const compatibleCapabilities = {
    CYBERCRIME_ANALYSIS: ["connectionMetadata", "digitalPreservation", "evidenceReview"],
    JUDICIAL_REVIEW: ["connectionMetadata", "evidenceReview", "location"],
    OPERATIONAL_RESPONSE: ["location"],
  }[normalizedPurpose] || [normalizedPurpose];
  return judicialAuthorizations.find((authorization) => (
    authorization.incidentId === resource.incidentId
    && authorization.status === "Activa"
    && authorization.authorizedOperators.includes(operator.id)
    && authorization.permittedCapabilities.some((capability) => compatibleCapabilities.includes(capability))
    && new Date(authorization.validFrom).getTime() <= new Date(now).getTime()
    && new Date(authorization.expiresAt).getTime() > new Date(now).getTime()
  ));
}

function accessDecision({
  allowed = false,
  reason,
  limitations = [],
  expiresAt = null,
  requiresSecondApproval = false,
  visibleFields = [],
  downloadable = false,
  watermarkedViewRequired = true,
  authorizationId = null,
}) {
  return {
    allowed,
    reason,
    limitations,
    expiresAt,
    expiration: expiresAt,
    requiresSecondApproval,
    visibleFields,
    downloadable,
    watermarkedViewRequired,
    authorizationId,
  };
}

function isSessionActive(operator, now = "2026-07-18T10:00:00-03:00") {
  if (!operator?.sessionId) return false;
  if (!operator.sessionExpiresAt) return true;
  return new Date(operator.sessionExpiresAt).getTime() > new Date(now).getTime();
}

function canAccessResource(operator, resource, purposeOrContext) {
  const context = typeof purposeOrContext === "object" && purposeOrContext !== null
    ? purposeOrContext
    : { purpose: purposeOrContext };
  const purpose = context.purpose;
  const normalizedPurpose = normalizeAccessPurpose(purpose);
  const now = context.now || "2026-07-18T10:00:00-03:00";
  const visibleFieldsDefault = [
    "id",
    "evidenceId",
    "incidentId",
    "type",
    "origin",
    "createdAt",
    "classification",
    "integrityRef",
    "integrityHash",
  ];

  if (!operator) {
    return accessDecision({
      reason: "Operador no identificado.",
      limitations: ["requiere identidad"],
      visibleFields: [],
      downloadable: false,
    });
  }

  if (!resource) {
    return accessDecision({
      reason: "Recurso no identificado.",
      limitations: ["recurso inexistente o no seleccionado"],
      visibleFields: [],
      downloadable: false,
    });
  }

  if (!isSessionActive(operator, now) || !operator.mfaVerified || !operator.localBiometricVerified) {
    return accessDecision({
      reason: "Sesion, MFA o biometria local simulada no verificada.",
      limitations: ["requiere sesion vigente", "requiere MFA", "requiere biometria local"],
      visibleFields: [],
      downloadable: false,
    });
  }

  if (!AUTHORIZED_ACCESS_PURPOSES.includes(normalizedPurpose)) {
    return accessDecision({
      reason: "Finalidad no habilitada para acceder al recurso.",
      limitations: ["usar una finalidad autorizada", "registrar motivo operativo"],
      visibleFields: [],
      downloadable: false,
    });
  }

  const operatorConsole = getConsoleById(operator.consoleId);
  const resourceLevel = resource.classification || "OPERATIONAL";
  const consoleLevel = operatorConsole?.accessLevel || "PUBLIC";
  const ownerConsole = resource.ownerConsole || resource.ownerConsoleId;
  const resourceAuthorizedConsoles = resource.authorizedConsoles || [ownerConsole].filter(Boolean);
  const resourceAuthorizedOperators = resource.authorizedOperators || [];
  const sameOwner = ownerConsole === operator.consoleId;
  const consoleAuthorized = resourceAuthorizedConsoles.includes(operator.consoleId) || sameOwner;
  const operatorAuthorized = !resourceAuthorizedOperators.length || resourceAuthorizedOperators.includes(operator.id);
  const permittedRoles = (resource.permittedRoles || []).map((role) => role.toLowerCase());
  const roleAllowed = !resource.permittedRoles
    || permittedRoles.includes((operator.rankOrRole || "").toLowerCase())
    || permittedRoles.includes((operator.specialty || "").toLowerCase());
  const samePurpose = !resource.sharingPurpose || normalizeAccessPurpose(resource.sharingPurpose) === normalizedPurpose;
  const activeGrant = getActiveSharingGrant(operator, resource, normalizedPurpose);
  const judicialAuthorization = resourceLevel === "RESTRICTED_JUDICIAL"
    ? getActiveJudicialAuthorization(operator, resource, normalizedPurpose, now)
    : null;
  const secondApprovalRequired = Boolean(resource.requiresSecondApproval || resourceLevel === "RESTRICTED_JUDICIAL" || context.requiresSecondApproval);
  const secondApprovalOk = !secondApprovalRequired || Boolean(context.secondApprovalVerified ?? operator.secondApprovalVerified);
  const supervisionOk = Boolean(context.supervisionActive ?? operator.supervisionActive ?? !operatorConsole?.requiresSupervision);
  const levelAllowed = compareInformationLevel(consoleLevel, resourceLevel) >= 0;
  const requestedDownload = Boolean(context.requestedDownload);
  const downloadBlocked = resource.downloadPolicy?.includes("blocked") || activeGrant?.downloadAllowed === false;
  const downloadable = requestedDownload && !downloadBlocked && Boolean(activeGrant?.downloadAllowed || context.downloadAuthorization);

  if (resourceLevel === "RESTRICTED_JUDICIAL") {
    if (!judicialAuthorization) {
      return accessDecision({
        reason: "Recurso restringido: requiere autorizacion activa compatible.",
        limitations: ["autorizacion vigente", "finalidad compatible", "registro de auditoria"],
        requiresSecondApproval: true,
        visibleFields: [],
        downloadable: false,
      });
    }
    if (!operatorAuthorized || !consoleAuthorized || !secondApprovalOk || !supervisionOk || !roleAllowed || !samePurpose || !levelAllowed) {
      return accessDecision({
        reason: "Recurso restringido: condiciones de operador, consola, supervision o finalidad insuficientes.",
        limitations: [
          "operador autorizado",
          "consola autorizada",
          "segunda aprobacion simulada",
          "supervision activa",
          "nivel compatible",
        ],
        expiresAt: judicialAuthorization.expiresAt,
        requiresSecondApproval: true,
        visibleFields: [],
        downloadable: false,
        authorizationId: judicialAuthorization.id,
      });
    }
    return accessDecision({
      allowed: true,
      reason: "Acceso permitido por autorizacion activa, finalidad, operador, MFA, sesion y supervision.",
      limitations: [judicialAuthorization.scope, resource.retentionRule || "retencion proporcional"],
      expiresAt: judicialAuthorization.expiresAt,
      requiresSecondApproval: true,
      visibleFields: activeGrant?.fieldsAllowed || visibleFieldsDefault,
      downloadable,
      watermarkedViewRequired: true,
      authorizationId: judicialAuthorization.id,
    });
  }

  if (sameOwner && roleAllowed && samePurpose && levelAllowed && operatorAuthorized && consoleAuthorized && supervisionOk) {
    return accessDecision({
      allowed: true,
      reason: "Acceso permitido por titularidad documental, rol, finalidad y nivel.",
      limitations: ["uso limitado al incidente", resource.retentionRule || "retencion proporcional"],
      visibleFields: visibleFieldsDefault,
      downloadable,
      watermarkedViewRequired: resourceLevel !== "PUBLIC",
    });
  }

  if (activeGrant && levelAllowed && supervisionOk) {
    return accessDecision({
      allowed: true,
      reason: "Acceso permitido por permiso temporal de evidencia.",
      limitations: [`campos: ${activeGrant.fieldsAllowed.join(", ")}`],
      expiresAt: activeGrant.expiresAt,
      visibleFields: activeGrant.fieldsAllowed,
      downloadable,
      watermarkedViewRequired: true,
      authorizationId: activeGrant.id,
    });
  }

  return accessDecision({
    reason: "Acceso denegado: rol, finalidad, organismo o autorizacion temporal insuficiente.",
    limitations: ["no compartir fuera de finalidad", "solicitar aclaracion o permiso temporal"],
    visibleFields: [],
    downloadable: false,
  });
}

function canModifyIndividualAct(operator, act) {
  if (!operator || !act) return false;
  return operator.id === act.operatorId && operator.consoleId === act.consoleId && act.status !== "Finalizada";
}

function getModelByKey(key) {
  return MODEL_DEFINITIONS.find((model) => model.key === key);
}

function getRequiredCoverage(modelKey, instance) {
  const model = getModelByKey(modelKey);
  if (!model) return { complete: [], missing: [] };
  const complete = model.required.filter((field) => {
    const value = instance?.[field];
    return value !== undefined && value !== null && value !== "";
  });
  const missing = model.required.filter((field) => !complete.includes(field));
  return { complete, missing };
}

function getBuildWeekSnapshot() {
  return JSON.parse(JSON.stringify(BUILD_WEEK_STATE));
}

window.PIPOBuildWeekModels = {
  MODEL_DEFINITIONS,
  BUILD_WEEK_STATE,
  INFORMATION_LEVELS,
  AUTHORIZED_ACCESS_PURPOSES,
  normalizeAccessPurpose,
  FEDERATED_CONSOLE_TYPES,
  FEDERATED_ACTIONS,
  getConsoleById,
  getOperatorById,
  canAccessResource,
  canModifyIndividualAct,
  getModelByKey,
  getRequiredCoverage,
  getBuildWeekSnapshot,
};
}());
