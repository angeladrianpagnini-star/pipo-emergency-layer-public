(function () {
  const CITIZEN_CLOSURE_VERSION = "5.1.0";

  const PERSPECTIVES = {
    CITIZEN: "CITIZEN",
    FIELD_OPERATOR: "FIELD_OPERATOR",
    FEDERATED_CONSOLE: "FEDERATED_CONSOLE",
    MASTER_CONSOLE: "MASTER_CONSOLE",
  };

  const NEXT_STEP_CATEGORIES = {
    NO_FURTHER_ACTION: "NO_FURTHER_ACTION",
    FOLLOW_UP_REQUIRED: "FOLLOW_UP_REQUIRED",
    MEDICAL_FOLLOW_UP: "MEDICAL_FOLLOW_UP",
    JUDICIAL_FOLLOW_UP: "JUDICIAL_FOLLOW_UP",
    POLICE_REPORT_EXTENSION: "POLICE_REPORT_EXTENSION",
    DIGITAL_EVIDENCE_PRESERVATION: "DIGITAL_EVIDENCE_PRESERVATION",
    SOCIAL_ASSISTANCE: "SOCIAL_ASSISTANCE",
    CHILD_PROTECTION_FOLLOW_UP: "CHILD_PROTECTION_FOLLOW_UP",
    INSURANCE_NOTIFICATION: "INSURANCE_NOTIFICATION",
    DEVICE_SECURITY_ACTIONS: "DEVICE_SECURITY_ACTIONS",
    SAFETY_PRECAUTIONS: "SAFETY_PRECAUTIONS",
  };

  const OBSERVATION_STATUSES = {
    SUBMITTED: "SUBMITTED",
    RECEIVED: "RECEIVED",
    UNDER_REVIEW: "UNDER_REVIEW",
    CLARIFICATION_REQUESTED: "CLARIFICATION_REQUESTED",
    RESPONDED: "RESPONDED",
    CLOSED: "CLOSED",
  };

  const DOCUMENT_ACCESS_STATUSES = {
    REQUESTED: "REQUESTED",
    APPROVED_FOR_DEMO: "APPROVED_FOR_DEMO",
    RESTRICTED: "RESTRICTED",
    DOWNLOADED: "DOWNLOADED",
  };

  const CITIZEN_NEXT_STEP_DISCLAIMER = "Las gestiones posteriores pueden variar segun la autoridad competente y las circunstancias del caso.";
  const CITIZEN_AI_NOTICE = "AI-assisted citizen summary - institutionally reviewed.";
  const CITIZEN_AI_UNAVAILABLE_NOTICE = "Citizen summary generated from structured demo records without external AI.";

  const SCENARIOS = {
    A_ACCIDENT: {
      id: "A_ACCIDENT",
      label: "A - Accidente multidisciplinario",
      incidentId: "PIPO-BW-ACC-000124",
      description: "Alerta simulada por accidente vial con lesion, corte de transito y apoyo sanitario.",
      finalState: "Cerrado con acta y seguimiento sanitario",
      organizations: ["Centro de Monitoreo", "911 Seguridad", "107 Salud", "Transito vial", "Bomberos"],
      actions: [
        "Se recibio la alerta inicial y se creo un hilo documental.",
        "Se derivo la intervencion a seguridad, salud, transito y bomberos.",
        "Se registro arribo de equipos de campo y comunicacion operativa.",
        "Se dejo constancia de asistencia sanitaria simulada y ordenamiento vial.",
      ],
      derivations: ["911 Seguridad", "107 Salud", "Transito vial", "Bomberos"],
      documents: [
        { id: "DOC-CIT-SUMMARY", label: "Resumen ciudadano", source: "Centro de Monitoreo", enabled: true },
        { id: "DOC-MED-CERT-DEMO", label: "Constancia sanitaria simulada", source: "107 Salud", enabled: true },
        { id: "DOC-POLICE-REF-DEMO", label: "Referencia de acta policial simulada", source: "911 Seguridad", enabled: true },
      ],
      restrictedDocuments: [
        { id: "DOC-TACTICAL-AUDIO-DEMO", label: "Comunicaciones internas", reason: "Contiene coordinacion operativa y datos de terceros." },
        { id: "DOC-THIRD-PARTY-EVIDENCE-DEMO", label: "Evidencia de terceros", reason: "Puede afectar privacidad o medidas posteriores." },
      ],
      nextSteps: [
        { category: NEXT_STEP_CATEGORIES.MEDICAL_FOLLOW_UP, label: "Realizar control sanitario si aparecen nuevos sintomas.", responsible: "107 Salud" },
        { category: NEXT_STEP_CATEGORIES.POLICE_REPORT_EXTENSION, label: "Solicitar ampliacion de constancia si se requiere tramite posterior.", responsible: "911 Seguridad" },
        { category: NEXT_STEP_CATEGORIES.INSURANCE_NOTIFICATION, label: "Conservar referencias para una eventual comunicacion a aseguradora.", responsible: "Ciudadano" },
        { category: NEXT_STEP_CATEGORIES.SAFETY_PRECAUTIONS, label: "Evitar exponerse nuevamente en la zona del hecho hasta su normalizacion.", responsible: "Ciudadano" },
      ],
      careRecommendations: [
        "Conservar el ID del incidente para cualquier consulta.",
        "No compartir imagenes sensibles en canales no oficiales.",
        "Solicitar asistencia medica si el malestar o dolor continua.",
      ],
      referenceNumbers: ["ACT-POL-DEMO-2026-000124", "CERT-SALUD-DEMO-000124"],
    },
    B_STOLEN_DEVICE: {
      id: "B_STOLEN_DEVICE",
      label: "B - Dispositivo sustraido",
      incidentId: "PIPO-BW-DEV-000228",
      description: "Alerta simulada por robo de dispositivo enrolado con preservacion digital y denuncia.",
      finalState: "Preservacion digital iniciada con seguimiento judicial simulado",
      organizations: ["Centro de Monitoreo", "Comisaria", "Ciberdelitos", "Fiscalia"],
      actions: [
        "Se recibio el reporte ciudadano por dispositivo sustraido.",
        "Se registro referencia de denuncia simulada.",
        "Se activo preservacion digital demostrativa sin extraccion real.",
        "Se dejo continuidad con fiscalia y area especializada.",
      ],
      derivations: ["Comisaria", "Ciberdelitos", "Fiscalia"],
      documents: [
        { id: "DOC-CIT-SUMMARY", label: "Resumen ciudadano", source: "Centro de Monitoreo", enabled: true },
        { id: "DOC-COMPLAINT-DEMO", label: "Constancia de denuncia simulada", source: "Comisaria", enabled: true },
        { id: "DOC-DIGITAL-PRESERVATION-DEMO", label: "Constancia de preservacion digital simulada", source: "Ciberdelitos", enabled: true },
      ],
      restrictedDocuments: [
        { id: "DOC-JUDICIAL-DETAIL-DEMO", label: "Detalle judicial restringido", reason: "Puede afectar medidas o requerimientos de autoridad competente." },
        { id: "DOC-DEVICE-SIGNAL-DEMO", label: "Senales tecnicas del dispositivo", reason: "Se limita para evitar exposicion de tecnicas y datos de terceros." },
      ],
      nextSteps: [
        { category: NEXT_STEP_CATEGORIES.DIGITAL_EVIDENCE_PRESERVATION, label: "No borrar mensajes, capturas o comprobantes vinculados al hecho.", responsible: "Ciudadano" },
        { category: NEXT_STEP_CATEGORIES.DEVICE_SECURITY_ACTIONS, label: "Cambiar credenciales y revocar sesiones activas desde servicios oficiales.", responsible: "Ciudadano" },
        { category: NEXT_STEP_CATEGORIES.JUDICIAL_FOLLOW_UP, label: "Consultar estado con la referencia de denuncia simulada.", responsible: "Fiscalia" },
        { category: NEXT_STEP_CATEGORIES.POLICE_REPORT_EXTENSION, label: "Ampliar denuncia si aparecen nuevos datos.", responsible: "Comisaria" },
        { category: NEXT_STEP_CATEGORIES.SAFETY_PRECAUTIONS, label: "Evitar confrontar a terceros por cuenta propia.", responsible: "Ciudadano" },
      ],
      careRecommendations: [
        "Guardar el ID del incidente y la referencia de denuncia simulada.",
        "Usar canales oficiales para nuevas comunicaciones.",
        "No publicar ubicaciones o datos sensibles asociados al hecho.",
      ],
      referenceNumbers: ["DEN-COM-DEMO-2026-000228", "PRES-CIBER-DEMO-000228"],
    },
  };

  const PERSPECTIVE_DETAILS = {
    CITIZEN: {
      icon: "CIU",
      name: "Ciudadano",
      role: "Persona alertante o solicitante",
      permissions: [
        "consultar estado ciudadano",
        "recibir resumen depurado",
        "descargar documentos habilitados",
        "confirmar recepcion",
        "enviar opinion de servicio",
        "presentar observacion formal",
      ],
      availableInformation: [
        "ID de incidente",
        "estado general",
        "organismos participantes",
        "derivaciones visibles",
        "proximos pasos",
        "documentos habilitados",
      ],
      restrictedFunctions: [
        "identidades protegidas",
        "notas internas",
        "operaciones reservadas",
        "evidencia de terceros",
        "datos que afecten una investigacion",
        "comunicaciones internas",
      ],
    },
    FIELD_OPERATOR: {
      icon: "CAM",
      name: "Operador de campo",
      role: "Funcionario o equipo receptor en territorio",
      permissions: [
        "aceptar derivacion propia",
        "registrar arribo",
        "crear acontecimientos propios",
        "adjuntar evidencia simulada",
        "pedir apoyo",
        "crear acta individual",
      ],
      availableInformation: [
        "asignacion propia",
        "minimo necesario del incidente",
        "canal operativo multired",
        "propios eventos y evidencias",
      ],
      restrictedFunctions: [
        "firmar por otro operador",
        "editar actas ajenas",
        "borrar eventos",
        "cerrar expediente maestro",
      ],
    },
    FEDERATED_CONSOLE: {
      icon: "FED",
      name: "Consola federada",
      role: "Base operativa participante",
      permissions: [
        "ver incidentes asignados",
        "operar sus propios agentes",
        "registrar intervenciones propias",
        "consultar evidencia compartida",
        "cerrar participacion propia",
      ],
      availableInformation: [
        "incidentes asignados",
        "operadores propios",
        "evidencia compartida por finalidad",
        "actas propias",
        "estado de participacion",
      ],
      restrictedFunctions: [
        "ver toda la investigacion",
        "reescribir actas de otro organismo",
        "acceder sin finalidad",
        "cerrar el incidente completo sin competencia",
      ],
    },
    MASTER_CONSOLE: {
      icon: "MAS",
      name: "Consola maestra",
      role: "Coordinacion y expediente maestro",
      permissions: [
        "mapear el incidente completo",
        "ver participantes y cronologia referenciada",
        "solicitar aclaraciones",
        "coordinar cierre",
        "generar paquete ciudadano",
        "confirmar entrega",
      ],
      availableInformation: [
        "organismos participantes",
        "actas referenciadas en solo lectura",
        "inconsistencias",
        "permisos",
        "entrega ciudadana",
      ],
      restrictedFunctions: [
        "reescribir actas ajenas",
        "borrar eventos",
        "firmar por operadores",
        "alterar evidencia",
        "fusionar divergencias como relato unico",
      ],
    },
  };

  function clone(value) {
    return JSON.parse(JSON.stringify(value || null));
  }

  function nowIso() {
    return new Date().toISOString();
  }

  function unique(values) {
    return Array.from(new Set((values || []).filter(Boolean)));
  }

  function compact(value) {
    return String(value || "").trim();
  }

  function demoHash(value, prefix = "demo-sha256") {
    const source = JSON.stringify(value || {});
    let hash = 2166136261;
    for (let index = 0; index < source.length; index += 1) {
      hash ^= source.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return `${prefix}-${(hash >>> 0).toString(16).padStart(8, "0")}`;
  }

  function integrityReference(value) {
    return {
      algorithm: "DEMO_FNV1A_FALLBACK",
      value: demoHash(value),
      generatedAt: nowIso(),
      label: "Referencia de integridad de la demostracion",
    };
  }

  function withIntegrity(record) {
    record.integrityReference = integrityReference({ ...record, integrityReference: null });
    return record;
  }

  function nextId(state, collectionName, prefix) {
    const count = (state?.[collectionName] || []).length + 1;
    return `${prefix}-${String(count).padStart(3, "0")}`;
  }

  function baseRecord(state, collectionName, prefix, createdBy, status = "DRAFT", classification = "OPERATIONAL") {
    return {
      id: nextId(state, collectionName, prefix),
      incidentId: state.incidentId,
      createdAt: nowIso(),
      createdBy: createdBy || "OP-MASTER-01",
      status,
      version: CITIZEN_CLOSURE_VERSION,
      classification,
      integrityReference: null,
    };
  }

  function ledgerEnvelope(type, summary, payload = {}, options = {}) {
    return {
      type,
      operatorId: options.operatorId || "OP-MASTER-01",
      consoleId: options.consoleId || "CON-MASTER",
      sessionId: options.sessionId || "SES-MASTER-20260718",
      payload: {
        summary,
        ...payload,
      },
      classification: options.classification || payload.classification || "OPERATIONAL",
    };
  }

  function ok(payload) {
    return { ok: true, ...payload };
  }

  function fail(error) {
    return { ok: false, error };
  }

  function getScenario(id) {
    return SCENARIOS[id] || SCENARIOS.A_ACCIDENT;
  }

  function deriveIncidentId(buildWeekState, scenarioId) {
    return buildWeekState?.incident?.id || getScenario(scenarioId).incidentId;
  }

  function createPerspectiveSession(state, perspective = PERSPECTIVES.MASTER_CONSOLE, options = {}) {
    const detail = PERSPECTIVE_DETAILS[perspective] || PERSPECTIVE_DETAILS.MASTER_CONSOLE;
    const record = {
      ...baseRecord(state, "perspectiveSessions", "DPS", options.createdBy || "OP-MASTER-01", "ACTIVE", "OPERATIONAL"),
      perspective,
      role: detail.role,
      selectedConsoleId: options.selectedConsoleId || state.selectedConsoleId || "CON-MASTER",
      selectedFieldOperatorId: options.selectedFieldOperatorId || state.selectedFieldOperatorId || "OP-FIELD-911-A",
      permissions: [...detail.permissions],
      availableInformation: [...detail.availableInformation],
      restrictedFunctions: [...detail.restrictedFunctions],
      preservedStateMarkers: {
        incidentId: state.incidentId,
        summaries: state.summaries.length,
        packages: state.packages.length,
        observations: state.observations.length,
        feedback: state.feedback.length,
        receipts: state.receipts.length,
      },
    };
    return withIntegrity(record);
  }

  function createCitizenClosureState(buildWeekState = {}, fieldState = {}, procedureState = {}, ledgerEvents = []) {
    const scenarioId = "A_ACCIDENT";
    const state = {
      version: CITIZEN_CLOSURE_VERSION,
      incidentId: deriveIncidentId(buildWeekState, scenarioId),
      selectedPerspective: PERSPECTIVES.MASTER_CONSOLE,
      selectedConsoleId: "CON-MASTER",
      selectedFieldOperatorId: fieldState?.selectedOperatorId || "OP-FIELD-911-A",
      scenarioId,
      aiAvailable: true,
      perspectiveSessions: [],
      summaries: [],
      packages: [],
      documentAccesses: [],
      feedback: [],
      observations: [],
      followUps: [],
      receipts: [],
      safeViews: [],
      restrictedExclusions: [],
      lastMessage: "Etapa 5.1 lista para simulacion multiperspectiva.",
      contextFingerprint: demoHash({
        incident: buildWeekState?.incident?.id,
        fieldOperators: fieldState?.operators?.length || 0,
        procedureAct: procedureState?.procedureAct?.actId || null,
        ledgerEvents: ledgerEvents?.length || 0,
      }),
    };
    state.perspectiveSessions.push(createPerspectiveSession(state, state.selectedPerspective));
    return state;
  }

  function changePerspective(state, perspective, options = {}) {
    if (!Object.values(PERSPECTIVES).includes(perspective)) return fail("Perspectiva no permitida.");
    state.selectedPerspective = perspective;
    if (options.selectedConsoleId) state.selectedConsoleId = options.selectedConsoleId;
    if (options.selectedFieldOperatorId) state.selectedFieldOperatorId = options.selectedFieldOperatorId;
    const session = createPerspectiveSession(state, perspective, options);
    state.perspectiveSessions.push(session);
    state.lastMessage = `Perspectiva activa: ${PERSPECTIVE_DETAILS[perspective].name}. El incidente conserva su estado.`;
    return ok({
      session,
      ledger: ledgerEnvelope("demo.perspective.changed", state.lastMessage, {
        perspective,
        selectedConsoleId: state.selectedConsoleId,
        selectedFieldOperatorId: state.selectedFieldOperatorId,
        preservedIncidentId: state.incidentId,
      }, { operatorId: options.createdBy || "OP-MASTER-01", consoleId: state.selectedConsoleId }),
    });
  }

  function setCitizenAiAvailability(state, available) {
    state.aiAvailable = Boolean(available);
    state.lastMessage = state.aiAvailable
      ? "Asistencia IA simulada disponible para lenguaje claro."
      : "Asistencia IA no disponible. Se usan registros estructurados de la demo.";
    return ok({ available: state.aiAvailable });
  }

  function activeScenario(state, context = {}) {
    const suggested = state.scenarioId || context.scenarioId;
    return getScenario(suggested);
  }

  function organizationLabel(value, context) {
    if (!value) return null;
    const match = context.buildWeekState?.operationalConsoles?.find((consoleItem) => consoleItem.id === value);
    return match?.name || value;
  }

  function collectOrganizations(masterRecord, context, scenario) {
    const fromMaster = masterRecord?.organizations || [];
    const fromBuildWeek = context.buildWeekState?.incidentParticipants
      ?.map((participant) => context.buildWeekState.operationalConsoles?.find((consoleItem) => consoleItem.id === participant.consoleId)?.name)
      || [];
    return unique([...scenario.organizations, ...fromMaster, ...fromBuildWeek].map((item) => organizationLabel(item, context)));
  }

  function buildRestrictedExclusions(scenario) {
    return [
      { label: "Identidades protegidas", genericReason: "Se oculta para proteger a personas, denunciantes o funcionarios intervinientes." },
      { label: "Notas internas de operadores", genericReason: "No forman parte de la devolucion ciudadana y pueden contener evaluaciones preliminares." },
      { label: "Operaciones reservadas", genericReason: "Se limita para no afectar medidas en curso ni seguridad de terceros." },
      { label: "Evidencia de terceros", genericReason: "Se protege privacidad, imagen, voz y datos de personas no solicitantes." },
      { label: "Informacion RESTRICTED_JUDICIAL", genericReason: "Requiere autoridad competente y finalidad especifica." },
      { label: "Comunicaciones internas", genericReason: "Se documentan en el hilo operativo, pero no se entregan como copia ciudadana." },
      ...(scenario.restrictedDocuments || []).map((item) => ({ label: item.label, genericReason: item.reason })),
    ];
  }

  function visibleCitizenTimeline(context, scenario) {
    const events = context.ledgerEvents || [];
    const safeEvents = events
      .filter((event) => ["incident.created", "console.assigned", "field.arrived", "incident.closed", "citizen.closure.summary.generated"].includes(event.type))
      .slice(-5)
      .map((event) => ({
        time: event.timestamp,
        label: event.payload?.summary || event.type,
        reference: event.eventId,
      }));
    if (safeEvents.length) return safeEvents;
    return scenario.actions.slice(0, 4).map((action, index) => ({
      time: `Paso ${index + 1}`,
      label: action,
      reference: `CIT-STEP-${index + 1}`,
    }));
  }

  function buildCitizenSafeView(masterRecord, accessContext = {}) {
    const scenario = getScenario(accessContext.scenarioId || "A_ACCIDENT");
    const context = accessContext.context || accessContext;
    const incident = context.buildWeekState?.incident || masterRecord?.incident || {};
    const organizations = collectOrganizations(masterRecord, context, scenario);
    const finalState = context.procedureState?.closure?.status || masterRecord?.closureStatus || scenario.finalState;
    const summaryId = context.state?.summaries?.slice(-1)[0]?.id || "pendiente";
    const deliverableAutomatically = [
      { kind: "incident", label: "ID de incidente", value: incident.id || scenario.incidentId },
      { kind: "thread", label: "Hilo documental", value: incident.threadId || "TRACE-DEMO" },
      { kind: "state", label: "Estado general", value: finalState },
      { kind: "organizations", label: "Organismos participantes", value: organizations.join(" / ") },
      { kind: "summary", label: "Resumen ciudadano", value: summaryId },
    ];
    const deliverableOnRequest = scenario.documents
      .filter((document) => document.enabled)
      .map((document) => ({
        documentId: document.id,
        label: document.label,
        source: document.source,
        requestable: true,
        reason: "Documento habilitado para consulta ciudadana en esta demo.",
      }));
    const restricted = buildRestrictedExclusions(scenario);
    return {
      generatedAt: nowIso(),
      incidentId: incident.id || scenario.incidentId,
      deliverableAutomatically,
      deliverableOnRequest,
      restricted,
      visibleTimeline: visibleCitizenTimeline(context, scenario),
      minimizationNotice: "Vista depurada: solo muestra informacion necesaria para el ciudadano y excluye datos sensibles o internos.",
    };
  }

  function createFollowUpActions(state, scenario, createdBy = "OP-MASTER-01") {
    const actions = scenario.nextSteps.map((step, index) => withIntegrity({
      ...baseRecord(state, "followUps", "CFA", createdBy, "OPEN", "OPERATIONAL"),
      id: `CFA-${String(state.followUps.length + index + 1).padStart(3, "0")}`,
      category: step.category,
      label: step.label,
      responsibleOrganization: step.responsible,
      dueMode: "segun organismo competente",
      disclaimer: CITIZEN_NEXT_STEP_DISCLAIMER,
      completedAt: null,
    }));
    state.followUps.push(...actions);
    return actions;
  }

  function generateCitizenNextSteps(state, context = {}, createdBy = "OP-MASTER-01") {
    const scenario = activeScenario(state, context);
    const actions = createFollowUpActions(state, scenario, createdBy);
    state.lastMessage = "Proximos pasos ciudadanos generados con alcance informativo.";
    return ok({
      followUps: actions,
      ledger: ledgerEnvelope("citizen.next_steps.generated", state.lastMessage, {
        categories: actions.map((item) => item.category),
        disclaimer: CITIZEN_NEXT_STEP_DISCLAIMER,
      }, { operatorId: createdBy, consoleId: "CON-MASTER" }),
    });
  }

  function ensureFollowUps(state, scenario, createdBy) {
    if (!state.followUps.length) createFollowUpActions(state, scenario, createdBy);
    return state.followUps;
  }

  function buildPlainLanguageSummary(scenario, incident, finalState) {
    return [
      `Se registro una alerta identificada como ${incident.id || scenario.incidentId}.`,
      `El caso fue tratado como ${scenario.description.toLowerCase()}`,
      `El estado informado para la devolucion ciudadana es: ${finalState}.`,
      "Esta devolucion no incluye informacion interna, datos de terceros ni contenido que pueda afectar medidas posteriores.",
    ].join(" ");
  }

  function generateCitizenClosureSummary(state, context = {}, createdBy = "OP-MASTER-01") {
    const scenario = activeScenario(state, context);
    const procedureState = context.procedureState || {};
    const buildWeekState = context.buildWeekState || {};
    const masterRecord = procedureState.masterIncidentRecord || buildWeekState.masterIncidentRecord || null;
    const incident = buildWeekState.incident || masterRecord?.incident || { id: state.incidentId };
    const closure = procedureState.closure || buildWeekState.closure || {};
    const finalState = closure.status || closure.result || masterRecord?.closureStatus || scenario.finalState;
    const followUps = ensureFollowUps(state, scenario, createdBy);
    const safeView = buildCitizenSafeView(masterRecord, { ...context, state, scenarioId: scenario.id });
    const record = {
      ...baseRecord(state, "summaries", "CCS", createdBy, "GENERATED", "OPERATIONAL"),
      title: "Resumen ciudadano de actuacion y continuidad",
      generatedAt: nowIso(),
      reviewedAt: null,
      reviewedBy: null,
      incidentDateStart: incident.createdAt || "fecha inicial no disponible en demo",
      incidentDateEnd: closure.closedAt || "cierre operativo no informado en demo",
      initialDescription: incident.initialDescription || scenario.description,
      finalState,
      participatingOrganizations: collectOrganizations(masterRecord, context, scenario),
      relevantActions: scenario.actions,
      derivations: scenario.derivations,
      simulatedReferences: unique([
        procedureState.procedureAct?.actId,
        masterRecord?.id,
        ...(scenario.referenceNumbers || []),
      ]),
      enabledDocuments: scenario.documents.filter((document) => document.enabled),
      pendingMeasures: followUps.map((item) => ({
        category: item.category,
        label: item.label,
        responsibleOrganization: item.responsibleOrganization,
      })),
      responsibleOrganization: "Centro de Monitoreo y organismo competente segun derivacion",
      nextSteps: followUps.map((item) => ({
        category: item.category,
        label: item.label,
        responsibleOrganization: item.responsibleOrganization,
      })),
      nextStepsDisclaimer: CITIZEN_NEXT_STEP_DISCLAIMER,
      careRecommendations: scenario.careRecommendations,
      queryChannels: ["Canal PIPO demo", "Mesa de entrada del organismo interviniente", "Referencia del incidente"],
      integrityBase: safeView.deliverableAutomatically.map((item) => item.value).join("|"),
      citizenLanguageSummary: buildPlainLanguageSummary(scenario, incident, finalState),
      safeView,
      aiAssistedNotice: state.aiAvailable ? CITIZEN_AI_NOTICE : CITIZEN_AI_UNAVAILABLE_NOTICE,
      aiLimits: [
        "Puede ayudar a redactar en lenguaje claro.",
        "Puede detectar informacion restringida antes de entregar.",
        "No decide derechos, evidencia entregable, validez de observaciones ni medidas judiciales.",
      ],
    };
    state.summaries.push(withIntegrity(record));
    state.safeViews.push(safeView);
    state.restrictedExclusions = safeView.restricted;
    state.lastMessage = "Resumen ciudadano generado y pendiente de revision institucional.";
    return ok({
      summary: record,
      safeView,
      ledger: ledgerEnvelope("citizen.closure.summary.generated", state.lastMessage, {
        summaryId: record.id,
        scenarioId: scenario.id,
        aiAvailable: state.aiAvailable,
      }, { operatorId: createdBy, consoleId: "CON-MASTER" }),
    });
  }

  function reviewCitizenClosureSummary(state, reviewedBy = "OP-MASTER-01") {
    const summary = state.summaries[state.summaries.length - 1];
    if (!summary) return fail("Primero debe generarse el resumen ciudadano.");
    summary.status = "REVIEWED";
    summary.reviewedAt = nowIso();
    summary.reviewedBy = reviewedBy;
    withIntegrity(summary);
    state.lastMessage = "Resumen ciudadano revisado institucionalmente.";
    return ok({
      summary,
      ledger: ledgerEnvelope("citizen.closure.summary.reviewed", state.lastMessage, {
        summaryId: summary.id,
        reviewedBy,
      }, { operatorId: reviewedBy, consoleId: "CON-MASTER" }),
    });
  }

  function buildPackagePrintView(citizenPackage) {
    const summary = citizenPackage.summary;
    return [
      "PIPO Emergency Layer - Paquete ciudadano simulado",
      `Incidente: ${citizenPackage.incidentId}`,
      `Estado: ${summary.finalState}`,
      `Organismos: ${summary.participatingOrganizations.join(" / ")}`,
      "Acciones relevantes:",
      ...summary.relevantActions.map((action) => `- ${action}`),
      "Proximos pasos:",
      ...citizenPackage.nextSteps.map((step) => `- ${step.category}: ${step.label}`),
      `Integridad: ${citizenPackage.integrityReference?.value || "pendiente"}`,
    ].join("\n");
  }

  function buildSanitizedJson(citizenPackage) {
    return {
      id: citizenPackage.id,
      incidentId: citizenPackage.incidentId,
      status: citizenPackage.status,
      generatedAt: citizenPackage.createdAt,
      deliveredAt: citizenPackage.deliveredAt,
      summary: {
        title: citizenPackage.summary.title,
        finalState: citizenPackage.summary.finalState,
        participatingOrganizations: citizenPackage.summary.participatingOrganizations,
        relevantActions: citizenPackage.summary.relevantActions,
        nextSteps: citizenPackage.nextSteps,
        queryChannels: citizenPackage.summary.queryChannels,
      },
      enabledDocuments: citizenPackage.enabledDocuments.map((document) => ({
        documentId: document.id,
        label: document.label,
        source: document.source,
      })),
      referenceNumbers: citizenPackage.referenceNumbers,
      integrityReference: citizenPackage.integrityReference,
    };
  }

  function createCitizenIncidentPackage(state, createdBy = "OP-MASTER-01") {
    const summary = state.summaries[state.summaries.length - 1];
    if (!summary) return fail("Primero debe generarse el resumen ciudadano.");
    if (summary.status !== "REVIEWED") return fail("El resumen debe estar revisado antes de preparar entrega.");
    const citizenPackage = {
      ...baseRecord(state, "packages", "CIP", createdBy, "READY", "OPERATIONAL"),
      summary: clone(summary),
      nextSteps: clone(summary.nextSteps),
      enabledDocuments: clone(summary.enabledDocuments),
      referenceNumbers: clone(summary.simulatedReferences),
      followUpChannel: "Canal PIPO demo / organismo competente",
      deliveredAt: null,
      receipt: null,
      browserPdfAvailable: true,
      printView: "",
      sanitizedJsonExport: null,
    };
    withIntegrity(citizenPackage);
    citizenPackage.printView = buildPackagePrintView(citizenPackage);
    citizenPackage.sanitizedJsonExport = buildSanitizedJson(citizenPackage);
    state.packages.push(citizenPackage);
    state.lastMessage = "Paquete ciudadano listo: resumen, proximos pasos, documentos habilitados y referencia de integridad.";
    return ok({ citizenPackage });
  }

  function deliverCitizenPackage(state, method = "demo-public-link", createdBy = "OP-MASTER-01") {
    const citizenPackage = state.packages[state.packages.length - 1];
    if (!citizenPackage) return fail("Primero debe prepararse el paquete ciudadano.");
    citizenPackage.status = "DELIVERED";
    citizenPackage.deliveredAt = nowIso();
    const receipt = {
      ...baseRecord(state, "receipts", "CDR", createdBy, "DELIVERED", "OPERATIONAL"),
      packageId: citizenPackage.id,
      deliveredAt: citizenPackage.deliveredAt,
      openedAt: null,
      acknowledgedAt: null,
      deliveryMethod: method,
      documentVersion: citizenPackage.version,
      integrityReference: citizenPackage.integrityReference,
    };
    state.receipts.push(withIntegrity(receipt));
    citizenPackage.receipt = clone(receipt);
    withIntegrity(citizenPackage);
    state.lastMessage = "Paquete ciudadano entregado con recibo trazable.";
    return ok({
      citizenPackage,
      receipt,
      ledger: ledgerEnvelope("citizen.closure.summary.delivered", state.lastMessage, {
        packageId: citizenPackage.id,
        receiptId: receipt.id,
        deliveryMethod: method,
      }, { operatorId: createdBy, consoleId: "CON-MASTER" }),
    });
  }

  function openCitizenPackage(state, createdBy = "CITIZEN-DEMO-01") {
    const receipt = state.receipts[state.receipts.length - 1];
    if (!receipt) return fail("No existe recibo de entrega.");
    receipt.openedAt = nowIso();
    receipt.status = "OPENED";
    withIntegrity(receipt);
    state.lastMessage = "Apertura ciudadana registrada.";
    return ok({
      receipt,
      ledger: ledgerEnvelope("citizen.closure.summary.opened", state.lastMessage, {
        receiptId: receipt.id,
      }, { operatorId: createdBy, consoleId: "CON-CITIZEN", sessionId: "SES-CITIZEN-DEMO" }),
    });
  }

  function confirmCitizenReceipt(state, createdBy = "CITIZEN-DEMO-01") {
    const receipt = state.receipts[state.receipts.length - 1];
    if (!receipt) return fail("No existe recibo de entrega.");
    receipt.acknowledgedAt = nowIso();
    receipt.status = "ACKNOWLEDGED";
    withIntegrity(receipt);
    state.lastMessage = "Recepcion ciudadana confirmada.";
    return ok({
      receipt,
      ledger: ledgerEnvelope("citizen.closure.receipt.confirmed", state.lastMessage, {
        receiptId: receipt.id,
      }, { operatorId: createdBy, consoleId: "CON-CITIZEN", sessionId: "SES-CITIZEN-DEMO" }),
    });
  }

  function findDocument(state, documentId) {
    const summary = state.summaries[state.summaries.length - 1];
    const scenario = activeScenario(state);
    const enabled = summary?.enabledDocuments || scenario.documents;
    const document = enabled.find((item) => item.id === documentId);
    if (document) return { document, restricted: false };
    const restricted = scenario.restrictedDocuments.find((item) => item.id === documentId);
    return { document: restricted || null, restricted: Boolean(restricted) };
  }

  function requestCitizenDocumentAccess(state, documentId, createdBy = "CITIZEN-DEMO-01") {
    const found = findDocument(state, documentId);
    if (!found.document) return fail("Documento no reconocido en la demo.");
    const access = {
      ...baseRecord(state, "documentAccesses", "CDA", createdBy, DOCUMENT_ACCESS_STATUSES.REQUESTED, "OPERATIONAL"),
      documentId,
      label: found.document.label,
      source: found.document.source || "organismo competente",
      decision: found.restricted ? "NO_HABILITADO" : "HABILITADO_DEMO",
      reason: found.restricted
        ? "No entregable en vista ciudadana por resguardo de datos o medidas pendientes."
        : "Documento habilitado en paquete ciudadano simulado.",
      requestedAt: nowIso(),
      downloadedAt: null,
    };
    access.status = found.restricted ? DOCUMENT_ACCESS_STATUSES.RESTRICTED : DOCUMENT_ACCESS_STATUSES.APPROVED_FOR_DEMO;
    state.documentAccesses.push(withIntegrity(access));
    state.lastMessage = found.restricted ? "Solicitud registrada: acceso restringido." : "Solicitud registrada: documento habilitado.";
    return ok({
      access,
      ledger: ledgerEnvelope("citizen.document.access.requested", state.lastMessage, {
        accessId: access.id,
        documentId,
        decision: access.decision,
      }, { operatorId: createdBy, consoleId: "CON-CITIZEN", sessionId: "SES-CITIZEN-DEMO" }),
    });
  }

  function downloadCitizenDocument(state, accessId, createdBy = "CITIZEN-DEMO-01") {
    const access = state.documentAccesses.find((item) => item.id === accessId)
      || state.documentAccesses.slice().reverse().find((item) => item.status === DOCUMENT_ACCESS_STATUSES.APPROVED_FOR_DEMO);
    if (!access) return fail("No existe solicitud de documento habilitada.");
    if (access.status === DOCUMENT_ACCESS_STATUSES.RESTRICTED) return fail("El documento solicitado esta restringido.");
    access.status = DOCUMENT_ACCESS_STATUSES.DOWNLOADED;
    access.downloadedAt = nowIso();
    withIntegrity(access);
    state.lastMessage = "Descarga simulada registrada sin exponer datos no habilitados.";
    return ok({
      access,
      ledger: ledgerEnvelope("citizen.document.downloaded", state.lastMessage, {
        accessId: access.id,
        documentId: access.documentId,
      }, { operatorId: createdBy, consoleId: "CON-CITIZEN", sessionId: "SES-CITIZEN-DEMO" }),
    });
  }

  function validRating(value) {
    const number = Number(value);
    return Number.isInteger(number) && number >= 1 && number <= 5;
  }

  function submitCitizenServiceFeedback(state, input = {}, createdBy = "CITIZEN-DEMO-01") {
    const fields = ["rapidity", "clarity", "treatment", "coordination", "protectionFeeling", "nextStepUnderstanding", "overallSatisfaction"];
    const invalid = fields.filter((field) => !validRating(input[field]));
    if (invalid.length) return fail(`Calificacion invalida: ${invalid[0]}.`);
    const feedback = {
      ...baseRecord(state, "feedback", "CSF", createdBy, "RECEIVED", "OPERATIONAL"),
      ratings: fields.reduce((acc, field) => ({ ...acc, [field]: Number(input[field]) }), {}),
      optionalComment: compact(input.optionalComment).slice(0, 280),
      qualityDataOnly: true,
      doesNotModifyProcedure: true,
      operatorEvaluatedPublicly: false,
    };
    state.feedback.push(withIntegrity(feedback));
    state.lastMessage = "Opinion de servicio registrada como dato de calidad separado del expediente.";
    return ok({
      feedback,
      ledger: ledgerEnvelope("citizen.feedback.submitted", state.lastMessage, {
        feedbackId: feedback.id,
        qualityDataOnly: true,
      }, { operatorId: createdBy, consoleId: "CON-CITIZEN", sessionId: "SES-CITIZEN-DEMO" }),
    });
  }

  function createCitizenFormalObservation(state, input = {}, createdBy = "CITIZEN-DEMO-01") {
    if (!compact(input.description)) return fail("La observacion formal requiere descripcion.");
    const observation = {
      ...baseRecord(state, "observations", "CFO", createdBy, OBSERVATION_STATUSES.SUBMITTED, "OPERATIONAL"),
      observationId: nextId(state, "observations", "OBS"),
      category: input.category || "SOLICITUD_DE_ACLARACION",
      description: compact(input.description).slice(0, 800),
      referencedActIds: input.referencedActIds || [],
      referencedEventIds: input.referencedEventIds || [],
      attachedSimulatedFiles: input.attachedSimulatedFiles || [],
      assignedConsole: null,
      response: null,
      resolvedAt: null,
      effectNotice: "La observacion no modifica registros previos; puede originar aclaracion, ampliacion, rectificacion o investigacion administrativa simulada.",
    };
    state.observations.push(withIntegrity(observation));
    state.lastMessage = "Observacion formal creada como tramite separado de la opinion de servicio.";
    return ok({
      observation,
      ledger: ledgerEnvelope("citizen.observation.created", state.lastMessage, {
        observationId: observation.observationId,
        category: observation.category,
      }, { operatorId: createdBy, consoleId: "CON-CITIZEN", sessionId: "SES-CITIZEN-DEMO" }),
    });
  }

  function assignCitizenObservation(state, observationId, consoleId = "CON-MASTER", createdBy = "OP-MASTER-01") {
    const observation = state.observations.find((item) => item.observationId === observationId) || state.observations[state.observations.length - 1];
    if (!observation) return fail("No existe observacion para asignar.");
    observation.assignedConsole = consoleId;
    observation.status = OBSERVATION_STATUSES.RECEIVED;
    withIntegrity(observation);
    state.lastMessage = "Observacion formal recibida y asignada.";
    return ok({
      observation,
      ledger: ledgerEnvelope("citizen.observation.assigned", state.lastMessage, {
        observationId: observation.observationId,
        assignedConsole: consoleId,
      }, { operatorId: createdBy, consoleId }),
    });
  }

  function reviewCitizenObservation(state, observationId, createdBy = "OP-MASTER-01") {
    const observation = state.observations.find((item) => item.observationId === observationId) || state.observations[state.observations.length - 1];
    if (!observation) return fail("No existe observacion para revisar.");
    observation.status = OBSERVATION_STATUSES.UNDER_REVIEW;
    observation.reviewedAt = nowIso();
    withIntegrity(observation);
    state.lastMessage = "Observacion formal bajo revision.";
    return ok({
      observation,
      ledger: ledgerEnvelope("citizen.observation.reviewed", state.lastMessage, {
        observationId: observation.observationId,
      }, { operatorId: createdBy, consoleId: observation.assignedConsole || "CON-MASTER" }),
    });
  }

  function requestCitizenClarification(state, observationId, createdBy = "OP-MASTER-01") {
    const observation = state.observations.find((item) => item.observationId === observationId) || state.observations[state.observations.length - 1];
    if (!observation) return fail("No existe observacion para solicitar aclaracion.");
    observation.status = OBSERVATION_STATUSES.CLARIFICATION_REQUESTED;
    observation.response = "Se solicita ampliar datos puntuales para responder la observacion.";
    withIntegrity(observation);
    state.lastMessage = "Aclaracion solicitada al ciudadano dentro del tramite de observacion.";
    return ok({
      observation,
      ledger: ledgerEnvelope("citizen.clarification.requested", state.lastMessage, {
        observationId: observation.observationId,
      }, { operatorId: createdBy, consoleId: observation.assignedConsole || "CON-MASTER" }),
    });
  }

  function respondCitizenObservation(state, observationId, response = "Se responde la observacion y se conserva el expediente original.", createdBy = "OP-MASTER-01") {
    const observation = state.observations.find((item) => item.observationId === observationId) || state.observations[state.observations.length - 1];
    if (!observation) return fail("No existe observacion para responder.");
    observation.status = OBSERVATION_STATUSES.RESPONDED;
    observation.response = compact(response);
    observation.resolvedAt = nowIso();
    withIntegrity(observation);
    state.lastMessage = "Observacion formal respondida sin modificar registros previos.";
    return ok({
      observation,
      ledger: ledgerEnvelope("citizen.clarification.responded", state.lastMessage, {
        observationId: observation.observationId,
      }, { operatorId: createdBy, consoleId: observation.assignedConsole || "CON-MASTER" }),
    });
  }

  function closeCitizenObservation(state, observationId, createdBy = "OP-MASTER-01") {
    const observation = state.observations.find((item) => item.observationId === observationId) || state.observations[state.observations.length - 1];
    if (!observation) return fail("No existe observacion para cerrar.");
    observation.status = OBSERVATION_STATUSES.CLOSED;
    observation.resolvedAt = observation.resolvedAt || nowIso();
    withIntegrity(observation);
    state.lastMessage = "Observacion formal cerrada.";
    return ok({ observation });
  }

  function markCitizenFollowUpRequired(state, category = NEXT_STEP_CATEGORIES.FOLLOW_UP_REQUIRED, createdBy = "OP-MASTER-01") {
    const followUp = withIntegrity({
      ...baseRecord(state, "followUps", "CFA", createdBy, "OPEN", "OPERATIONAL"),
      category,
      label: "Seguimiento requerido por organismo competente.",
      responsibleOrganization: "Organismo interviniente",
      dueMode: "segun definicion operativa",
      disclaimer: CITIZEN_NEXT_STEP_DISCLAIMER,
      completedAt: null,
    });
    state.followUps.push(followUp);
    state.lastMessage = "Seguimiento ciudadano requerido.";
    return ok({
      followUp,
      ledger: ledgerEnvelope("citizen.followup.required", state.lastMessage, {
        followUpId: followUp.id,
        category,
      }, { operatorId: createdBy, consoleId: "CON-MASTER" }),
    });
  }

  function completeCitizenFollowUp(state, followUpId, createdBy = "OP-MASTER-01") {
    const followUp = state.followUps.find((item) => item.id === followUpId) || state.followUps[state.followUps.length - 1];
    if (!followUp) return fail("No existe seguimiento para completar.");
    followUp.status = "COMPLETED";
    followUp.completedAt = nowIso();
    withIntegrity(followUp);
    state.lastMessage = "Seguimiento ciudadano completado.";
    return ok({
      followUp,
      ledger: ledgerEnvelope("citizen.followup.completed", state.lastMessage, {
        followUpId: followUp.id,
        category: followUp.category,
      }, { operatorId: createdBy, consoleId: "CON-MASTER" }),
    });
  }

  function createFieldPerspectiveView(state, context = {}) {
    const operatorId = state.selectedFieldOperatorId || context.fieldState?.selectedOperatorId;
    const operator = context.fieldState?.operators?.find((item) => item.operatorId === operatorId);
    const assignment = context.fieldState?.assignments?.find((item) => item.operatorId === operatorId);
    return {
      operator,
      assignment,
      ownEvents: (context.fieldState?.individualEvents || []).filter((item) => item.operatorId === operatorId),
      ownEvidence: (context.fieldState?.evidences || []).filter((item) => item.operatorId === operatorId),
      ownActs: (context.fieldState?.acts || []).filter((item) => item.ownerOperatorId === operatorId),
      denied: [
        "Actas ajenas solo se consultan por referencia autorizada.",
        "El cierre maestro no esta disponible para el operador de campo.",
      ],
    };
  }

  function createFederatedConsoleView(state, context = {}) {
    const consoleId = state.selectedConsoleId || "CON-911";
    const consoleConfig = context.buildWeekState?.operationalConsoles?.find((item) => item.id === consoleId);
    const participants = (context.buildWeekState?.incidentParticipants || []).filter((item) => item.consoleId === consoleId);
    const operators = (context.buildWeekState?.operatorIdentities || []).filter((item) => item.consoleId === consoleId);
    const fieldOperators = (context.fieldState?.operators || []).filter((item) => item.consoleId === consoleId);
    const ownActs = (context.fieldState?.acts || []).filter((item) => item.ownerConsoleId === consoleId);
    const ownEvidence = (context.fieldState?.evidences || []).filter((item) => item.consoleId === consoleId);
    return {
      consoleConfig,
      assignedIncidents: participants.map((item) => item.incidentId),
      permittedInfo: consoleConfig?.allowedActions || [],
      ownOperators: [...operators, ...fieldOperators],
      ownInterventions: participants,
      sharedEvidence: ownEvidence,
      ownDocuments: ownActs,
      participationStatus: participants.length ? "Participacion activa o registrada" : "Sin asignacion activa",
      accessDenied: [
        "Acceso denegado sin finalidad operativa.",
        "Datos judiciales restringidos requieren habilitacion especifica.",
      ],
    };
  }

  function createMasterConsoleView(state, context = {}) {
    const procedureState = context.procedureState || {};
    const record = procedureState.masterIncidentRecord || context.buildWeekState?.masterIncidentRecord || {};
    return {
      incidentMap: {
        incidentId: state.incidentId,
        organizations: record.participatingConsoles || record.organizations || [],
        operators: record.operators?.length || context.buildWeekState?.operatorIdentities?.length || 0,
        chronologyEvents: procedureState.chronology?.length || context.ledgerEvents?.length || 0,
      },
      participants: context.buildWeekState?.incidentParticipants || [],
      chronologyReadOnly: procedureState.chronology || [],
      actsReadOnly: procedureState.procedureActVersions || [],
      inconsistencies: procedureState.findings || [],
      clarificationRequests: procedureState.clarificationRequests || [],
      closure: procedureState.closure || context.buildWeekState?.closure,
      permissions: PERSPECTIVE_DETAILS.MASTER_CONSOLE.permissions,
      prohibitedActions: PERSPECTIVE_DETAILS.MASTER_CONSOLE.restrictedFunctions,
    };
  }

  function getPerspectiveView(state, context = {}) {
    const detail = PERSPECTIVE_DETAILS[state.selectedPerspective] || PERSPECTIVE_DETAILS.MASTER_CONSOLE;
    const session = createPerspectiveSession(state, state.selectedPerspective, {
      selectedConsoleId: state.selectedConsoleId,
      selectedFieldOperatorId: state.selectedFieldOperatorId,
    });
    const view = {
      activePerspective: state.selectedPerspective,
      detail,
      session,
      incidentId: state.incidentId,
    };
    if (state.selectedPerspective === PERSPECTIVES.CITIZEN) {
      return {
        ...view,
        citizenSafeView: buildCitizenSafeView(context.procedureState?.masterIncidentRecord || context.buildWeekState?.masterIncidentRecord, { ...context, state, scenarioId: state.scenarioId }),
      };
    }
    if (state.selectedPerspective === PERSPECTIVES.FIELD_OPERATOR) {
      return { ...view, field: createFieldPerspectiveView(state, context) };
    }
    if (state.selectedPerspective === PERSPECTIVES.FEDERATED_CONSOLE) {
      return { ...view, federated: createFederatedConsoleView(state, context) };
    }
    return { ...view, master: createMasterConsoleView(state, context) };
  }

  function runCitizenClosureDemoSequence(state, context = {}) {
    const results = [];
    function collect(result) {
      results.push(result);
      return result;
    }
    collect(changePerspective(state, PERSPECTIVES.CITIZEN, { selectedConsoleId: "CON-CITIZEN", createdBy: "CITIZEN-DEMO-01" }));
    collect(generateCitizenNextSteps(state, context));
    collect(generateCitizenClosureSummary(state, context));
    collect(reviewCitizenClosureSummary(state));
    const packageResult = collect(createCitizenIncidentPackage(state));
    if (packageResult.ok) {
      collect(deliverCitizenPackage(state));
      collect(openCitizenPackage(state));
      collect(confirmCitizenReceipt(state));
    }
    const docResult = collect(requestCitizenDocumentAccess(state, "DOC-CIT-SUMMARY"));
    if (docResult.ok) collect(downloadCitizenDocument(state, docResult.access.id));
    collect(submitCitizenServiceFeedback(state, {
      rapidity: 4,
      clarity: 4,
      treatment: 5,
      coordination: 4,
      protectionFeeling: 4,
      nextStepUnderstanding: 5,
      overallSatisfaction: 4,
      optionalComment: "La devolucion explica pasos posteriores sin exponer informacion sensible.",
    }));
    const observationResult = collect(createCitizenFormalObservation(state, {
      category: "SOLICITUD_DE_ACLARACION",
      description: "Solicito aclarar si debo presentar una ampliacion posterior.",
      referencedActIds: state.summaries.slice(-1)[0]?.simulatedReferences || [],
    }));
    if (observationResult.ok) {
      collect(assignCitizenObservation(state, observationResult.observation.observationId));
      collect(reviewCitizenObservation(state, observationResult.observation.observationId));
      collect(respondCitizenObservation(state, observationResult.observation.observationId));
    }
    collect(changePerspective(state, PERSPECTIVES.MASTER_CONSOLE, { selectedConsoleId: "CON-MASTER" }));
    return {
      ok: results.every((result) => result.ok),
      results,
      state,
    };
  }

  window.PIPOCitizenClosure = {
    CITIZEN_CLOSURE_VERSION,
    PERSPECTIVES,
    PERSPECTIVE_DETAILS,
    NEXT_STEP_CATEGORIES,
    OBSERVATION_STATUSES,
    DOCUMENT_ACCESS_STATUSES,
    CITIZEN_NEXT_STEP_DISCLAIMER,
    CITIZEN_AI_NOTICE,
    CITIZEN_AI_UNAVAILABLE_NOTICE,
    CITIZEN_SCENARIOS: SCENARIOS,
    createCitizenClosureState,
    changePerspective,
    setCitizenAiAvailability,
    getPerspectiveView,
    buildCitizenSafeView,
    generateCitizenNextSteps,
    generateCitizenClosureSummary,
    reviewCitizenClosureSummary,
    createCitizenIncidentPackage,
    deliverCitizenPackage,
    openCitizenPackage,
    confirmCitizenReceipt,
    requestCitizenDocumentAccess,
    downloadCitizenDocument,
    submitCitizenServiceFeedback,
    createCitizenFormalObservation,
    assignCitizenObservation,
    reviewCitizenObservation,
    requestCitizenClarification,
    respondCitizenObservation,
    closeCitizenObservation,
    markCitizenFollowUpRequired,
    completeCitizenFollowUp,
    runCitizenClosureDemoSequence,
  };
}());
