(function () {
  const PROCEDURE_ACT_VERSION = "5.0.0";

  const PROCEDURE_ACT_STATUSES = {
    DRAFT: "DRAFT",
    IN_REVIEW: "IN_REVIEW",
    PENDING_SUPERVISOR: "PENDING_SUPERVISOR",
    RETURNED_FOR_CLARIFICATION: "RETURNED_FOR_CLARIFICATION",
    FINALIZED: "FINALIZED",
    AMENDED: "AMENDED",
    RECTIFIED: "RECTIFIED",
    ANNULLED_WITH_REASON: "ANNULLED_WITH_REASON",
  };

  const SUPERVISION_STATUSES = {
    NOT_REQUIRED: "NOT_REQUIRED",
    PENDING: "PENDING",
    IN_REVIEW: "IN_REVIEW",
    OBSERVED: "OBSERVED",
    RETURNED: "RETURNED",
    VALIDATED: "VALIDATED",
  };

  const CLOSURE_STATUSES = {
    CLOSED_WITH_REPORT: "CLOSED_WITH_REPORT",
    CLOSED_WITH_PROCEDURE_ACT: "CLOSED_WITH_PROCEDURE_ACT",
    CLOSED_WITH_EXTERNAL_REFERRAL: "CLOSED_WITH_EXTERNAL_REFERRAL",
    CLOSED_WITH_JUDICIAL_ACTION: "CLOSED_WITH_JUDICIAL_ACTION",
    PENDING_FOLLOW_UP: "PENDING_FOLLOW_UP",
    CANCELLED_WITH_REASON: "CANCELLED_WITH_REASON",
    FALSE_POSITIVE_WITH_REASON: "FALSE_POSITIVE_WITH_REASON",
  };

  const FINDING_TYPES = {
    BLOCKING_ERROR: "BLOCKING_ERROR",
    WARNING: "WARNING",
    RECOMMENDATION: "RECOMMENDATION",
    PENDING_INFORMATION: "PENDING_INFORMATION",
  };

  const INFORMATION_CLASSES = {
    OBSERVED_FACT: "OBSERVED_FACT",
    THIRD_PARTY_STATEMENT: "THIRD_PARTY_STATEMENT",
    SYSTEM_DATA: "SYSTEM_DATA",
    ACTION_PERFORMED: "ACTION_PERFORMED",
    COMMUNICATION: "COMMUNICATION",
    EVIDENCE_REFERENCE: "EVIDENCE_REFERENCE",
    INFERENCE_REQUIRING_REVIEW: "INFERENCE_REQUIRING_REVIEW",
  };

  const AI_DRAFT_NOTICE = "Borrador generado con asistencia de IA. Requiere revision y aprobacion del funcionario actuante.";
  const INTEGRITY_NOTICE = "Este prototipo demuestra integridad y trazabilidad documental. Su valor juridico definitivo depende de competencias, firmas, protocolos y normas aplicables.";
  const INTEGRATION_PRINCIPLE = "Las actuaciones individuales se integran, pero nunca se sustituyen ni se reescriben.";

  const REQUIRED_COMPLETENESS_ITEMS = [
    ["identification", "Identificacion"],
    ["responsible", "Responsable"],
    ["location", "Lugar"],
    ["times", "Horarios"],
    ["reason", "Motivo"],
    ["narrative", "Relato"],
    ["facts", "Hechos"],
    ["statements", "Manifestaciones"],
    ["actions", "Actuaciones"],
    ["evidence", "Evidencia"],
    ["result", "Resultado"],
    ["followUp", "Seguimiento"],
    ["confirmation", "Confirmacion"],
  ];

  const CATEGORY_TO_INFORMATION_CLASS = {
    "hecho observado": INFORMATION_CLASSES.OBSERVED_FACT,
    "manifestacion de tercero": INFORMATION_CLASSES.THIRD_PARTY_STATEMENT,
    "dato del sistema": INFORMATION_CLASSES.SYSTEM_DATA,
    "actuacion realizada": INFORMATION_CLASSES.ACTION_PERFORMED,
    comunicacion: INFORMATION_CLASSES.COMMUNICATION,
    derivacion: INFORMATION_CLASSES.ACTION_PERFORMED,
    evidencia: INFORMATION_CLASSES.EVIDENCE_REFERENCE,
    "inferencia pendiente de revision": INFORMATION_CLASSES.INFERENCE_REQUIRING_REVIEW,
    novedad: INFORMATION_CLASSES.SYSTEM_DATA,
    aclaracion: INFORMATION_CLASSES.SYSTEM_DATA,
  };

  function clone(value) {
    return JSON.parse(JSON.stringify(value || null));
  }

  function nowIso() {
    return new Date().toISOString();
  }

  function compact(value) {
    return String(value || "").trim();
  }

  function unique(list) {
    return Array.from(new Set((list || []).filter(Boolean)));
  }

  function demoHash(value, prefix = "demo-sha256") {
    const source = JSON.stringify(value);
    let hash = 2166136261;
    for (let index = 0; index < source.length; index += 1) {
      hash ^= source.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return `${prefix}-${(hash >>> 0).toString(16).padStart(8, "0")}`;
  }

  function browserHasWebCrypto() {
    return typeof crypto !== "undefined" && crypto.subtle && typeof TextEncoder !== "undefined";
  }

  async function calculateSha256Reference(value) {
    const payload = JSON.stringify(value);
    if (!browserHasWebCrypto()) {
      return {
        algorithm: "DEMO_FNV1A_FALLBACK",
        value: demoHash(value),
        generatedAt: nowIso(),
        label: "Referencia de integridad de la demostracion",
      };
    }
    const encoded = new TextEncoder().encode(payload);
    const digest = await crypto.subtle.digest("SHA-256", encoded);
    const bytes = Array.from(new Uint8Array(digest));
    return {
      algorithm: "SHA-256",
      value: `sha256-${bytes.map((byte) => byte.toString(16).padStart(2, "0")).join("")}`,
      generatedAt: nowIso(),
      label: "Referencia de integridad de la demostracion",
    };
  }

  function integrityReference(value) {
    return {
      algorithm: "DEMO_FNV1A_FALLBACK",
      value: demoHash(value),
      generatedAt: nowIso(),
      label: "Referencia de integridad de la demostracion",
    };
  }

  function registerDemoTimeInconsistency(state, sourceRef = "ACT-FIELD-107-A") {
    if (!state.demoInconsistencies.some((item) => item.id === "TIME-DIFF-001")) {
      state.demoInconsistencies.push({
        id: "TIME-DIFF-001",
        sourceRef,
        type: "horarios contradictorios",
        message: "El horario de triage declarado aparece anterior al arribo sanitario en una fuente simulada.",
        status: "PENDING_CLARIFICATION",
        createdAt: nowIso(),
      });
    }
    return state.demoInconsistencies[0];
  }

  function defaultActor() {
    return {
      operatorId: "OP-MASTER-01",
      consoleId: "CON-MASTER",
      organization: "Centro de Monitoreo",
      rankOrRole: "Coordinacion",
      specialty: "integracion documental",
      deviceId: "DEV-MASTER-01",
      sessionId: "SES-MASTER-20260718",
      jurisdiction: "Zona simulada",
      simulatedLocation: "Ubicacion estimada de demostracion",
    };
  }

  function normalizeActor(actor = {}) {
    const fallback = defaultActor();
    return {
      operatorId: actor.operatorId || actor.id || fallback.operatorId,
      consoleId: actor.consoleId || fallback.consoleId,
      organization: actor.organization || fallback.organization,
      rankOrRole: actor.rankOrRole || actor.role || fallback.rankOrRole,
      specialty: actor.specialty || fallback.specialty,
      deviceId: actor.deviceId || actor.enrolledDeviceId || fallback.deviceId,
      sessionId: actor.sessionId || fallback.sessionId,
      jurisdiction: actor.jurisdiction || fallback.jurisdiction,
      simulatedLocation: actor.simulatedLocation || fallback.simulatedLocation,
    };
  }

  function createProcedureActState(buildWeekState = {}, fieldState = {}, ledgerEvents = []) {
    return {
      version: PROCEDURE_ACT_VERSION,
      incidentId: fieldState?.incident?.id || buildWeekState?.incident?.id || "PIPO-BW-TRAFFIC-001",
      masterRecordId: buildWeekState?.masterIncidentRecord?.id || "MIR-BW-000001",
      procedureAct: null,
      procedureActVersions: [],
      aiDraft: null,
      chronology: [],
      completeness: {
        percent: 0,
        completed: [],
        pending: REQUIRED_COMPLETENESS_ITEMS.map((item) => item[1]),
        warnings: [],
        blockingErrors: ["registro integrado pendiente."],
        recommendations: [],
      },
      findings: [],
      demoInconsistencies: [],
      supervision: {
        required: false,
        status: SUPERVISION_STATUSES.NOT_REQUIRED,
        triggers: [],
        observations: [],
        requestedAt: null,
        reviewedAt: null,
        validatedAt: null,
      },
      clarificationRequests: [],
      masterIncidentRecord: null,
      closure: null,
      exports: [],
      printViewHtml: "",
      lastMessage: "Etapa 5 lista para generar Registro Integrado de Procedimiento.",
      contextSnapshot: {
        buildWeekState: clone(buildWeekState),
        fieldState: clone(fieldState),
        ledgerEvents: clone(ledgerEvents) || [],
      },
    };
  }

  function fieldEventToSource(event) {
    return {
      eventId: event.eventId,
      operatorId: event.operatorId,
      consoleId: event.consoleId,
      timestamp: event.timestamp,
      sourceActId: null,
      evidenceId: event.linkedEvidenceIds?.[0] || null,
      informationClass: CATEGORY_TO_INFORMATION_CLASS[event.category] || INFORMATION_CLASSES.SYSTEM_DATA,
      summary: event.description,
      sourceType: "field_event",
    };
  }

  function ledgerEventToSource(event) {
    return {
      eventId: event.eventId,
      operatorId: event.operatorId,
      consoleId: event.consoleId,
      timestamp: event.timestamp,
      sourceActId: event.payload?.actId || event.payload?.sourceActId || null,
      evidenceId: event.payload?.evidenceId || null,
      informationClass: event.type.includes("ai") ? INFORMATION_CLASSES.INFERENCE_REQUIRING_REVIEW : INFORMATION_CLASSES.SYSTEM_DATA,
      summary: event.payload?.summary || event.type,
      sourceType: "ledger_event",
    };
  }

  function buildAutomaticChronology({ fieldState = {}, ledgerEvents = [] } = {}) {
    const statusEvents = (fieldState.assignments || []).flatMap((assignment) => (
      (assignment.statusHistory || []).map((item) => ({
        eventId: `${assignment.assignmentId}-${item.status}`,
        operatorId: assignment.operatorId,
        consoleId: assignment.consoleId,
        timestamp: item.timestamp,
        sourceActId: assignment.individualActId,
        evidenceId: null,
        informationClass: INFORMATION_CLASSES.SYSTEM_DATA,
        summary: `${item.status}: ${item.reason}`,
        sourceType: "field_status",
      }))
    ));

    const fieldEvents = (fieldState.individualEvents || []).map(fieldEventToSource);
    const evidenceEvents = (fieldState.evidences || []).map((evidence) => ({
      eventId: `${evidence.evidenceId}-REF`,
      operatorId: evidence.operatorId,
      consoleId: evidence.consoleId,
      timestamp: evidence.timestamp,
      sourceActId: null,
      evidenceId: evidence.evidenceId,
      informationClass: INFORMATION_CLASSES.EVIDENCE_REFERENCE,
      summary: `Evidencia ${evidence.type}: ${evidence.description}`,
      sourceType: "evidence_reference",
    }));
    const actEvents = (fieldState.acts || []).map((act) => ({
      eventId: `${act.id}-${act.status}`,
      operatorId: act.ownerOperatorId,
      consoleId: act.ownerConsoleId,
      timestamp: act.finalizedAt || act.reviewedAt || act.createdAt,
      sourceActId: act.id,
      evidenceId: null,
      informationClass: INFORMATION_CLASSES.ACTION_PERFORMED,
      summary: `Acta individual ${act.id} en estado ${act.status}.`,
      sourceType: "individual_act",
    }));
    const clarificationEvents = (fieldState.clarificationRequests || []).map((request) => ({
      eventId: request.id,
      operatorId: request.requestingOperatorId,
      consoleId: null,
      timestamp: request.createdAt,
      sourceActId: request.sourceActId,
      evidenceId: null,
      informationClass: INFORMATION_CLASSES.SYSTEM_DATA,
      summary: `Solicitud de aclaracion: ${request.reason}`,
      sourceType: "clarification_request",
    }));

    return [
      ...(ledgerEvents || []).map(ledgerEventToSource),
      ...statusEvents,
      ...fieldEvents,
      ...evidenceEvents,
      ...actEvents,
      ...clarificationEvents,
    ].filter((item) => item.timestamp).sort((left, right) => new Date(left.timestamp) - new Date(right.timestamp));
  }

  function groupEventsByClass(events = []) {
    return Object.values(INFORMATION_CLASSES).reduce((grouped, informationClass) => {
      grouped[informationClass] = events.filter((event) => event.informationClass === informationClass);
      return grouped;
    }, {});
  }

  function collectIndividualActIds(fieldState = {}, buildWeekState = {}) {
    return unique([
      ...(fieldState.acts || []).map((act) => act.id),
      ...((buildWeekState.individualInterventionActs || []).map((act) => act.id)),
    ]);
  }

  function collectOperators(fieldState = {}, buildWeekState = {}) {
    return unique([
      ...(fieldState.operators || []).map((operator) => operator.operatorId),
      ...((buildWeekState.operatorIdentities || []).map((operator) => operator.id)),
    ]);
  }

  function collectConsoles(fieldState = {}, buildWeekState = {}) {
    return unique([
      ...(fieldState.operators || []).map((operator) => operator.consoleId),
      ...((buildWeekState.incidentParticipants || []).map((participant) => participant.consoleId)),
      ...((buildWeekState.masterIncidentRecord?.participatingConsoles || [])),
    ]);
  }

  function createAiDraftSections({ buildWeekState = {}, fieldState = {}, chronology = [] } = {}) {
    const grouped = groupEventsByClass(chronology);
    const fieldActs = fieldState.acts || [];
    const evidence = fieldState.evidences || [];
    const completedActs = fieldActs.filter((act) => act.status === "FINALIZED");

    function linesFrom(events, fallback) {
      return events.length
        ? events.slice(0, 8).map((event) => `${event.summary} [${event.eventId}]`)
        : [`Dato no disponible: ${fallback}.`];
    }

    return {
      antecedentes: linesFrom(chronology.filter((event) => event.sourceType === "ledger_event").slice(0, 5), "antecedentes operativos"),
      circunstanciasAlArribo: linesFrom(chronology.filter((event) => event.summary.includes("ARRIVED")), "circunstancias al arribo"),
      hechosObservados: linesFrom(grouped[INFORMATION_CLASSES.OBSERVED_FACT], "hechos observados"),
      manifestacionesTerceros: linesFrom(grouped[INFORMATION_CLASSES.THIRD_PARTY_STATEMENT], "manifestaciones de terceros"),
      datosSistema: linesFrom(grouped[INFORMATION_CLASSES.SYSTEM_DATA], "datos del sistema"),
      actuacionesRealizadas: linesFrom(grouped[INFORMATION_CLASSES.ACTION_PERFORMED], "actuaciones realizadas"),
      organismosIntervinientes: collectConsoles(fieldState, buildWeekState).map((consoleId) => `${consoleId} incorporado al Informe Maestro Interno.`),
      evidenciaVinculada: evidence.length
        ? evidence.map((item) => `${item.evidenceId}: ${item.type} / ${item.integrityReference}`)
        : ["Dato no disponible: evidencia vinculada."],
      resultado: completedActs.length
        ? completedActs.map((act) => `${act.id}: intervencion individual completada por ${act.ownerOperatorId}.`)
        : ["Dato no disponible: resultado final de intervenciones."],
      seguimiento: ["Seguimiento definido por consola maestra y supervisor cuando corresponda."],
      unsupportedInformation: chronology
        .filter((event) => event.informationClass === INFORMATION_CLASSES.INFERENCE_REQUIRING_REVIEW)
        .map((event) => `${event.summary} [${event.eventId}]`),
      contradictions: [],
    };
  }

  function createProcedureAct(state, context = {}, actorInput = {}) {
    if (state.procedureAct?.status === PROCEDURE_ACT_STATUSES.FINALIZED) {
      return fail("No se puede sobrescribir una version finalizada.");
    }

    const actor = normalizeActor(actorInput);
    const buildWeekState = context.buildWeekState || state.contextSnapshot.buildWeekState || {};
    const fieldState = context.fieldState || state.contextSnapshot.fieldState || {};
    const ledgerEvents = context.ledgerEvents || state.contextSnapshot.ledgerEvents || [];
    const chronology = buildAutomaticChronology({ fieldState, ledgerEvents });
    const grouped = groupEventsByClass(chronology);
    const startedAt = actorInput.startedAt || chronology[0]?.timestamp || nowIso();
    const completedAt = actorInput.completedAt || null;
    const fieldActs = fieldState.acts || [];
    const procedureAct = {
      actId: actorInput.actId || "PACT-BW-000001",
      incidentId: state.incidentId,
      masterRecordId: state.masterRecordId,
      individualActIds: collectIndividualActIds(fieldState, buildWeekState),
      operatorId: actor.operatorId,
      consoleId: actor.consoleId,
      organization: actor.organization,
      rankOrRole: actor.rankOrRole,
      specialty: actor.specialty,
      deviceId: actor.deviceId,
      sessionId: actor.sessionId,
      jurisdiction: actor.jurisdiction,
      simulatedLocation: actor.simulatedLocation || fieldState.incident?.locationSimulated || buildWeekState.incident?.location,
      startedAt,
      completedAt,
      version: "v1",
      status: PROCEDURE_ACT_STATUSES.DRAFT,
      locked: false,
      content: {
        identification: {
          actNumber: actorInput.actNumber || "PACT-BW-000001",
          incidentNumber: state.incidentId,
          organization: actor.organization,
          unit: actorInput.unit || "Consola Maestra PIPO",
          officer: actor.operatorId,
          rankOrRole: actor.rankOrRole,
          specialty: actor.specialty,
          team: collectOperators(fieldState, buildWeekState),
          date: startedAt.slice(0, 10),
          startTime: startedAt.slice(11, 19),
          endTime: completedAt ? completedAt.slice(11, 19) : "",
          simulatedPlace: actor.simulatedLocation || fieldState.incident?.locationSimulated || "Lugar simulado no informado",
        },
        reason: {
          intakeChannel: buildWeekState.incident?.source || fieldState.incident?.channel || "PIPO Layer",
          initialDescription: buildWeekState.incident?.initialDescription || fieldState.incident?.summary || "Dato no disponible",
          incidentType: buildWeekState.humanDecision?.finalIncidentType || fieldState.incident?.title || "Dato no disponible",
          priority: buildWeekState.incident?.priority || fieldState.incident?.priority || "Dato no disponible",
          referringOrganization: buildWeekState.routing?.sourceAgency || "Consola maestra",
          receivingConsole: buildWeekState.routing?.targetAgency || collectConsoles(fieldState, buildWeekState).join(", "),
        },
        arrivalCircumstances: {
          placeStatus: actorInput.placeStatus || "Escena vial simulada con lesion y derrame.",
          presentPersons: actorInput.presentPersons || "Persona lesionada y equipos intervinientes ficticios.",
          risks: actorInput.risks || "Derrame, circulacion y riesgo de incendio bajo verificacion.",
          injuries: actorInput.injuries || "Lesion informada en escenario de demostracion.",
          relevantConditions: actorInput.relevantConditions || "Cruce simulado con necesidad de corredor vial.",
          existingResources: actorInput.existingResources || collectConsoles(fieldState, buildWeekState).join(", "),
        },
        collectedInformation: grouped,
        actions: {
          assistance: linesOrFallback(grouped[INFORMATION_CLASSES.ACTION_PERFORMED], "asistencia"),
          communications: linesOrFallback(grouped[INFORMATION_CLASSES.COMMUNICATION], "comunicaciones"),
          measures: linesOrFallback(chronology.filter((event) => event.summary.includes("corte") || event.summary.includes("derrame")), "medidas adoptadas"),
          summonedOrganizations: collectConsoles(fieldState, buildWeekState),
          derivations: linesOrFallback(chronology.filter((event) => event.summary.toLowerCase().includes("apoyo")), "derivaciones"),
          transfers: actorInput.transfers || "Dato no disponible",
          preservation: fieldActs.length ? "Actas individuales preservadas como fuentes autonomas." : "Dato no disponible",
          safeguards: "Acceso por rol, finalidad y trazabilidad de demostracion.",
          healthActions: linesOrFallback(chronology.filter((event) => event.consoleId === "CON-107"), "intervenciones sanitarias"),
          judicialActions: actorInput.judicialActions || "Dato no disponible",
          territorialFollowUp: actorInput.territorialFollowUp || "Seguimiento territorial pendiente de definicion final.",
        },
        evidence: (fieldState.evidences || []).map((item) => ({
          evidenceId: item.evidenceId,
          type: item.type,
          origin: item.origin,
          timestamp: item.timestamp,
          author: item.operatorId,
          integrityReference: item.integrityReference,
        })),
        result: {
          outcome: actorInput.outcome || "Intervencion multidisciplinaria completada en escenario simulado.",
          derivation: actorInput.derivation || "Consolas 911, 107, Transito y Bomberos integradas.",
          healthAssistance: actorInput.healthAssistance || "Triage sanitario simulado documentado.",
          policeAction: actorInput.policeAction || "Actuacion policial simulada documentada.",
          judicialAction: actorInput.judicialAction || "Dato no disponible",
          followUp: actorInput.followUp || "Pendiente de seguimiento operativo y cierre validado.",
          cancellation: "",
          falsePositive: "",
          pending: actorInput.pending || "Revision de consistencia y supervisor si corresponde.",
        },
        finalObservations: {
          closingSituation: actorInput.closingSituation || "Escena estabilizada en terminos de demostracion.",
          pendingRisks: actorInput.pendingRisks || "Verificar registros divergentes antes del cierre.",
          suggestedMeasures: actorInput.suggestedMeasures || "Mantener hilo documental y completar supervision.",
          responsibleOrganization: actor.organization,
          expansionNeeded: actorInput.expansionNeeded || "Aclaracion sanitaria por inconsistencia horaria simulada.",
        },
        confirmation: {
          responsibleOperator: actor.operatorId,
          reviewStatement: "",
          timestamp: "",
          sessionId: actor.sessionId,
          status: PROCEDURE_ACT_STATUSES.DRAFT,
          integrityReference: null,
        },
      },
    };

    state.contextSnapshot = { buildWeekState: clone(buildWeekState), fieldState: clone(fieldState), ledgerEvents: clone(ledgerEvents) };
    state.chronology = chronology;
    state.procedureAct = procedureAct;
    state.aiDraft = null;
    pushVersion(state, procedureAct, actor.operatorId, "Creacion de borrador.", "v1", PROCEDURE_ACT_STATUSES.DRAFT);
    state.completeness = calculateCompleteness(procedureAct);
    state.findings = runConsistencyEngine(state, { buildWeekState, fieldState, ledgerEvents });
    state.supervision = determineSupervision(state, { buildWeekState, fieldState });
    state.printViewHtml = buildPrintView(procedureAct, state);
    state.lastMessage = "Registro Integrado de Procedimiento creado en borrador.";

    return ok({
      procedureAct,
      ledger: ledgerEnvelope(actor, "procedure.act.created", "Registro Integrado de Procedimiento creado en borrador.", {
        actId: procedureAct.actId,
        version: procedureAct.version,
        status: procedureAct.status,
      }),
    });
  }

  function linesOrFallback(events = [], label) {
    return events.length ? events.map((event) => `${event.summary} [${event.eventId}]`) : [`Dato no disponible: ${label}.`];
  }

  function generateAiDraft(state) {
    if (!state.procedureAct) return fail("Primero debe generarse el Registro Integrado de Procedimiento.");
    const sections = createAiDraftSections({
      buildWeekState: state.contextSnapshot.buildWeekState,
      fieldState: state.contextSnapshot.fieldState,
      chronology: state.chronology,
    });
    const draft = {
      id: "AIDRAFT-PACT-BW-000001",
      actId: state.procedureAct.actId,
      generatedAt: nowIso(),
      notice: AI_DRAFT_NOTICE,
      sourcePolicy: "Solo bitacora, acontecimientos individuales, decisiones humanas, actuaciones, evidencia referenciada y respuestas del operador.",
      sections,
      limitations: [
        "No atribuye culpabilidad.",
        "No emite conclusiones juridicas.",
        "No inventa datos.",
        "Marca Dato no disponible cuando falta informacion.",
        "Cita eventos fuente en cada linea disponible.",
      ],
    };
    state.aiDraft = draft;
    state.procedureAct.content.aiAssistedDraft = draft;
    state.lastMessage = "Borrador asistido por IA generado y pendiente de revision humana.";
    return ok({
      aiDraft: draft,
      ledger: ledgerEnvelopeFromAct(state.procedureAct, "procedure.act.ai_draft_generated", "Borrador asistido por IA generado para revision humana.", {
        draftId: draft.id,
        sourcePolicy: draft.sourcePolicy,
      }),
    });
  }

  function calculateCompleteness(act) {
    if (!act) {
      return {
        percent: 0,
        completed: [],
        pending: REQUIRED_COMPLETENESS_ITEMS.map((item) => item[1]),
        warnings: [],
        blockingErrors: ["registro integrado pendiente."],
        recommendations: [],
      };
    }
    const content = act.content || {};
    const checks = {
      identification: Boolean(content.identification?.actNumber && content.identification?.incidentNumber && content.identification?.organization),
      responsible: Boolean(act.operatorId && act.consoleId && act.sessionId),
      location: Boolean(act.simulatedLocation || content.identification?.simulatedPlace),
      times: Boolean(act.startedAt && content.identification?.startTime),
      reason: Boolean(content.reason?.initialDescription && content.reason?.priority),
      narrative: Boolean(content.aiAssistedDraft || content.finalObservations?.closingSituation),
      facts: (content.collectedInformation?.[INFORMATION_CLASSES.OBSERVED_FACT] || []).length > 0,
      statements: true,
      actions: hasAnyAction(content.actions),
      evidence: (content.evidence || []).length > 0,
      result: Boolean(content.result?.outcome),
      followUp: Boolean(content.result?.followUp),
      confirmation: Boolean(content.confirmation?.reviewStatement && content.confirmation?.timestamp),
    };
    const completed = REQUIRED_COMPLETENESS_ITEMS.filter(([key]) => checks[key]).map(([, label]) => label);
    const pending = REQUIRED_COMPLETENESS_ITEMS.filter(([key]) => !checks[key]).map(([, label]) => label);
    const blockingErrors = pending.filter((label) => ["Identificacion", "Responsable", "Lugar", "Horarios", "Motivo", "Actuaciones", "Evidencia", "Resultado", "Seguimiento", "Confirmacion"].includes(label))
      .map((label) => `Campo obligatorio pendiente: ${label}.`);
    const warnings = [];
    if (!checks.facts) warnings.push("No hay hechos observados propios vinculados.");
    if (!checks.statements) warnings.push("No hay manifestaciones de terceros registradas.");
    if (!content.result?.judicialAction || content.result.judicialAction === "Dato no disponible") {
      warnings.push("Actuacion judicial no informada; mantener Dato no disponible si no corresponde.");
    }
    return {
      percent: Math.round((completed.length / REQUIRED_COMPLETENESS_ITEMS.length) * 100),
      completed,
      pending,
      warnings,
      blockingErrors,
      recommendations: pending.length ? ["Completar pendientes antes de finalizar."] : ["Registro Integrado listo para control de consistencia."],
    };
  }

  function hasAnyAction(actions = {}) {
    return Object.values(actions).some((value) => Array.isArray(value) ? value.length > 0 : Boolean(compact(value)));
  }

  function runConsistencyEngine(state, context = {}) {
    const act = state.procedureAct;
    const fieldState = context.fieldState || state.contextSnapshot.fieldState || {};
    const findings = [];
    if (!act) {
      return [finding(FINDING_TYPES.BLOCKING_ERROR, "procedure_act_missing", "No existe Registro Integrado de Procedimiento.")];
    }

    if (!act.operatorId) findings.push(finding(FINDING_TYPES.BLOCKING_ERROR, "responsible_missing", "Registro Integrado sin responsable."));
    if (!act.content?.result?.outcome) findings.push(finding(FINDING_TYPES.BLOCKING_ERROR, "result_missing", "Registro Integrado sin resultado."));
    if (!act.content?.confirmation?.reviewStatement) findings.push(finding(FINDING_TYPES.BLOCKING_ERROR, "confirmation_missing", "Confirmacion humana pendiente."));
    if (!act.individualActIds?.length) findings.push(finding(FINDING_TYPES.BLOCKING_ERROR, "individual_acts_missing", "Cierre sin acta o reporte individual."));
    if (!state.chronology.length) findings.push(finding(FINDING_TYPES.BLOCKING_ERROR, "chronology_missing", "Cronologia automatica vacia."));

    (fieldState.assignments || []).forEach((assignment) => {
      if (assignment.completedAt && assignment.arrivedAt && new Date(assignment.completedAt) < new Date(assignment.arrivedAt)) {
        findings.push(finding(FINDING_TYPES.BLOCKING_ERROR, "closure_before_arrival", `Cierre anterior al arribo para ${assignment.operatorId}.`, assignment.operatorId));
      }
      if (assignment.startedAt && assignment.arrivedAt && new Date(assignment.startedAt) < new Date(assignment.arrivedAt)) {
        findings.push(finding(FINDING_TYPES.BLOCKING_ERROR, "intervention_before_arrival", `Intervencion anterior al arribo para ${assignment.operatorId}.`, assignment.operatorId));
      }
      if (assignment.interventionStatus === "COMPLETED" && !assignment.completedAt) {
        findings.push(finding(FINDING_TYPES.WARNING, "completed_without_time", `Intervencion completada sin horario final para ${assignment.operatorId}.`, assignment.operatorId));
      }
    });

    (fieldState.evidences || []).forEach((evidence) => {
      if (!evidence.operatorId) findings.push(finding(FINDING_TYPES.BLOCKING_ERROR, "evidence_author_missing", `Evidencia sin autor: ${evidence.evidenceId}.`, evidence.evidenceId));
      if (!evidence.origin) findings.push(finding(FINDING_TYPES.BLOCKING_ERROR, "evidence_origin_missing", `Evidencia sin origen: ${evidence.evidenceId}.`, evidence.evidenceId));
      if (!evidence.timestamp) findings.push(finding(FINDING_TYPES.BLOCKING_ERROR, "evidence_date_missing", `Evidencia sin fecha: ${evidence.evidenceId}.`, evidence.evidenceId));
    });

    const consoles = collectConsoles(fieldState, state.contextSnapshot.buildWeekState);
    const actionText = JSON.stringify(act.content?.actions || {}).toLowerCase();
    if (actionText.includes("traslado") && !actionText.includes("hospital") && !actionText.includes("destino")) {
      findings.push(finding(FINDING_TYPES.WARNING, "transfer_destination_missing", "Traslado mencionado sin destino claro."));
    }
    if (actionText.includes("sanitaria") && !consoles.includes("CON-107")) {
      findings.push(finding(FINDING_TYPES.BLOCKING_ERROR, "health_console_missing", "Actuacion sanitaria sin consola de salud incorporada."));
    }
    if (actionText.includes("judicial") && !consoles.includes("CON-FISCALIA") && !consoles.includes("CON-COMISARIA")) {
      findings.push(finding(FINDING_TYPES.WARNING, "judicial_console_missing", "Actuacion judicial mencionada sin consola competente incorporada."));
    }
    if (fieldState.supportRequests?.some((request) => request.status === "PENDING")) {
      findings.push(finding(FINDING_TYPES.PENDING_INFORMATION, "pending_support", "Existen apoyos solicitados pendientes de aceptacion."));
    }
    if (state.clarificationRequests?.some((request) => request.status !== "RESPONDED")) {
      findings.push(finding(FINDING_TYPES.PENDING_INFORMATION, "pending_clarification", "Existen aclaraciones pendientes de respuesta."));
    }
    if (state.aiDraft?.sections?.unsupportedInformation?.length) {
      findings.push(finding(FINDING_TYPES.WARNING, "unsupported_ai_information", "El borrador contiene inferencias que requieren revision."));
    }
    (state.demoInconsistencies || []).forEach((item) => {
      findings.push(finding(
        item.status === "RESOLVED" ? FINDING_TYPES.RECOMMENDATION : FINDING_TYPES.PENDING_INFORMATION,
        "time_inconsistency",
        item.status === "RESOLVED" ? `Inconsistencia horaria respondida: ${item.message}` : item.message,
        item.sourceRef,
      ));
    });
    if (act.content?.finalObservations?.pendingRisks?.toLowerCase().includes("divergente")) {
      findings.push(finding(FINDING_TYPES.WARNING, "divergent_records", "Existen versiones o registros que requieren revision."));
    }
    if (!state.supervision || state.supervision.status !== SUPERVISION_STATUSES.VALIDATED) {
      const supervision = determineSupervision(state, { buildWeekState: state.contextSnapshot.buildWeekState, fieldState });
      if (supervision.required) {
        findings.push(finding(FINDING_TYPES.BLOCKING_ERROR, "supervisor_required", "Incidente critico requiere revision de supervisor."));
      }
    }

    state.findings = dedupeFindings(findings);
    state.completeness = calculateCompleteness(act);
    return state.findings;
  }

  function finding(type, code, message, sourceRef = null) {
    return { id: `FIND-${code}`, type, code, message, sourceRef };
  }

  function dedupeFindings(findings) {
    const seen = new Set();
    return findings.filter((item) => {
      const key = `${item.type}-${item.code}-${item.sourceRef || ""}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function determineSupervision(state, context = {}) {
    const buildWeekState = context.buildWeekState || state.contextSnapshot.buildWeekState || {};
    const fieldState = context.fieldState || state.contextSnapshot.fieldState || {};
    const text = JSON.stringify({ buildWeekState, fieldState, act: state.procedureAct }).toLowerCase();
    const triggers = [];
    if ((buildWeekState.incident?.priority || fieldState.incident?.priority || "").toUpperCase() === "RED") triggers.push("prioridad RED");
    ["violencia", "ninez", "niñez", "fallecimiento", "lesiones graves", "armas", "judicial", "detencion", "traslado", "evidencia sensible", "ciberdelito", "dispositivo rastreado", "contradiccion"].forEach((needle) => {
      if (text.includes(needle)) triggers.push(needle);
    });
    if (collectConsoles(fieldState, buildWeekState).length > 2) triggers.push("multiples organismos");
    const uniqueTriggers = unique(triggers);
    const previous = state.supervision || {};
    return {
      required: uniqueTriggers.length > 0,
      status: uniqueTriggers.length > 0 ? (previous.status === SUPERVISION_STATUSES.VALIDATED ? SUPERVISION_STATUSES.VALIDATED : SUPERVISION_STATUSES.PENDING) : SUPERVISION_STATUSES.NOT_REQUIRED,
      triggers: uniqueTriggers,
      observations: previous.observations || [],
      requestedAt: previous.requestedAt || null,
      reviewedAt: previous.reviewedAt || null,
      validatedAt: previous.validatedAt || null,
    };
  }

  function updateCompleteness(state) {
    if (!state.procedureAct) return fail("Primero debe generarse el Registro Integrado de Procedimiento.");
    state.completeness = calculateCompleteness(state.procedureAct);
    return ok({
      completeness: state.completeness,
      ledger: ledgerEnvelopeFromAct(state.procedureAct, "procedure.act.completeness_updated", `Registro Integrado ${state.completeness.percent}% completo.`, {
        percent: state.completeness.percent,
        pending: state.completeness.pending,
        blockingErrors: state.completeness.blockingErrors,
      }),
    });
  }

  function checkConsistency(state) {
    if (!state.procedureAct) return fail("Primero debe generarse el Registro Integrado de Procedimiento.");
    const findings = runConsistencyEngine(state);
    return ok({
      findings,
      ledger: ledgerEnvelopeFromAct(state.procedureAct, "procedure.act.consistency_checked", "Control de consistencia ejecutado.", {
        blockingErrors: findings.filter((item) => item.type === FINDING_TYPES.BLOCKING_ERROR).length,
        warnings: findings.filter((item) => item.type === FINDING_TYPES.WARNING).length,
        pendingInformation: findings.filter((item) => item.type === FINDING_TYPES.PENDING_INFORMATION).length,
      }),
    });
  }

  function completeOperatorReview(state, reviewStatement = "El funcionario actuante revisa el borrador y confirma su contenido como demo.") {
    if (!state.procedureAct) return fail("Primero debe generarse el Registro Integrado de Procedimiento.");
    if (state.procedureAct.locked) return fail("El Registro Integrado finalizado esta bloqueado.");
    state.procedureAct.content.confirmation.reviewStatement = reviewStatement;
    state.procedureAct.content.confirmation.timestamp = nowIso();
    state.procedureAct.content.confirmation.status = PROCEDURE_ACT_STATUSES.IN_REVIEW;
    state.procedureAct.status = PROCEDURE_ACT_STATUSES.IN_REVIEW;
    state.procedureAct.version = "v2";
    pushVersion(state, state.procedureAct, state.procedureAct.operatorId, "Revision humana del borrador.", "v2", PROCEDURE_ACT_STATUSES.IN_REVIEW);
    state.completeness = calculateCompleteness(state.procedureAct);
    return ok({
      procedureAct: state.procedureAct,
      ledger: ledgerEnvelopeFromAct(state.procedureAct, "procedure.act.review_started", "Revision humana iniciada y declaracion agregada.", {
        actId: state.procedureAct.actId,
        version: state.procedureAct.version,
      }),
    });
  }

  function submitProcedureAct(state) {
    if (!state.procedureAct) return fail("Primero debe generarse el Registro Integrado de Procedimiento.");
    const consistency = runConsistencyEngine(state);
    const blocking = consistency.filter((item) => item.type === FINDING_TYPES.BLOCKING_ERROR);
    if (blocking.length) {
      return fail(`No se puede presentar: ${blocking[0].message}`);
    }
    state.procedureAct.status = state.supervision.required ? PROCEDURE_ACT_STATUSES.PENDING_SUPERVISOR : PROCEDURE_ACT_STATUSES.IN_REVIEW;
    state.lastMessage = "Registro Integrado presentado para control final.";
    return ok({
      procedureAct: state.procedureAct,
      ledger: ledgerEnvelopeFromAct(state.procedureAct, "procedure.act.submitted", "Registro Integrado presentado para control final.", {
        actId: state.procedureAct.actId,
        status: state.procedureAct.status,
      }),
    });
  }

  function requestSupervisorReview(state, reason = "Revision requerida por criticidad, evidencia sensible o multiples organismos.") {
    if (!state.procedureAct) return fail("Primero debe generarse el Registro Integrado de Procedimiento.");
    state.supervision = determineSupervision(state);
    state.supervision.required = true;
    state.supervision.status = SUPERVISION_STATUSES.IN_REVIEW;
    state.supervision.requestedAt = nowIso();
    state.supervision.observations.push({
      type: "request",
      reason,
      createdAt: state.supervision.requestedAt,
      actor: state.procedureAct.operatorId,
    });
    state.procedureAct.status = PROCEDURE_ACT_STATUSES.PENDING_SUPERVISOR;
    return ok({
      supervision: state.supervision,
      ledger: ledgerEnvelopeFromAct(state.procedureAct, "procedure.act.supervisor_requested", "Supervisor requerido para validacion documental.", {
        actId: state.procedureAct.actId,
        reason,
        triggers: state.supervision.triggers,
      }),
    });
  }

  function observeSupervisor(state, observation = "Solicitar ampliacion antes de cierre.") {
    if (!state.procedureAct) return fail("Primero debe generarse el Registro Integrado de Procedimiento.");
    state.supervision.required = true;
    state.supervision.status = SUPERVISION_STATUSES.OBSERVED;
    state.supervision.reviewedAt = nowIso();
    state.supervision.observations.push({
      type: "observation",
      observation,
      createdAt: state.supervision.reviewedAt,
      actor: "SUP-MASTER-DEMO",
    });
    state.procedureAct.status = PROCEDURE_ACT_STATUSES.RETURNED_FOR_CLARIFICATION;
    return ok({
      supervision: state.supervision,
      ledger: ledgerEnvelopeFromAct(state.procedureAct, "procedure.act.returned", "Supervisor observo y solicito aclaracion.", {
        actId: state.procedureAct.actId,
        observation,
      }),
    });
  }

  function validateSupervisor(state, observation = "Supervisor valida recepcion documental sin modificar relato.") {
    if (!state.procedureAct) return fail("Primero debe generarse el Registro Integrado de Procedimiento.");
    state.supervision.required = true;
    state.supervision.status = SUPERVISION_STATUSES.VALIDATED;
    state.supervision.validatedAt = nowIso();
    state.supervision.observations.push({
      type: "validation",
      observation,
      createdAt: state.supervision.validatedAt,
      actor: "SUP-MASTER-DEMO",
    });
    if (state.procedureAct.status !== PROCEDURE_ACT_STATUSES.FINALIZED) {
      state.procedureAct.status = PROCEDURE_ACT_STATUSES.IN_REVIEW;
    }
    state.findings = runConsistencyEngine(state).filter((item) => item.code !== "supervisor_required");
    return ok({
      supervision: state.supervision,
      ledger: ledgerEnvelopeFromAct(state.procedureAct, "procedure.act.review_started", "Supervisor valido recepcion documental.", {
        actId: state.procedureAct.actId,
        status: state.supervision.status,
      }),
    });
  }

  function requestClarification(state, requestInput = {}) {
    if (!state.procedureAct) return fail("Primero debe generarse el Registro Integrado de Procedimiento.");
    const request = {
      id: `PCLAR-${String(state.clarificationRequests.length + 1).padStart(3, "0")}`,
      incidentId: state.incidentId,
      sourceActId: requestInput.sourceActId || state.procedureAct.individualActIds[0] || state.procedureAct.actId,
      requestingOperatorId: requestInput.requestingOperatorId || state.procedureAct.operatorId,
      recipientOperatorId: requestInput.recipientOperatorId || "OP-FIELD-107-A",
      reason: requestInput.reason || "Aclarar inconsistencia horaria simulada sin reescribir fuente original.",
      referencedEvents: requestInput.referencedEvents || state.chronology.slice(0, 2).map((event) => event.eventId),
      response: null,
      status: "PENDING",
      createdAt: nowIso(),
      resolvedAt: null,
    };
    state.clarificationRequests.push(request);
    state.findings = runConsistencyEngine(state);
    return ok({
      request,
      ledger: ledgerEnvelopeFromAct(state.procedureAct, "clarification.requested", "Solicitud de aclaracion documental registrada.", {
        requestId: request.id,
        sourceActId: request.sourceActId,
        recipientOperatorId: request.recipientOperatorId,
      }),
    });
  }

  function respondClarification(state, requestId, response = "Se responde mediante anexo sin modificar la fuente original.") {
    const request = state.clarificationRequests.find((item) => item.id === requestId);
    if (!request) return fail("Solicitud de aclaracion no encontrada.");
    request.response = {
      text: response,
      respondedAt: nowIso(),
      responseType: "ampliacion",
      preservesOriginal: true,
    };
    request.status = "RESPONDED";
    request.resolvedAt = request.response.respondedAt;
    (state.demoInconsistencies || []).forEach((item) => {
      if (request.reason.toLowerCase().includes("horario") || item.sourceRef === request.sourceActId) {
        item.status = "RESOLVED";
        item.resolvedAt = request.resolvedAt;
        item.responseRequestId = request.id;
      }
    });
    state.findings = runConsistencyEngine(state);
    return ok({
      request,
      ledger: ledgerEnvelopeFromAct(state.procedureAct, "clarification.responded", "Aclaracion respondida mediante anexo.", {
        requestId: request.id,
        preservesOriginal: true,
      }),
    });
  }

  function finalizeProcedureAct(state) {
    if (!state.procedureAct) return fail("Primero debe generarse el Registro Integrado de Procedimiento.");
    if (state.procedureAct.locked) return fail("El Registro Integrado finalizado ya esta bloqueado.");
    state.completeness = calculateCompleteness(state.procedureAct);
    state.findings = runConsistencyEngine(state);
    const blocking = [
      ...state.completeness.blockingErrors,
      ...state.findings.filter((item) => item.type === FINDING_TYPES.BLOCKING_ERROR).map((item) => item.message),
    ];
    if (blocking.length) return fail(`No se puede finalizar: ${blocking[0]}`);

    state.procedureAct.status = PROCEDURE_ACT_STATUSES.FINALIZED;
    state.procedureAct.version = "v3";
    state.procedureAct.completedAt = nowIso();
    state.procedureAct.content.confirmation.status = PROCEDURE_ACT_STATUSES.FINALIZED;
    state.procedureAct.content.confirmation.integrityReference = integrityReference(finalContentSnapshot(state.procedureAct));
    state.procedureAct.integrityReference = state.procedureAct.content.confirmation.integrityReference;
    state.procedureAct.integrityNotice = INTEGRITY_NOTICE;
    state.procedureAct.locked = true;
    pushVersion(state, state.procedureAct, state.procedureAct.operatorId, "Finalizacion con control de completitud y consistencia.", "v3", PROCEDURE_ACT_STATUSES.FINALIZED);
    state.printViewHtml = buildPrintView(state.procedureAct, state);
    state.lastMessage = "Registro Integrado finalizado y bloqueado.";
    return ok({
      procedureAct: state.procedureAct,
      ledger: ledgerEnvelopeFromAct(state.procedureAct, "procedure.act.finalized", "Registro Integrado finalizado y bloqueado.", {
        actId: state.procedureAct.actId,
        version: state.procedureAct.version,
        integrityReference: state.procedureAct.integrityReference,
      }),
    });
  }

  function amendProcedureAct(state, reason = "Ampliacion posterior.", additions = "Se agrega ampliacion sin alterar el documento final.") {
    if (!state.procedureAct?.locked) return fail("Solo puede ampliarse una version finalizada o bloqueada.");
    if (!compact(reason)) return fail("La ampliacion requiere motivo.");
    const version = createDetachedVersion(state, "v3.1", PROCEDURE_ACT_STATUSES.AMENDED, reason, { additions });
    state.procedureAct.status = PROCEDURE_ACT_STATUSES.AMENDED;
    state.lastMessage = "Ampliacion agregada como nueva version sin sobrescribir la final.";
    return ok({
      version,
      ledger: ledgerEnvelopeFromAct(state.procedureAct, "procedure.act.amended", "Registro Integrado ampliado mediante version posterior.", {
        actId: state.procedureAct.actId,
        versionId: version.versionId,
        previousVersionId: version.previousVersionId,
      }),
    });
  }

  function rectifyProcedureAct(state, correction = "Se rectifica un dato puntual.", reason = "Rectificacion documentada.") {
    if (!state.procedureAct?.locked) return fail("Solo puede rectificarse una version finalizada o bloqueada.");
    if (!compact(correction) || !compact(reason)) return fail("La rectificacion requiere que se corrige y por que.");
    const version = createDetachedVersion(state, "v3.2", PROCEDURE_ACT_STATUSES.RECTIFIED, reason, {
      correction,
      originalReference: state.procedureAct.integrityReference,
    });
    state.procedureAct.status = PROCEDURE_ACT_STATUSES.RECTIFIED;
    state.lastMessage = "Rectificacion agregada sin reescribir el documento original.";
    return ok({
      version,
      ledger: ledgerEnvelopeFromAct(state.procedureAct, "procedure.act.rectified", "Registro Integrado rectificado mediante version posterior.", {
        actId: state.procedureAct.actId,
        versionId: version.versionId,
        correction,
        reason,
      }),
    });
  }

  function annulProcedureAct(state, reason = "", authority = "Autoridad simulada") {
    if (!state.procedureAct) return fail("Primero debe generarse el Registro Integrado de Procedimiento.");
    if (!compact(reason)) return fail("La anulacion requiere motivo y autoridad.");
    const version = createDetachedVersion(state, "v3.3", PROCEDURE_ACT_STATUSES.ANNULLED_WITH_REASON, reason, {
      authority,
      originalPreserved: true,
    });
    state.procedureAct.status = PROCEDURE_ACT_STATUSES.ANNULLED_WITH_REASON;
    return ok({
      version,
      ledger: ledgerEnvelopeFromAct(state.procedureAct, "procedure.act.annulled", "Registro Integrado anulado con motivo conservando documento.", {
        actId: state.procedureAct.actId,
        versionId: version.versionId,
        reason,
        authority,
      }),
    });
  }

  function buildMasterIncidentRecord(state) {
    if (!state.procedureAct) return fail("Primero debe generarse el Registro Integrado de Procedimiento.");
    const fieldState = state.contextSnapshot.fieldState || {};
    const buildWeekState = state.contextSnapshot.buildWeekState || {};
    const divergences = state.findings.filter((item) => ["divergent_records", "intervention_before_arrival", "closure_before_arrival", "time_inconsistency"].includes(item.code));
    const record = {
      id: state.masterRecordId || "MIR-BW-000001",
      incidentId: state.incidentId,
      generatedAt: nowIso(),
      principle: INTEGRATION_PRINCIPLE,
      incident: buildWeekState.incident || fieldState.incident || {},
      organizations: collectConsoles(fieldState, buildWeekState),
      operators: collectOperators(fieldState, buildWeekState),
      interventions: (fieldState.assignments || []).map((assignment) => ({
        assignmentId: assignment.assignmentId,
        operatorId: assignment.operatorId,
        consoleId: assignment.consoleId,
        status: assignment.interventionStatus,
        individualActId: assignment.individualActId,
      })),
      individualActs: collectIndividualActIds(fieldState, buildWeekState),
      procedureActId: state.procedureAct.actId,
      procedureActVersion: state.procedureAct.version,
      chronology: state.chronology,
      results: state.procedureAct.content.result,
      contradictions: divergences.length
        ? divergences.map((item) => ({ id: item.id, summary: item.message, sourceRef: item.sourceRef, status: "requiere revision" }))
        : [],
      divergenceNotice: divergences.length ? "Existen versiones o registros que requieren revision." : "Sin divergencias bloqueantes luego de la revision.",
      clarifications: state.clarificationRequests,
      evidence: state.procedureAct.content.evidence,
      audit: {
        ledgerEventCount: state.contextSnapshot.ledgerEvents.length,
        procedureVersions: state.procedureActVersions.length,
        integrityReference: state.procedureAct.integrityReference || null,
      },
      closureStatus: state.closure?.status || "OPEN",
    };
    state.masterIncidentRecord = record;
    return ok({
      masterIncidentRecord: record,
      ledger: ledgerEnvelopeFromAct(state.procedureAct, "master.record.generated", "Informe Maestro Interno generado como indice y sintesis.", {
        masterRecordId: record.id,
        individualActs: record.individualActs,
        procedureActId: record.procedureActId,
      }),
    });
  }

  function proposeClosure(state, status = CLOSURE_STATUSES.CLOSED_WITH_PROCEDURE_ACT, summary = "Cierre propuesto con Registro Integrado de Procedimiento.", followUp = "Seguimiento no requerido luego de validacion.") {
    if (!state.procedureAct) return fail("Primero debe generarse el Registro Integrado de Procedimiento.");
    if (!Object.values(CLOSURE_STATUSES).includes(status)) return fail("Estado de cierre no permitido.");
    const requirements = validateClosureRequirements(state, status, summary, followUp);
    if (!requirements.valid) {
      state.closure = {
        id: "CLOSE-BW-000001",
        incidentId: state.incidentId,
        status: "BLOCKED",
        proposedStatus: status,
        responsible: state.procedureAct.operatorId,
        summary,
        followUp,
        blockingErrors: requirements.errors,
        proposedAt: nowIso(),
        closedAt: null,
      };
      return ok({
        closure: state.closure,
        ledger: ledgerEnvelopeFromAct(state.procedureAct, "incident.closure.blocked", "Cierre bloqueado por requisitos pendientes.", {
          proposedStatus: status,
          errors: requirements.errors,
        }),
      });
    }
    state.closure = {
      id: "CLOSE-BW-000001",
      incidentId: state.incidentId,
      status: "PROPOSED",
      proposedStatus: status,
      responsible: state.procedureAct.operatorId,
      summary,
      followUp,
      proposedAt: nowIso(),
      closedAt: null,
      associatedAct: state.procedureAct.actId,
      masterRecordId: state.masterIncidentRecord?.id || state.masterRecordId,
    };
    return ok({
      closure: state.closure,
      ledger: ledgerEnvelopeFromAct(state.procedureAct, "incident.closure.proposed", "Cierre propuesto por operador.", {
        proposedStatus: status,
        associatedAct: state.procedureAct.actId,
      }),
    });
  }

  function finalizeClosure(state) {
    if (!state.closure || state.closure.status !== "PROPOSED") {
      return fail("Primero debe existir una propuesta de cierre valida.");
    }
    const requirements = validateClosureRequirements(state, state.closure.proposedStatus, state.closure.summary, state.closure.followUp);
    if (!requirements.valid) return fail(`No se puede cerrar: ${requirements.errors[0]}`);
    state.closure.status = state.closure.proposedStatus;
    state.closure.closedAt = nowIso();
    state.closure.integrityReference = integrityReference(state.closure);
    if (state.masterIncidentRecord) state.masterIncidentRecord.closureStatus = state.closure.status;
    state.lastMessage = "Incidente cerrado con trazabilidad documental.";
    return ok({
      closure: state.closure,
      ledger: ledgerEnvelopeFromAct(state.procedureAct, "incident.closed", "Incidente cerrado con trazabilidad documental.", {
        closureId: state.closure.id,
        status: state.closure.status,
        associatedAct: state.closure.associatedAct,
      }),
    });
  }

  function validateClosureRequirements(state, status, summary, followUp) {
    const errors = [];
    const blockingFindings = runConsistencyEngine(state).filter((item) => item.type === FINDING_TYPES.BLOCKING_ERROR);
    if (!state.procedureAct?.operatorId) errors.push("responsable pendiente");
    if (!status) errors.push("estado final pendiente");
    if (!state.procedureAct?.content?.result?.outcome) errors.push("resultado pendiente");
    if (!hasAnyAction(state.procedureAct?.content?.actions)) errors.push("actuacion pendiente");
    if (!state.procedureAct?.actId) errors.push("registro integrado pendiente");
    if (!state.chronology.length) errors.push("cronologia pendiente");
    if (!followUp) errors.push("seguimiento pendiente");
    if (state.supervision.required && state.supervision.status !== SUPERVISION_STATUSES.VALIDATED) errors.push("revision de supervisor pendiente");
    if (blockingFindings.length) errors.push(`errores bloqueantes pendientes: ${blockingFindings.map((item) => item.code).join(", ")}`);
    if (!summary) errors.push("resumen de cierre pendiente");
    return { valid: errors.length === 0, errors };
  }

  function exportProcedureJson(state) {
    if (!state.procedureAct) return fail("Primero debe generarse el Registro Integrado de Procedimiento.");
    const exported = {
      exportId: `EXPORT-${String(state.exports.length + 1).padStart(3, "0")}`,
      exportedAt: nowIso(),
      content: {
        procedureAct: state.procedureAct,
        masterIncidentRecord: state.masterIncidentRecord,
        closure: state.closure,
        chronology: state.chronology,
        findings: state.findings,
        completeness: state.completeness,
      },
      integrityReference: integrityReference({
        procedureAct: state.procedureAct,
        masterIncidentRecord: state.masterIncidentRecord,
        closure: state.closure,
      }),
    };
    state.exports.push(exported);
    return ok({ export: exported });
  }

  function buildPrintView(act, state) {
    if (!act) return "";
    const sections = state.aiDraft?.sections || {};
    return [
      `<h1>Registro Integrado de Procedimiento</h1>`,
      "<p>Documento interno de integración y revisión que referencia las actas individuales sin sustituirlas, fusionarlas ni modificar sus fuentes.</p>",
      `<p>${AI_DRAFT_NOTICE}</p>`,
      `<p>${INTEGRATION_PRINCIPLE}</p>`,
      `<h2>Identificacion</h2>`,
      `<p>Registro Integrado ${act.actId} / Incidente ${act.incidentId} / Version ${act.version} / Estado ${act.status}</p>`,
      `<h2>Cronologia</h2>`,
      `<ol>${state.chronology.slice(0, 12).map((event) => `<li>${event.timestamp} - ${event.summary} (${event.eventId})</li>`).join("")}</ol>`,
      `<h2>Borrador asistido</h2>`,
      `<p>${Object.keys(sections).length ? "Secciones trazables disponibles." : "Pendiente de generar."}</p>`,
      `<h2>Integridad</h2>`,
      `<p>${act.integrityReference?.label || "Referencia pendiente"}: ${act.integrityReference?.value || "pendiente"}</p>`,
      `<p>${INTEGRITY_NOTICE}</p>`,
    ].join("");
  }

  function pushVersion(state, act, authorId, reason, version, status) {
    const previous = state.procedureActVersions[state.procedureActVersions.length - 1];
    const versionRecord = {
      versionId: `PACT-V-${String(state.procedureActVersions.length + 1).padStart(3, "0")}`,
      actId: act.actId,
      authorId,
      timestamp: nowIso(),
      version,
      reason,
      previousVersionId: previous?.versionId || null,
      contentSnapshot: finalContentSnapshot(act),
      integrityReference: integrityReference(finalContentSnapshot(act)),
      status,
    };
    state.procedureActVersions.push(versionRecord);
    return versionRecord;
  }

  function createDetachedVersion(state, version, status, reason, extraContent) {
    const previous = state.procedureActVersions[state.procedureActVersions.length - 1];
    const snapshot = {
      originalActId: state.procedureAct.actId,
      originalStatus: state.procedureAct.status,
      originalIntegrityReference: state.procedureAct.integrityReference,
      extraContent,
    };
    const versionRecord = {
      versionId: `PACT-V-${String(state.procedureActVersions.length + 1).padStart(3, "0")}`,
      actId: state.procedureAct.actId,
      authorId: state.procedureAct.operatorId,
      timestamp: nowIso(),
      version,
      reason,
      previousVersionId: previous?.versionId || null,
      contentSnapshot: snapshot,
      integrityReference: integrityReference(snapshot),
      status,
    };
    state.procedureActVersions.push(versionRecord);
    return versionRecord;
  }

  function finalContentSnapshot(act) {
    return {
      actId: act.actId,
      incidentId: act.incidentId,
      masterRecordId: act.masterRecordId,
      version: act.version,
      status: act.status,
      content: act.content,
    };
  }

  function ledgerEnvelope(actor, type, summary, payload = {}) {
    return {
      type,
      operatorId: actor.operatorId,
      consoleId: actor.consoleId,
      sessionId: actor.sessionId,
      classification: "SENSITIVE",
      payload: {
        summary,
        ...payload,
      },
    };
  }

  function ledgerEnvelopeFromAct(act, type, summary, payload = {}) {
    return ledgerEnvelope({
      operatorId: act.operatorId,
      consoleId: act.consoleId,
      sessionId: act.sessionId,
    }, type, summary, {
      incidentId: act.incidentId,
      actId: act.actId,
      ...payload,
    });
  }

  function ok(payload) {
    return { ok: true, ...payload };
  }

  function fail(error) {
    return { ok: false, error };
  }

  function runProcedureDemoSequence(state, context = {}, actor = defaultActor()) {
    const results = [];
    function collect(result) {
      results.push(result);
      return result;
    }
    collect(createProcedureAct(state, context, actor));
    collect(generateAiDraft(state));
    collect(updateCompleteness(state));
    registerDemoTimeInconsistency(state);
    collect(checkConsistency(state));
    collect(completeOperatorReview(state));
    collect(requestClarification(state, {
      sourceActId: "ACT-FIELD-107-A",
      recipientOperatorId: "OP-FIELD-107-A",
      reason: "Aclarar horario de triage frente a inconsistencia simulada.",
    }));
    const pendingRequest = state.clarificationRequests[state.clarificationRequests.length - 1];
    collect(respondClarification(state, pendingRequest.id, "El horario correcto se agrega como anexo; el registro original permanece preservado."));
    collect(requestSupervisorReview(state));
    collect(validateSupervisor(state));
    collect(checkConsistency(state));
    collect(submitProcedureAct(state));
    collect(finalizeProcedureAct(state));
    collect(amendProcedureAct(state));
    collect(rectifyProcedureAct(state));
    collect(buildMasterIncidentRecord(state));
    collect(proposeClosure(state));
    collect(finalizeClosure(state));
    collect(exportProcedureJson(state));
    return {
      ok: results.every((result) => result.ok),
      results,
      state,
    };
  }

  window.PIPOProcedureAct = {
    PROCEDURE_ACT_VERSION,
    PROCEDURE_ACT_STATUSES,
    SUPERVISION_STATUSES,
    CLOSURE_STATUSES,
    FINDING_TYPES,
    INFORMATION_CLASSES,
    AI_DRAFT_NOTICE,
    INTEGRITY_NOTICE,
    INTEGRATION_PRINCIPLE,
    createProcedureActState,
    buildAutomaticChronology,
    createProcedureAct,
    generateAiDraft,
    calculateCompleteness,
    registerDemoTimeInconsistency,
    updateCompleteness,
    runConsistencyEngine,
    checkConsistency,
    completeOperatorReview,
    submitProcedureAct,
    requestSupervisorReview,
    observeSupervisor,
    validateSupervisor,
    requestClarification,
    respondClarification,
    finalizeProcedureAct,
    amendProcedureAct,
    rectifyProcedureAct,
    annulProcedureAct,
    buildMasterIncidentRecord,
    proposeClosure,
    finalizeClosure,
    exportProcedureJson,
    buildPrintView,
    calculateSha256Reference,
    runProcedureDemoSequence,
  };
}());
