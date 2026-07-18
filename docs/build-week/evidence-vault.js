(function () {
const root = typeof globalThis !== "undefined" ? globalThis : window;
const browser = typeof window !== "undefined" ? window : root;
const cryptoObject = browser.crypto || root.crypto;
const textEncoder = typeof TextEncoder !== "undefined" ? new TextEncoder() : null;
const textDecoder = typeof TextDecoder !== "undefined" ? new TextDecoder() : null;
const sessionKeyStore = new Map();

const EVIDENCE_VAULT_VERSION = "5.2.0";
const VAULT_NOTICE = "Local cryptographic demonstration - not a production key-management system.";
const TRANSFER_NOTICE = "Esta funcion demuestra el registro de transferencias. Una cadena de custodia oficial requiere protocolos, herramientas, competencias y validaciones adicionales.";
const DELETION_NOTICE = "Deletion simulated - no real sensitive files are stored.";

const TRANSPORT_STATUSES = {
  LOCAL_DEVELOPMENT: {
    status: "LOCAL_DEVELOPMENT",
    label: "Local development transport",
    description: "HTTP local usado para desarrollo. No se afirma proteccion TLS en esta ejecucion.",
  },
  HTTPS_PROTECTED: {
    status: "HTTPS_PROTECTED",
    label: "HTTPS protected transport",
    description: "La pagina se sirve por HTTPS. La arquitectura productiva tambien requiere WSS, certificados, cabeceras seguras, origen restringido, autenticacion de servicio, sesiones con vencimiento, reintentos seguros y revocacion.",
  },
  TRANSPORT_NOT_VERIFIED: {
    status: "TRANSPORT_NOT_VERIFIED",
    label: "Transport not verified",
    description: "No se pudo verificar el transporte desde la demo. En produccion debe bloquearse el modo sensible hasta validar transporte seguro.",
  },
};

const EVIDENCE_STATUSES = [
  "ACTIVE",
  "RESTRICTED",
  "SHARED_TEMPORARILY",
  "ACCESS_REVOKED",
  "RETENTION_HOLD",
  "EXPIRED",
  "DELETION_SCHEDULED",
  "DELETED_SIMULATED",
];

const INTEGRITY_STATUSES = {
  VERIFIED: "INTEGRITY_VERIFIED",
  MISMATCH: "INTEGRITY_MISMATCH",
  NOT_VERIFIED: "NOT_VERIFIED",
};

const ENCRYPTION_STATUSES = {
  UNENCRYPTED: "UNENCRYPTED_DEMO",
  ENCRYPTED: "ENCRYPTED_DEMO",
  DECRYPTED: "DECRYPTED_FOR_AUTHORIZED_VIEW",
};

const ACCESS_PURPOSES = [
  "OPERATIONAL_RESPONSE",
  "MEDICAL_ASSISTANCE",
  "JUDICIAL_REVIEW",
  "CYBERCRIME_ANALYSIS",
  "FIELD_DOCUMENTATION",
  "SUPERVISORY_REVIEW",
  "CITIZEN_DELIVERY",
  "QUALITY_AUDIT",
];

const RETENTION_POLICIES = {
  SHORT_OPERATIONAL: {
    id: "SHORT_OPERATIONAL",
    retentionDays: 7,
    deletionRule: "Eliminar de forma documentada al vencer si no existe bloqueo legal.",
    holdAllowed: true,
    legalReviewRequired: false,
    citizenAccessRule: "Solo datos minimos informables.",
    auditRequired: true,
  },
  STANDARD_INCIDENT: {
    id: "STANDARD_INCIDENT",
    retentionDays: 365,
    deletionRule: "Conservar hasta cierre administrativo y revision proporcional.",
    holdAllowed: true,
    legalReviewRequired: false,
    citizenAccessRule: "Resumen depurado disponible.",
    auditRequired: true,
  },
  MEDICAL_SENSITIVE: {
    id: "MEDICAL_SENSITIVE",
    retentionDays: 730,
    deletionRule: "Requiere revision sanitaria y minimizacion reforzada.",
    holdAllowed: true,
    legalReviewRequired: true,
    citizenAccessRule: "Entrega sanitaria por canal competente.",
    auditRequired: true,
  },
  CYBERCRIME_PRESERVATION: {
    id: "CYBERCRIME_PRESERVATION",
    retentionDays: 1095,
    deletionRule: "Preservar mientras exista investigacion o medida vigente.",
    holdAllowed: true,
    legalReviewRequired: true,
    citizenAccessRule: "No se entrega evidencia interna sin revision.",
    auditRequired: true,
  },
  JUDICIAL_HOLD: {
    id: "JUDICIAL_HOLD",
    retentionDays: 0,
    deletionRule: "Bloqueo hasta levantamiento formal.",
    holdAllowed: true,
    legalReviewRequired: true,
    citizenAccessRule: "Entrega bloqueada salvo version depurada autorizada.",
    auditRequired: true,
  },
  CITIZEN_COPY: {
    id: "CITIZEN_COPY",
    retentionDays: 180,
    deletionRule: "Conservar recibo y hash de copia entregada.",
    holdAllowed: false,
    legalReviewRequired: false,
    citizenAccessRule: "Disponible como version depurada.",
    auditRequired: true,
  },
  TRAINING_DEMO: {
    id: "TRAINING_DEMO",
    retentionDays: 30,
    deletionRule: "Eliminar entorno de prueba al finalizar capacitacion.",
    holdAllowed: false,
    legalReviewRequired: false,
    citizenAccessRule: "No aplica a datos reales.",
    auditRequired: true,
  },
};

const ACQUISITION_TYPES = {
  VOLUNTARY_USER_SUBMISSION: "VOLUNTARY_USER_SUBMISSION",
  GUIDED_PRESERVATION: "GUIDED_PRESERVATION",
  AUTHORIZED_FORENSIC_ACQUISITION: "AUTHORIZED_FORENSIC_ACQUISITION",
};

const ACQUISITION_STATUSES = [
  "REQUESTED",
  "AUTHORIZED",
  "IN_PROGRESS",
  "COMPLETED",
  "REJECTED",
  "EXPIRED",
  "CANCELLED_WITH_REASON",
];

const SECURITY_CONTROL_STATUS = [
  {
    control: "Transport detection",
    category: "IMPLEMENTED_AND_TESTED",
    evidence: "detectCommunicationSecurity() diferencia HTTP local, HTTPS y transporte no verificado.",
    limitation: "No instala certificados reales ni fuerza TLS productivo.",
  },
  {
    control: "Local cryptographic demo",
    category: "IMPLEMENTED_AND_TESTED",
    evidence: "Web Crypto cifra y descifra contenido ficticio con AES-GCM e IV unico.",
    limitation: VAULT_NOTICE,
  },
  {
    control: "Evidence Vault",
    category: "SIMULATED_FOR_DEMO",
    evidence: "La boveda registra metadatos ficticios, estados, historial de acceso y retencion.",
    limitation: "No almacena archivos sensibles reales.",
  },
  {
    control: "Productive key management",
    category: "PRODUCTION_DESIGN_ONLY",
    evidence: "Documentado como envelope encryption, KMS/HSM, rotacion, revocacion y separacion de funciones.",
    limitation: "No hay KMS/HSM ni servidor productivo en esta etapa.",
  },
  {
    control: "Digital acquisition workflow",
    category: "SIMULATED_FOR_DEMO",
    evidence: "DigitalAcquisitionRecord separa entrega voluntaria, preservacion guiada y adquisicion autorizada conceptual.",
    limitation: "No ejecuta acceso fisico, sensores, cuentas ni herramientas forenses reales.",
  },
  {
    control: "Citizen sanitized copy",
    category: "IMPLEMENTED_AND_TESTED",
    evidence: "La copia ciudadana excluye metadatos internos, identidades protegidas y referencias de acceso.",
    limitation: "La entrega real requiere revision institucional.",
  },
];

function nowIso() {
  return new Date().toISOString();
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function encodeUtf8(value) {
  const text = typeof value === "string" ? value : JSON.stringify(value);
  if (textEncoder) return textEncoder.encode(text);
  if (root.Buffer) return new Uint8Array(root.Buffer.from(text, "utf8"));
  const bytes = new Uint8Array(text.length);
  for (let index = 0; index < text.length; index += 1) {
    bytes[index] = text.charCodeAt(index) & 0xff;
  }
  return bytes;
}

function decodeUtf8(bytes) {
  if (textDecoder) return textDecoder.decode(bytes);
  if (root.Buffer) return root.Buffer.from(bytes).toString("utf8");
  return Array.from(bytes).map((byte) => String.fromCharCode(byte)).join("");
}

function bytesToHex(bytes) {
  return Array.from(bytes).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function bytesToBase64(bytes) {
  if (root.Buffer) return root.Buffer.from(bytes).toString("base64");
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return browser.btoa(binary);
}

function base64ToBytes(value) {
  if (root.Buffer) return new Uint8Array(root.Buffer.from(value, "base64"));
  const binary = browser.atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

function fallbackHash(value) {
  const source = typeof value === "string" ? value : JSON.stringify(value);
  let hash = 2166136261;
  for (let index = 0; index < source.length; index += 1) {
    hash ^= source.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return `demo-sha256-unavailable-${(hash >>> 0).toString(16).padStart(8, "0")}`;
}

async function sha256Hex(value) {
  if (!cryptoObject?.subtle?.digest) return fallbackHash(value);
  const digest = await cryptoObject.subtle.digest("SHA-256", encodeUtf8(value));
  return bytesToHex(new Uint8Array(digest));
}

function detectCommunicationSecurity(locationLike) {
  const locationValue = locationLike || browser.location || {};
  const protocol = locationValue.protocol || "";
  const hostname = locationValue.hostname || "";
  if (protocol === "https:") return { ...TRANSPORT_STATUSES.HTTPS_PROTECTED };
  if (protocol === "file:" || (protocol === "http:" && ["127.0.0.1", "localhost", "::1"].includes(hostname))) {
    return { ...TRANSPORT_STATUSES.LOCAL_DEVELOPMENT };
  }
  return { ...TRANSPORT_STATUSES.TRANSPORT_NOT_VERIFIED };
}

function plusDays(isoDate, days) {
  const date = new Date(isoDate);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString();
}

function createIntegrityReference(prefix, value) {
  return `${prefix}-${String(value).slice(0, 16)}`;
}

function buildEvidenceResource(evidence) {
  return {
    id: evidence.evidenceId,
    evidenceId: evidence.evidenceId,
    incidentId: evidence.incidentId,
    classification: evidence.classification,
    ownerConsole: evidence.ownerConsoleId,
    permittedRoles: evidence.accessPolicy?.permittedRoles,
    sharingPurpose: evidence.accessPolicy?.defaultPurpose,
    authorizedConsoles: evidence.authorizedConsoles,
    authorizedOperators: evidence.authorizedOperators,
    requiresSecondApproval: evidence.accessPolicy?.requiresSecondApproval,
    retentionRule: evidence.retentionPolicy,
    downloadPolicy: evidence.downloadPolicy,
  };
}

function defaultEvidenceItems(buildWeekState) {
  const incidentId = buildWeekState?.incident?.id || "PIPO-BW-000001";
  return [
    {
      evidenceId: "EVI-VAULT-001",
      incidentId,
      ownerConsoleId: "CON-CIBER",
      createdByOperatorId: "OP-CIBER-01",
      type: "audio simulado",
      fileName: "audio_modulacion_demo.wav",
      simulatedSize: "18 KB",
      classification: "RESTRICTED_JUDICIAL",
      createdAt: "2026-07-18T09:54:00-03:00",
      originalHash: null,
      encryptedHash: null,
      integrityHash: "pending",
      integrityStatus: INTEGRITY_STATUSES.NOT_VERIFIED,
      encryptionStatus: ENCRYPTION_STATUSES.UNENCRYPTED,
      encryptedRepresentation: null,
      accessPolicy: {
        defaultPurpose: "CYBERCRIME_ANALYSIS",
        allowedPurposes: ["CYBERCRIME_ANALYSIS", "JUDICIAL_REVIEW", "SUPERVISORY_REVIEW"],
        permittedRoles: ["analista digital", "supervisor ciber", "receptor judicial"],
        requiresActiveAuthorization: true,
        requiresSecondApproval: true,
        requiresMfa: true,
        requiresValidSession: true,
        watermarkedViewRequired: true,
      },
      retentionPolicy: "CYBERCRIME_PRESERVATION",
      expirationDate: "2029-07-18T09:54:00-03:00",
      authorizedConsoles: ["CON-CIBER", "CON-FISCALIA"],
      authorizedOperators: ["OP-CIBER-01"],
      accessHistory: [],
      sharingHistory: [],
      downloadPolicy: "blocked_without_formal_release",
      status: "RESTRICTED",
      badges: ["Encrypted demo item", "Access restricted", "Authorization required", "Simulated control"],
    },
    {
      evidenceId: "EVI-VAULT-002",
      incidentId,
      ownerConsoleId: "CON-911",
      createdByOperatorId: "OP-911-01",
      type: "video de campo simulado",
      fileName: "video_camara_campo_demo.mp4",
      simulatedSize: "42 KB",
      classification: "SENSITIVE",
      createdAt: "2026-07-18T09:55:00-03:00",
      originalHash: null,
      encryptedHash: null,
      integrityHash: "pending",
      integrityStatus: INTEGRITY_STATUSES.NOT_VERIFIED,
      encryptionStatus: ENCRYPTION_STATUSES.UNENCRYPTED,
      encryptedRepresentation: null,
      accessPolicy: {
        defaultPurpose: "OPERATIONAL_RESPONSE",
        allowedPurposes: ["OPERATIONAL_RESPONSE", "FIELD_DOCUMENTATION", "SUPERVISORY_REVIEW"],
        permittedRoles: ["despachante", "supervisor policial", "coordinador"],
        requiresActiveAuthorization: false,
        requiresSecondApproval: false,
        requiresMfa: true,
        requiresValidSession: true,
        watermarkedViewRequired: true,
      },
      retentionPolicy: "STANDARD_INCIDENT",
      expirationDate: "2027-07-18T09:55:00-03:00",
      authorizedConsoles: ["CON-911", "CON-MASTER"],
      authorizedOperators: ["OP-911-01", "OP-MASTER-01"],
      accessHistory: [],
      sharingHistory: [],
      downloadPolicy: "blocked_without_release",
      status: "ACTIVE",
      badges: ["Integrity verified", "Simulated control"],
    },
  ];
}

function createEvidenceVaultState(buildWeekState = {}, ledgerEvents = [], options = {}) {
  const communicationStatus = detectCommunicationSecurity(options.locationLike);
  const items = defaultEvidenceItems(buildWeekState);
  const state = {
    version: EVIDENCE_VAULT_VERSION,
    notice: VAULT_NOTICE,
    deletionNotice: DELETION_NOTICE,
    transferNotice: TRANSFER_NOTICE,
    buildWeekState,
    ledgerEvents,
    appendLedgerEvent: options.appendLedgerEvent,
    accessEvaluator: options.canAccessResource || browser.PIPOBuildWeekModels?.canAccessResource,
    operators: buildWeekState.operatorIdentities || [],
    consoles: buildWeekState.operationalConsoles || [],
    items,
    selectedEvidenceId: items[0].evidenceId,
    accessRequests: [],
    accessHistory: [],
    sharingGrants: buildWeekState.evidenceSharingGrants || [],
    transferHistory: [],
    acquisitions: [],
    citizenCopies: [],
    retentionPolicies: clone(RETENTION_POLICIES),
    communicationStatus,
    controlStatus: clone(SECURITY_CONTROL_STATUS),
    lastActionMessage: "Boveda inicializada con evidencia ficticia.",
  };
  if (buildWeekState) {
    buildWeekState.evidenceVaultItems = state.items;
    buildWeekState.evidenceAccessRequests = state.accessRequests;
    buildWeekState.evidenceAccessHistory = state.accessHistory;
    buildWeekState.evidenceRetentionPolicies = Object.values(state.retentionPolicies);
    buildWeekState.digitalAcquisitionRecords = state.acquisitions;
    buildWeekState.evidenceTransferHistory = state.transferHistory;
    buildWeekState.citizenSanitizedEvidenceCopies = state.citizenCopies;
    buildWeekState.communicationSecurityStatuses = [communicationStatus];
  }
  return state;
}

function findEvidence(state, evidenceId = state.selectedEvidenceId) {
  return state.items.find((item) => item.evidenceId === evidenceId);
}

function findOperator(state, operatorId) {
  return state.operators.find((operator) => operator.id === operatorId);
}

function appendVaultLedger(state, type, payload, actor = {}) {
  const safePayload = {
    evidenceId: payload.evidenceId,
    requestId: payload.requestId,
    grantId: payload.grantId,
    acquisitionId: payload.acquisitionId,
    transferId: payload.transferId,
    action: payload.action,
    result: payload.result,
    summary: payload.summary,
    status: payload.status,
    integrityStatus: payload.integrityStatus,
    errorCode: payload.errorCode,
  };
  if (typeof state.appendLedgerEvent !== "function") return null;
  return state.appendLedgerEvent({
    type,
    operatorId: actor.operatorId || "OP-MASTER-01",
    consoleId: actor.consoleId || "CON-MASTER",
    sessionId: actor.sessionId || "SES-MASTER-20260718",
    payload: safePayload,
    classification: payload.classification || "SENSITIVE",
  });
}

function recordAccessHistory(state, input) {
  const entry = {
    evidenceId: input.evidenceId,
    operatorId: input.operatorId,
    consoleId: input.consoleId,
    sessionId: input.sessionId,
    purpose: input.purpose,
    timestamp: input.timestamp || nowIso(),
    action: input.action,
    result: input.result,
    authorizationId: input.authorizationId || null,
    deviceId: input.deviceId || null,
    reason: input.reason || "Registro operativo de acceso.",
  };
  state.accessHistory.push(entry);
  const evidence = findEvidence(state, input.evidenceId);
  if (evidence) evidence.accessHistory.push(entry);
  return entry;
}

function evaluateEvidenceAccess(state, evidence, context = {}) {
  const target = evidence || findEvidence(state);
  const operator = context.operator || findOperator(state, context.operatorId || target?.createdByOperatorId);
  const purpose = context.purpose || target?.accessPolicy?.defaultPurpose || "OPERATIONAL_RESPONSE";
  if (!target || typeof state.accessEvaluator !== "function") {
    return {
      allowed: false,
      reason: "Evaluador de acceso no disponible.",
      limitations: ["configurar politica de acceso"],
      expiresAt: null,
      expiration: null,
      requiresSecondApproval: false,
      visibleFields: [],
      downloadable: false,
      watermarkedViewRequired: true,
      authorizationId: null,
    };
  }
  return state.accessEvaluator(operator, buildEvidenceResource(target), {
    purpose,
    now: context.now,
    requestedDownload: context.requestedDownload,
    secondApprovalVerified: context.secondApprovalVerified,
    supervisionActive: context.supervisionActive,
    downloadAuthorization: context.downloadAuthorization,
  });
}

function createAccessRequest(state, evidenceId, context = {}) {
  const evidence = findEvidence(state, evidenceId);
  const operator = context.operator || findOperator(state, context.operatorId || evidence?.createdByOperatorId);
  const decision = evaluateEvidenceAccess(state, evidence, context);
  const request = {
    requestId: `EV-REQ-${String(state.accessRequests.length + 1).padStart(4, "0")}`,
    evidenceId: evidence?.evidenceId || evidenceId,
    incidentId: evidence?.incidentId || state.buildWeekState?.incident?.id || "PIPO-BW-000001",
    operatorId: operator?.id || context.operatorId || "OP-UNKNOWN",
    consoleId: operator?.consoleId || context.consoleId || "CON-UNKNOWN",
    sessionId: operator?.sessionId || context.sessionId || null,
    purpose: context.purpose || evidence?.accessPolicy?.defaultPurpose || "OPERATIONAL_RESPONSE",
    status: decision.allowed ? "GRANTED" : "DENIED",
    requestedAt: nowIso(),
    expiresAt: decision.expiresAt,
    authorizationId: decision.authorizationId,
    decision,
  };
  state.accessRequests.push(request);
  recordAccessHistory(state, {
    evidenceId: request.evidenceId,
    operatorId: request.operatorId,
    consoleId: request.consoleId,
    sessionId: request.sessionId,
    purpose: request.purpose,
    action: "access.requested",
    result: request.status,
    authorizationId: request.authorizationId,
    deviceId: operator?.enrolledDeviceId,
    reason: decision.reason,
  });
  appendVaultLedger(state, "evidence.access.requested", {
    evidenceId: request.evidenceId,
    requestId: request.requestId,
    action: "access.requested",
    result: request.status,
    summary: "Solicitud de acceso a evidencia registrada.",
    classification: evidence?.classification || "SENSITIVE",
  }, operator);
  appendVaultLedger(state, decision.allowed ? "evidence.access.granted" : "evidence.access.denied", {
    evidenceId: request.evidenceId,
    requestId: request.requestId,
    action: "access.decision",
    result: request.status,
    summary: decision.reason,
    classification: evidence?.classification || "SENSITIVE",
  }, operator);
  return { request, decision };
}

async function generateDemoKey(evidenceId) {
  if (!cryptoObject?.subtle?.generateKey) return null;
  const key = await cryptoObject.subtle.generateKey(
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"],
  );
  sessionKeyStore.set(evidenceId, key);
  return key;
}

function randomIv() {
  const iv = new Uint8Array(12);
  if (cryptoObject?.getRandomValues) {
    cryptoObject.getRandomValues(iv);
    return iv;
  }
  for (let index = 0; index < iv.length; index += 1) {
    iv[index] = Math.floor(Math.random() * 256);
  }
  return iv;
}

async function encryptEvidenceContent(state, evidenceId, fictitiousContent, actor = {}) {
  const evidence = findEvidence(state, evidenceId);
  if (!evidence) return { ok: false, errorCode: "evidence_not_found" };
  const originalHash = await sha256Hex(fictitiousContent);
  if (!cryptoObject?.subtle?.encrypt) {
    evidence.originalHash = originalHash;
    evidence.integrityHash = originalHash;
    evidence.encryptedHash = await sha256Hex(`demo-cipher-${originalHash}`);
    evidence.encryptionStatus = ENCRYPTION_STATUSES.ENCRYPTED;
    evidence.integrityStatus = INTEGRITY_STATUSES.NOT_VERIFIED;
    evidence.encryptedRepresentation = {
      algorithm: "AES-GCM-DEMO-UNAVAILABLE",
      iv: "not-generated",
      ciphertext: `demo-cipher-${originalHash}`,
    };
    appendVaultLedger(state, "evidence.encrypted", {
      evidenceId,
      action: "encrypt",
      result: "simulated",
      summary: "Cifrado de demostracion registrado sin Web Crypto.",
      classification: evidence.classification,
    }, actor);
    return { ok: true, evidence, originalHash, encryptedHash: evidence.encryptedHash, iv: evidence.encryptedRepresentation.iv };
  }
  const key = await generateDemoKey(evidenceId);
  const iv = randomIv();
  const encryptedBuffer = await cryptoObject.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encodeUtf8(fictitiousContent),
  );
  const encryptedBytes = new Uint8Array(encryptedBuffer);
  const representation = {
    algorithm: "AES-GCM",
    iv: bytesToBase64(iv),
    ciphertext: bytesToBase64(encryptedBytes),
  };
  const encryptedHash = await sha256Hex(representation);
  Object.assign(evidence, {
    originalHash,
    integrityHash: originalHash,
    encryptedHash,
    encryptionStatus: ENCRYPTION_STATUSES.ENCRYPTED,
    integrityStatus: INTEGRITY_STATUSES.NOT_VERIFIED,
    encryptedRepresentation: representation,
  });
  if (!evidence.badges.includes("Encrypted demo item")) evidence.badges.push("Encrypted demo item");
  appendVaultLedger(state, "evidence.encrypted", {
    evidenceId,
    action: "encrypt",
    result: "encrypted",
    summary: "Contenido ficticio cifrado con Web Crypto.",
    classification: evidence.classification,
  }, actor);
  state.lastActionMessage = `${evidenceId} cifrada con IV unico e integridad original registrada.`;
  return { ok: true, evidence, originalHash, encryptedHash, iv: representation.iv };
}

async function decryptEvidenceContent(state, evidenceId, context = {}) {
  const evidence = findEvidence(state, evidenceId);
  if (!evidence) return { ok: false, errorCode: "evidence_not_found" };
  const operator = context.operator || findOperator(state, context.operatorId || evidence.createdByOperatorId);
  const decision = evaluateEvidenceAccess(state, evidence, context);
  if (!decision.allowed) {
    recordAccessHistory(state, {
      evidenceId,
      operatorId: operator?.id || "OP-UNKNOWN",
      consoleId: operator?.consoleId || "CON-UNKNOWN",
      sessionId: operator?.sessionId || null,
      purpose: context.purpose || evidence.accessPolicy.defaultPurpose,
      action: "decrypt",
      result: "DENIED",
      authorizationId: decision.authorizationId,
      deviceId: operator?.enrolledDeviceId,
      reason: decision.reason,
    });
    appendVaultLedger(state, "evidence.access.denied", {
      evidenceId,
      action: "decrypt",
      result: "denied",
      summary: decision.reason,
      classification: evidence.classification,
    }, operator);
    return { ok: false, decision, errorCode: "access_denied" };
  }
  const key = sessionKeyStore.get(evidenceId);
  if (!key || !evidence.encryptedRepresentation || evidence.encryptedRepresentation.algorithm !== "AES-GCM") {
    return { ok: false, decision, errorCode: "demo_key_unavailable" };
  }
  const iv = base64ToBytes(evidence.encryptedRepresentation.iv);
  const ciphertext = base64ToBytes(evidence.encryptedRepresentation.ciphertext);
  const decryptedBuffer = await cryptoObject.subtle.decrypt({ name: "AES-GCM", iv }, key, ciphertext);
  const plaintext = decodeUtf8(new Uint8Array(decryptedBuffer));
  const verification = await verifyEvidenceIntegrity(state, evidenceId, plaintext, operator);
  evidence.encryptionStatus = ENCRYPTION_STATUSES.DECRYPTED;
  recordAccessHistory(state, {
    evidenceId,
    operatorId: operator?.id || "OP-UNKNOWN",
    consoleId: operator?.consoleId || "CON-UNKNOWN",
    sessionId: operator?.sessionId || null,
    purpose: context.purpose || evidence.accessPolicy.defaultPurpose,
    action: "view",
    result: "ALLOWED",
    authorizationId: decision.authorizationId,
    deviceId: operator?.enrolledDeviceId,
    reason: "Visualizacion autorizada de contenido ficticio.",
  });
  appendVaultLedger(state, "evidence.viewed", {
    evidenceId,
    action: "view",
    result: "allowed",
    summary: "Vista de evidencia ficticia autorizada.",
    classification: evidence.classification,
  }, operator);
  appendVaultLedger(state, "evidence.decrypted", {
    evidenceId,
    action: "decrypt",
    result: "decrypted",
    summary: "Descifrado de demostracion completado.",
    integrityStatus: verification.integrityStatus,
    classification: evidence.classification,
  }, operator);
  state.lastActionMessage = `${evidenceId} descifrada para vista autorizada; integridad ${verification.integrityStatus}.`;
  return { ok: true, decision, plaintext, verification };
}

async function verifyEvidenceIntegrity(state, evidenceId, contentOverride, actor = {}) {
  const evidence = findEvidence(state, evidenceId);
  if (!evidence) return { ok: false, errorCode: "evidence_not_found" };
  const content = contentOverride || `fictitious-content-${evidence.evidenceId}`;
  const hash = await sha256Hex(content);
  const integrityStatus = evidence.integrityHash === hash
    ? INTEGRITY_STATUSES.VERIFIED
    : INTEGRITY_STATUSES.MISMATCH;
  evidence.integrityStatus = integrityStatus;
  appendVaultLedger(state, integrityStatus === INTEGRITY_STATUSES.VERIFIED ? "evidence.integrity.verified" : "evidence.integrity.failed", {
    evidenceId,
    action: "integrity.verify",
    result: integrityStatus,
    summary: "Verificacion de integridad de evidencia ficticia.",
    integrityStatus,
    classification: evidence.classification,
  }, actor);
  if (integrityStatus === INTEGRITY_STATUSES.VERIFIED && !evidence.badges.includes("Integrity verified")) {
    evidence.badges.push("Integrity verified");
  }
  return {
    ok: integrityStatus === INTEGRITY_STATUSES.VERIFIED,
    evidenceId,
    expectedHash: evidence.integrityHash,
    computedHash: hash,
    integrityStatus,
  };
}

function grantTemporaryEvidenceAccess(state, evidenceId, input = {}) {
  const evidence = findEvidence(state, evidenceId);
  const grant = {
    id: `GRANT-VAULT-${String(state.sharingGrants.length + 1).padStart(4, "0")}`,
    incidentId: evidence?.incidentId || state.buildWeekState?.incident?.id || "PIPO-BW-000001",
    evidenceId,
    sourceConsoleId: input.sourceConsoleId || evidence?.ownerConsoleId || "CON-MASTER",
    destinationConsoleId: input.destinationConsoleId || "CON-107",
    purpose: input.purpose || "OPERATIONAL_RESPONSE",
    fieldsAllowed: input.fieldsAllowed || ["evidenceId", "type", "createdAt", "classification", "integrityHash"],
    authorizedBy: input.authorizedBy || "OP-MASTER-01",
    startedAt: input.startedAt || "2026-07-18T09:45:00-03:00",
    expiresAt: input.expiresAt || plusDays(nowIso(), 1),
    revokedAt: null,
    revocationReason: null,
    viewAllowed: input.viewAllowed !== false,
    downloadAllowed: Boolean(input.downloadAllowed),
    accessLog: [],
  };
  state.sharingGrants.push(grant);
  if (evidence) {
    evidence.status = "SHARED_TEMPORARILY";
    evidence.sharingHistory.push(grant);
    if (!evidence.badges.includes("Temporary access")) evidence.badges.push("Temporary access");
  }
  appendVaultLedger(state, "evidence.access.granted", {
    evidenceId,
    grantId: grant.id,
    action: "grant",
    result: "granted",
    summary: "Permiso temporal de evidencia registrado.",
    classification: evidence?.classification || "SENSITIVE",
  }, findOperator(state, grant.authorizedBy));
  state.lastActionMessage = `${grant.id} creado con vencimiento ${grant.expiresAt}.`;
  return grant;
}

function revokeEvidenceAccess(state, grantId, reason = "Revocacion operativa simulada.") {
  const grant = state.sharingGrants.find((item) => item.id === grantId);
  if (!grant) return { ok: false, errorCode: "grant_not_found" };
  grant.revokedAt = nowIso();
  grant.revocationReason = reason;
  const evidence = findEvidence(state, grant.evidenceId);
  if (evidence) evidence.status = "ACCESS_REVOKED";
  recordAccessHistory(state, {
    evidenceId: grant.evidenceId,
    operatorId: grant.authorizedBy,
    consoleId: grant.sourceConsoleId,
    sessionId: "SES-MASTER-20260718",
    purpose: grant.purpose,
    action: "access.revoked",
    result: "REVOKED",
    authorizationId: grant.id,
    reason,
  });
  appendVaultLedger(state, "evidence.access.revoked", {
    evidenceId: grant.evidenceId,
    grantId,
    action: "revoke",
    result: "revoked",
    summary: reason,
    classification: evidence?.classification || "SENSITIVE",
  }, findOperator(state, grant.authorizedBy));
  state.lastActionMessage = `${grantId} revocado; historial conservado.`;
  return { ok: true, grant };
}

function expireEvidenceGrant(state, grantId) {
  const grant = state.sharingGrants.find((item) => item.id === grantId);
  if (!grant) return { ok: false, errorCode: "grant_not_found" };
  grant.expiresAt = "2026-07-18T08:00:00-03:00";
  const evidence = findEvidence(state, grant.evidenceId);
  if (evidence) evidence.status = "EXPIRED";
  recordAccessHistory(state, {
    evidenceId: grant.evidenceId,
    operatorId: grant.authorizedBy,
    consoleId: grant.destinationConsoleId,
    sessionId: "SES-EXPIRED-DEMO",
    purpose: grant.purpose,
    action: "access.expired",
    result: "EXPIRED",
    authorizationId: grant.id,
    reason: "Permiso temporal vencido automaticamente.",
  });
  appendVaultLedger(state, "evidence.access.expired", {
    evidenceId: grant.evidenceId,
    grantId,
    action: "expire",
    result: "expired",
    summary: "Permiso temporal vencido; la evidencia no se elimina.",
    classification: evidence?.classification || "SENSITIVE",
  });
  state.lastActionMessage = `${grantId} vencido; acceso bloqueado sin borrar evidencia.`;
  return { ok: true, grant };
}

function requestEvidenceDownload(state, evidenceId, context = {}) {
  const evidence = findEvidence(state, evidenceId);
  const operator = context.operator || findOperator(state, context.operatorId || evidence?.createdByOperatorId);
  const decision = evaluateEvidenceAccess(state, evidence, { ...context, requestedDownload: true });
  const result = decision.downloadable ? "ALLOWED" : "DENIED";
  recordAccessHistory(state, {
    evidenceId,
    operatorId: operator?.id || "OP-UNKNOWN",
    consoleId: operator?.consoleId || "CON-UNKNOWN",
    sessionId: operator?.sessionId || null,
    purpose: context.purpose || evidence?.accessPolicy?.defaultPurpose || "OPERATIONAL_RESPONSE",
    action: "download.requested",
    result,
    authorizationId: decision.authorizationId,
    deviceId: operator?.enrolledDeviceId,
    reason: decision.downloadable ? "Descarga autorizada." : "Descarga bloqueada por politica.",
  });
  appendVaultLedger(state, "evidence.download.requested", {
    evidenceId,
    action: "download.requested",
    result,
    summary: "Solicitud de descarga registrada.",
    classification: evidence?.classification || "SENSITIVE",
  }, operator);
  appendVaultLedger(state, decision.downloadable ? "evidence.download.allowed" : "evidence.download.denied", {
    evidenceId,
    action: "download.decision",
    result,
    summary: decision.downloadable ? "Descarga permitida." : "Descarga denegada por politica.",
    classification: evidence?.classification || "SENSITIVE",
  }, operator);
  state.lastActionMessage = decision.downloadable ? "Descarga ficticia autorizada." : "Descarga bloqueada y registrada.";
  return { decision, result };
}

function applyRetentionPolicy(state, evidenceId, policyId) {
  const evidence = findEvidence(state, evidenceId);
  const policy = state.retentionPolicies[policyId];
  if (!evidence || !policy) return { ok: false, errorCode: "retention_policy_not_found" };
  evidence.retentionPolicy = policyId;
  evidence.expirationDate = policy.retentionDays > 0 ? plusDays(evidence.createdAt, policy.retentionDays) : null;
  state.lastActionMessage = `${policyId} aplicada a ${evidenceId}.`;
  return { ok: true, evidence, policy };
}

function placeRetentionHold(state, evidenceId, reason = "Bloqueo por revision institucional simulada.") {
  const evidence = findEvidence(state, evidenceId);
  if (!evidence) return { ok: false, errorCode: "evidence_not_found" };
  evidence.status = "RETENTION_HOLD";
  evidence.retentionHoldReason = reason;
  if (!evidence.badges.includes("Retention hold")) evidence.badges.push("Retention hold");
  appendVaultLedger(state, "evidence.retention.hold", {
    evidenceId,
    action: "retention.hold",
    result: "hold",
    summary: reason,
    classification: evidence.classification,
  });
  state.lastActionMessage = `${evidenceId} en retencion por revision simulada.`;
  return { ok: true, evidence };
}

function scheduleEvidenceDeletion(state, evidenceId) {
  const evidence = findEvidence(state, evidenceId);
  if (!evidence) return { ok: false, errorCode: "evidence_not_found" };
  evidence.status = "DELETION_SCHEDULED";
  evidence.deletionCertificate = {
    certificateId: `DEL-SIM-${evidenceId}`,
    createdAt: nowIso(),
    notice: DELETION_NOTICE,
  };
  appendVaultLedger(state, "evidence.retention.deletion_scheduled", {
    evidenceId,
    action: "deletion.schedule",
    result: "scheduled",
    summary: DELETION_NOTICE,
    classification: evidence.classification,
  });
  state.lastActionMessage = `${evidenceId} con eliminacion simulada programada.`;
  return { ok: true, evidence, certificate: evidence.deletionCertificate };
}

function simulateEvidenceDeletion(state, evidenceId) {
  const evidence = findEvidence(state, evidenceId);
  if (!evidence) return { ok: false, errorCode: "evidence_not_found" };
  evidence.status = "DELETED_SIMULATED";
  evidence.deletedSimulatedAt = nowIso();
  appendVaultLedger(state, "evidence.retention.deleted_simulated", {
    evidenceId,
    action: "deletion.simulated",
    result: "deleted_simulated",
    summary: DELETION_NOTICE,
    classification: evidence.classification,
  });
  state.lastActionMessage = `${evidenceId}: ${DELETION_NOTICE}`;
  return { ok: true, evidence, notice: DELETION_NOTICE };
}

async function createDigitalAcquisitionRecord(state, input = {}) {
  const acquisitionType = input.acquisitionType || ACQUISITION_TYPES.VOLUNTARY_USER_SUBMISSION;
  const requiresAuthority = acquisitionType === ACQUISITION_TYPES.AUTHORIZED_FORENSIC_ACQUISITION;
  const missingAuthority = requiresAuthority && (!input.authority || !input.authorizationId || !input.scope);
  const record = {
    acquisitionId: `DAQ-${String(state.acquisitions.length + 1).padStart(4, "0")}`,
    incidentId: input.incidentId || state.buildWeekState?.incident?.id || "PIPO-BW-000001",
    acquisitionType,
    authority: input.authority || (acquisitionType === ACQUISITION_TYPES.VOLUNTARY_USER_SUBMISSION ? "Consentimiento ciudadano simulado" : "Autoridad pendiente"),
    authorizationId: input.authorizationId || (acquisitionType === ACQUISITION_TYPES.VOLUNTARY_USER_SUBMISSION ? "CONSENT-SIM-001" : null),
    operatorId: input.operatorId || "OP-CIBER-01",
    consoleId: input.consoleId || "CON-CIBER",
    specialty: input.specialty || "preservacion digital",
    simulatedDeviceId: input.simulatedDeviceId || "DEV-DEMO-ONLY",
    sourceDescription: input.sourceDescription || "Archivo ficticio seleccionado para demostracion.",
    scope: input.scope || "Entrega voluntaria de un elemento ficticio.",
    startedAt: input.startedAt || nowIso(),
    completedAt: null,
    toolName: input.toolName || "PIPO demo register",
    toolVersion: input.toolVersion || EVIDENCE_VAULT_VERSION,
    method: input.method || "Registro documental simulado sin acceso al dispositivo.",
    acquiredItemIds: input.acquiredItemIds || [state.selectedEvidenceId],
    originalHash: input.originalHash || null,
    copyHash: input.copyHash || null,
    integrityStatus: input.integrityStatus || INTEGRITY_STATUSES.NOT_VERIFIED,
    transferHistory: [],
    storageLocationReference: input.storageLocationReference || "VAULT-DEMO-REFERENCE",
    limitations: input.limitations || [
      "No ejecuta acceso fisico o remoto a dispositivos.",
      "No desbloquea cuentas ni sistemas.",
      "No activa sensores reales.",
    ],
    status: missingAuthority ? "REJECTED" : "REQUESTED",
    integrityReference: null,
  };
  record.integrityReference = createIntegrityReference("demo-sha256-daq", await sha256Hex({
    acquisitionId: record.acquisitionId,
    incidentId: record.incidentId,
    acquisitionType: record.acquisitionType,
    status: record.status,
  }));
  state.acquisitions.push(record);
  appendVaultLedger(state, missingAuthority ? "digital.acquisition.rejected" : "digital.acquisition.requested", {
    acquisitionId: record.acquisitionId,
    action: "digital.acquisition.create",
    result: record.status,
    summary: missingAuthority ? "Adquisicion autorizada rechazada por falta de alcance o autoridad." : "Registro de adquisicion digital creado.",
    classification: "RESTRICTED_JUDICIAL",
  }, findOperator(state, record.operatorId));
  state.lastActionMessage = `${record.acquisitionId} creado con estado ${record.status}.`;
  return record;
}

function authorizeDigitalAcquisition(state, acquisitionId, input = {}) {
  const record = state.acquisitions.find((item) => item.acquisitionId === acquisitionId);
  if (!record) return { ok: false, errorCode: "acquisition_not_found" };
  record.status = "AUTHORIZED";
  record.authority = input.authority || record.authority;
  record.authorizationId = input.authorizationId || record.authorizationId || "AUTH-SIM-001";
  record.scope = input.scope || record.scope;
  appendVaultLedger(state, "digital.acquisition.authorized", {
    acquisitionId,
    action: "digital.acquisition.authorize",
    result: "authorized",
    summary: "Adquisicion digital autorizada de manera conceptual.",
    classification: "RESTRICTED_JUDICIAL",
  }, findOperator(state, record.operatorId));
  state.lastActionMessage = `${acquisitionId} autorizado conceptualmente.`;
  return { ok: true, record };
}

function completeDigitalAcquisition(state, acquisitionId, input = {}) {
  const record = state.acquisitions.find((item) => item.acquisitionId === acquisitionId);
  if (!record) return { ok: false, errorCode: "acquisition_not_found" };
  if (record.status !== "AUTHORIZED" && record.status !== "REQUESTED") {
    return { ok: false, errorCode: "acquisition_not_ready" };
  }
  record.status = "COMPLETED";
  record.completedAt = nowIso();
  record.originalHash = input.originalHash || record.originalHash || "demo-sha256-original-reference";
  record.copyHash = input.copyHash || record.copyHash || record.originalHash;
  record.integrityStatus = record.originalHash === record.copyHash ? INTEGRITY_STATUSES.VERIFIED : INTEGRITY_STATUSES.MISMATCH;
  appendVaultLedger(state, "digital.acquisition.completed", {
    acquisitionId,
    action: "digital.acquisition.complete",
    result: record.status,
    summary: "Registro conceptual completado sin adquirir datos reales.",
    integrityStatus: record.integrityStatus,
    classification: "RESTRICTED_JUDICIAL",
  }, findOperator(state, record.operatorId));
  state.lastActionMessage = `${acquisitionId} completado con integridad ${record.integrityStatus}.`;
  return { ok: true, record };
}

async function createTransferRecord(state, input = {}) {
  const transfer = {
    transferId: `TRF-${String(state.transferHistory.length + 1).padStart(4, "0")}`,
    evidenceId: input.evidenceId || state.selectedEvidenceId,
    origin: input.origin || { operatorId: "OP-CIBER-01", consoleId: "CON-CIBER" },
    receiver: input.receiver || { operatorId: "OP-COM-01", consoleId: "CON-COMISARIA" },
    timestamp: input.timestamp || nowIso(),
    purpose: input.purpose || "JUDICIAL_REVIEW",
    status: input.status || "RECORDED",
    integrityReference: null,
    notice: TRANSFER_NOTICE,
  };
  transfer.integrityReference = createIntegrityReference("demo-sha256-transfer", await sha256Hex({
    transferId: transfer.transferId,
    evidenceId: transfer.evidenceId,
    origin: transfer.origin,
    receiver: transfer.receiver,
    timestamp: transfer.timestamp,
    purpose: transfer.purpose,
    status: transfer.status,
  }));
  state.transferHistory.push(transfer);
  const acquisition = state.acquisitions[state.acquisitions.length - 1];
  if (acquisition) acquisition.transferHistory.push(transfer);
  appendVaultLedger(state, "evidence.transfer.recorded", {
    evidenceId: transfer.evidenceId,
    transferId: transfer.transferId,
    action: "transfer.record",
    result: transfer.status,
    summary: "Transferencia de demostracion registrada.",
    classification: "SENSITIVE",
  }, findOperator(state, transfer.origin.operatorId));
  state.lastActionMessage = `${transfer.transferId} registrado como cadena de transferencia demostrativa.`;
  return transfer;
}

async function buildCitizenSanitizedEvidenceCopy(state, evidenceId, input = {}) {
  const evidence = findEvidence(state, evidenceId);
  if (!evidence) return { ok: false, errorCode: "evidence_not_found" };
  if (evidence.classification === "RESTRICTED_JUDICIAL" && !input.formalRelease) {
    return {
      ok: false,
      errorCode: "restricted_judicial_not_auto_delivered",
      reason: "No se entrega automaticamente evidencia judicial restringida.",
    };
  }
  const sanitized = {
    documentId: `CIT-EVID-${String(state.citizenCopies.length + 1).padStart(4, "0")}`,
    incidentId: evidence.incidentId,
    version: "v1",
    classification: "CITIZEN_COPY",
    evidenceSummary: {
      evidenceId: evidence.evidenceId,
      type: evidence.type,
      createdAt: evidence.createdAt,
      classification: evidence.classification === "SENSITIVE" ? "Dato sensible depurado" : "Dato operativo depurado",
      integrityStatus: evidence.integrityStatus,
    },
    redactions: [
      "identidades internas",
      "ubicaciones protegidas",
      "metadatos de acceso",
      "referencias internas de autorizacion",
      "material cifrado",
    ],
    deliveredAt: input.deliveredAt || null,
    deliveryReceipt: {
      receiptId: `REC-CIT-EVID-${String(state.citizenCopies.length + 1).padStart(4, "0")}`,
      method: input.deliveryMethod || "entrega ciudadana simulada",
      createdAt: nowIso(),
    },
    hash: null,
  };
  sanitized.hash = await sha256Hex({
    documentId: sanitized.documentId,
    incidentId: sanitized.incidentId,
    version: sanitized.version,
    evidenceSummary: sanitized.evidenceSummary,
    redactions: sanitized.redactions,
  });
  state.citizenCopies.push(sanitized);
  appendVaultLedger(state, "citizen.evidence_copy.created", {
    evidenceId,
    action: "citizen.copy",
    result: "created",
    summary: "Copia ciudadana depurada creada.",
    classification: "OPERATIONAL",
  });
  state.lastActionMessage = `${sanitized.documentId} creado con hash de copia depurada.`;
  return { ok: true, copy: sanitized };
}

function safeTechnicalLog(errorCode, component, status = "observed") {
  return {
    requestId: `REQ-${Date.now()}`,
    errorCode,
    timestamp: nowIso(),
    component,
    status,
  };
}

async function runEvidenceVaultDemoSequence(state) {
  const restricted = findEvidence(state, "EVI-VAULT-001");
  const sensitive = findEvidence(state, "EVI-VAULT-002");
  const operator = findOperator(state, "OP-CIBER-01");
  await encryptEvidenceContent(state, restricted.evidenceId, "fictitious-content-EVI-VAULT-001", operator);
  const access = createAccessRequest(state, restricted.evidenceId, {
    operator,
    purpose: "CYBERCRIME_ANALYSIS",
    secondApprovalVerified: true,
    supervisionActive: true,
  });
  const decrypted = await decryptEvidenceContent(state, restricted.evidenceId, {
    operator,
    purpose: "CYBERCRIME_ANALYSIS",
    secondApprovalVerified: true,
    supervisionActive: true,
  });
  await encryptEvidenceContent(state, sensitive.evidenceId, "fictitious-content-EVI-VAULT-002", findOperator(state, "OP-911-01"));
  const grant = grantTemporaryEvidenceAccess(state, sensitive.evidenceId, {
    destinationConsoleId: "CON-107",
    purpose: "MEDICAL_ASSISTANCE",
    expiresAt: plusDays(nowIso(), 1),
  });
  requestEvidenceDownload(state, sensitive.evidenceId, {
    operator: findOperator(state, "OP-911-01"),
    purpose: "OPERATIONAL_RESPONSE",
  });
  placeRetentionHold(state, restricted.evidenceId);
  const acquisition = await createDigitalAcquisitionRecord(state, {
    acquisitionType: ACQUISITION_TYPES.GUIDED_PRESERVATION,
    authority: "Equipo ciber institucional simulado",
    authorizationId: "PRESERVE-SIM-001",
    scope: "Preservar copia ficticia seleccionada y hash.",
    acquiredItemIds: [restricted.evidenceId],
  });
  completeDigitalAcquisition(state, acquisition.acquisitionId, {
    originalHash: restricted.integrityHash,
    copyHash: restricted.integrityHash,
  });
  const transfer = await createTransferRecord(state, {
    evidenceId: restricted.evidenceId,
    receiver: { operatorId: "OP-COM-01", consoleId: "CON-COMISARIA" },
    purpose: "JUDICIAL_REVIEW",
  });
  const citizenCopy = await buildCitizenSanitizedEvidenceCopy(state, sensitive.evidenceId);
  return { restricted, sensitive, access, decrypted, grant, acquisition, transfer, citizenCopy };
}

function getDemoKeyPresenceForTest(evidenceId) {
  return sessionKeyStore.has(evidenceId);
}

function revokeDemoKeyForTest(evidenceId) {
  sessionKeyStore.delete(evidenceId);
}

browser.PIPOEvidenceVault = {
  EVIDENCE_VAULT_VERSION,
  VAULT_NOTICE,
  TRANSFER_NOTICE,
  DELETION_NOTICE,
  TRANSPORT_STATUSES,
  EVIDENCE_STATUSES,
  INTEGRITY_STATUSES,
  ENCRYPTION_STATUSES,
  ACCESS_PURPOSES,
  RETENTION_POLICIES,
  ACQUISITION_TYPES,
  ACQUISITION_STATUSES,
  SECURITY_CONTROL_STATUS,
  sha256Hex,
  detectCommunicationSecurity,
  createEvidenceVaultState,
  findEvidence,
  evaluateEvidenceAccess,
  createAccessRequest,
  encryptEvidenceContent,
  decryptEvidenceContent,
  verifyEvidenceIntegrity,
  grantTemporaryEvidenceAccess,
  revokeEvidenceAccess,
  expireEvidenceGrant,
  requestEvidenceDownload,
  applyRetentionPolicy,
  placeRetentionHold,
  scheduleEvidenceDeletion,
  simulateEvidenceDeletion,
  createDigitalAcquisitionRecord,
  authorizeDigitalAcquisition,
  completeDigitalAcquisition,
  createTransferRecord,
  buildCitizenSanitizedEvidenceCopy,
  safeTechnicalLog,
  runEvidenceVaultDemoSequence,
  getDemoKeyPresenceForTest,
  revokeDemoKeyForTest,
};
}());
