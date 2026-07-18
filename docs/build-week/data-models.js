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
    name: "Sugerencia de IA",
    purpose: "Propuesta estructurada generada por el asistente simulado.",
    required: ["id", "incidentId", "provider", "summary", "suggestedPriority", "requiresHumanValidation"],
    fields: [
      ["id", "Identificador de sugerencia"],
      ["incidentId", "Incidente asociado"],
      ["provider", "simulated-ai-demo u otro proveedor futuro"],
      ["inputText", "Texto original usado"],
      ["summary", "Resumen neutral"],
      ["suggestedType", "Tipo preliminar"],
      ["suggestedPriority", "Rojo, amarillo o verde"],
      ["riskFactors", "Factores de riesgo detectados"],
      ["availableInfo", "Informacion critica disponible"],
      ["missingInfo", "Informacion faltante"],
      ["suggestedQuestions", "Preguntas para completar el caso"],
      ["competentAgencies", "Organismos potencialmente competentes"],
      ["safetyWarnings", "Advertencias de seguridad"],
      ["confidence", "Baja, media o alta"],
      ["explanation", "Fundamento de la sugerencia"],
      ["requiresHumanValidation", "Siempre true en la demo"],
    ],
  },
  {
    key: "humanDecision",
    name: "Decision humana",
    purpose: "Version validada por operador o funcionario.",
    required: ["id", "incidentId", "operator", "finalPriority", "finalRouting", "decisionAt"],
    fields: [
      ["id", "Identificador de decision"],
      ["incidentId", "Incidente asociado"],
      ["operator", "Responsable humano"],
      ["aiSuggestionId", "Sugerencia evaluada"],
      ["accepted", "Sugerencias aceptadas"],
      ["modified", "Sugerencias modificadas"],
      ["rejected", "Sugerencias rechazadas"],
      ["finalPriority", "Prioridad definitiva"],
      ["finalRouting", "Derivacion definitiva"],
      ["reason", "Motivo humano de aceptacion o modificacion"],
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
    name: "Acta Digital de Procedimiento",
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
    incidentId: "PIPO-BW-000001",
    provider: "simulated-ai-demo",
    inputText: "Persona descompensada en parada de colectivo. Esta consciente, pero no puede levantarse.",
    summary: "Se informa una persona consciente con imposibilidad de incorporarse en espacio publico.",
    suggestedType: "Emergencia medica",
    suggestedPriority: "Amarillo",
    riskFactors: ["posible descompensacion", "espacio publico", "movilidad limitada"],
    availableInfo: ["persona consciente", "no puede levantarse", "ubicacion aproximada"],
    missingInfo: ["edad aproximada", "signos vitales", "si respira normalmente", "si hay acompanante"],
    suggestedQuestions: ["Respira con normalidad?", "Tiene dolor en pecho?", "Hay personal sanitario cerca?"],
    competentAgencies: ["107 / Salud", "Centro de Monitoreo", "Transito si afecta circulacion"],
    safetyWarnings: ["No mover a la persona si no es necesario", "Confirmar riesgo vital con operador humano"],
    confidence: "Media",
    explanation: "La descripcion refiere una posible emergencia sanitaria sin datos de riesgo vital inmediato.",
    requiresHumanValidation: true,
  },
  humanDecision: {
    id: "HD-BW-001",
    incidentId: "PIPO-BW-000001",
    operator: "Operador demo Turno A",
    aiSuggestionId: "AI-BW-001",
    accepted: ["tipo de incidente", "organismo sanitario"],
    modified: ["prioridad se mantiene bajo revision"],
    rejected: [],
    finalPriority: "Amarillo",
    finalRouting: "107 / Salud",
    reason: "La informacion disponible no confirma riesgo vital, pero requiere asistencia sanitaria.",
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
    name: "MasterIncidentRecord",
    purpose: "Expediente digital del incidente: integra sin sustituir fuentes originales.",
    required: ["id", "incidentId", "participatingConsoles", "individualActs", "integratedTimeline", "closureStatus"],
    fields: [
      ["id", "Identificador de expediente maestro"],
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
      ["authorizedBy", "Operador autorizante"],
      ["expiresAt", "Vencimiento"],
      ["revokedAt", "Revocacion si corresponde"],
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
      ["preservationActions", "Capturas, hash, acta digital, derivacion"],
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
    forms: ["expediente maestro", "observacion de coordinacion"],
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
    purpose: "preservacion digital",
    fieldsAllowed: ["id", "type", "origin", "createdAt", "integrityRef", "metadataSources"],
    authorizedBy: "OP-CIBER-01",
    expiresAt: "2026-07-18T12:30:00-03:00",
    revokedAt: null,
    accessLog: [],
  },
  {
    id: "GRANT-EXPIRED",
    incidentId: "PIPO-BW-000001",
    evidenceId: "EVI-CIBER-001",
    sourceConsoleId: "CON-CIBER",
    destinationConsoleId: "CON-CVGRT",
    purpose: "orientacion comunitaria",
    fieldsAllowed: ["id", "type"],
    authorizedBy: "OP-MASTER-01",
    expiresAt: "2026-07-18T08:30:00-03:00",
    revokedAt: null,
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
    summary: "Multiples bases participan con actas propias y expediente maestro referenciado.",
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
});

Object.assign(BUILD_WEEK_STATE.digitalAct, {
  classification: "SENSITIVE",
  ownerConsole: "CON-MASTER",
  permittedRoles: ["coordinador", "supervisor"],
  sharingPurpose: "expediente maestro",
  retentionRule: "conservacion documental proporcional",
});

Object.assign(BUILD_WEEK_STATE, {
  informationLevels: INFORMATION_LEVELS,
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
  return new Date(grant.expiresAt).getTime() > new Date(now).getTime();
}

function getActiveSharingGrant(operator, resource, purpose) {
  return evidenceSharingGrants.find((grant) => (
    grant.evidenceId === resource.id
    && grant.destinationConsoleId === operator.consoleId
    && grant.purpose === purpose
    && isGrantActive(grant)
  ));
}

function getActiveJudicialAuthorization(operator, resource, purpose, now = "2026-07-18T10:00:00-03:00") {
  return judicialAuthorizations.find((authorization) => (
    authorization.incidentId === resource.incidentId
    && authorization.status === "Activa"
    && authorization.authorizedOperators.includes(operator.id)
    && authorization.permittedCapabilities.includes(purpose)
    && new Date(authorization.validFrom).getTime() <= new Date(now).getTime()
    && new Date(authorization.expiresAt).getTime() > new Date(now).getTime()
  ));
}

function canAccessResource(operator, resource, purpose) {
  if (!operator) {
    return { allowed: false, reason: "Operador no identificado.", limitations: ["requiere identidad"], expiration: null };
  }

  if (!operator.sessionId || !operator.mfaVerified || !operator.localBiometricVerified) {
    return {
      allowed: false,
      reason: "Sesion, MFA o biometria local simulada no verificada.",
      limitations: ["requiere sesion vigente", "requiere MFA", "requiere biometria local"],
      expiration: null,
    };
  }

  const operatorConsole = getConsoleById(operator.consoleId);
  const resourceLevel = resource.classification || "OPERATIONAL";
  const consoleLevel = operatorConsole?.accessLevel || "PUBLIC";
  const sameOwner = resource.ownerConsole === operator.consoleId;
  const permittedRoles = (resource.permittedRoles || []).map((role) => role.toLowerCase());
  const roleAllowed = !resource.permittedRoles
    || permittedRoles.includes((operator.rankOrRole || "").toLowerCase())
    || permittedRoles.includes((operator.specialty || "").toLowerCase());
  const samePurpose = !resource.sharingPurpose || resource.sharingPurpose === purpose;
  const activeGrant = getActiveSharingGrant(operator, resource, purpose);
  const judicialAuthorization = resourceLevel === "RESTRICTED_JUDICIAL"
    ? getActiveJudicialAuthorization(operator, resource, purpose)
    : null;

  if (sameOwner && roleAllowed && samePurpose && compareInformationLevel(consoleLevel, resourceLevel) >= 0) {
    return {
      allowed: true,
      reason: "Acceso permitido por titularidad documental, rol, finalidad y nivel.",
      limitations: ["uso limitado al incidente", resource.retentionRule || "retencion proporcional"],
      expiration: null,
    };
  }

  if (activeGrant && compareInformationLevel(consoleLevel, resourceLevel) >= 0) {
    return {
      allowed: true,
      reason: "Acceso permitido por grant temporal de evidencia.",
      limitations: [`campos: ${activeGrant.fieldsAllowed.join(", ")}`],
      expiration: activeGrant.expiresAt,
    };
  }

  if (judicialAuthorization) {
    return {
      allowed: true,
      reason: "Acceso permitido por autorizacion judicial simulada vigente.",
      limitations: [judicialAuthorization.scope],
      expiration: judicialAuthorization.expiresAt,
    };
  }

  return {
    allowed: false,
    reason: "Acceso denegado: rol, finalidad, organismo o autorizacion temporal insuficiente.",
    limitations: ["no compartir fuera de finalidad", "solicitar aclaracion o permiso temporal"],
    expiration: null,
  };
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
