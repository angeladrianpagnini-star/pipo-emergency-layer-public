(function () {
  "use strict";

  const root = document.getElementById("pipoUnifiedPresentation");
  const config = window.PIPOAlertRoutingConfig;
  if (!root || !config) return;

  const copy = {
    "es-AR": {
      documentTitle: "PIPO Emergency Layer - Presentación operativa unificada",
      nav: ["Ciudadano", "Coordinación", "Consolas", "Campo", "Documentación", "Cierre"],
      language: "Idioma", spanish: "Español", english: "English", start: "Iniciar demostración", fullFlow: "Ver flujo completo", advanced: "Explorar módulos avanzados", restart: "Reiniciar", filming: "Modo filmación", filmingOn: "Modo filmación activo",
      eyebrow: "Demostración conceptual de coordinación", title: "PIPO Emergency Layer", claim: "Ayuda inmediata. Coordinación simultánea. Procedimientos trazables.",
      lead: "PIPO conecta, solo en esta demostración conceptual, un aviso ciudadano, consolas con acceso por finalidad y equipos de campo en un hilo documental trazable.",
      simulated: "Demostración conceptual: datos, ubicación, audio, video, recursos, comunicaciones y documentos ficticios. Sin conexión oficial, sensores, cargas personales ni actuaciones reales.",
      tourTitle: "Recorrido profesional de presentación", tourLead: "Ocho pasos para explicar el caso completo en menos de tres minutos.", step: "Paso", next: "Siguiente", previous: "Anterior", tourStart: "Iniciar recorrido", tourRestart: "Reiniciar recorrido",
      stepLabels: ["Activación ciudadana", "Validación humana", "Derivación y permisos", "Recurso y servicio activo", "Operador en campo", "Evidencia, consulta y acta", "Control documental e Informe Maestro", "Remisión y cierre ciudadano"],
      citizen: "Dispositivo ciudadano", master: "Consola Maestra", field: "PIPO Field", incident: "Incidente", priority: "Prioridad", critical: "Crítica", pending: "Pendiente", active: "Activo", closed: "Cerrado", received: "Recibido", complete: "Completado", simulatedLabel: "Simulado",
      openPipo: "Abrir punto PIPO", closePipo: "Cerrar punto PIPO", choose: "Seleccione una condición", securityDetail: "Detalle de seguridad", armedInjured: "Persona armada y persona lesionada", danger: "Peligro inmediato o delito en curso", confidential: "Aporte de información sin peligro inmediato", confidentialFields: ["Descripción simulada", "Ubicación aproximada ficticia", "Foto, video o documento ficticio", "Fecha y horario", "Solicitud de reserva", "Canal de contacto seguro", "Consentimiento de entrega"], submitConfidential: "Registrar aporte simulado",
      permissionTitle: "Permisos simulados para este incidente", location: "Ubicación simulada", audio: "Audio simulado", video: "Video simulado", narrative: "Relato estructurado", activateAlert: "Activar alerta simulada", alertPrepared: "Alerta preparada para validación humana", noRealReport: "No es una denuncia real y no reemplaza los canales oficiales de emergencia.",
      scenarioTitle: "Robo con posible persona armada y persona lesionada", validated: "Validada por persona operadora", humanRequired: "Requiere confirmación humana", routeParallel: "Derivar simultáneamente", validateAlert: "Validar alerta", adjustPriority: "Ajustar prioridad", requestInfo: "Solicitar información", viewDocs: "Consultar documentación", routed: "Derivación simultánea preparada", receiving: "Información mínima necesaria compartida según finalidad.",
      consolesTitle: "Consolas especializadas", consolesLead: "Cada base recibe únicamente el contexto habilitado para su finalidad. Ninguna integración es real.", operator: "Operador", session: "Sesión", inbox: "Bandeja", resources: "Recursos", communications: "Comunicaciones", documents: "Documentos", involved: "Organismos participantes", noAccess: "Sin acceso a este incidente", assigned: "Asignado", awaiting: "A la espera", lastUpdate: "Última actualización", permissions: "Permisos vigentes",
      contextTitle: "CONTEXTO HABILITADO PARA ESTA CONSOLA", authorized: "Autorizado", restricted: "Restringido", onRequest: "Disponible bajo solicitud", notEnabled: "No habilitado", accessLabels: { location: "Ubicación simulada", audio: "Audio simulado", video: "Video simulado", narrative: "Relato completo", priority: "Prioridad", agencies: "Organismos", permissions: "Permisos", timeline: "Cronología", securityRisk: "Riesgo de seguridad", operationalNarrative: "Relato operativo", assignedResource: "Recurso asignado", injuryVideo: "Video pertinente por persona lesionada", minimumHealth: "Información sanitaria mínima", safeAccess: "Corredor y acceso seguro", evidenceReferences: "Referencias de evidencia", communications: "Comunicaciones", consultations: "Consultas", documents: "Documentación", evidenceContent: "Contenido de evidencia", restrictedContent: "Contenido restringido", incidentDescription: "Descripción del incidente", documentReference: "Referencia documental", ownAct: "Actuación propia", enabledEvidence: "Evidencia habilitada", prosecutionResponse: "Respuesta fiscal", thirdPartyData: "Datos de terceros" },
      mediaPreview: "Previsualización ficticia", mapPreview: "Ubicación estimada", waveform: "Audio registrado — simulación", videoPreview: "Video habilitado — simulación", confirmResource: "Confirmar recurso", confirmed: "Confirmado por operador", resourceSuggestion: "Recurso sugerido", proximity: "Distancia simulada", eta: "ETA", confirmLead: "La sugerencia no asigna recursos por sí sola.",
      commTitle: "Comunicaciones interinstitucionales", commLead: "Bandeja estructurada; no es un chat informal.", communicationId: "ID de comunicación", sender: "Emisora", recipient: "Receptora", purpose: "Finalidad", status: "Estado", read: "Constancia de lectura", integrity: "Integridad de demostración", supportRequest: "Solicitud de apoyo", operationalMessage: "Mensaje operativo", diligenceRequest: "Solicitud de diligencia", sharedDocument: "Documento compartido", priorityUpdate: "Actualización de prioridad", acceptance: "Aceptación", response: "Respuesta", activeAgencies: "Organismos activos",
      serviceControl: "Control de servicio", takeService: "Tomar servicio", finishService: "Finalizar servicio", serviceTaken: "Servicio disponible", serviceFinished: "Servicio cerrado", serviceNotice: "Ubicación ficticia utilizada únicamente para demostrar disponibilidad, asignación y seguridad operativa.", serviceStatus: { off: "Fuera de servicio", pending: "Servicio pendiente", available: "Disponible", assigned: "Asignado", enRoute: "En desplazamiento", onScene: "En el lugar", intervening: "Interviniendo", drafting: "Confeccionando acta", finishing: "Finalizando servicio", closed: "Servicio cerrado" },
      serviceFields: { function: "Función", agency: "Organismo", unit: "Unidad", shift: "Turno", console: "Consola", start: "Inicio", expectedEnd: "Finalización prevista", pause: "Pausa", device: "Dispositivo autorizado", operationalLocation: "Ubicación operativa", workload: "Carga operativa", incidents: "Incidentes vinculados", procedures: "Procedimientos", pendingDocuments: "Documentación pendiente" }, metadataFields: { evidenceId: "ID de evidencia", incidentId: "ID de incidente", operatorId: "ID de operador", type: "Tipo", description: "Descripción", dateTime: "Fecha y hora", integrity: "Integridad" },
      resourceField: "Recurso en campo", controlledBy: "Controlado por", distance: "Distancia", estimatedTime: "Tiempo estimado", hoursService: "Horas de servicio", linkedProcedures: "Procedimientos vinculados",
      fieldContext: "Contexto recibido", fieldInstruction: "Priorizar vida, seguridad de escena y coordinación interinstitucional.", risks: "Riesgos", agenciesOnWay: "Organismos en camino", accept: "Aceptar", departure: "Informar salida", arrival: "Informar arribo", startIntervention: "Iniciar intervención", updateStatus: "Actualizar estado", finishIntervention: "Finalizar intervención",
      evidenceTitle: "Evidencia ficticia", evidenceLead: "No se utiliza cámara, micrófono, ubicación ni archivos personales reales.", addPhoto: "Incorporar fotografía", addAudio: "Incorporar audio", addVideo: "Incorporar video", addObservation: "Incorporar observación", addLocation: "Registrar ubicación de actuación", addDocument: "Agregar referencia documental", evidenceReference: "Referencia de evidencia", classification: "Clasificación", purposeLabel: "Finalidad", noEvidence: "Sin evidencia ficticia incorporada", evidenceTypes: { photo: "Fotografía", audio: "Audio", video: "Video", observation: "Observación", location: "Ubicación", document: "Referencia documental" }, fieldCommunications: "Acciones de comunicación", sendUpdate: "Enviar novedad", requestSupport: "Solicitar apoyo", requestInformation: "Pedir información", respondRequest: "Responder solicitud", consultProsecution: "Consultar Fiscalía",
      actTitle: "Acta del operador", createAct: "Crear acta", actPreview: "Vista previa conceptual", saveDraft: "Guardar borrador simulado", finalizeAct: "Finalizar acta", addClarification: "Agregar aclaración", actLocked: "Acta finalizada: el original no se elimina ni se reescribe; las correcciones se vinculan mediante adendas.", originalRecord: "Registro original preservado", actSections: ["Identidad funcional", "Asignación", "Salida y arribo", "Intervención", "Acontecimientos", "Evidencia", "Comunicaciones", "Consulta fiscal", "Resultado y seguimiento", "Referencia de integridad"],
      actsTitle: "Actas y control documental", actsLead: "Cada organismo conserva autoría y cronología propias. La Consola Maestra consulta, vincula y solicita aclaraciones sin modificar el original.", actReady: "Acta individual finalizada", draft: "Borrador", finalizeAllActs: "Finalizar actas simuladas", author: "Autoría", chronology: "Cronología", ownFacts: "Hechos propios",
      consistencyTitle: "Control de consistencia documental", consistencyLead: "Comparación simulada antes de preparar el Informe Maestro Interno.", consistencyFields: ["Hora de arribo", "Ubicación", "Personas identificadas", "Riesgos", "Evidencia", "Acciones", "Resultado"], inconsistencyArrival: "Diferencia en la hora de arribo", inconsistencyPeople: "Diferencia en la cantidad de personas presentes", unreviewed: "Sin revisar", needsClarification: "Requiere aclaración", clarificationRequested: "Aclaración solicitada", addendumReceived: "Adenda recibida", resolved: "Resuelta", requestClarification: "Solicitar ampliación", clarificationReceived: "Solicitud de ampliación recibida", respondAddendum: "Responder mediante adenda", addendumTitle: "Adenda vinculada", addendumLead: "Aclara el punto solicitado, conserva el acta original y no sustituye contenido previo.", clarificationFields: ["Operador", "Organismo", "Punto a aclarar", "Motivo", "Plazo", "Prioridad"],
      reportTitle: "INFORME MAESTRO INTERNO DEL INCIDENTE", reportLead: "Documento conceptual interno; no es un documento judicial ni un acta oficial.", reportBlocked: "Bloqueado hasta finalizar el acta del operador, las actuaciones de todos los organismos, resolver inconsistencias, incorporar adendas y disponer de evidencia ficticia.", masterReportDisclaimer: "Documento conceptual interno. No constituye acta oficial, presentación judicial ni actuación institucional real.", masterPreviewTitle: "Vista previa documental", masterPreviewSections: { originalAlert: "Alerta original", permissions: "Permisos autorizados", timeline: "Cronología", agencies: "Organismos participantes", operators: "Operadores", resources: "Recursos", communications: "Comunicaciones", evidence: "Evidencias", acts: "Actas individuales", inconsistencies: "Inconsistencias", clarifications: "Solicitudes de ampliación", addenda: "Adendas", audit: "Auditoría e integridad", destination: "Destino institucional sugerido" }, generateReport: "Generar Informe Maestro Interno", reportStatuses: { draft: "Borrador", review: "En revisión", validated: "Validado internamente", ready: "Preparado para remisión", remitted: "Remitido — simulación" }, destination: "Destino institucional sugerido", remit: "Simular remisión", remittanceNotice: "Remisión conceptual. No constituye presentación judicial ni actuación institucional real.",
      closureTitle: "Resumen de Cierre Ciudadano", closureLead: "Resumen depurado y separado del expediente interno. Excluye datos de terceros, detalles tácticos, recursos, comunicaciones internas y evidencia restringida.", prepareSummary: "Preparar Resumen de Cierre Ciudadano", deliverSummary: "Entregar resumen al ciudadano", summaryPrepared: "Resumen ciudadano preparado", summaryDelivered: "Resumen entregado al teléfono ciudadano", package: "Constancia y próximos pasos", nextSteps: "Próximos pasos", receipt: "Confirmación de recepción", followUp: "Canal de seguimiento", publicFields: ["Número del incidente", "Fecha simulada", "Tipo de alerta", "Estado", "Organismos intervinientes", "Resumen depurado", "Documentos habilitados", "Próximos pasos"],
      institutionalNotice: "Demostración conceptual sin conexión institucional real.", justiceNotice: "No constituye actuación fiscal real ni orden judicial.", stationNotice: "No constituye denuncia policial real.", municipalNotice: "No crea un reclamo municipal oficial.", limitsTitle: "Alcance y límites", limits: ["Datos, permisos, geolocalización, evidencia y documentos ficticios.", "Sin sensores, vigilancia fuera de servicio, cargas personales ni conexiones oficiales.", "Control humano obligatorio y acceso por finalidad.", "Sin anonimato absoluto ni validez jurídica automática.", "Registros simulados no eliminables; correcciones mediante adendas."],
    },
    "en-US": {
      documentTitle: "PIPO Emergency Layer - Unified operational presentation",
      nav: ["Citizen", "Coordination", "Consoles", "Field", "Documentation", "Closure"],
      language: "Language", spanish: "Spanish", english: "English", start: "Start demonstration", fullFlow: "View full flow", advanced: "Explore advanced modules", restart: "Restart", filming: "Recording mode", filmingOn: "Recording mode enabled",
      eyebrow: "Conceptual coordination demonstration", title: "PIPO Emergency Layer", claim: "Immediate help. Parallel coordination. Traceable procedures.",
      lead: "PIPO connects, only in this conceptual demonstration, a citizen alert, purpose-limited consoles, and field teams in a traceable documentary thread.",
      simulated: "Concept demonstration: fictional data, location, audio, video, resources, communications, and documents. No official connection, sensors, personal uploads, or real actions.",
      tourTitle: "Professional presentation walkthrough", tourLead: "Eight steps to explain the complete case in under three minutes.", step: "Step", next: "Next", previous: "Previous", tourStart: "Start walkthrough", tourRestart: "Restart walkthrough",
      stepLabels: ["Citizen activation", "Human validation", "Routing and permissions", "Resource and active service", "Field operator", "Evidence, consultation, and act", "Documentary control and master report", "Simulated remittance and citizen closure"],
      citizen: "Citizen device", master: "Master Console", field: "PIPO Field", incident: "Incident", priority: "Priority", critical: "Critical", pending: "Pending", active: "Active", closed: "Closed", received: "Received", complete: "Completed", simulatedLabel: "Simulated",
      openPipo: "Open PIPO point", closePipo: "Close PIPO point", choose: "Select a condition", securityDetail: "Security detail", armedInjured: "Armed person and injured person", danger: "Immediate danger or crime in progress", confidential: "Information without immediate danger", confidentialFields: ["Simulated description", "Fictional approximate location", "Fictional photo, video, or document", "Date and time", "Reservation request", "Secure contact channel", "Delivery consent"], submitConfidential: "Register simulated submission",
      permissionTitle: "Simulated permissions for this incident", location: "Simulated location", audio: "Simulated audio", video: "Simulated video", narrative: "Structured account", activateAlert: "Activate simulated alert", alertPrepared: "Alert ready for human validation", noRealReport: "This is not a real report and does not replace official emergency channels.",
      scenarioTitle: "Robbery with a possibly armed person and an injured person", validated: "Validated by a human operator", humanRequired: "Human confirmation required", routeParallel: "Route in parallel", validateAlert: "Validate alert", adjustPriority: "Adjust priority", requestInfo: "Request information", viewDocs: "View documentation", routed: "Parallel routing prepared", receiving: "Minimum information necessary was shared according to purpose.",
      consolesTitle: "Specialized consoles", consolesLead: "Each base receives only context authorized for its purpose. No integration is real.", operator: "Operator", session: "Session", inbox: "Inbox", resources: "Resources", communications: "Communications", documents: "Documents", involved: "Participating agencies", noAccess: "No access to this incident", assigned: "Assigned", awaiting: "Waiting", lastUpdate: "Last update", permissions: "Current permissions",
      contextTitle: "CONTEXT ENABLED FOR THIS CONSOLE", authorized: "Authorized", restricted: "Restricted", onRequest: "Available on request", notEnabled: "Not enabled", accessLabels: { location: "Simulated location", audio: "Simulated audio", video: "Simulated video", narrative: "Full account", priority: "Priority", agencies: "Agencies", permissions: "Permissions", timeline: "Timeline", securityRisk: "Security risk", operationalNarrative: "Operational account", assignedResource: "Assigned resource", injuryVideo: "Video relevant to the injured person", minimumHealth: "Minimum health information", safeAccess: "Safe corridor and access", evidenceReferences: "Evidence references", communications: "Communications", consultations: "Consultations", documents: "Documentation", evidenceContent: "Evidence content", restrictedContent: "Restricted content", incidentDescription: "Incident description", documentReference: "Document reference", ownAct: "Own action", enabledEvidence: "Enabled evidence", prosecutionResponse: "Prosecution response", thirdPartyData: "Third-party data" },
      mediaPreview: "Fictional preview", mapPreview: "Estimated location", waveform: "Recorded audio — simulation", videoPreview: "Video enabled — simulation", confirmResource: "Confirm resource", confirmed: "Confirmed by operator", resourceSuggestion: "Suggested resource", proximity: "Simulated distance", eta: "ETA", confirmLead: "A suggestion does not assign a resource on its own.",
      commTitle: "Inter-agency communications", commLead: "Structured inbox; it is not an informal chat.", communicationId: "Communication ID", sender: "Sender", recipient: "Recipient", purpose: "Purpose", status: "Status", read: "Read receipt", integrity: "Demonstration integrity", supportRequest: "Support request", operationalMessage: "Operational message", diligenceRequest: "Diligence request", sharedDocument: "Shared document", priorityUpdate: "Priority update", acceptance: "Acceptance", response: "Response", activeAgencies: "Active agencies",
      serviceControl: "Service control", takeService: "Take service", finishService: "Finish service", serviceTaken: "Service available", serviceFinished: "Service closed", serviceNotice: "Fictional location is used only to demonstrate availability, assignment, and operational safety.", serviceStatus: { off: "Off duty", pending: "Service pending", available: "Available", assigned: "Assigned", enRoute: "En route", onScene: "On scene", intervening: "Intervening", drafting: "Drafting an act", finishing: "Finishing service", closed: "Service closed" },
      serviceFields: { function: "Function", agency: "Agency", unit: "Unit", shift: "Shift", console: "Console", start: "Start", expectedEnd: "Expected end", pause: "Pause", device: "Authorized device", operationalLocation: "Operational location", workload: "Operational load", incidents: "Linked incidents", procedures: "Procedures", pendingDocuments: "Pending documentation" }, metadataFields: { evidenceId: "Evidence ID", incidentId: "Incident ID", operatorId: "Operator ID", type: "Type", description: "Description", dateTime: "Date and time", integrity: "Integrity" },
      resourceField: "Field resource", controlledBy: "Controlled by", distance: "Distance", estimatedTime: "Estimated time", hoursService: "Service hours", linkedProcedures: "Linked procedures",
      fieldContext: "Received context", fieldInstruction: "Prioritize life, scene safety, and inter-agency coordination.", risks: "Risks", agenciesOnWay: "Agencies en route", accept: "Accept", departure: "Report departure", arrival: "Report arrival", startIntervention: "Start intervention", updateStatus: "Update status", finishIntervention: "Finish intervention",
      evidenceTitle: "Fictional evidence", evidenceLead: "No real camera, microphone, location, or personal file is used.", addPhoto: "Add photograph", addAudio: "Add audio", addVideo: "Add video", addObservation: "Add observation", addLocation: "Record action location", addDocument: "Add document reference", evidenceReference: "Evidence reference", classification: "Classification", purposeLabel: "Purpose", noEvidence: "No fictional evidence added", evidenceTypes: { photo: "Photograph", audio: "Audio", video: "Video", observation: "Observation", location: "Location", document: "Document reference" }, fieldCommunications: "Communication actions", sendUpdate: "Send update", requestSupport: "Request support", requestInformation: "Request information", respondRequest: "Respond to request", consultProsecution: "Consult prosecution",
      actTitle: "Operator act", createAct: "Create act", actPreview: "Conceptual preview", saveDraft: "Save simulated draft", finalizeAct: "Finalize act", addClarification: "Add clarification", actLocked: "Finalized act: the original cannot be deleted or rewritten; corrections are linked through addenda.", originalRecord: "Original record preserved", actSections: ["Functional identity", "Assignment", "Departure and arrival", "Intervention", "Events", "Evidence", "Communications", "Prosecution consultation", "Outcome and follow-up", "Integrity reference"],
      actsTitle: "Acts and documentary control", actsLead: "Each agency keeps its own authorship and chronology. The Master Console consults, links, and requests clarification without changing the original.", actReady: "Individual act finalized", draft: "Draft", finalizeAllActs: "Finalize simulated acts", author: "Authorship", chronology: "Chronology", ownFacts: "Own facts",
      consistencyTitle: "Documentary consistency control", consistencyLead: "Simulated comparison before preparing the Internal Master Report.", consistencyFields: ["Arrival time", "Location", "Identified people", "Risks", "Evidence", "Actions", "Outcome"], inconsistencyArrival: "Difference in arrival time", inconsistencyPeople: "Difference in number of people present", unreviewed: "Not reviewed", needsClarification: "Clarification required", clarificationRequested: "Clarification requested", addendumReceived: "Addendum received", resolved: "Resolved", requestClarification: "Request expansion", clarificationReceived: "Clarification request received", respondAddendum: "Respond with addendum", addendumTitle: "Linked addendum", addendumLead: "Clarifies the requested point, preserves the original act, and does not replace prior content.", clarificationFields: ["Operator", "Agency", "Point to clarify", "Reason", "Deadline", "Priority"],
      reportTitle: "INTERNAL MASTER INCIDENT REPORT", reportLead: "Conceptual internal document; it is not a judicial document or official act.", reportBlocked: "Blocked until the operator act and all agency acts are finalized, inconsistencies are resolved, addenda are incorporated, and fictional evidence is available.", masterReportDisclaimer: "Conceptual internal document. It is not an official act, judicial filing, or real institutional action.", masterPreviewTitle: "Documentary preview", masterPreviewSections: { originalAlert: "Original alert", permissions: "Authorized permissions", timeline: "Timeline", agencies: "Participating agencies", operators: "Operators", resources: "Resources", communications: "Communications", evidence: "Evidence", acts: "Individual acts", inconsistencies: "Inconsistencies", clarifications: "Clarification requests", addenda: "Addenda", audit: "Audit and integrity", destination: "Suggested institutional destination" }, generateReport: "Generate Internal Master Report", reportStatuses: { draft: "Draft", review: "In review", validated: "Internally validated", ready: "Prepared for remittance", remitted: "Remitted — simulation" }, destination: "Suggested institutional destination", remit: "Simulate remittance", remittanceNotice: "Conceptual remittance. It is not a judicial filing or real institutional action.",
      closureTitle: "Citizen Closure Summary", closureLead: "A cleansed summary separated from the internal record. It excludes third-party data, tactical details, resources, internal communications, and restricted evidence.", prepareSummary: "Prepare Citizen Closure Summary", deliverSummary: "Deliver summary to citizen", summaryPrepared: "Citizen summary prepared", summaryDelivered: "Summary delivered to the citizen phone", package: "Receipt and next steps", nextSteps: "Next steps", receipt: "Receipt confirmation", followUp: "Follow-up channel", publicFields: ["Incident number", "Simulated date", "Alert type", "Status", "Participating agencies", "Cleansed summary", "Enabled documents", "Next steps"],
      institutionalNotice: "Conceptual demonstration with no real institutional connection.", justiceNotice: "It is not a real prosecution action or judicial order.", stationNotice: "It is not a real police report.", municipalNotice: "It does not create an official municipal request.", limitsTitle: "Scope and limits", limits: ["Fictional data, permissions, location, evidence, and documents.", "No sensors, off-duty surveillance, personal uploads, or official connections.", "Human control is mandatory and access is purpose-based.", "No absolute anonymity or automatic legal value.", "Simulated records are not deletable; corrections use addenda."],
    },
  };

  const supplementalCopy = {
    "es-AR": {
      otherAgencies: "Otros organismos disponibles",
      dispatch: "Despacho",
      fieldResource: "Recurso de campo",
      supportResource: "Recurso de apoyo",
      coordinationOnly: "Coordinaci\u00f3n institucional",
      masterCoordination: "Coordinaci\u00f3n y supervisi\u00f3n",
      noFieldDispatch: "Sin despacho de recurso",
      noConfiguredResource: "Sin recurso configurado en esta demostraci\u00f3n",
      documentaryIntervention: "Intervenci\u00f3n documental",
      ownInstitutionalAction: "Actuaci\u00f3n propia",
      awaitingConfirmation: "A la espera de confirmaci\u00f3n humana",
      confirmedFieldResource: "Recurso de campo confirmado",
      confirmedSupportResource: "Recurso de apoyo confirmado",
      fieldPhoneContext: "Contexto operativo compacto",
      actingUnit: "UNIDAD ACTUANTE",
      supportEnRoute: "APOYO EN DESPLAZAMIENTO",
      institutionalCoordination: "COORDINACI\u00d3N INSTITUCIONAL",
      noSupportConfirmed: "Sin recurso de apoyo confirmado todav\u00eda",
      operationalInstruction: "INSTRUCCI\u00d3N OPERATIVA",
      procedureTitle: "ESTADO DEL PROCEDIMIENTO DOCUMENTAL",
      procedureLead: "El recorrido manual indica el requisito pendiente y mantiene disponible la siguiente acci\u00f3n.",
      nextProcedureAction: "PR\u00d3XIMA ACCI\u00d3N RECOMENDADA",
      goToRequirement: "Ir al requisito pendiente",
      pendingStatus: "Pendiente",
      inProgressStatus: "En curso",
      completedStatus: "Completado",
      evidenceIncorporated: "Evidencia ficticia incorporada",
      operatorActCreated: "Acta del operador creada",
      operatorActFinalizedLabel: "Acta del operador finalizada",
      agencyActsFinalizedLabel: "Actuaciones de organismos finalizadas",
      inconsistenciesReviewed: "Inconsistencias revisadas",
      expansionRequested: "Ampliaci\u00f3n solicitada",
      addendumLinked: "Adenda recibida y vinculada",
      inconsistenciesResolved: "Inconsistencias resueltas",
      masterPrepared: "Informe Maestro preparado",
      remittanceCompleted: "Remisi\u00f3n simulada completada",
      citizenPrepared: "Resumen ciudadano preparado",
      citizenDelivered: "Resumen ciudadano entregado",
      nextEvidence: "Incorporar evidencia ficticia",
      nextCreateAct: "Crear acta del operador",
      nextFinalizeAct: "Finalizar acta del operador",
      nextFinalizeAgencies: "Finalizar actuaciones institucionales",
      nextClarification: "Solicitar ampliaci\u00f3n",
      nextAddendum: "Responder mediante adenda",
      nextReport: "Generar Informe Maestro Interno",
      nextRemittance: "Simular remisi\u00f3n",
      nextPrepareSummary: "Preparar Resumen Ciudadano",
      nextDeliverSummary: "Entregar al ciudadano",
      missingEvidence: "Falta incorporar al menos una evidencia ficticia.",
      missingOperatorAct: "Falta finalizar el acta del operador.",
      missingAgencyActs: "Falta finalizar las actuaciones de los organismos activos.",
      missingConsistency: "Falta resolver la inconsistencia y vincular una adenda.",
      actionCompleted: "Acci\u00f3n simulada registrada. Se destaca el siguiente requisito.",
      procedureBlocked: "La acci\u00f3n no se aplic\u00f3: {requirements}",
      individualActs: "ACTAS INDIVIDUALES",
      documentFlow: ["911 + 107 + Fiscal\u00eda + Comisar\u00eda", "CONTROL DE CONSISTENCIA", "SOLICITUD DE AMPLIACI\u00d3N", "ADENDA NO DESTRUCTIVA", "INFORME MAESTRO INTERNO", "REMISI\u00d3N INSTITUCIONAL SIMULADA", "RESUMEN DE CIERRE CIUDADANO", "ENTREGA AL TEL\u00c9FONO"],
      masterRole: "La Consola Maestra vincula documentos, detecta diferencias, solicita ampliaciones e incorpora adendas. No modifica actas originales, no elimina registros ni reescribe evidencia.",
      actions: "Acciones",
      outcome: "Resultado",
      documentReference: "Referencia documental",
      agency: "Organismo",
      evidence: "Evidencia",
      reportStates: { blocked: "Bloqueado", readyToGenerate: "Listo para generar", ready: "Preparado para remisi\u00f3n", remitted: "Remitido \u2014 simulaci\u00f3n" },
      actTemplates: {
        security: { author: "911 Seguridad", operator: "Oficial M\u00f3vil Demo 911-04", chronology: "10:12 salida \u00b7 10:18 arribo", facts: "Escena de seguridad y persona lesionada informadas.", actions: "Arribo, aseguramiento de escena y control del riesgo identificado.", evidence: "EVD-DEMO-001", outcome: "Escena preservada y acceso seguro comunicado.", reference: "ACT-DEMO-911-001" },
        health: { author: "107 Salud", operator: "Equipo sanitario Demo 107-04", chronology: "10:14 asignaci\u00f3n \u00b7 10:19 arribo", facts: "Persona lesionada reportada con prioridad sanitaria.", actions: "Evaluaci\u00f3n inicial y atenci\u00f3n prehospitalaria simulada.", evidence: "EVD-DEMO-002", outcome: "Asistencia sanitaria m\u00ednima registrada; traslado simulado disponible.", reference: "ACT-DEMO-107-001" },
        prosecution: { author: "Fiscal\u00eda / Acceso a Justicia", operator: "Operador documental Demo FIS-01", chronology: "10:20 consulta \u00b7 10:28 respuesta", facts: "Consulta conceptual recibida con referencias de evidencia.", actions: "Instrucciones simuladas y solicitud de ampliaci\u00f3n vinculada.", evidence: "EVD-DEMO-003", outcome: "Estado documental actualizado sin actuaci\u00f3n institucional real.", reference: "ACT-DEMO-FIS-001" },
        station: { author: "Comisar\u00eda", operator: "Oficial de guardia Demo COM-01", chronology: "10:21 recepci\u00f3n \u00b7 10:30 constancia", facts: "Identificaci\u00f3n conceptual del incidente y de la evidencia habilitada.", actions: "Constancia propia y respuesta fiscal vinculada.", evidence: "EVD-DEMO-004", outcome: "Actuaci\u00f3n documental simulada recibida.", reference: "ACT-DEMO-COM-001" },
      },
    },
    "en-US": {
      otherAgencies: "Other available agencies",
      dispatch: "Dispatch",
      fieldResource: "Field resource",
      supportResource: "Support resource",
      coordinationOnly: "Institutional coordination",
      masterCoordination: "Coordination and supervision",
      noFieldDispatch: "No resource dispatch",
      noConfiguredResource: "No resource configured in this demonstration",
      documentaryIntervention: "Documentary intervention",
      ownInstitutionalAction: "Own action",
      awaitingConfirmation: "Awaiting human confirmation",
      confirmedFieldResource: "Confirmed field resource",
      confirmedSupportResource: "Confirmed support resource",
      fieldPhoneContext: "Compact operational context",
      actingUnit: "ACTING UNIT",
      supportEnRoute: "SUPPORT EN ROUTE",
      institutionalCoordination: "INSTITUTIONAL COORDINATION",
      noSupportConfirmed: "No support resource confirmed yet",
      operationalInstruction: "OPERATIONAL INSTRUCTION",
      procedureTitle: "DOCUMENTARY PROCEDURE STATUS",
      procedureLead: "The manual walkthrough identifies the pending requirement and keeps the next action available.",
      nextProcedureAction: "NEXT RECOMMENDED ACTION",
      goToRequirement: "Go to pending requirement",
      pendingStatus: "Pending",
      inProgressStatus: "In progress",
      completedStatus: "Completed",
      evidenceIncorporated: "Fictional evidence added",
      operatorActCreated: "Operator act created",
      operatorActFinalizedLabel: "Operator act finalized",
      agencyActsFinalizedLabel: "Agency acts finalized",
      inconsistenciesReviewed: "Inconsistencies reviewed",
      expansionRequested: "Expansion requested",
      addendumLinked: "Addendum received and linked",
      inconsistenciesResolved: "Inconsistencies resolved",
      masterPrepared: "Master Report prepared",
      remittanceCompleted: "Simulated remittance completed",
      citizenPrepared: "Citizen summary prepared",
      citizenDelivered: "Citizen summary delivered",
      nextEvidence: "Add fictional evidence",
      nextCreateAct: "Create the operator act",
      nextFinalizeAct: "Finalize the operator act",
      nextFinalizeAgencies: "Finalize institutional acts",
      nextClarification: "Request expansion",
      nextAddendum: "Respond with addendum",
      nextReport: "Generate Internal Master Report",
      nextRemittance: "Simulate remittance",
      nextPrepareSummary: "Prepare Citizen Summary",
      nextDeliverSummary: "Deliver to citizen",
      missingEvidence: "At least one fictional evidence record is required.",
      missingOperatorAct: "The operator act must be finalized.",
      missingAgencyActs: "The active agency acts must be finalized.",
      missingConsistency: "The inconsistency must be resolved and an addendum linked.",
      actionCompleted: "Simulated action recorded. The next requirement is highlighted.",
      procedureBlocked: "The action was not applied: {requirements}",
      individualActs: "INDIVIDUAL ACTS",
      documentFlow: ["911 + 107 + Prosecution + Police Station", "CONSISTENCY CONTROL", "EXPANSION REQUEST", "NON-DESTRUCTIVE ADDENDUM", "INTERNAL MASTER REPORT", "SIMULATED INSTITUTIONAL REMITTANCE", "CITIZEN CLOSURE SUMMARY", "DELIVERY TO THE PHONE"],
      masterRole: "The Master Console links documents, detects differences, requests clarifications, and incorporates addenda. It does not modify original acts, delete records, or rewrite evidence.",
      actions: "Actions",
      outcome: "Outcome",
      documentReference: "Document reference",
      agency: "Agency",
      evidence: "Evidence",
      reportStates: { blocked: "Blocked", readyToGenerate: "Ready to generate", ready: "Prepared for remittance", remitted: "Remitted \u2014 simulation" },
      actTemplates: {
        security: { author: "911 Security", operator: "Demo Mobile Officer 911-04", chronology: "10:12 departure \u00b7 10:18 arrival", facts: "Scene safety and an injured person were reported.", actions: "Arrival, scene safety, and identified-risk control.", evidence: "EVD-DEMO-001", outcome: "Scene preserved and safe access communicated.", reference: "ACT-DEMO-911-001" },
        health: { author: "107 Health", operator: "Demo medical team 107-04", chronology: "10:14 assigned \u00b7 10:19 arrival", facts: "An injured person was reported with health priority.", actions: "Initial assessment and simulated pre-hospital care.", evidence: "EVD-DEMO-002", outcome: "Minimum health assistance recorded; simulated transport available.", reference: "ACT-DEMO-107-001" },
        prosecution: { author: "Prosecution / Justice Access", operator: "Demo documentary operator PRO-01", chronology: "10:20 consultation \u00b7 10:28 response", facts: "Conceptual consultation received with evidence references.", actions: "Simulated instructions and linked expansion request.", evidence: "EVD-DEMO-003", outcome: "Documentary status updated with no real institutional action.", reference: "ACT-DEMO-FIS-001" },
        station: { author: "Police Station", operator: "Demo desk officer STA-01", chronology: "10:21 received \u00b7 10:30 record", facts: "Conceptual incident identification and enabled evidence reference.", actions: "Own record and linked prosecution response.", evidence: "EVD-DEMO-004", outcome: "Simulated documentary action received.", reference: "ACT-DEMO-COM-001" },
      },
    },
  };

  const state = { locale: "es-AR", menuOpen: false, selectedAlert: "security", armedInjured: true, permissions: { location: true, audio: true, video: true }, alertSent: false, validated: false, routed: false, resourcesConfirmed: {}, service: { active: false, status: "off", started: false, finished: false }, fieldStage: "pending", evidence: [], operatorAct: "none", operatorActFinalized: false, allAgencyActsFinalized: false, consistency: { requested: false, addendum: false, resolved: false }, masterReport: "draft", citizenSummary: "none", tourStep: 0, filming: false, message: "", procedureNotice: "", ledger: [] };
  const allContextFields = ["location", "audio", "video", "narrative", "priority", "agencies", "permissions", "timeline", "securityRisk", "operationalNarrative", "assignedResource", "injuryVideo", "minimumHealth", "safeAccess", "evidenceReferences", "communications", "consultations", "documents", "evidenceContent", "restrictedContent", "incidentDescription", "documentReference", "ownAct", "enabledEvidence", "prosecutionResponse", "thirdPartyData"];

  function t(key) { return copy[state.locale][key] ?? supplementalCopy[state.locale][key]; }
  function alert() { return config.getAlert(state.selectedAlert); }
  function label(item) { return config.label(item, state.locale); }
  function consoleName(id) { return label(config.getConsole(id)); }
  function incidentId() { return "PIPO-DEMO-4821"; }
  function addEvent(code, detail) { state.ledger.push({ code, detail, time: `10:${String(12 + state.ledger.length).padStart(2, "0")}` }); }
  function activeRoute() { const route = [...alert().route]; if (state.armedInjured && alert().routeWhen?.injured) alert().routeWhen.injured.forEach((id) => { if (!route.includes(id)) route.push(id); }); return route; }
  const primaryPresentationOrder = ["security", "health", "prosecution", "station"];
  function orderPresentationAgencies(ids) {
    return [...ids].sort((left, right) => {
      const leftRank = primaryPresentationOrder.indexOf(left);
      const rightRank = primaryPresentationOrder.indexOf(right);
      const normalizedLeft = leftRank === -1 ? primaryPresentationOrder.length : leftRank;
      const normalizedRight = rightRank === -1 ? primaryPresentationOrder.length : rightRank;
      return normalizedLeft - normalizedRight || left.localeCompare(right);
    });
  }
  function displayRoute() { return ["master", ...activeInstitutionalAgencies()]; }
  function isActiveAgency(consoleId) { return consoleId !== "master" && activeRoute().includes(consoleId); }
  function activeInstitutionalAgencies() { return orderPresentationAgencies(activeRoute().filter((id) => id !== "master")); }
  function activeAgencies() { return activeInstitutionalAgencies(); }
  function activeDispatchResources() { return activeRoute().filter((id) => isActiveAgency(id) && Boolean(config.resources[id])); }
  function confirmedDispatchResources() { return activeDispatchResources().filter((id) => state.resourcesConfirmed[id]); }
  function fieldSupportResources() { return confirmedDispatchResources().filter((id) => id !== resourceData().agency && !["master", "prosecution", "station"].includes(id)); }
  function coordinationOnlyAgencies() { return activeInstitutionalAgencies().filter((id) => !config.resources[id]); }
  function activeResources() { return activeDispatchResources(); }
  function allResourcesConfirmed() { return activeDispatchResources().every((id) => state.resourcesConfirmed[id]); }
  function serviceStatus() { return t("serviceStatus")[state.service.status]; }
  function sectionClass(step) { return state.tourStep === step ? "is-tour-active" : ""; }
  function reportReady() { return state.operatorActFinalized && state.allAgencyActsFinalized && state.consistency.resolved && state.consistency.addendum && state.evidence.length > 0; }
  function masterReportState() {
    if (state.masterReport === "remitted") return "remitted";
    if (state.masterReport === "ready") return "ready";
    return reportReady() ? "readyToGenerate" : "blocked";
  }
  function masterReportPanelStatus() {
    const reportState = masterReportState();
    return reportState === "blocked" ? t("reportStatuses").draft : t("reportStates")[reportState];
  }
  function masterReportPreviewStatus() { return t("reportStates")[masterReportState()]; }
  function formatStatus(status) { return ({ accepted: t("assigned"), departed: t("serviceStatus").enRoute, arrived: t("serviceStatus").onScene, intervening: t("serviceStatus").intervening, completed: t("complete") })[status] || t("pending"); }
  function resourceData() { return config.fieldService; }
  function resourceLabel(id) { return config.resources[id].unit[state.locale]; }
  function dispatchResourceLines() { return confirmedDispatchResources().map((id) => `${resourceLabel(id)} \u2014 ${consoleName(id)}`); }
  function fieldSupportLine() { const resources = fieldSupportResources(); return resources.length ? resources.map((id) => `${resourceLabel(id)} \u2014 ${consoleName(id)}`).join(" \u00b7 ") : t("noSupportConfirmed"); }
  function coordinationLine() { const agencies = coordinationOnlyAgencies(); return agencies.length ? agencies.map(consoleName).join(" \u2014 ") : "\u2014"; }
  function procedureRequirements() {
    return [
      { id: "evidence", label: t("evidenceIncorporated"), complete: state.evidence.length > 0, action: "nextEvidence", target: "presentationField" },
      { id: "operator-created", label: t("operatorActCreated"), complete: state.operatorAct !== "none", action: "nextCreateAct", target: "presentationField" },
      { id: "operator-final", label: t("operatorActFinalizedLabel"), complete: state.operatorActFinalized, action: "nextFinalizeAct", target: "presentationField" },
      { id: "agency-acts", label: t("agencyActsFinalizedLabel"), complete: state.allAgencyActsFinalized, action: "nextFinalizeAgencies", target: "presentationDocumentation" },
      { id: "review", label: t("inconsistenciesReviewed"), complete: state.consistency.requested, action: "nextClarification", target: "presentationDocumentation" },
      { id: "clarification", label: t("expansionRequested"), complete: state.consistency.requested, action: "nextClarification", target: "presentationDocumentation" },
      { id: "addendum", label: t("addendumLinked"), complete: state.consistency.addendum, action: "nextAddendum", target: "presentationField" },
      { id: "resolved", label: t("inconsistenciesResolved"), complete: state.consistency.resolved, action: "nextAddendum", target: "presentationField" },
      { id: "report", label: t("masterPrepared"), complete: ["ready", "remitted"].includes(state.masterReport), action: "nextReport", target: "presentationDocumentation" },
      { id: "remittance", label: t("remittanceCompleted"), complete: state.masterReport === "remitted", action: "nextRemittance", target: "presentationDocumentation" },
      { id: "summary", label: t("citizenPrepared"), complete: ["prepared", "delivered"].includes(state.citizenSummary), action: "nextPrepareSummary", target: "presentationClosure" },
      { id: "delivery", label: t("citizenDelivered"), complete: state.citizenSummary === "delivered", action: "nextDeliverSummary", target: "presentationClosure" },
    ];
  }
  function nextProcedureRequirement() { return procedureRequirements().find((item) => !item.complete) || null; }
  function procedureStatus(requirement) { if (requirement.complete) return "completed"; const next = nextProcedureRequirement(); return next && next.id === requirement.id ? "in-progress" : "pending"; }
  function procedureStatusLabel(status) { return status === "completed" ? t("completedStatus") : status === "in-progress" ? t("inProgressStatus") : t("pendingStatus"); }
  function accessLabel(key) { return t("accessLabels")[key] || (key === "evidence" ? t("evidence") : key); }
  function mediaPreview(type, status) { const labelText = type === "location" ? t("mapPreview") : type === "audio" ? t("waveform") : t("videoPreview"); return `<span class="presentation-media-preview ${status}"><b>${type === "location" ? "⌖" : type === "audio" ? "▥" : "▣"}</b>${labelText}</span>`; }
  function fieldList(items) { return `<dl class="presentation-data-list">${items.map(([term, value]) => `<div><dt>${term}</dt><dd>${value}</dd></div>`).join("")}</dl>`; }

  function renderHeader() {
    return `<header class="presentation-header"><a class="presentation-brand" href="#presentationCitizen" aria-label="PIPO Emergency Layer">PIPO<span>+</span></a><nav class="presentation-nav" aria-label="PIPO"><a href="#presentationCitizen">${t("nav")[0]}</a><a href="#presentationMaster">${t("nav")[1]}</a><a href="#presentationConsoles">${t("nav")[2]}</a><a href="#presentationField">${t("nav")[3]}</a><a href="#presentationDocumentation">${t("nav")[4]}</a><a href="#presentationClosure">${t("nav")[5]}</a></nav><label class="presentation-locale"><span>${t("language")}</span><select data-unified-action="locale"><option value="es-AR" ${state.locale === "es-AR" ? "selected" : ""}>${t("spanish")}</option><option value="en-US" ${state.locale === "en-US" ? "selected" : ""}>${t("english")}</option></select></label></header>`;
  }

  function renderHero() {
    return `<section class="presentation-hero" aria-labelledby="presentationTitle"><div class="presentation-hero-copy"><p class="presentation-kicker">${t("eyebrow")}</p><h1 id="presentationTitle">${t("title")}</h1><h2>${t("claim")}</h2><p>${t("lead")}</p><div class="presentation-actions"><button type="button" class="presentation-primary" data-unified-action="start-tour">${t("start")}</button><a class="presentation-secondary" href="#presentationCitizen">${t("fullFlow")}</a><a class="presentation-secondary" href="advanced.html">${t("advanced")}</a><button type="button" class="presentation-icon-action" data-unified-action="restart" title="${t("restart")}" aria-label="${t("restart")}">↺</button></div></div><div class="presentation-hero-map"><div class="hero-grid-line line-one"></div><div class="hero-grid-line line-two"></div><div class="hero-node hero-citizen">${t("citizen")}</div><div class="hero-node hero-master">${t("master")}</div><div class="hero-node hero-field">${t("field")}</div><div class="hero-flow">${t("citizen")} <b>→</b> ${t("master")} <b>→</b> ${t("field")}</div></div><p class="presentation-simulation-notice">${t("simulated")}</p></section>`;
  }

  function renderTour() { return `<section class="presentation-tour"><div><p class="presentation-kicker">${t("tourTitle")}</p><h2>${t("tourLead")}</h2></div><div class="presentation-tour-controls"><button type="button" data-unified-action="tour-previous" ${state.tourStep <= 1 ? "disabled" : ""}>${t("previous")}</button><button type="button" class="presentation-primary" data-unified-action="tour-next">${state.tourStep ? t("next") : t("tourStart")}</button><button type="button" data-unified-action="film">${state.filming ? t("filmingOn") : t("filming")}</button><button type="button" data-unified-action="restart">${t("tourRestart")}</button></div><ol class="presentation-tour-steps">${t("stepLabels").map((name, index) => `<li class="${state.tourStep === index + 1 ? "is-active" : ""} ${state.tourStep > index + 1 ? "is-complete" : ""}"><span>${index + 1}</span>${name}</li>`).join("")}</ol><p class="presentation-live" role="status" aria-live="polite">${state.message || t("simulated")}</p></section>`; }

  function renderCitizen() {
    const selected = alert();
    return `<section id="presentationCitizen" class="presentation-section presentation-citizen ${sectionClass(1)}"><div class="presentation-section-heading"><div><p class="presentation-kicker">A</p><h2>${t("citizen")}</h2><p>${t("noRealReport")}</p></div><span class="presentation-step-tag">${t("step")} 1</span></div><div class="presentation-device-layout"><article class="presentation-phone citizen-phone"><div class="phone-status"><span>9:41</span><span>● ● ●</span></div><div class="phone-appbar"><b>PIPO</b><span>${t("simulatedLabel")}</span></div><div class="phone-message-card"><span class="phone-contact-dot"></span><div><strong>${t("scenarioTitle")}</strong><small>${state.alertSent ? t("alertPrepared") : t("openPipo")}</small></div></div><button type="button" class="pipo-floating-point" data-unified-action="toggle-menu" aria-expanded="${state.menuOpen}">+</button><div class="phone-screen-lines"><span></span><span></span><span></span><span></span></div></article><div class="presentation-alert-workbench ${state.menuOpen ? "is-open" : ""}"><div class="presentation-workbench-head"><div><p>${t("choose")}</p><h3>${label(selected)}</h3></div><button type="button" data-unified-action="toggle-menu">${t("closePipo")}</button></div><div class="presentation-alert-grid">${config.alerts.map((item) => `<button type="button" class="presentation-alert-option ${item.id === selected.id ? "is-selected" : ""}" data-unified-action="select-alert" data-alert-id="${item.id}"><span>${item.icon}</span>${label(item)}</button>`).join("")}</div>${selected.id === "security" ? `<div class="presentation-subtype-panel"><strong>${t("securityDetail")}</strong><p>${t("armedInjured")}</p><small>${t("danger")}</small></div>` : ""}${selected.id === "confidential" ? `<div class="presentation-confidential"><strong>${t("confidential")}</strong>${t("confidentialFields").map((item, index) => `<span><b>${index + 1}</b>${item}</span>`).join("")}<button type="button" data-unified-action="confidential-submit">${t("submitConfidential")}</button></div>` : ""}<fieldset class="presentation-permission-set"><legend>${t("permissionTitle")}</legend>${["location", "audio", "video"].map((key) => `<label><input type="checkbox" data-unified-permission="${key}" ${state.permissions[key] ? "checked" : ""} />${t(key)}</label>`).join("")}</fieldset><button type="button" class="presentation-primary presentation-alert-submit" data-unified-action="send-alert">${t("activateAlert")}</button></div></div></section>`;
  }

  function renderResourceCard(compact) {
    const resource = resourceData();
    return `<article class="presentation-resource-card ${compact ? "compact" : ""}"><header><div><p>${t("resourceField")}</p><h3>${resource.operator[state.locale]}</h3></div><span class="presentation-chip ${state.service.active ? "success" : "muted"}">${serviceStatus()}</span></header>${fieldList([[t("serviceFields").function, resource.role[state.locale]], [t("serviceFields").unit, resource.unit[state.locale]], [t("controlledBy"), consoleName(resource.agency)], [t("serviceFields").shift, resource.shift], [t("location"), resource.operationalLocation[state.locale]], [t("distance"), "2.1 km"], [t("estimatedTime"), "06 min"], [t("hoursService"), state.service.active ? "02:24" : "00:00"], [t("incident"), state.routed ? incidentId() : "—"]])}</article>`;
  }

  function renderMaster() {
    return `<section id="presentationMaster" class="presentation-section presentation-master ${sectionClass(2)}"><div class="presentation-section-heading"><div><p class="presentation-kicker">B</p><h2>${t("master")}</h2><p>${t("receiving")}</p></div><span class="presentation-step-tag">${t("step")} 2–4</span></div><div class="master-console-surface"><header><div><span class="console-live-dot"></span>${t("master")} <small>DEMO-01</small></div><span class="presentation-chip critical">${t("priority")}: ${t("critical")}</span></header><div class="master-console-grid"><article class="master-alert-card"><p>${t("incident")}</p><h3>${incidentId()}</h3><strong>${t("scenarioTitle")}</strong>${fieldList([[t("location"), t("mapPreview")], [t("permissions"), `${t("audio")} · ${t("video")}`], [t("risks"), t("armedInjured")], [t("lastUpdate"), "10:24"]])}</article><article class="master-action-card"><p>${t("humanRequired")}</p><div class="presentation-button-grid"><button type="button" data-unified-action="validate">${t("validateAlert")}</button><button type="button" class="presentation-primary" data-unified-action="route" ${state.validated ? "" : "disabled"}>${t("routeParallel")}</button><button type="button" data-unified-action="request">${t("requestInfo")}</button><button type="button" data-unified-action="docs">${t("viewDocs")}</button></div><p class="master-human-note">${state.validated ? t("validated") : t("humanRequired")}</p></article><article class="master-route-card"><p>${t("involved")}</p><div class="presentation-route-chips">${activeRoute().map((id) => `<span class="${state.routed ? "is-routed" : ""}">${consoleName(id)}</span>`).join("")}</div><strong>${state.routed ? t("routed") : t("pending")}</strong></article></div></div><div class="presentation-master-resource-grid">${renderResourceCard(true)}<article class="presentation-master-context"><header><div><p>${t("contextTitle")}</p><h3>${t("master")}</h3></div><span class="presentation-chip success">${t("authorized")}</span></header>${renderAccessMatrix("master")}</article></div></section>`;
  }

  function renderAccessMatrix(consoleId) {
    const access = config.getAccessMatrix(consoleId);
    const noEnabled = allContextFields.filter((key) => !access.fields.includes(key) && !access.restricted.includes(key) && !access.onRequest.includes(key)).slice(0, 2);
    const group = (title, values, style) => `<div class="presentation-access-group ${style}"><b>${title}</b>${values.length ? values.map((key) => `<span>${accessLabel(key)}</span>`).join("") : `<span>—</span>`}</div>`;
    const previews = ["location", "audio", "video"].map((key) => mediaPreview(key, access.fields.includes(key) || (key === "video" && access.fields.includes("injuryVideo")) ? "authorized" : access.restricted.includes(key) ? "restricted" : "request")).join("");
    return `<section class="presentation-access-matrix"><header><h4>${t("contextTitle")}</h4><small>${t("lastUpdate")}: 10:24</small></header><div class="presentation-media-strip">${previews}</div><div class="presentation-access-grid">${group(t("authorized"), access.fields, "authorized")}${group(t("restricted"), access.restricted, "restricted")}${group(t("onRequest"), access.onRequest, "request")}${group(t("notEnabled"), noEnabled, "disabled")}</div></section>`;
  }

  function renderConsoles() {
    const route = activeRoute();
    const resource = resourceData();
    return `<section id="presentationConsoles" class="presentation-section presentation-consoles ${sectionClass(3)}"><div class="presentation-section-heading"><div><p class="presentation-kicker">C</p><h2>${t("consolesTitle")}</h2><p>${t("consolesLead")}</p></div><span class="presentation-step-tag">${t("step")} 3</span></div><div class="presentation-console-grid">${Object.values(config.consoles).map((console) => { const involved = route.includes(console.id); const fieldResource = console.id === resource.agency; return `<article class="presentation-console-card ${involved ? "is-involved" : ""}"><header><span class="console-kind ${console.kind}"></span><div><h3>${label(console)}</h3><small>${t("operator")}: ${involved ? `${t("serviceFields").shift} / Demo` : "—"} · ${t("session")}: DEMO-01</small></div><span class="presentation-chip ${involved ? "success" : "muted"}">${involved ? t("active") : t("noAccess")}</span></header>${fieldList([[t("inbox"), involved && state.routed ? t("received") : t("awaiting")], [t("resources"), involved ? t("assigned") : "—"], [t("documents"), involved ? t("pending") : "—"], [t("priority"), involved ? t("critical") : "—"]])}${involved ? renderAccessMatrix(console.id) : ""}${fieldResource && involved ? `<div class="presentation-resource-suggestion">${fieldList([[t("operator"), resource.operator[state.locale]], [t("serviceFields").function, resource.role[state.locale]], [t("serviceFields").unit, resource.unit[state.locale]], [t("serviceFields").shift, resource.shift], [t("location"), state.service.active ? resource.operationalLocation[state.locale] : t("notEnabled")], [t("lastUpdate"), "10:24"], [t("proximity"), "2.1 km"], [t("eta"), "06 min"], [t("incident"), state.routed ? incidentId() : "—"]])}</div>` : ""}${config.resources[console.id] ? `<div class="presentation-resource-suggestion"><strong>${t("resourceSuggestion")}</strong><span>${config.resources[console.id].unit[state.locale]}</span><span>${t("proximity")}: ${config.resources[console.id].distance}</span><span>${t("eta")}: ${config.resources[console.id].eta}</span><button type="button" data-unified-action="confirm-resource" data-resource="${console.id}" ${state.routed && !state.resourcesConfirmed[console.id] ? "" : "disabled"}>${state.resourcesConfirmed[console.id] ? t("confirmed") : t("confirmResource")}</button></div>` : ""}</article>`; }).join("")}</div></section>`;
  }

  function renderCommunications() { const rows = state.routed ? config.getCommunicationRows(activeRoute(), state.locale) : []; return `<section class="presentation-section presentation-communications"><div class="presentation-section-heading"><div><p class="presentation-kicker">${t("communications")}</p><h2>${t("commTitle")}</h2><p>${t("commLead")}</p></div></div><div class="presentation-communications-table"><div class="communications-row communications-head"><span>${t("communicationId")}</span><span>${t("sender")}</span><span>${t("recipient")}</span><span>${t("purpose")}</span><span>${t("status")}</span></div>${rows.length ? rows.map((row) => `<article class="communications-row"><strong>${row.id}</strong><span>${consoleName(row.sender)}</span><span>${row.recipient === "activeRoute" ? t("activeAgencies") : consoleName(row.recipient)}</span><span><b>${t(row.purpose)}</b>${row.message}</span><span>${t(row.status)} · ${t("integrity")}</span></article>`).join("") : `<p class="presentation-empty">${t("pending")}</p>`}</div></section>`; }

  function renderServiceControl() {
    const resource = resourceData();
    const summary = state.service.finished ? [[t("serviceFields").start, resource.start], [t("serviceFields").expectedEnd, "10:38"], [t("hoursService"), "02:38"], [t("serviceFields").pause, "00:00"], [t("serviceFields").incidents, incidentId()], [t("linkedProcedures"), state.allAgencyActsFinalized ? String(activeAgencies().length) : "0"], [t("evidenceTitle"), String(state.evidence.length)], [t("communications"), state.routed ? "5" : "0"], [t("accessLabels").consultations, state.routed ? "1" : "0"], [t("serviceFields").pendingDocuments, reportReady() ? "0" : "1"]] : [[t("operator"), resource.operator[state.locale]], [t("serviceFields").function, resource.role[state.locale]], [t("serviceFields").agency, consoleName(resource.agency)], [t("serviceFields").unit, resource.unit[state.locale]], [t("serviceFields").shift, resource.shift], [t("serviceFields").console, resource.console], [t("serviceFields").operationalLocation, state.service.active ? resource.operationalLocation[state.locale] : t("notEnabled")], [t("serviceFields").device, resource.device]];
    const states = Object.entries(t("serviceStatus")).map(([id, name]) => `<span class="${state.service.status === id ? "is-current" : ""}">${name}</span>`).join("");
    return `<article class="presentation-service-control"><header><div><p>${t("serviceControl")}</p><h3>${serviceStatus()}</h3></div><span class="presentation-chip ${state.service.active ? "success" : "muted"}">${state.service.active ? t("serviceTaken") : t("serviceStatus").off}</span></header>${fieldList(summary)}<div class="presentation-service-states">${states}</div><div class="presentation-button-grid"><button type="button" class="presentation-primary" data-unified-action="take-service" ${state.service.active || state.service.finished ? "disabled" : ""}>${t("takeService")}</button><button type="button" data-unified-action="finish-service" ${state.service.active ? "" : "disabled"}>${t("finishService")}</button></div><p class="presentation-legal-note">${t("serviceNotice")}</p></article>`;
  }

  function renderEvidence() {
    const evidenceTypes = [["photo", t("addPhoto")], ["audio", t("addAudio")], ["video", t("addVideo")], ["observation", t("addObservation")], ["location", t("addLocation")], ["document", t("addDocument")]];
    const evidenceMetadata = (item) => { const fields = t("metadataFields"); const type = t("evidenceTypes")[item.type]; return fieldList([[fields.evidenceId, item.id], [fields.incidentId, incidentId()], [fields.operatorId, resourceData().operatorId], [t("serviceFields").agency, consoleName(resourceData().agency)], [fields.type, type], [fields.description, `${t("simulatedLabel")} ${type}`], [fields.dateTime, item.time], [t("purposeLabel"), t("evidenceTitle")], [t("classification"), t("restricted")], [fields.integrity, item.integrity]]); };
    return `<article class="presentation-evidence-panel"><header><div><p>${t("evidenceTitle")}</p><h3>${t("evidenceLead")}</h3></div><span class="presentation-chip success">${t("simulatedLabel")}</span></header><div class="presentation-button-grid">${evidenceTypes.map(([type, name]) => `<button type="button" data-unified-action="add-evidence" data-evidence-type="${type}">${name}</button>`).join("")}</div><div class="presentation-evidence-records">${state.evidence.length ? state.evidence.map((item) => `<article><b>${item.id}</b>${evidenceMetadata(item)}</article>`).join("") : `<p class="presentation-empty">${t("noEvidence")}</p>`}</div></article>`;
  }

  function renderActPreview() { if (state.operatorAct === "none") return ""; return `<article class="presentation-act-preview"><header><div><p>${t("actPreview")}</p><h3>${t("actTitle")} · ACT-DEMO-911-001</h3></div><span class="presentation-chip ${state.operatorAct === "final" ? "success" : "warning"}">${state.operatorAct === "final" ? t("actReady") : t("draft")}</span></header><div class="presentation-act-sections">${t("actSections").map((item, index) => `<span><b>${String(index + 1).padStart(2, "0")}</b>${item}</span>`).join("")}</div><p>${state.operatorAct === "final" ? t("actLocked") : t("originalRecord")}</p><div class="presentation-button-grid"><button type="button" data-unified-action="save-act">${t("saveDraft")}</button><button type="button" class="presentation-primary" data-unified-action="finalize-act">${t("finalizeAct")}</button><button type="button" data-unified-action="request-clarification">${t("addClarification")}</button></div></article>`; }

  function renderMasterReportPreview() {
    const sections = t("masterPreviewSections");
    const resource = resourceData();
    const permissions = Object.keys(state.permissions).filter((key) => state.permissions[key]).map((key) => t(key)).join(" · ") || "—";
    const timeline = state.ledger.length ? state.ledger.map((item) => `${item.time} ${item.code}`).join(" · ") : "—";
    const evidence = state.evidence.length ? state.evidence.map((item) => `${item.id} / ${t("evidenceTypes")[item.type]}`).join(" · ") : "—";
    const communications = config.getCommunicationRows(activeRoute(), state.locale).map((item) => item.id).join(" · ") || "—";
    const acts = `${activeAgencies().length} · ${state.allAgencyActsFinalized ? t("actReady") : t("pending")} · ${state.operatorActFinalized ? t("actTitle") : t("draft")}`;
    const clarification = state.consistency.requested ? t("clarificationRequested") : "—";
    const addendum = state.consistency.addendum ? "ADD-DEMO-911-001" : "—";
    const audit = `${incidentId()} · DOC-DEMO-MASTER-001 · HASH-SIM-MASTER-4821`;
    const items = [[sections.originalAlert, label(alert())], [sections.permissions, permissions], [sections.timeline, timeline], [sections.agencies, activeAgencies().map(consoleName).join(" · ")], [sections.operators, resource.operator[state.locale]], [sections.resources, `${resource.unit[state.locale]} · 2.1 km · 06 min`], [sections.communications, communications], [sections.evidence, evidence], [sections.acts, acts], [sections.inconsistencies, state.consistency.resolved ? t("resolved") : t("needsClarification")], [sections.clarifications, clarification], [sections.addenda, addendum], [sections.audit, audit], [sections.destination, config.getSuggestedDestination(activeRoute(), state.locale)]];
    return `<article class="presentation-master-preview"><header><div><p>${t("masterPreviewTitle")}</p><h3>${t("reportTitle")}</h3></div><span class="presentation-chip ${reportReady() ? "success" : "warning"}">${reportReady() ? t("reportStatuses").ready : t("pending")}</span></header>${fieldList(items)}<p class="presentation-legal-note">${t("masterReportDisclaimer")}</p></article>`;
  }

  function renderField() {
    const context = `<article class="presentation-field-context"><header><div><p>${t("fieldContext")}</p><h3>${t("scenarioTitle")}</h3></div><span class="presentation-chip success">${t("simulatedLabel")}</span></header><div class="presentation-media-strip">${mediaPreview("video", "authorized")}${mediaPreview("audio", "authorized")}${mediaPreview("location", "authorized")}</div>${fieldList([[t("priority"), t("critical")], [t("risks"), t("armedInjured")], [t("agenciesOnWay"), activeAgencies().map(consoleName).join(" · ")], [t("lastUpdate"), "10:24"], [t("narrative"), t("noRealReport")]])}<p>${t("fieldInstruction")}</p></article>`;
    return `<section id="presentationField" class="presentation-section presentation-field ${sectionClass(4)} ${sectionClass(5)} ${sectionClass(6)}"><div class="presentation-section-heading"><div><p class="presentation-kicker">D</p><h2>${t("field")}</h2><p>${t("serviceNotice")}</p></div><span class="presentation-step-tag">${t("step")} 4–6</span></div><div class="presentation-field-layout"><article class="presentation-phone field-phone"><div class="phone-status"><span>10:21</span><span>● ● ●</span></div><div class="phone-appbar"><b>PIPO Field</b><span>${serviceStatus()}</span></div>${context}<div class="field-phone-actions"><button type="button" data-unified-action="field-accept">${t("accept")}</button><button type="button" data-unified-action="field-depart">${t("departure")}</button><button type="button" data-unified-action="field-arrive">${t("arrival")}</button><button type="button" data-unified-action="field-start">${t("startIntervention")}</button><button type="button" data-unified-action="field-complete">${t("finishIntervention")}</button></div></article><div class="presentation-field-workspace">${renderServiceControl()}${context}${renderEvidence()}<article class="presentation-field-comms"><h3>${t("fieldCommunications")}</h3><div class="presentation-button-grid"><button type="button" data-unified-action="field-support">${t("requestSupport")}</button><button type="button" data-unified-action="send-update">${t("sendUpdate")}</button><button type="button" data-unified-action="request-info">${t("requestInformation")}</button><button type="button" data-unified-action="respond-request">${t("respondRequest")}</button><button type="button" data-unified-action="consult">${t("consultProsecution")}</button><button type="button" class="presentation-primary" data-unified-action="create-act">${t("createAct")}</button></div>${state.consistency.requested && !state.consistency.addendum ? `<div class="presentation-clarification-alert"><strong>${t("clarificationReceived")}</strong><p>${t("addendumLead")}</p><button type="button" data-unified-action="respond-addendum">${t("respondAddendum")}</button></div>` : ""}</article>${renderActPreview()}</div></div></section>`;
  }

  function renderDocumentation() {
    const acts = activeAgencies();
    const consistencyStatus = state.consistency.resolved ? t("resolved") : state.consistency.addendum ? t("addendumReceived") : state.consistency.requested ? t("clarificationRequested") : t("needsClarification");
    const actCard = (id, index) => {
      const isOperatorAct = id === resourceData().agency;
      const finalized = state.allAgencyActsFinalized || (isOperatorAct && state.operatorActFinalized);
      return `<article class="presentation-act-card" data-agency-act="${id}"><header><span>${index + 1}</span><div><h3>${consoleName(id)}</h3><small>${finalized ? t("actReady") : t("draft")}</small></div></header>${fieldList([[t("author"), isOperatorAct ? resourceData().operator[state.locale] : `OP-DEMO-${id.toUpperCase()}`], [t("chronology"), "10:12–10:32"], [t("ownFacts"), t("scenarioTitle")], [t("evidenceReference"), `EVD-DEMO-00${index + 1}`], [t("status"), finalized ? t("complete") : t("pending")]])}</article>`;
    };
    return `<section id="presentationDocumentation" class="presentation-section presentation-documentation ${sectionClass(7)}"><div class="presentation-section-heading"><div><p class="presentation-kicker">E</p><h2>${t("actsTitle")}</h2><p>${t("actsLead")}</p></div><span class="presentation-step-tag">${t("step")} 7</span></div><div class="presentation-document-grid">${acts.map(actCard).join("")}</div><div class="presentation-consistency"><header><div><p>${t("consistencyTitle")}</p><h3>${t("consistencyLead")}</h3></div><span class="presentation-chip ${state.consistency.resolved ? "success" : "warning"}">${consistencyStatus}</span></header><div class="presentation-consistency-table">${t("consistencyFields").map((item, index) => `<div><b>${item}</b><span>${index === 0 ? t("inconsistencyArrival") : index === 2 ? t("inconsistencyPeople") : t("resolved")}</span></div>`).join("")}</div><div class="presentation-clarification-form">${t("clarificationFields").map((item, index) => `<span><b>${item}</b>${index === 0 ? resourceData().operator[state.locale] : index === 1 ? consoleName("security") : index === 2 ? t("inconsistencyArrival") : index === 3 ? t("consistencyLead") : index === 4 ? "10:45" : t("critical")}</span>`).join("")}</div><div class="presentation-button-grid"><button type="button" data-unified-action="request-clarification" ${state.consistency.requested ? "disabled" : ""}>${t("requestClarification")}</button><button type="button" data-unified-action="respond-addendum" ${state.consistency.requested && !state.consistency.addendum ? "" : "disabled"}>${t("respondAddendum")}</button><button type="button" class="presentation-primary" data-unified-action="finalize-all-acts" ${state.allAgencyActsFinalized ? "disabled" : ""}>${t("finalizeAllActs")}</button></div>${state.consistency.addendum ? `<article class="presentation-addendum"><h4>${t("addendumTitle")} · ADD-DEMO-911-001</h4><p>${t("addendumLead")}</p><span>${t("originalRecord")} · 10:34 · ${resourceData().operator[state.locale]}</span></article>` : ""}</div><div class="presentation-master-record"><div><p>${t("reportTitle")}</p><h3>${t("reportStatuses")[state.masterReport]}</h3><span>${incidentId()} · DOC-DEMO-MASTER-001</span><p>${reportReady() ? t("reportLead") : t("reportBlocked")}</p></div><div><p>${t("destination")}</p><strong>${config.getSuggestedDestination(activeRoute(), state.locale)}</strong><button type="button" class="presentation-primary" data-unified-action="generate-report" ${reportReady() ? "" : "disabled"}>${t("generateReport")}</button><button type="button" data-unified-action="remit-report" ${state.masterReport === "ready" ? "" : "disabled"}>${t("remit")}</button></div></div>${renderMasterReportPreview()}<p class="presentation-legal-note">${t("remittanceNotice")}</p></section>`;
  }

  function renderClosure() { const ready = state.masterReport === "remitted"; return `<section id="presentationClosure" class="presentation-section presentation-closure ${sectionClass(8)}"><div class="presentation-section-heading"><div><p class="presentation-kicker">F</p><h2>${t("closureTitle")}</h2><p>${t("closureLead")}</p></div><span class="presentation-step-tag">${t("step")} 8</span></div><div class="presentation-closure-layout"><article class="presentation-closure-console"><h3>${t("closureTitle")}</h3><p>${ready ? t("summaryPrepared") : t("reportBlocked")}</p><div class="presentation-button-grid"><button type="button" data-unified-action="prepare-summary" ${ready ? "" : "disabled"}>${t("prepareSummary")}</button><button type="button" class="presentation-primary" data-unified-action="deliver-summary" ${state.citizenSummary === "prepared" ? "" : "disabled"}>${t("deliverSummary")}</button></div>${fieldList([[t("receipt"), state.citizenSummary === "delivered" ? "REC-DEMO-821" : "—"], [t("followUp"), "PIPO-DEMO / 48 h"], [t("status"), state.citizenSummary === "delivered" ? t("summaryDelivered") : t("pending")]])}</article><article class="presentation-phone closure-phone"><div class="phone-status"><span>10:38</span><span>● ● ●</span></div><div class="phone-appbar"><b>PIPO</b><span>${t("simulatedLabel")}</span></div><div class="closure-package"><p>${state.citizenSummary === "delivered" ? t("summaryDelivered") : t("pending")}</p><h3>${t("package")}</h3><dl>${t("publicFields").map((item, index) => `<div><dt>${item}</dt><dd>${index === 0 ? incidentId() : index === 2 ? label(alert()) : index === 3 ? t("closed") : index === 4 ? activeAgencies().map(consoleName).join(" · ") : index === 5 ? t("closureLead") : index === 6 ? "REC-DEMO-821" : t("nextSteps")}</dd></div>`).join("")}</dl></div></article></div></section>`; }

  function renderAdvanced() { return `<aside id="presentationAdvanced" class="presentation-advanced"><h2>${t("limitsTitle")}</h2><ul>${t("limits").map((item) => `<li>${item}</li>`).join("")}</ul><a class="presentation-secondary" href="advanced.html">${t("advanced")}</a></aside>`; }

  // Final presentation overrides keep dispatch, console, field, and documentary views aligned.
  function renderMasterDispatch() {
    const resources = activeDispatchResources();
    return `<article class="presentation-master-context"><header><div><p>${t("dispatch")}</p><h3>${t("masterCoordination")}</h3></div><span class="presentation-chip ${allResourcesConfirmed() ? "success" : "warning"}">${allResourcesConfirmed() ? t("complete") : t("awaiting")}</span></header><p>${t("masterRole")}</p><div class="presentation-dispatch-list">${resources.map((id) => `<div><b>${consoleName(id)}</b><span>${resourceLabel(id)}</span><small>${state.resourcesConfirmed[id] ? t("confirmed") : t("awaitingConfirmation")}</small></div>`).join("")}</div></article>`;
  }

  function renderMaster() {
    return `<section id="presentationMaster" class="presentation-section presentation-master ${sectionClass(2)}"><div class="presentation-section-heading"><div><p class="presentation-kicker">B</p><h2>${t("master")}</h2><p>${t("receiving")}</p></div><span class="presentation-step-tag">${t("step")} 2–4</span></div><div class="master-console-surface"><header><div><span class="console-live-dot"></span>${t("master")} <small>DEMO-01</small></div><span class="presentation-chip critical">${t("priority")}: ${t("critical")}</span></header><div class="master-console-grid"><article class="master-alert-card"><p>${t("incident")}</p><h3>${incidentId()}</h3><strong>${t("scenarioTitle")}</strong>${fieldList([[t("location"), t("mapPreview")], [t("permissions"), `${t("audio")} · ${t("video")}`], [t("risks"), t("armedInjured")], [t("lastUpdate"), "10:24"]])}</article><article class="master-action-card"><p>${t("humanRequired")}</p><div class="presentation-button-grid"><button type="button" data-unified-action="validate">${t("validateAlert")}</button><button type="button" class="presentation-primary" data-unified-action="route" ${state.validated ? "" : "disabled"}>${t("routeParallel")}</button><button type="button" data-unified-action="request">${t("requestInfo")}</button><button type="button" data-unified-action="docs">${t("viewDocs")}</button></div><p class="master-human-note">${state.validated ? t("validated") : t("humanRequired")}</p></article><article class="master-route-card"><p>${t("involved")}</p><div class="presentation-route-chips">${activeRoute().map((id) => `<span class="${state.routed ? "is-routed" : ""}">${consoleName(id)}</span>`).join("")}</div><strong>${state.routed ? t("routed") : t("pending")}</strong></article></div></div><div class="presentation-master-resource-grid">${renderMasterDispatch()}<article class="presentation-master-context"><header><div><p>${t("contextTitle")}</p><h3>${t("master")}</h3></div><span class="presentation-chip success">${t("authorized")}</span></header>${renderAccessMatrix("master")}</article></div></section>`;
  }

  function consoleDispatchStatus(consoleId) {
    if (config.resources[consoleId]) return [resourceLabel(consoleId), state.resourcesConfirmed[consoleId] ? t("confirmedFieldResource") : t("awaitingConfirmation")];
    if (consoleId === "prosecution") return [t("documentaryIntervention"), t("noFieldDispatch")];
    if (consoleId === "station") return [t("ownInstitutionalAction"), t("noConfiguredResource")];
    return [t("coordinationOnly"), t("noFieldDispatch")];
  }

  function renderConsoleCard(console, involved) {
    const [dispatch, dispatchState] = consoleDispatchStatus(console.id);
    const resourceSuggestion = involved && config.resources[console.id]
      ? `<div class="presentation-resource-suggestion"><strong>${t("resourceSuggestion")}</strong><span>${resourceLabel(console.id)}</span><span>${t("proximity")}: ${config.resources[console.id].distance}</span><span>${t("eta")}: ${config.resources[console.id].eta}</span><button type="button" data-unified-action="confirm-resource" data-resource="${console.id}" ${state.routed && !state.resourcesConfirmed[console.id] ? "" : "disabled"}>${state.resourcesConfirmed[console.id] ? t("confirmed") : t("confirmResource")}</button></div>`
      : "";
    return `<article class="presentation-console-card ${involved ? "is-involved" : ""}"><header><span class="console-kind ${console.kind}"></span><div><h3>${label(console)}</h3><small>${t("operator")}: ${involved ? `${t("serviceFields").shift} / Demo` : "—"} · ${t("session")}: DEMO-01</small></div><span class="presentation-chip ${involved ? "success" : "muted"}">${involved ? t("active") : t("noAccess")}</span></header>${fieldList([[t("inbox"), involved && state.routed ? t("received") : t("awaiting")], [t("dispatch"), involved ? dispatch : "—"], [t("fieldResource"), involved ? dispatchState : "—"], [t("documents"), involved ? t("pending") : "—"], [t("priority"), involved ? t("critical") : "—"]])}${involved ? renderAccessMatrix(console.id) : ""}${resourceSuggestion}</article>`;
  }

  function renderConsoles() {
    const specialized = Object.values(config.consoles).filter((console) => console.id !== "master");
    const active = specialized.filter((console) => isActiveAgency(console.id));
    const inactive = specialized.filter((console) => !isActiveAgency(console.id));
    return `<section id="presentationConsoles" class="presentation-section presentation-consoles ${sectionClass(3)}"><div class="presentation-section-heading"><div><p class="presentation-kicker">C</p><h2>${t("consolesTitle")}</h2><p>${t("consolesLead")}</p></div><span class="presentation-step-tag">${t("step")} 3</span></div><div class="presentation-console-grid">${active.map((console) => renderConsoleCard(console, true)).join("")}</div><details class="presentation-other-consoles"><summary>${t("otherAgencies")}</summary><div class="presentation-console-grid">${inactive.map((console) => renderConsoleCard(console, false)).join("")}</div></details></section>`;
  }

  function renderCompactFieldPhone() {
    const resource = resourceData();
    return `<article class="presentation-phone field-phone"><div class="phone-status"><span>10:21</span><span>● ● ●</span></div><div class="phone-appbar"><b>PIPO Field</b><span>${serviceStatus()}</span></div><div class="field-phone-context"><p>${t("fieldPhoneContext")}</p><h3>${t("scenarioTitle")}</h3><div class="field-media">${mediaPreview("video", "authorized")}${mediaPreview("audio", "authorized")}${mediaPreview("location", "authorized")}</div>${fieldList([[t("priority"), t("critical")], [t("risks"), t("armedInjured")], [t("actingUnit"), `${resource.unit[state.locale]} — ${consoleName(resource.agency)}`], [t("supportEnRoute"), fieldSupportLine()], [t("institutionalCoordination"), coordinationLine()], [t("lastUpdate"), "10:24"], [t("operationalInstruction"), t("fieldInstruction")]])}</div><div class="field-phone-actions"><button type="button" data-unified-action="field-accept">${t("accept")}</button><button type="button" data-unified-action="field-depart">${t("departure")}</button><button type="button" data-unified-action="field-arrive">${t("arrival")}</button><button type="button" data-unified-action="field-start">${t("startIntervention")}</button><button type="button" data-unified-action="field-complete">${t("finishIntervention")}</button></div></article>`;
  }

  function renderField() {
    const context = `<article class="presentation-field-context"><header><div><p>${t("fieldContext")}</p><h3>${t("scenarioTitle")}</h3></div><span class="presentation-chip success">${t("simulatedLabel")}</span></header><div class="presentation-media-strip">${mediaPreview("video", "authorized")}${mediaPreview("audio", "authorized")}${mediaPreview("location", "authorized")}</div>${fieldList([[t("priority"), t("critical")], [t("risks"), t("armedInjured")], [t("involved"), activeInstitutionalAgencies().map(consoleName).join(" · ")], [t("lastUpdate"), "10:24"], [t("narrative"), t("noRealReport")]])}<p>${t("fieldInstruction")}</p></article>`;
    return `<section id="presentationField" class="presentation-section presentation-field ${sectionClass(4)} ${sectionClass(5)} ${sectionClass(6)}"><div class="presentation-section-heading"><div><p class="presentation-kicker">D</p><h2>${t("field")}</h2><p>${t("serviceNotice")}</p></div><span class="presentation-step-tag">${t("step")} 4–6</span></div><div class="presentation-field-layout">${renderCompactFieldPhone()}<div class="presentation-field-workspace">${renderServiceControl()}${context}${renderEvidence()}<article class="presentation-field-comms"><h3>${t("fieldCommunications")}</h3><div class="presentation-button-grid"><button type="button" data-unified-action="field-support">${t("requestSupport")}</button><button type="button" data-unified-action="send-update">${t("sendUpdate")}</button><button type="button" data-unified-action="request-info">${t("requestInformation")}</button><button type="button" data-unified-action="respond-request">${t("respondRequest")}</button><button type="button" data-unified-action="consult">${t("consultProsecution")}</button><button type="button" class="presentation-primary" data-unified-action="create-act">${t("createAct")}</button></div>${state.consistency.requested && !state.consistency.addendum ? `<div class="presentation-clarification-alert"><strong>${t("clarificationReceived")}</strong><p>${t("addendumLead")}</p><button type="button" data-unified-action="respond-addendum">${t("respondAddendum")}</button></div>` : ""}</article>${renderActPreview()}</div></div></section>`;
  }

  function renderProcedureStatus() {
    const next = nextProcedureRequirement();
    return `<article class="presentation-procedure-status" aria-labelledby="procedureStatusTitle"><header><div><p>${t("procedureTitle")}</p><h3 id="procedureStatusTitle">${t("procedureLead")}</h3></div><span class="presentation-chip ${next ? "warning" : "success"}">${next ? t("inProgressStatus") : t("complete")}</span></header><ol>${procedureRequirements().map((requirement) => { const status = procedureStatus(requirement); return `<li class="is-${status}"><span>${requirement.label}</span><b>${procedureStatusLabel(status)}</b></li>`; }).join("")}</ol><div class="presentation-procedure-next"><div><p>${t("nextProcedureAction")}</p><strong>${next ? t(next.action) : t("complete")}</strong></div>${next ? `<button type="button" data-unified-action="go-procedure-next" data-procedure-target="${next.target}">${t("goToRequirement")}</button>` : ""}</div>${state.procedureNotice ? `<p class="presentation-procedure-notice" role="status" aria-live="polite">${state.procedureNotice}</p>` : ""}</article>`;
  }

  function agencyActTemplate(id) {
    return t("actTemplates")[id] || { author: consoleName(id), operator: `OP-DEMO-${id.toUpperCase()}`, chronology: "10:12–10:32", facts: t("scenarioTitle"), actions: t("receiving"), evidence: "—", outcome: t("pending"), reference: "ACT-DEMO-000-001" };
  }

  function renderAgencyActCard(id, index) {
    const template = agencyActTemplate(id);
    const finalized = id === resourceData().agency ? state.operatorActFinalized : state.allAgencyActsFinalized;
    return `<article class="presentation-act-card" data-agency-act="${id}"><header><span>${index + 1}</span><div><h3>${consoleName(id)}</h3><small>${finalized ? t("actReady") : t("draft")}</small></div></header>${fieldList([[t("author"), template.author], [t("operator"), template.operator], [t("agency"), consoleName(id)], [t("chronology"), template.chronology], [t("ownFacts"), template.facts], [t("actions"), template.actions], [t("evidenceReference"), template.evidence], [t("outcome"), template.outcome], [t("documentReference"), template.reference], [t("status"), finalized ? t("complete") : t("pending")]])}</article>`;
  }

  function renderDocumentation() {
    const acts = activeInstitutionalAgencies();
    const consistencyStatus = state.consistency.resolved ? t("resolved") : state.consistency.addendum ? t("addendumReceived") : state.consistency.requested ? t("clarificationRequested") : t("needsClarification");
    return `<section id="presentationDocumentation" class="presentation-section presentation-documentation ${sectionClass(7)}"><div class="presentation-section-heading"><div><p class="presentation-kicker">E</p><h2>${t("actsTitle")}</h2><p>${t("actsLead")}</p></div><span class="presentation-step-tag">${t("step")} 7</span></div><div class="presentation-document-grid">${acts.map(renderAgencyActCard).join("")}</div><div class="presentation-document-flow"><strong>${t("individualActs")}</strong>${t("documentFlow").map((item) => `<span>${item}</span>`).join("<b>↓</b>")}<p>${t("masterRole")}</p></div>${renderProcedureStatus()}<div class="presentation-consistency"><header><div><p>${t("consistencyTitle")}</p><h3>${t("consistencyLead")}</h3></div><span class="presentation-chip ${state.consistency.resolved ? "success" : "warning"}">${consistencyStatus}</span></header><div class="presentation-consistency-table">${t("consistencyFields").map((item, index) => `<div><b>${item}</b><span>${index === 0 ? t("inconsistencyArrival") : index === 2 ? t("inconsistencyPeople") : state.consistency.requested ? t("resolved") : t("unreviewed")}</span></div>`).join("")}</div><div class="presentation-clarification-form">${t("clarificationFields").map((item, index) => `<span><b>${item}</b>${index === 0 ? resourceData().operator[state.locale] : index === 1 ? consoleName("security") : index === 2 ? t("inconsistencyArrival") : index === 3 ? t("consistencyLead") : index === 4 ? "10:45" : t("critical")}</span>`).join("")}</div><div class="presentation-button-grid"><button type="button" data-unified-action="request-clarification" ${state.consistency.requested ? "disabled" : ""}>${t("requestClarification")}</button><button type="button" data-unified-action="respond-addendum" ${state.consistency.requested && !state.consistency.addendum ? "" : "disabled"}>${t("respondAddendum")}</button><button type="button" class="presentation-primary" data-unified-action="finalize-all-acts" ${state.allAgencyActsFinalized ? "disabled" : ""}>${t("finalizeAllActs")}</button></div>${state.consistency.addendum ? `<article class="presentation-addendum"><h4>${t("addendumTitle")} · ADD-DEMO-911-001</h4><p>${t("addendumLead")}</p><span>${t("originalRecord")} · 10:34 · ${resourceData().operator[state.locale]}</span></article>` : ""}</div><div class="presentation-master-record"><div><p>${t("reportTitle")}</p><h3>${t("reportStatuses")[state.masterReport]}</h3><span>${incidentId()} · DOC-DEMO-MASTER-001</span><p>${reportReady() ? t("reportLead") : t("reportBlocked")}</p></div><div><p>${t("destination")}</p><strong>${config.getSuggestedDestination(activeRoute(), state.locale)}</strong><button type="button" class="presentation-primary" data-unified-action="generate-report" ${reportReady() ? "" : "disabled"}>${t("generateReport")}</button><button type="button" data-unified-action="remit-report" ${state.masterReport === "ready" ? "" : "disabled"}>${t("remit")}</button></div></div>${renderMasterReportPreview()}<p class="presentation-legal-note">${t("remittanceNotice")}</p></section>`;
  }

  function renderMasterReportPreview() {
    const sections = t("masterPreviewSections");
    const resource = resourceData();
    const permissions = Object.keys(state.permissions).filter((key) => state.permissions[key]).map((key) => t(key)).join(" · ") || "—";
    const timeline = state.ledger.length ? state.ledger.map((item) => `${item.time} ${item.code}`).join(" · ") : "—";
    const evidence = state.evidence.length ? state.evidence.map((item) => `${item.id} / ${t("evidenceTypes")[item.type]}`).join(" · ") : "—";
    const communications = config.getCommunicationRows(activeRoute(), state.locale).map((item) => item.id).join(" · ") || "—";
    const acts = activeInstitutionalAgencies().map((id) => agencyActTemplate(id).reference).join(" · ");
    const clarification = state.consistency.requested ? t("clarificationRequested") : "—";
    const addendum = state.consistency.addendum ? "ADD-DEMO-911-001" : "—";
    const audit = `${incidentId()} · DOC-DEMO-MASTER-001 · HASH-SIM-MASTER-4821`;
    const resourceSummary = dispatchResourceLines().length ? dispatchResourceLines().join(" · ") : `${resource.unit[state.locale]} — ${consoleName(resource.agency)}`;
    const items = [[sections.originalAlert, label(alert())], [sections.permissions, permissions], [sections.timeline, timeline], [sections.agencies, activeInstitutionalAgencies().map(consoleName).join(" · ")], [sections.operators, resource.operator[state.locale]], [sections.resources, resourceSummary], [sections.communications, communications], [sections.evidence, evidence], [sections.acts, acts], [sections.inconsistencies, state.consistency.resolved ? t("resolved") : t("needsClarification")], [sections.clarifications, clarification], [sections.addenda, addendum], [sections.audit, audit], [sections.destination, config.getSuggestedDestination(activeRoute(), state.locale)]];
    return `<article class="presentation-master-preview"><header><div><p>${t("masterPreviewTitle")}</p><h3>${t("reportTitle")}</h3></div><span class="presentation-chip ${reportReady() ? "success" : "warning"}">${reportReady() ? t("reportStatuses").ready : t("reportBlocked")}</span></header>${fieldList(items)}<p class="presentation-legal-note">${t("masterReportDisclaimer")}</p></article>`;
  }

  function render() { document.documentElement.lang = state.locale; document.title = t("documentTitle"); document.body.classList.toggle("presentation-filming", state.filming); root.innerHTML = `${renderHeader()}<main class="presentation-main">${renderHero()}${renderTour()}${renderCitizen()}${renderMaster()}${renderConsoles()}${renderCommunications()}${renderField()}${renderDocumentation()}${renderClosure()}${renderAdvanced()}</main>`; bindEvents(); }
  function scrollToCurrentStep() { const targets = ["presentationCitizen", "presentationMaster", "presentationConsoles", "presentationField", "presentationField", "presentationField", "presentationDocumentation", "presentationClosure"]; const target = document.getElementById(targets[Math.max(0, state.tourStep - 1)]); if (target) target.scrollIntoView({ behavior: "smooth", block: "start" }); }
  function restart() { Object.assign(state, { menuOpen: false, selectedAlert: "security", armedInjured: true, permissions: { location: true, audio: true, video: true }, alertSent: false, validated: false, routed: false, resourcesConfirmed: {}, service: { active: false, status: "off", started: false, finished: false }, fieldStage: "pending", evidence: [], operatorAct: "none", operatorActFinalized: false, allAgencyActsFinalized: false, consistency: { requested: false, addendum: false, resolved: false }, masterReport: "draft", citizenSummary: "none", tourStep: 0, message: "", ledger: [] }); }
  function addEvidence(type) { const id = `EVD-DEMO-${String(state.evidence.length + 1).padStart(3, "0")}`; state.evidence.push({ id, type, time: `10:${25 + state.evidence.length}`, integrity: `HASH-SIM-${String(state.evidence.length + 1).padStart(4, "0")}` }); addEvent("field.evidence.added", id); }
  function advanceTour() { state.tourStep = state.tourStep ? Math.min(8, state.tourStep + 1) : 1; const actions = { 1: () => { state.menuOpen = true; state.alertSent = true; }, 2: () => { state.validated = true; }, 3: () => { state.routed = true; }, 4: () => { state.service = { active: true, status: "assigned", started: true, finished: false }; activeResources().forEach((id) => { state.resourcesConfirmed[id] = true; }); }, 5: () => { state.service.status = "onScene"; state.fieldStage = "arrived"; }, 6: () => { addEvidence("video"); addEvidence("audio"); state.operatorAct = "draft"; }, 7: () => { state.operatorAct = "final"; state.operatorActFinalized = true; state.allAgencyActsFinalized = true; state.consistency = { requested: true, addendum: true, resolved: true }; state.masterReport = "ready"; }, 8: () => { state.masterReport = "remitted"; state.citizenSummary = "delivered"; state.service = { active: false, status: "closed", started: true, finished: true }; } }; actions[state.tourStep](); state.message = `${t("step")} ${state.tourStep}: ${t("stepLabels")[state.tourStep - 1]}.`; addEvent("tour.step", String(state.tourStep)); render(); scrollToCurrentStep(); }
  function bindEvents() { root.querySelectorAll("[data-unified-action]").forEach((element) => element.addEventListener("click", () => { const action = element.dataset.unifiedAction; if (action === "toggle-menu") state.menuOpen = !state.menuOpen; if (action === "select-alert") { state.selectedAlert = element.dataset.alertId; state.menuOpen = true; } if (action === "send-alert" || action === "confidential-submit") { state.alertSent = true; addEvent("citizen.alert.confirmed", label(alert())); } if (action === "validate") state.validated = true; if (action === "route") state.routed = true; if (action === "confirm-resource") state.resourcesConfirmed[element.dataset.resource] = true; if (action === "take-service") { state.service = { active: true, status: "available", started: true, finished: false }; addEvent("field.service.started", resourceData().operatorId); } if (action === "finish-service") { state.service = { active: false, status: "closed", started: true, finished: true }; addEvent("field.service.finished", resourceData().operatorId); } if (action === "field-accept") state.service.status = "assigned"; if (action === "field-depart") state.service.status = "enRoute"; if (action === "field-arrive") state.service.status = "onScene"; if (action === "field-start" || action === "field-status") state.service.status = "intervening"; if (action === "field-complete") state.service.status = "drafting"; if (action === "add-evidence") addEvidence(element.dataset.evidenceType); if (["field-support", "send-update", "request-info", "respond-request", "consult"].includes(action)) addEvent("field.communication", action); if (action === "create-act") { state.operatorAct = "draft"; state.service.status = "drafting"; } if (action === "save-act") state.operatorAct = "draft"; if (action === "finalize-act") { state.operatorAct = "final"; state.operatorActFinalized = true; addEvent("field.operator-act.finalized", "ACT-DEMO-911-001"); } if (action === "finalize-all-acts") { state.operatorAct = "final"; state.operatorActFinalized = true; state.allAgencyActsFinalized = true; addEvent("master.agency-acts.finalized", String(activeAgencies().length)); } if (action === "request-clarification") { state.consistency.requested = true; state.consistency.resolved = false; addEvent("master.clarification.requested", "ADD-DEMO-911-001"); } if (action === "respond-addendum") { state.consistency.addendum = true; state.consistency.resolved = true; addEvent("field.addendum.created", "ADD-DEMO-911-001"); } if (action === "generate-report" && reportReady()) state.masterReport = "ready"; if (action === "remit-report" && state.masterReport === "ready") state.masterReport = "remitted"; if (action === "prepare-summary" && state.masterReport === "remitted") state.citizenSummary = "prepared"; if (action === "deliver-summary" && state.citizenSummary === "prepared") state.citizenSummary = "delivered"; if (action === "restart") restart(); if (action === "film") { state.filming = !state.filming; state.message = state.filming ? t("filmingOn") : t("simulated"); } if (action === "start-tour" || action === "tour-next") { advanceTour(); return; } if (action === "tour-previous") { state.tourStep = Math.max(1, state.tourStep - 1); render(); scrollToCurrentStep(); return; } state.message = state.message || t("receiving"); render(); })); root.querySelectorAll('select[data-unified-action="locale"]').forEach((select) => select.addEventListener("change", () => { state.locale = select.value; render(); })); root.querySelectorAll("[data-unified-permission]").forEach((input) => input.addEventListener("change", () => { state.permissions[input.dataset.unifiedPermission] = input.checked; render(); })); }
  function scrollToPanel(id) {
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function restart() {
    Object.assign(state, {
      menuOpen: false, selectedAlert: "security", armedInjured: true, permissions: { location: true, audio: true, video: true },
      alertSent: false, validated: false, routed: false, resourcesConfirmed: {}, service: { active: false, status: "off", started: false, finished: false },
      fieldStage: "pending", evidence: [], operatorAct: "none", operatorActFinalized: false, allAgencyActsFinalized: false,
      consistency: { requested: false, addendum: false, resolved: false }, masterReport: "draft", citizenSummary: "none", tourStep: 0,
      message: "", procedureNotice: "", ledger: [],
    });
  }

  function procedureBlock(messages, target) {
    state.procedureNotice = t("procedureBlocked").replace("{requirements}", messages.join(" "));
    state.message = state.procedureNotice;
    return target;
  }

  function advanceTour() {
    state.tourStep = state.tourStep ? Math.min(8, state.tourStep + 1) : 1;
    const actions = {
      1: () => { state.menuOpen = true; state.alertSent = true; },
      2: () => { state.validated = true; },
      3: () => { state.routed = true; },
      4: () => { state.service = { active: true, status: "assigned", started: true, finished: false }; activeDispatchResources().forEach((id) => { state.resourcesConfirmed[id] = true; }); },
      5: () => { state.service.status = "onScene"; state.fieldStage = "arrived"; },
      6: () => { addEvidence("video"); addEvidence("audio"); state.operatorAct = "final"; state.operatorActFinalized = true; },
      7: () => { state.allAgencyActsFinalized = true; state.consistency = { requested: true, addendum: true, resolved: true }; state.masterReport = "ready"; },
      8: () => { state.masterReport = "remitted"; state.citizenSummary = "delivered"; state.service = { active: false, status: "closed", started: true, finished: true }; },
    };
    actions[state.tourStep]();
    state.procedureNotice = t("actionCompleted");
    state.message = `${t("step")} ${state.tourStep}: ${t("stepLabels")[state.tourStep - 1]}.`;
    addEvent("tour.step", String(state.tourStep));
    render();
    scrollToCurrentStep();
  }

  function bindEvents() {
    root.querySelectorAll("[data-unified-action]").forEach((element) => element.addEventListener("click", () => {
      const action = element.dataset.unifiedAction;
      let scrollTarget = "";
      if (action === "toggle-menu") state.menuOpen = !state.menuOpen;
      if (action === "select-alert") { state.selectedAlert = element.dataset.alertId; state.menuOpen = true; }
      if (action === "send-alert" || action === "confidential-submit") { state.alertSent = true; addEvent("citizen.alert.confirmed", label(alert())); state.message = t("alertPrepared"); }
      if (action === "validate") { state.validated = true; state.message = t("validated"); scrollTarget = "presentationMaster"; }
      if (action === "route") { state.routed = true; state.message = t("routed"); scrollTarget = "presentationConsoles"; }
      if (action === "confirm-resource") { state.resourcesConfirmed[element.dataset.resource] = true; state.message = t("actionCompleted"); scrollTarget = "presentationField"; }
      if (action === "take-service") { state.service = { active: true, status: "available", started: true, finished: false }; addEvent("field.service.started", resourceData().operatorId); state.message = t("serviceTaken"); }
      if (action === "finish-service") { state.service = { active: false, status: "closed", started: true, finished: true }; addEvent("field.service.finished", resourceData().operatorId); state.message = t("serviceFinished"); }
      if (action === "field-accept") state.service.status = "assigned";
      if (action === "field-depart") state.service.status = "enRoute";
      if (action === "field-arrive") state.service.status = "onScene";
      if (action === "field-start" || action === "field-status") state.service.status = "intervening";
      if (action === "field-complete") state.service.status = "drafting";
      if (action === "add-evidence") { addEvidence(element.dataset.evidenceType); state.procedureNotice = t("actionCompleted"); state.message = state.procedureNotice; scrollTarget = "presentationField"; }
      if (["field-support", "send-update", "request-info", "respond-request", "consult"].includes(action)) { addEvent("field.communication", action); state.message = t("actionCompleted"); }
      if (action === "create-act") {
        if (!state.evidence.length) scrollTarget = procedureBlock([t("missingEvidence")], "presentationField");
        else { state.operatorAct = "draft"; state.service.status = "drafting"; state.procedureNotice = t("actionCompleted"); state.message = state.procedureNotice; }
      }
      if (action === "save-act") { state.operatorAct = "draft"; state.message = t("actionCompleted"); }
      if (action === "finalize-act") {
        const missing = [];
        if (!state.evidence.length) missing.push(t("missingEvidence"));
        if (state.operatorAct === "none") missing.push(t("operatorActCreated"));
        if (missing.length) scrollTarget = procedureBlock(missing, "presentationField");
        else { state.operatorAct = "final"; state.operatorActFinalized = true; addEvent("field.operator-act.finalized", "ACT-DEMO-911-001"); state.procedureNotice = t("actionCompleted"); state.message = state.procedureNotice; scrollTarget = "presentationDocumentation"; }
      }
      if (action === "finalize-all-acts") {
        const missing = [];
        if (!state.evidence.length) missing.push(t("missingEvidence"));
        if (!state.operatorActFinalized) missing.push(t("missingOperatorAct"));
        if (missing.length) scrollTarget = procedureBlock(missing, "presentationField");
        else { state.allAgencyActsFinalized = true; addEvent("master.agency-acts.finalized", String(activeInstitutionalAgencies().length)); state.procedureNotice = t("actionCompleted"); state.message = state.procedureNotice; }
      }
      if (action === "request-clarification") {
        if (!state.allAgencyActsFinalized) scrollTarget = procedureBlock([t("missingAgencyActs")], "presentationDocumentation");
        else { state.consistency.requested = true; state.consistency.resolved = false; addEvent("master.clarification.requested", "ADD-DEMO-911-001"); state.procedureNotice = t("actionCompleted"); state.message = state.procedureNotice; scrollTarget = "presentationField"; }
      }
      if (action === "respond-addendum") {
        if (!state.consistency.requested) scrollTarget = procedureBlock([t("nextClarification")], "presentationDocumentation");
        else { state.consistency.addendum = true; state.consistency.resolved = true; addEvent("field.addendum.created", "ADD-DEMO-911-001"); state.procedureNotice = t("actionCompleted"); state.message = state.procedureNotice; scrollTarget = "presentationDocumentation"; }
      }
      if (action === "generate-report") {
        if (!reportReady()) scrollTarget = procedureBlock([t("missingEvidence"), t("missingOperatorAct"), t("missingAgencyActs"), t("missingConsistency")].filter((item, index) => [!state.evidence.length, !state.operatorActFinalized, !state.allAgencyActsFinalized, !(state.consistency.resolved && state.consistency.addendum)][index]), "presentationDocumentation");
        else { state.masterReport = "ready"; state.procedureNotice = t("actionCompleted"); state.message = state.procedureNotice; }
      }
      if (action === "remit-report") {
        if (state.masterReport !== "ready") scrollTarget = procedureBlock([t("nextReport")], "presentationDocumentation");
        else { state.masterReport = "remitted"; state.procedureNotice = t("actionCompleted"); state.message = state.procedureNotice; scrollTarget = "presentationClosure"; }
      }
      if (action === "prepare-summary") {
        if (state.masterReport !== "remitted") scrollTarget = procedureBlock([t("nextRemittance")], "presentationDocumentation");
        else { state.citizenSummary = "prepared"; state.procedureNotice = t("actionCompleted"); state.message = state.procedureNotice; }
      }
      if (action === "deliver-summary") {
        if (state.citizenSummary !== "prepared") scrollTarget = procedureBlock([t("nextPrepareSummary")], "presentationClosure");
        else { state.citizenSummary = "delivered"; state.service = { active: false, status: "closed", started: true, finished: true }; addEvent("citizen.summary.delivered", "REC-DEMO-821"); state.procedureNotice = t("actionCompleted"); state.message = state.procedureNotice; scrollTarget = "presentationClosure"; }
      }
      if (action === "go-procedure-next") { scrollTarget = element.dataset.procedureTarget; state.message = t("actionCompleted"); }
      if (action === "restart") restart();
      if (action === "film") { state.filming = !state.filming; state.message = state.filming ? t("filmingOn") : t("simulated"); }
      if (action === "start-tour" || action === "tour-next") { advanceTour(); return; }
      if (action === "tour-previous") { state.tourStep = Math.max(1, state.tourStep - 1); render(); scrollToCurrentStep(); return; }
      if (!state.message) state.message = t("receiving");
      render();
      if (scrollTarget) scrollToPanel(scrollTarget);
    }));
    root.querySelectorAll('select[data-unified-action="locale"]').forEach((select) => select.addEventListener("change", () => { state.locale = select.value; render(); }));
    root.querySelectorAll("[data-unified-permission]").forEach((input) => input.addEventListener("change", () => { state.permissions[input.dataset.unifiedPermission] = input.checked; render(); }));
  }

  function renderMaster() {
    return `<section id="presentationMaster" class="presentation-section presentation-master ${sectionClass(2)}"><div class="presentation-section-heading"><div><p class="presentation-kicker">B</p><h2>${t("master")}</h2><p>${t("receiving")}</p></div><span class="presentation-step-tag">${t("step")} 2&ndash;4</span></div><div class="master-console-surface"><header><div><span class="console-live-dot"></span>${t("master")} <small>DEMO-01</small></div><span class="presentation-chip critical">${t("priority")}: ${t("critical")}</span></header><div class="master-console-grid"><article class="master-alert-card"><p>${t("incident")}</p><h3>${incidentId()}</h3><strong>${t("scenarioTitle")}</strong>${fieldList([[t("location"), t("mapPreview")], [t("permissions"), `${t("audio")} &middot; ${t("video")}`], [t("risks"), t("armedInjured")], [t("lastUpdate"), "10:24"]])}</article><article class="master-action-card"><p>${t("humanRequired")}</p><div class="presentation-button-grid"><button type="button" data-unified-action="validate">${t("validateAlert")}</button><button type="button" class="presentation-primary" data-unified-action="route" ${state.validated ? "" : "disabled"}>${t("routeParallel")}</button><button type="button" data-unified-action="request">${t("requestInfo")}</button><button type="button" data-unified-action="docs">${t("viewDocs")}</button></div><p class="master-human-note">${state.validated ? t("validated") : t("humanRequired")}</p></article><article class="master-route-card"><p>${t("involved")}</p><div class="presentation-route-chips">${displayRoute().map((id) => `<span class="${state.routed ? "is-routed" : ""}">${consoleName(id)}</span>`).join("")}</div><strong>${state.routed ? t("routed") : t("pending")}</strong></article></div></div><div class="presentation-master-resource-grid">${renderMasterDispatch()}<article class="presentation-master-context"><header><div><p>${t("contextTitle")}</p><h3>${t("master")}</h3></div><span class="presentation-chip success">${t("authorized")}</span></header>${renderAccessMatrix("master")}</article></div></section>`;
  }

  function renderConsoles() {
    const specialized = Object.values(config.consoles).filter((console) => console.id !== "master");
    const active = activeInstitutionalAgencies().map((id) => config.getConsole(id));
    const activeIds = new Set(active.map((console) => console.id));
    const inactive = specialized.filter((console) => !activeIds.has(console.id));
    return `<section id="presentationConsoles" class="presentation-section presentation-consoles ${sectionClass(3)}"><div class="presentation-section-heading"><div><p class="presentation-kicker">C</p><h2>${t("consolesTitle")}</h2><p>${t("consolesLead")}</p></div><span class="presentation-step-tag">${t("step")} 3</span></div><div class="presentation-console-grid">${active.map((console) => renderConsoleCard(console, true)).join("")}</div><details class="presentation-other-consoles"><summary>${t("otherAgencies")}</summary><div class="presentation-console-grid">${inactive.map((console) => renderConsoleCard(console, false)).join("")}</div></details></section>`;
  }

  function renderDocumentation() {
    const acts = activeInstitutionalAgencies();
    const consistencyStatus = state.consistency.resolved ? t("resolved") : state.consistency.addendum ? t("addendumReceived") : state.consistency.requested ? t("clarificationRequested") : t("needsClarification");
    const reportState = masterReportState();
    const reportLead = reportState === "blocked" ? t("reportBlocked") : t("reportLead");
    return `<section id="presentationDocumentation" class="presentation-section presentation-documentation ${sectionClass(7)}"><div class="presentation-section-heading"><div><p class="presentation-kicker">E</p><h2>${t("actsTitle")}</h2><p>${t("actsLead")}</p></div><span class="presentation-step-tag">${t("step")} 7</span></div><div class="presentation-document-grid">${acts.map(renderAgencyActCard).join("")}</div><div class="presentation-document-flow"><strong>${t("individualActs")}</strong>${t("documentFlow").map((item) => `<span>${item}</span>`).join("<b>&darr;</b>")}<p>${t("masterRole")}</p></div>${renderProcedureStatus()}<div class="presentation-consistency"><header><div><p>${t("consistencyTitle")}</p><h3>${t("consistencyLead")}</h3></div><span class="presentation-chip ${state.consistency.resolved ? "success" : "warning"}">${consistencyStatus}</span></header><div class="presentation-consistency-table">${t("consistencyFields").map((item, index) => `<div><b>${item}</b><span>${index === 0 ? t("inconsistencyArrival") : index === 2 ? t("inconsistencyPeople") : state.consistency.requested ? t("resolved") : t("unreviewed")}</span></div>`).join("")}</div><div class="presentation-clarification-form">${t("clarificationFields").map((item, index) => `<span><b>${item}</b>${index === 0 ? resourceData().operator[state.locale] : index === 1 ? consoleName("security") : index === 2 ? t("inconsistencyArrival") : index === 3 ? t("consistencyLead") : index === 4 ? "10:45" : t("critical")}</span>`).join("")}</div><div class="presentation-button-grid"><button type="button" data-unified-action="request-clarification" ${state.consistency.requested ? "disabled" : ""}>${t("requestClarification")}</button><button type="button" data-unified-action="respond-addendum" ${state.consistency.requested && !state.consistency.addendum ? "" : "disabled"}>${t("respondAddendum")}</button><button type="button" class="presentation-primary" data-unified-action="finalize-all-acts" ${state.allAgencyActsFinalized ? "disabled" : ""}>${t("finalizeAllActs")}</button></div>${state.consistency.addendum ? `<article class="presentation-addendum"><h4>${t("addendumTitle")} &middot; ADD-DEMO-911-001</h4><p>${t("addendumLead")}</p><span>${t("originalRecord")} &middot; 10:34 &middot; ${resourceData().operator[state.locale]}</span></article>` : ""}</div><div class="presentation-master-record"><div><p>${t("reportTitle")}</p><h3>${masterReportPanelStatus()}</h3><span>${incidentId()} &middot; DOC-DEMO-MASTER-001</span><p>${reportLead}</p></div><div><p>${t("destination")}</p><strong>${config.getSuggestedDestination(activeRoute(), state.locale)}</strong><button type="button" class="presentation-primary" data-unified-action="generate-report" ${reportState === "readyToGenerate" ? "" : "disabled"}>${t("generateReport")}</button><button type="button" data-unified-action="remit-report" ${state.masterReport === "ready" ? "" : "disabled"}>${t("remit")}</button></div></div>${renderMasterReportPreview()}<p class="presentation-legal-note">${t("remittanceNotice")}</p></section>`;
  }

  function renderMasterReportPreview() {
    const sections = t("masterPreviewSections");
    const resource = resourceData();
    const reportState = masterReportState();
    const permissions = Object.keys(state.permissions).filter((key) => state.permissions[key]).map((key) => t(key)).join(" &middot; ") || "&mdash;";
    const timeline = state.ledger.length ? state.ledger.map((item) => `${item.time} ${item.code}`).join(" &middot; ") : "&mdash;";
    const evidence = state.evidence.length ? state.evidence.map((item) => `${item.id} / ${t("evidenceTypes")[item.type]}`).join(" &middot; ") : "&mdash;";
    const communications = config.getCommunicationRows(activeRoute(), state.locale).map((item) => item.id).join(" &middot; ") || "&mdash;";
    const acts = activeInstitutionalAgencies().map((id) => agencyActTemplate(id).reference).join(" &middot; ");
    const clarification = state.consistency.requested ? t("clarificationRequested") : "&mdash;";
    const addendum = state.consistency.addendum ? "ADD-DEMO-911-001" : "&mdash;";
    const audit = `${incidentId()} &middot; DOC-DEMO-MASTER-001 &middot; HASH-SIM-MASTER-4821`;
    const resourceSummary = dispatchResourceLines().length ? dispatchResourceLines().join(" &middot; ") : `${resource.unit[state.locale]} &mdash; ${consoleName(resource.agency)}`;
    const items = [[sections.originalAlert, label(alert())], [sections.permissions, permissions], [sections.timeline, timeline], [sections.agencies, activeInstitutionalAgencies().map(consoleName).join(" &middot; ")], [sections.operators, resource.operator[state.locale]], [sections.resources, resourceSummary], [sections.communications, communications], [sections.evidence, evidence], [sections.acts, acts], [sections.inconsistencies, state.consistency.resolved ? t("resolved") : t("needsClarification")], [sections.clarifications, clarification], [sections.addenda, addendum], [sections.audit, audit], [sections.destination, config.getSuggestedDestination(activeRoute(), state.locale)]];
    return `<article class="presentation-master-preview"><header><div><p>${t("masterPreviewTitle")}</p><h3>${t("reportTitle")}</h3></div><span class="presentation-chip ${reportState === "blocked" ? "warning" : "success"}">${masterReportPreviewStatus()}</span></header>${fieldList(items)}<p class="presentation-legal-note">${t("masterReportDisclaimer")}</p></article>`;
  }

  render();
})();
