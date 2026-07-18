(function () {
  const FIELD_WORKFLOW_VERSION = "4B.0.0";

  const INTERVENTION_STATES = {
    ASSIGNED: "ASSIGNED",
    ACCEPTED: "ACCEPTED",
    DEPARTED: "DEPARTED",
    ARRIVED: "ARRIVED",
    INTERVENTION_STARTED: "INTERVENTION_STARTED",
    INTERVENTION_ACTIVE: "INTERVENTION_ACTIVE",
    WAITING_SUPPORT: "WAITING_SUPPORT",
    TRANSFERRED: "TRANSFERRED",
    COMPLETED: "COMPLETED",
    CANCELLED_WITH_REASON: "CANCELLED_WITH_REASON",
  };

  const ACT_STATUSES = {
    NOT_CREATED: "NOT_CREATED",
    DRAFT: "DRAFT",
    REVIEWED: "REVIEWED",
    FINALIZED: "FINALIZED",
    AMENDED: "AMENDED",
  };

  const EVENT_CATEGORIES = [
    "hecho observado",
    "manifestacion de tercero",
    "dato del sistema",
    "actuacion realizada",
    "comunicacion",
    "derivacion",
    "evidencia",
    "inferencia pendiente de revision",
    "novedad",
    "aclaracion",
  ];

  const EVIDENCE_TYPES = [
    "fotografia",
    "video",
    "audio",
    "ubicacion",
    "documento",
    "captura digital",
    "constancia",
    "informe externo",
  ];

  const SUPPORT_TARGETS = [
    { consoleId: "CON-911", consoleType: "SECURITY_911", label: "911 Seguridad" },
    { consoleId: "CON-107", consoleType: "HEALTH_107", label: "107 Salud" },
    { consoleId: "CON-BOMBEROS", consoleType: "FIRE_DEPARTMENT", label: "Bomberos" },
    { consoleId: "CON-DC", consoleType: "CIVIL_DEFENSE", label: "Defensa Civil" },
    { consoleId: "CON-TRANSITO", consoleType: "TRAFFIC", label: "Transito" },
    { consoleId: "CON-GENERO", consoleType: "GENDER_RESPONSE", label: "Genero" },
    { consoleId: "CON-NINEZ", consoleType: "CHILD_PROTECTION", label: "Ninez" },
    { consoleId: "CON-FISCALIA", consoleType: "PROSECUTOR_JUSTICE", label: "Fiscalia" },
    { consoleId: "CON-CIBER", consoleType: "CYBERCRIME", label: "Ciberdelitos" },
    { consoleId: "CON-COMISARIA", consoleType: "POLICE_STATION", label: "Comisaria" },
    { consoleId: "CON-CVGRT", consoleType: "CVGRT", label: "CVGRT" },
  ];

  const FIELD_OPERATORS = [
    {
      operatorId: "OP-FIELD-911-A",
      fictitiousName: "Oficial Movil Demo",
      organization: "911 Seguridad",
      consoleId: "CON-911",
      role: "movil policial",
      rankOrRole: "Oficial de movil",
      specialty: "movil policial",
      enrolledDeviceId: "DEV-FIELD-911-A",
      sessionId: "SES-FIELD-911-A-20260718",
      joinedAt: "2026-07-18T10:10:00-03:00",
      interventionStatus: INTERVENTION_STATES.ASSIGNED,
      individualActId: "ACT-FIELD-911-A",
      unit: "Movil 911 demo 12",
      mfaVerified: true,
      localBiometricVerified: true,
    },
    {
      operatorId: "OP-FIELD-107-A",
      fictitiousName: "Operadora 107 Demo",
      organization: "107 Salud",
      consoleId: "CON-107",
      role: "movil sanitario",
      rankOrRole: "Equipo sanitario",
      specialty: "triage y traslado",
      enrolledDeviceId: "DEV-FIELD-107-A",
      sessionId: "SES-FIELD-107-A-20260718",
      joinedAt: "2026-07-18T10:11:00-03:00",
      interventionStatus: INTERVENTION_STATES.ASSIGNED,
      individualActId: "ACT-FIELD-107-A",
      unit: "Ambulancia demo 04",
      mfaVerified: true,
      localBiometricVerified: true,
    },
    {
      operatorId: "OP-FIELD-TRAFFIC-A",
      fictitiousName: "Agente Transito Demo",
      organization: "Transito vial",
      consoleId: "CON-TRANSITO",
      role: "movil vial",
      rankOrRole: "Agente de transito",
      specialty: "corte y corredor sanitario",
      enrolledDeviceId: "DEV-FIELD-TR-A",
      sessionId: "SES-FIELD-TR-A-20260718",
      joinedAt: "2026-07-18T10:12:00-03:00",
      interventionStatus: INTERVENTION_STATES.ASSIGNED,
      individualActId: "ACT-FIELD-TRAFFIC-A",
      unit: "Movil transito demo 03",
      mfaVerified: true,
      localBiometricVerified: true,
    },
    {
      operatorId: "OP-FIELD-FIRE-A",
      fictitiousName: "Bombero Demo",
      organization: "Bomberos",
      consoleId: "CON-BOMBEROS",
      role: "dotacion",
      rankOrRole: "Jefe de dotacion",
      specialty: "derrame y riesgo de incendio",
      enrolledDeviceId: "DEV-FIELD-FIRE-A",
      sessionId: "SES-FIELD-FIRE-A-20260718",
      joinedAt: "2026-07-18T10:13:00-03:00",
      interventionStatus: INTERVENTION_STATES.ASSIGNED,
      individualActId: "ACT-FIELD-FIRE-A",
      unit: "Dotacion demo 02",
      mfaVerified: true,
      localBiometricVerified: true,
    },
    {
      operatorId: "OP-FIELD-SCI-A",
      fictitiousName: "Policia Cientifica Demo",
      organization: "911 Seguridad",
      consoleId: "CON-911",
      role: "especialista",
      rankOrRole: "Policia Cientifica",
      specialty: "relevamiento tecnico",
      enrolledDeviceId: "DEV-FIELD-SCI-A",
      sessionId: "SES-FIELD-SCI-A-20260718",
      joinedAt: "2026-07-18T10:14:00-03:00",
      interventionStatus: INTERVENTION_STATES.ASSIGNED,
      individualActId: "ACT-FIELD-SCI-A",
      unit: "Gabinete tecnico demo",
      mfaVerified: true,
      localBiometricVerified: true,
    },
    {
      operatorId: "OP-FIELD-CYBER-A",
      fictitiousName: "Especialista Ciber Demo",
      organization: "Ciberdelitos",
      consoleId: "CON-CIBER",
      role: "especialista",
      rankOrRole: "Analista digital",
      specialty: "preservacion digital",
      enrolledDeviceId: "DEV-FIELD-CYBER-A",
      sessionId: "SES-FIELD-CYBER-A-20260718",
      joinedAt: "2026-07-18T10:15:00-03:00",
      interventionStatus: INTERVENTION_STATES.ASSIGNED,
      individualActId: "ACT-FIELD-CYBER-A",
      unit: "Unidad ciber demo",
      mfaVerified: true,
      localBiometricVerified: true,
    },
  ];

  const STATUS_TRANSITIONS = {
    ASSIGNED: ["ACCEPTED", "CANCELLED_WITH_REASON"],
    ACCEPTED: ["DEPARTED", "CANCELLED_WITH_REASON"],
    DEPARTED: ["ARRIVED", "CANCELLED_WITH_REASON"],
    ARRIVED: ["INTERVENTION_STARTED", "CANCELLED_WITH_REASON"],
    INTERVENTION_STARTED: ["INTERVENTION_ACTIVE", "WAITING_SUPPORT", "TRANSFERRED", "COMPLETED"],
    INTERVENTION_ACTIVE: ["WAITING_SUPPORT", "TRANSFERRED", "COMPLETED"],
    WAITING_SUPPORT: ["INTERVENTION_ACTIVE", "TRANSFERRED", "COMPLETED"],
    TRANSFERRED: ["COMPLETED"],
    COMPLETED: [],
    CANCELLED_WITH_REASON: [],
  };

  const LEDGER_TYPE_BY_STATE = {
    ACCEPTED: "field.assignment.accepted",
    DEPARTED: "field.departed",
    ARRIVED: "field.arrived",
    INTERVENTION_STARTED: "field.intervention.started",
    INTERVENTION_ACTIVE: "intervention.updated",
    WAITING_SUPPORT: "field.support.requested",
    TRANSFERRED: "intervention.updated",
    COMPLETED: "field.intervention.completed",
    CANCELLED_WITH_REASON: "field.assignment.rejected",
  };

  const LEDGER_TYPE_BY_CATEGORY = {
    "hecho observado": "field.observation.created",
    "manifestacion de tercero": "field.statement.recorded",
    "dato del sistema": "field.observation.created",
    "actuacion realizada": "field.action.recorded",
    comunicacion: "field.communication.recorded",
    derivacion: "field.action.recorded",
    evidencia: "field.evidence.created",
    "inferencia pendiente de revision": "field.observation.created",
    novedad: "field.observation.created",
    aclaracion: "clarification.responded",
  };

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function demoIntegrityHash(value) {
    const source = JSON.stringify(value);
    let hash = 2166136261;
    for (let index = 0; index < source.length; index += 1) {
      hash ^= source.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return `field-ref-${(hash >>> 0).toString(16).padStart(8, "0")}`;
  }

  function nowIso() {
    return new Date().toISOString();
  }

  function createFieldWorkflowState() {
    const operators = clone(FIELD_OPERATORS);
    return {
      version: FIELD_WORKFLOW_VERSION,
      incident: {
        id: "PIPO-BW-TRAFFIC-001",
        title: "Accidente vial multidisciplinario",
        summary: "Accidente vial con persona lesionada, derrame y posible riesgo de incendio.",
        locationSimulated: "Cruce simulado Av. Comunidad y Calle 107",
        priority: "RED",
        channel: "PIPO Layer",
      },
      selectedOperatorId: operators[0].operatorId,
      operators,
      assignments: operators.map((operator, index) => ({
        assignmentId: `ASSIGN-FIELD-${String(index + 1).padStart(3, "0")}`,
        incidentId: "PIPO-BW-TRAFFIC-001",
        operatorId: operator.operatorId,
        consoleId: operator.consoleId,
        role: operator.role,
        rankOrRole: operator.rankOrRole,
        specialty: operator.specialty,
        enrolledDeviceId: operator.enrolledDeviceId,
        sessionId: operator.sessionId,
        joinedAt: operator.joinedAt,
        interventionStatus: operator.interventionStatus,
        individualActId: operator.individualActId,
        assignedAt: operator.joinedAt,
        acceptedAt: null,
        departedAt: null,
        arrivedAt: null,
        startedAt: null,
        completedAt: null,
        cancelledAt: null,
        cancellationReason: "",
        statusHistory: [{
          status: INTERVENTION_STATES.ASSIGNED,
          timestamp: operator.joinedAt,
          reason: "Derivacion recibida desde consola maestra demo.",
        }],
      })),
      individualEvents: [],
      evidences: [],
      supportRequests: [],
      acts: [],
      actVersions: [],
      clarificationRequests: [],
      demoCompleted: false,
    };
  }

  function getFieldOperator(state, operatorId) {
    return state.operators.find((operator) => operator.operatorId === operatorId);
  }

  function getAssignment(state, operatorId) {
    return state.assignments.find((assignment) => assignment.operatorId === operatorId);
  }

  function createLedgerEnvelope(operator, type, summary, payload = {}, classification = "OPERATIONAL") {
    return {
      type,
      operatorId: operator.operatorId,
      consoleId: operator.consoleId,
      sessionId: operator.sessionId,
      classification,
      payload: {
        summary,
        operatorId: operator.operatorId,
        consoleId: operator.consoleId,
        ...payload,
      },
    };
  }

  function fail(message) {
    return { ok: false, error: message };
  }

  function transitionFieldOperator(state, operatorId, nextStatus, reason = "") {
    const operator = getFieldOperator(state, operatorId);
    const assignment = getAssignment(state, operatorId);
    if (!operator || !assignment) return fail("Operador de campo no encontrado.");

    const currentStatus = assignment.interventionStatus;
    const allowed = STATUS_TRANSITIONS[currentStatus] || [];
    if (!allowed.includes(nextStatus)) {
      return fail(`Transicion no permitida: ${currentStatus} -> ${nextStatus}.`);
    }

    if (nextStatus === INTERVENTION_STATES.CANCELLED_WITH_REASON && !String(reason || "").trim()) {
      return fail("La cancelacion o rechazo requiere fundamento.");
    }

    if (nextStatus === INTERVENTION_STATES.COMPLETED) {
      const hasAction = state.individualEvents.some((event) => event.operatorId === operatorId);
      if (!hasAction) return fail("No se puede completar sin acontecimientos propios.");
    }

    const timestamp = nowIso();
    assignment.interventionStatus = nextStatus;
    assignment.statusHistory.push({ status: nextStatus, timestamp, reason: reason || "Cambio operativo registrado." });
    operator.interventionStatus = nextStatus;

    if (nextStatus === INTERVENTION_STATES.ACCEPTED) assignment.acceptedAt = timestamp;
    if (nextStatus === INTERVENTION_STATES.DEPARTED) assignment.departedAt = timestamp;
    if (nextStatus === INTERVENTION_STATES.ARRIVED) assignment.arrivedAt = timestamp;
    if (nextStatus === INTERVENTION_STATES.INTERVENTION_STARTED) assignment.startedAt = timestamp;
    if (nextStatus === INTERVENTION_STATES.COMPLETED) assignment.completedAt = timestamp;
    if (nextStatus === INTERVENTION_STATES.CANCELLED_WITH_REASON) {
      assignment.cancelledAt = timestamp;
      assignment.cancellationReason = reason;
    }

    const eventType = LEDGER_TYPE_BY_STATE[nextStatus] || "intervention.updated";
    const summary = `${operator.fictitiousName}: ${currentStatus} -> ${nextStatus}.`;
    return {
      ok: true,
      assignment,
      ledger: createLedgerEnvelope(operator, eventType, summary, {
        assignmentId: assignment.assignmentId,
        incidentId: assignment.incidentId,
        previousStatus: currentStatus,
        nextStatus,
        reason,
        individualActId: assignment.individualActId,
      }, nextStatus === INTERVENTION_STATES.CANCELLED_WITH_REASON ? "SENSITIVE" : "OPERATIONAL"),
    };
  }

  function createIndividualEvent(state, operatorId, input = {}) {
    const operator = getFieldOperator(state, operatorId);
    const assignment = getAssignment(state, operatorId);
    if (!operator || !assignment) return fail("Operador de campo no encontrado.");
    const category = EVENT_CATEGORIES.includes(input.category) ? input.category : "novedad";
    const description = String(input.description || "").trim();
    if (!description) return fail("El acontecimiento requiere descripcion.");
    const isPostClosureCorrection = Boolean(input.correctionOf) && category === "aclaracion";
    if (!isPostClosureCorrection && ![INTERVENTION_STATES.INTERVENTION_STARTED, INTERVENTION_STATES.INTERVENTION_ACTIVE, INTERVENTION_STATES.WAITING_SUPPORT].includes(assignment.interventionStatus)) {
      return fail("Para registrar acontecimientos, la intervencion debe estar iniciada o activa.");
    }

    const event = {
      eventId: `FEVT-${String(state.individualEvents.length + 1).padStart(4, "0")}`,
      incidentId: assignment.incidentId,
      operatorId: operator.operatorId,
      consoleId: operator.consoleId,
      timestamp: nowIso(),
      category,
      description,
      classification: input.classification || "OPERATIONAL",
      locationSimulated: input.locationSimulated || state.incident.locationSimulated,
      linkedEvidenceIds: Array.isArray(input.linkedEvidenceIds) ? input.linkedEvidenceIds : [],
      correctionOf: input.correctionOf || null,
      immutable: true,
      integrityReference: null,
    };
    event.integrityReference = demoIntegrityHash(event);
    state.individualEvents.push(Object.freeze(event));

    return {
      ok: true,
      event,
      ledger: createLedgerEnvelope(operator, LEDGER_TYPE_BY_CATEGORY[category] || "field.observation.created", `${operator.fictitiousName} registro ${category}.`, {
        fieldEventId: event.eventId,
        incidentId: event.incidentId,
        category: event.category,
        classification: event.classification,
        locationSimulated: event.locationSimulated,
        linkedEvidenceIds: event.linkedEvidenceIds,
        integrityReference: event.integrityReference,
      }, event.classification),
    };
  }

  function createEventCorrection(state, actorOperatorId, sourceEventId, correctionType, description) {
    const source = state.individualEvents.find((event) => event.eventId === sourceEventId);
    if (!source) return fail("Acontecimiento original no encontrado.");
    if (source.operatorId !== actorOperatorId) {
      return fail("Un operador no puede corregir acontecimientos de otro. Debe solicitar aclaracion.");
    }

    return createIndividualEvent(state, actorOperatorId, {
      category: correctionType || "aclaracion",
      description,
      classification: source.classification,
      locationSimulated: source.locationSimulated,
      linkedEvidenceIds: source.linkedEvidenceIds,
      correctionOf: source.eventId,
    });
  }

  function createSimulatedEvidence(state, operatorId, input = {}) {
    const operator = getFieldOperator(state, operatorId);
    const assignment = getAssignment(state, operatorId);
    if (!operator || !assignment) return fail("Operador de campo no encontrado.");
    if (![INTERVENTION_STATES.INTERVENTION_STARTED, INTERVENTION_STATES.INTERVENTION_ACTIVE, INTERVENTION_STATES.WAITING_SUPPORT].includes(assignment.interventionStatus)) {
      return fail("Para incorporar evidencia simulada, la intervencion debe estar iniciada o activa.");
    }

    const type = EVIDENCE_TYPES.includes(input.type) ? input.type : "documento";
    const description = String(input.description || "").trim();
    if (!description) return fail("La evidencia simulada requiere descripcion.");

    const timestamp = nowIso();
    const evidence = {
      evidenceId: `EVI-FIELD-${String(state.evidences.length + 1).padStart(4, "0")}`,
      incidentId: assignment.incidentId,
      author: operator.fictitiousName,
      operatorId: operator.operatorId,
      organization: operator.organization,
      consoleId: operator.consoleId,
      timestamp,
      date: timestamp.slice(0, 10),
      hour: timestamp.slice(11, 19),
      type,
      classification: input.classification || "SENSITIVE",
      origin: input.origin || "carga simulada manual",
      description,
      permissions: ["operador autor", "consola titular", "consola maestra lectura referencial"],
      accessibleConsoles: [operator.consoleId, "CON-MASTER"],
      realSensorCapture: false,
      realLocationUsed: false,
      integrityReference: null,
    };
    evidence.integrityReference = demoIntegrityHash(evidence);
    state.evidences.push(Object.freeze(evidence));

    const eventResult = createIndividualEvent(state, operatorId, {
      category: "evidencia",
      description: `Evidencia simulada incorporada: ${type}. ${description}`,
      classification: evidence.classification,
      linkedEvidenceIds: [evidence.evidenceId],
    });

    return {
      ok: true,
      evidence,
      event: eventResult.event,
      ledger: createLedgerEnvelope(operator, "field.evidence.created", `${operator.fictitiousName} incorporo evidencia simulada ${type}.`, {
        evidenceId: evidence.evidenceId,
        incidentId: evidence.incidentId,
        type: evidence.type,
        classification: evidence.classification,
        origin: evidence.origin,
        accessibleConsoles: evidence.accessibleConsoles,
        integrityReference: evidence.integrityReference,
        realSensorCapture: false,
        realLocationUsed: false,
      }, evidence.classification),
    };
  }

  function createSupportRequest(state, operatorId, input = {}) {
    const operator = getFieldOperator(state, operatorId);
    const assignment = getAssignment(state, operatorId);
    if (!operator || !assignment) return fail("Operador de campo no encontrado.");
    if (![INTERVENTION_STATES.INTERVENTION_STARTED, INTERVENTION_STATES.INTERVENTION_ACTIVE, INTERVENTION_STATES.WAITING_SUPPORT].includes(assignment.interventionStatus)) {
      return fail("Para solicitar apoyo, la intervencion debe estar iniciada o activa.");
    }

    const target = SUPPORT_TARGETS.find((item) => item.consoleId === input.targetConsoleId) || SUPPORT_TARGETS[0];
    const reason = String(input.reason || "").trim();
    if (!reason) return fail("La solicitud de apoyo requiere motivo.");

    const request = {
      requestId: `SUP-FIELD-${String(state.supportRequests.length + 1).padStart(3, "0")}`,
      incidentId: assignment.incidentId,
      requestingOperatorId: operator.operatorId,
      requestingConsoleId: operator.consoleId,
      targetConsoleId: target.consoleId,
      targetConsoleType: target.consoleType,
      urgency: input.urgency || "YELLOW",
      reason,
      minimumInformation: input.minimumInformation || "ubicacion simulada, riesgo observado y necesidad operativa",
      classification: input.classification || "OPERATIONAL",
      status: "PENDING",
      createdAt: nowIso(),
      acceptedByOperatorId: null,
      acceptedAt: null,
    };
    state.supportRequests.push(request);
    assignment.interventionStatus = INTERVENTION_STATES.WAITING_SUPPORT;
    operator.interventionStatus = INTERVENTION_STATES.WAITING_SUPPORT;

    return {
      ok: true,
      request,
      ledger: createLedgerEnvelope(operator, "field.support.requested", `${operator.fictitiousName} solicito apoyo a ${target.label}.`, {
        supportRequestId: request.requestId,
        incidentId: request.incidentId,
        targetConsoleId: request.targetConsoleId,
        targetConsoleType: request.targetConsoleType,
        urgency: request.urgency,
        minimumInformation: request.minimumInformation,
      }, request.classification),
    };
  }

  function acceptSupportRequest(state, requestId, acceptingOperatorId) {
    const request = state.supportRequests.find((item) => item.requestId === requestId);
    const operator = getFieldOperator(state, acceptingOperatorId);
    if (!request) return fail("Solicitud de apoyo no encontrada.");
    if (!operator) return fail("Operador receptor no encontrado.");
    if (request.status !== "PENDING") return fail("La solicitud de apoyo ya fue tratada.");
    if (request.targetConsoleId !== operator.consoleId) {
      return fail("El operador seleccionado no pertenece a la consola destinataria.");
    }

    request.status = "ACCEPTED";
    request.acceptedByOperatorId = operator.operatorId;
    request.acceptedAt = nowIso();

    return {
      ok: true,
      request,
      ledger: createLedgerEnvelope(operator, "field.support.accepted", `${operator.fictitiousName} acepto apoyo solicitado.`, {
        supportRequestId: request.requestId,
        requestingOperatorId: request.requestingOperatorId,
        targetConsoleId: request.targetConsoleId,
        status: request.status,
      }, request.classification),
    };
  }

  function buildActPreview(state, operatorId) {
    const operator = getFieldOperator(state, operatorId);
    const assignment = getAssignment(state, operatorId);
    if (!operator || !assignment) return null;

    const operatorEvents = state.individualEvents.filter((event) => event.operatorId === operatorId);
    const operatorEvidence = state.evidences.filter((evidence) => evidence.operatorId === operatorId);
    const support = state.supportRequests.filter((request) => (
      request.requestingOperatorId === operatorId || request.acceptedByOperatorId === operatorId
    ));

    return {
      id: assignment.individualActId,
      incidentId: assignment.incidentId,
      operatorId: operator.operatorId,
      operatorName: operator.fictitiousName,
      organization: operator.organization,
      rankOrRole: operator.rankOrRole,
      specialty: operator.specialty,
      unit: operator.unit,
      assignedAt: assignment.assignedAt,
      departedAt: assignment.departedAt,
      arrivedAt: assignment.arrivedAt,
      startedAt: assignment.startedAt,
      completedAt: assignment.completedAt,
      interventionStatus: assignment.interventionStatus,
      reason: state.incident.summary,
      chronology: assignment.statusHistory.map((item) => `${item.timestamp} / ${item.status} / ${item.reason}`),
      eventIds: operatorEvents.map((event) => event.eventId),
      observedFacts: operatorEvents.filter((event) => event.category === "hecho observado").map((event) => event.description),
      statements: operatorEvents.filter((event) => event.category === "manifestacion de tercero").map((event) => event.description),
      actions: operatorEvents.filter((event) => ["actuacion realizada", "derivacion", "novedad"].includes(event.category)).map((event) => event.description),
      communications: operatorEvents.filter((event) => event.category === "comunicacion").map((event) => event.description),
      relatedOrganizations: support.map((request) => request.targetConsoleId),
      evidenceReferences: operatorEvidence.map((evidence) => evidence.evidenceId),
      result: assignment.interventionStatus === INTERVENTION_STATES.COMPLETED ? "Intervencion finalizada por operador." : "Intervencion en curso o pendiente.",
      followUpRequired: support.some((request) => request.status === "PENDING") ? "Apoyo pendiente de aceptacion." : "Seguimiento segun criterio del operador.",
      observations: operatorEvents.filter((event) => event.category === "aclaracion").map((event) => event.description),
      disclaimer: "Documento individual del funcionario interviniente. No sustituye las actas de otros operadores.",
    };
  }

  function createIndividualAct(state, operatorId) {
    const operator = getFieldOperator(state, operatorId);
    const assignment = getAssignment(state, operatorId);
    if (!operator || !assignment) return fail("Operador de campo no encontrado.");

    const existing = state.acts.find((act) => act.id === assignment.individualActId);
    if (existing) return { ok: true, act: existing, ledger: null, message: "Acta existente recuperada." };

    const preview = buildActPreview(state, operatorId);
    const act = {
      ...preview,
      status: ACT_STATUSES.DRAFT,
      version: "v1",
      createdAt: nowIso(),
      reviewedAt: null,
      finalizedAt: null,
      locked: false,
      ownerOperatorId: operator.operatorId,
      ownerConsoleId: operator.consoleId,
      integrityReference: null,
    };
    act.integrityReference = demoIntegrityHash(act);
    state.acts.push(act);
    state.actVersions.push({ actId: act.id, version: act.version, status: act.status, createdAt: act.createdAt, integrityReference: act.integrityReference });

    return {
      ok: true,
      act,
      ledger: createLedgerEnvelope(operator, "individual.act.created", `${operator.fictitiousName} creo su acta individual.`, {
        actId: act.id,
        incidentId: act.incidentId,
        version: act.version,
        ownerOperatorId: act.ownerOperatorId,
        ownerConsoleId: act.ownerConsoleId,
      }, "SENSITIVE"),
    };
  }

  function reviewIndividualAct(state, operatorId) {
    const operator = getFieldOperator(state, operatorId);
    const assignment = getAssignment(state, operatorId);
    if (!operator || !assignment) return fail("Operador de campo no encontrado.");
    const act = state.acts.find((item) => item.id === assignment.individualActId);
    if (!act) return fail("Primero debe crearse el acta individual.");
    if (act.ownerOperatorId !== operatorId) return fail("Nadie puede revisar por el operador autor.");
    if (act.locked) return fail("El acta finalizada esta bloqueada.");

    Object.assign(act, buildActPreview(state, operatorId), {
      status: ACT_STATUSES.REVIEWED,
      reviewedAt: nowIso(),
      integrityReference: demoIntegrityHash({ ...act, reviewedAt: nowIso() }),
    });

    return {
      ok: true,
      act,
      ledger: createLedgerEnvelope(operator, "individual.act.reviewed", `${operator.fictitiousName} reviso su borrador de acta.`, {
        actId: act.id,
        version: act.version,
        status: act.status,
      }, "SENSITIVE"),
    };
  }

  function finalizeIndividualAct(state, operatorId) {
    const operator = getFieldOperator(state, operatorId);
    const assignment = getAssignment(state, operatorId);
    if (!operator || !assignment) return fail("Operador de campo no encontrado.");
    const act = state.acts.find((item) => item.id === assignment.individualActId);
    if (!act) return fail("Primero debe crearse el acta individual.");
    if (act.ownerOperatorId !== operatorId) return fail("Nadie puede firmar o finalizar por otro operador.");
    if (act.locked) return fail("El acta finalizada ya esta bloqueada.");
    if (state.individualEvents.filter((event) => event.operatorId === operatorId).length === 0) return fail("No se puede finalizar acta sin acontecimientos propios.");
    if (assignment.interventionStatus !== INTERVENTION_STATES.COMPLETED) return fail("Primero debe completarse la intervencion.");

    const preview = buildActPreview(state, operatorId);
    Object.assign(act, preview, {
      status: ACT_STATUSES.FINALIZED,
      finalizedAt: nowIso(),
      locked: true,
      integrityReference: demoIntegrityHash({ ...preview, status: ACT_STATUSES.FINALIZED, finalizedAt: nowIso() }),
    });
    state.actVersions.push({ actId: act.id, version: act.version, status: act.status, createdAt: act.finalizedAt, integrityReference: act.integrityReference });

    return {
      ok: true,
      act,
      ledger: createLedgerEnvelope(operator, "individual.act.finalized", `${operator.fictitiousName} finalizo su acta individual.`, {
        actId: act.id,
        version: act.version,
        locked: act.locked,
        integrityReference: act.integrityReference,
      }, "SENSITIVE"),
    };
  }

  function amendIndividualAct(state, actorOperatorId, actId, reason, additions = "") {
    const operator = getFieldOperator(state, actorOperatorId);
    const act = state.acts.find((item) => item.id === actId);
    if (!operator) return fail("Operador de campo no encontrado.");
    if (!act) return fail("Acta no encontrada.");
    if (act.ownerOperatorId !== actorOperatorId) return fail("Un operador no puede modificar ni rectificar actas ajenas.");
    if (!String(reason || "").trim()) return fail("Toda ampliacion, aclaracion o rectificacion requiere motivo.");

    const versionNumber = state.actVersions.filter((version) => version.actId === actId).length + 1;
    const version = {
      actId,
      version: `v${versionNumber}`,
      status: ACT_STATUSES.AMENDED,
      createdAt: nowIso(),
      reason,
      additions,
      originalIntegrityReference: act.integrityReference,
      integrityReference: null,
    };
    version.integrityReference = demoIntegrityHash(version);
    state.actVersions.push(version);

    return {
      ok: true,
      version,
      ledger: createLedgerEnvelope(operator, "individual.act.amended", `${operator.fictitiousName} agrego version documental sin alterar el acta original.`, {
        actId,
        version: version.version,
        reason,
        originalIntegrityReference: version.originalIntegrityReference,
        integrityReference: version.integrityReference,
      }, "SENSITIVE"),
    };
  }

  function createClarificationRequest(state, requestingOperatorId, sourceActId, recipientOperatorId, reason) {
    const requester = getFieldOperator(state, requestingOperatorId);
    const recipient = getFieldOperator(state, recipientOperatorId);
    const act = state.acts.find((item) => item.id === sourceActId);
    if (!requester || !recipient) return fail("Operador solicitante o destinatario no encontrado.");
    if (!act) return fail("Acta fuente no encontrada.");
    if (!String(reason || "").trim()) return fail("La aclaracion requiere motivo.");

    const request = {
      id: `FCLAR-${String(state.clarificationRequests.length + 1).padStart(3, "0")}`,
      incidentId: act.incidentId,
      sourceActId,
      requestingOperatorId,
      recipientOperatorId,
      reason,
      status: "PENDING",
      createdAt: nowIso(),
      resolvedAt: null,
    };
    state.clarificationRequests.push(request);

    return {
      ok: true,
      request,
      ledger: createLedgerEnvelope(requester, "clarification.requested", `${requester.fictitiousName} solicito aclaracion sin alterar acta fuente.`, {
        requestId: request.id,
        sourceActId,
        recipientOperatorId,
        reason,
      }, "SENSITIVE"),
    };
  }

  function getEditableDraftStatus(state, actorOperatorId, actId) {
    const act = state.acts.find((item) => item.id === actId);
    if (!act) return { canEdit: false, reason: "Acta no encontrada." };
    if (act.ownerOperatorId !== actorOperatorId) return { canEdit: false, reason: "No puede editar acta ajena." };
    if (act.locked) return { canEdit: false, reason: "Acta finalizada bloqueada." };
    return { canEdit: true, reason: "El operador autor puede editar su borrador." };
  }

  function compareInterventions(state) {
    return state.operators.map((operator) => {
      const assignment = getAssignment(state, operator.operatorId);
      const events = state.individualEvents.filter((event) => event.operatorId === operator.operatorId);
      const evidences = state.evidences.filter((evidence) => evidence.operatorId === operator.operatorId);
      const act = state.acts.find((item) => item.id === operator.individualActId);
      return {
        operatorId: operator.operatorId,
        name: operator.fictitiousName,
        organization: operator.organization,
        specialty: operator.specialty,
        status: assignment?.interventionStatus || "sin asignacion",
        eventCount: events.length,
        evidenceCount: evidences.length,
        actStatus: act?.status || ACT_STATUSES.NOT_CREATED,
      };
    });
  }

  window.PIPOFieldWorkflow = {
    FIELD_WORKFLOW_VERSION,
    INTERVENTION_STATES,
    ACT_STATUSES,
    EVENT_CATEGORIES,
    EVIDENCE_TYPES,
    SUPPORT_TARGETS,
    FIELD_OPERATORS,
    createFieldWorkflowState,
    getFieldOperator,
    getAssignment,
    transitionFieldOperator,
    createIndividualEvent,
    createEventCorrection,
    createSimulatedEvidence,
    createSupportRequest,
    acceptSupportRequest,
    buildActPreview,
    createIndividualAct,
    reviewIndividualAct,
    finalizeIndividualAct,
    amendIndividualAct,
    createClarificationRequest,
    getEditableDraftStatus,
    compareInterventions,
  };
}());
