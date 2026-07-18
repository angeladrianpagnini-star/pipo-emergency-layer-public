(function () {
  const HUMAN_DECISION_STATUS = {
    ACCEPTED: "ACCEPTED",
    MODIFIED: "MODIFIED",
    REJECTED: "REJECTED",
    MANUAL_WITHOUT_AI: "MANUAL_WITHOUT_AI",
  };

  const CRITICAL_CONSOLE_TYPES = [
    "SECURITY_911",
    "HEALTH_107",
    "FIRE_DEPARTMENT",
    "CHILD_PROTECTION",
    "PROSECUTOR_JUSTICE",
  ];

  function normalizePriority(priority) {
    const normalized = String(priority || "UNDETERMINED").toUpperCase();
    return ["GREEN", "YELLOW", "RED", "UNDETERMINED"].includes(normalized) ? normalized : "UNDETERMINED";
  }

  function normalizeConsoleList(consoles) {
    return (consoles || []).map((item) => {
      if (typeof item === "string") {
        return {
          consoleType: item,
          consoleId: item,
          consoleName: item,
        };
      }
      return {
        consoleType: item.consoleType,
        consoleId: item.consoleId,
        consoleName: item.consoleName || item.consoleType || item.consoleId,
      };
    }).filter((item) => item.consoleType || item.consoleId);
  }

  function uniqueConsoleTypes(consoles) {
    return Array.from(new Set(normalizeConsoleList(consoles).map((item) => item.consoleType || item.consoleId)));
  }

  function difference(left, right) {
    return left.filter((item) => !right.includes(item));
  }

  function createHumanDecisionDraft(suggestion, operator = {}) {
    const suggestedConsoles = normalizeConsoleList(suggestion?.suggestedConsoles);
    return {
      decisionId: `HD-${String(Date.now()).slice(-8)}`,
      id: null,
      incidentId: suggestion?.incidentId || "PIPO-BW-AI-DEMO",
      operatorId: operator.id || "OP-MASTER-01",
      operator: operator.fictitiousName || "Operador demo",
      sessionId: operator.sessionId || "SES-MASTER-20260718",
      aiSuggestionId: suggestion?.suggestionId || suggestion?.id || null,
      decisionStatus: HUMAN_DECISION_STATUS.ACCEPTED,
      finalIncidentType: suggestion?.suggestedIncidentType || suggestion?.suggestedType || "Informacion insuficiente",
      finalPriority: normalizePriority(suggestion?.suggestedPriority),
      finalConsoles: suggestedConsoles,
      finalRouting: suggestedConsoles.map((item) => item.consoleName).join(" / "),
      accepted: [],
      modified: [],
      rejected: [],
      followUpAnswers: [],
      addedInformation: "",
      reason: "",
      materialDifferences: [],
      decisionAt: null,
      validationStatus: "Draft",
      comparison: null,
    };
  }

  function createManualFallbackSuggestion(input = {}, context = {}) {
    const incidentId = input.incidentId || context?.incident?.id || "PIPO-BW-AI-DEMO";
    return {
      suggestionId: `AI-MANUAL-${String(Date.now()).slice(-8)}`,
      id: null,
      incidentId,
      originalInput: input,
      inputText: input.description || "",
      neutralSummary: "Analisis IA no utilizado. El incidente continua por carga y validacion manual del operador autorizado.",
      summary: "Analisis IA no utilizado. El incidente continua por carga manual.",
      suggestedIncidentType: "Revision manual",
      suggestedType: "Revision manual",
      suggestedPriority: "UNDETERMINED",
      detectedRiskFactors: [],
      riskFactors: [],
      availableInformation: ["entrada conservada para revision manual"],
      availableInfo: ["entrada conservada para revision manual"],
      missingCriticalInformation: ["prioridad final", "tipo de incidente", "consolas de derivacion"],
      missingInfo: ["prioridad final", "tipo de incidente", "consolas de derivacion"],
      followUpQuestions: ["Cual es el riesgo inmediato?", "Cual es la ubicacion estimada?", "Que organismo debe intervenir primero?"],
      suggestedQuestions: ["Cual es el riesgo inmediato?", "Cual es la ubicacion estimada?", "Que organismo debe intervenir primero?"],
      suggestedConsoles: [],
      competentAgencies: [],
      suggestedSpecialties: [],
      suggestedActions: ["Continuar sin IA mediante decision humana documentada."],
      safetyWarnings: [
        "AI-assisted analysis - human validation required.",
        "El sistema operativo PIPO sigue disponible sin IA.",
      ],
      legalOrAuthorizationRequirements: ["Decision humana documentada y trazable."],
      confidenceLevel: "LOW",
      confidence: "LOW",
      reasoningSummary: "No se ejecuto analisis IA. El operador debe completar la clasificacion manualmente.",
      explanation: "No se ejecuto analisis IA.",
      sourceFacts: [],
      unsupportedClaims: [],
      requiresHumanValidation: true,
      generatedAt: new Date().toISOString(),
      mode: "SIMULATED_DEMO",
      provider: "manual-fallback",
      modelOrEngineLabel: "No AI - manual fallback",
      version: "3.0.0",
    };
  }

  function compareSuggestionWithHumanDecision(suggestion, decision) {
    const suggestedPriority = normalizePriority(suggestion?.suggestedPriority);
    const finalPriority = normalizePriority(decision?.finalPriority);
    const suggestedType = suggestion?.suggestedIncidentType || suggestion?.suggestedType || "no informado";
    const finalType = decision?.finalIncidentType || "no informado";
    const suggestedConsoles = uniqueConsoleTypes(suggestion?.suggestedConsoles);
    const finalConsoles = uniqueConsoleTypes(decision?.finalConsoles);
    const removedConsoles = difference(suggestedConsoles, finalConsoles);
    const addedConsoles = difference(finalConsoles, suggestedConsoles);
    const accepted = [];
    const modified = [];
    const rejected = [];

    if (suggestedPriority === finalPriority) accepted.push("prioridad");
    if (suggestedPriority !== finalPriority) modified.push(`prioridad ${suggestedPriority} -> ${finalPriority}`);

    if (suggestedType === finalType) accepted.push("tipo de incidente");
    if (suggestedType !== finalType) modified.push(`tipo ${suggestedType} -> ${finalType}`);

    const retainedConsoles = suggestedConsoles.filter((item) => finalConsoles.includes(item));
    if (retainedConsoles.length) accepted.push(`consolas retenidas: ${retainedConsoles.join(", ")}`);
    if (removedConsoles.length) rejected.push(`consolas retiradas: ${removedConsoles.join(", ")}`);
    if (addedConsoles.length) modified.push(`consolas agregadas: ${addedConsoles.join(", ")}`);

    if (decision?.decisionStatus === HUMAN_DECISION_STATUS.REJECTED) {
      rejected.push("rechazo completo de la sugerencia");
    }

    const materialDifferences = [];
    if ((suggestedPriority === "RED" && finalPriority === "GREEN") || (suggestedPriority === "GREEN" && finalPriority === "RED")) {
      materialDifferences.push("cambio material de prioridad RED/GREEN");
    }
    const removedCritical = removedConsoles.filter((item) => CRITICAL_CONSOLE_TYPES.includes(item));
    if (removedCritical.length) {
      materialDifferences.push(`eliminacion de consola critica: ${removedCritical.join(", ")}`);
    }
    if (decision?.decisionStatus === HUMAN_DECISION_STATUS.REJECTED) {
      materialDifferences.push("rechazo completo de la sugerencia");
    }

    return {
      suggestedPriority,
      finalPriority,
      suggestedType,
      finalType,
      suggestedConsoles,
      finalConsoles,
      accepted,
      modified,
      rejected,
      materialDifferences,
      reason: decision?.reason || "",
      operator: decision?.operator || decision?.operatorId || "no informado",
      sessionId: decision?.sessionId || "no informado",
      decidedAt: decision?.decisionAt || new Date().toISOString(),
    };
  }

  function validateHumanDecision(suggestion, decision, operator = {}) {
    const errors = [];
    if (!operator?.id && !decision?.operatorId) errors.push("Operador activo requerido.");
    if (!operator?.sessionId && !decision?.sessionId) errors.push("Sesion valida requerida.");
    if (!decision?.decisionStatus) errors.push("Decision final requerida.");
    if (!decision?.finalIncidentType) errors.push("Tipo final requerido.");
    if (!decision?.finalPriority) errors.push("Prioridad final requerida.");
    if (!suggestion) errors.push("Sugerencia o modo manual requerido.");

    const comparison = compareSuggestionWithHumanDecision(suggestion, decision);
    const hasMaterialDifference = comparison.materialDifferences.length > 0
      || decision?.decisionStatus === HUMAN_DECISION_STATUS.MODIFIED
      || decision?.decisionStatus === HUMAN_DECISION_STATUS.REJECTED;

    if (hasMaterialDifference && !String(decision?.reason || "").trim()) {
      errors.push("Fundamento obligatorio por diferencia material o modificacion humana.");
    }

    return {
      valid: errors.length === 0,
      errors,
      materialDifferences: comparison.materialDifferences,
      comparison,
    };
  }

  function finalizeHumanDecision(suggestion, decision, operator = {}) {
    const validation = validateHumanDecision(suggestion, decision, operator);
    if (!validation.valid) {
      return {
        ok: false,
        errors: validation.errors,
        decision,
        comparison: validation.comparison,
      };
    }

    const comparison = validation.comparison;
    const finalized = {
      ...decision,
      id: decision.id || decision.decisionId,
      operatorId: operator.id || decision.operatorId,
      operator: operator.fictitiousName || decision.operator,
      sessionId: operator.sessionId || decision.sessionId,
      accepted: comparison.accepted,
      modified: comparison.modified,
      rejected: comparison.rejected,
      materialDifferences: comparison.materialDifferences,
      finalRouting: normalizeConsoleList(decision.finalConsoles).map((item) => item.consoleName).join(" / "),
      decisionAt: new Date().toISOString(),
      validationStatus: "Confirmed",
      comparison,
    };

    return {
      ok: true,
      errors: [],
      decision: finalized,
      comparison,
    };
  }

  window.PIPOIncidentAssistant = {
    HUMAN_DECISION_STATUS,
    CRITICAL_CONSOLE_TYPES,
    createHumanDecisionDraft,
    createManualFallbackSuggestion,
    compareSuggestionWithHumanDecision,
    validateHumanDecision,
    finalizeHumanDecision,
    normalizeConsoleList,
    normalizePriority,
  };
}());
