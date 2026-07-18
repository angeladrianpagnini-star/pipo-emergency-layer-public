const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { webcrypto } = require("crypto");

const root = __dirname;
const context = {
  window: {},
  console,
  Date,
  TextEncoder,
  TextDecoder,
  Buffer,
  crypto: webcrypto,
};
context.window = context.window;
context.window.crypto = webcrypto;
context.window.location = { protocol: "http:", hostname: "127.0.0.1" };

[
  "data-models.js",
  "ledger.js",
  "evidence-vault.js",
].forEach((file) => {
  const code = fs.readFileSync(path.join(root, file), "utf8");
  vm.runInNewContext(code, context, { filename: file });
});

const models = context.window.PIPOBuildWeekModels;
const ledger = context.window.PIPOBuildWeekLedger;
const vault = context.window.PIPOEvidenceVault;

async function main() {
  const state = vault.createEvidenceVaultState(models.BUILD_WEEK_STATE, ledger.getLedgerEvents(), {
    appendLedgerEvent: ledger.appendLedgerEvent,
    canAccessResource: models.canAccessResource,
    locationLike: { protocol: "http:", hostname: "127.0.0.1" },
  });

  assert.strictEqual(state.communicationStatus.status, "LOCAL_DEVELOPMENT");
  assert.strictEqual(vault.detectCommunicationSecurity({ protocol: "https:", hostname: "example.test" }).status, "HTTPS_PROTECTED");
  assert.strictEqual(vault.detectCommunicationSecurity({ protocol: "http:", hostname: "example.test" }).status, "TRANSPORT_NOT_VERIFIED");

  const restricted = vault.findEvidence(state, "EVI-VAULT-001");
  const sensitive = vault.findEvidence(state, "EVI-VAULT-002");
  const ciberOperator = models.getOperatorById("OP-CIBER-01");
  const policeOperator = models.getOperatorById("OP-911-01");

  const encrypted = await vault.encryptEvidenceContent(state, restricted.evidenceId, "fictitious-content-EVI-VAULT-001", ciberOperator);
  assert.strictEqual(encrypted.ok, true);
  assert.strictEqual(restricted.encryptionStatus, vault.ENCRYPTION_STATUSES.ENCRYPTED);
  assert.strictEqual(vault.getDemoKeyPresenceForTest(restricted.evidenceId), true);
  const firstIv = encrypted.iv;
  const encryptedAgain = await vault.encryptEvidenceContent(state, restricted.evidenceId, "fictitious-content-EVI-VAULT-001", ciberOperator);
  assert.notStrictEqual(encryptedAgain.iv, firstIv);

  const verified = await vault.verifyEvidenceIntegrity(state, restricted.evidenceId, "fictitious-content-EVI-VAULT-001", ciberOperator);
  assert.strictEqual(verified.integrityStatus, vault.INTEGRITY_STATUSES.VERIFIED);
  const mismatch = await vault.verifyEvidenceIntegrity(state, restricted.evidenceId, "modified-fictitious-content", ciberOperator);
  assert.strictEqual(mismatch.integrityStatus, vault.INTEGRITY_STATUSES.MISMATCH);

  const noSecondApproval = vault.evaluateEvidenceAccess(state, restricted, {
    operator: { ...ciberOperator, secondApprovalVerified: false },
    purpose: "CYBERCRIME_ANALYSIS",
    secondApprovalVerified: false,
    supervisionActive: true,
  });
  assert.strictEqual(noSecondApproval.allowed, false);
  assert.strictEqual(noSecondApproval.requiresSecondApproval, true);

  const allowedAccess = vault.createAccessRequest(state, restricted.evidenceId, {
    operator: ciberOperator,
    purpose: "CYBERCRIME_ANALYSIS",
    secondApprovalVerified: true,
    supervisionActive: true,
  });
  assert.strictEqual(allowedAccess.decision.allowed, true);
  assert(allowedAccess.decision.visibleFields.length > 0);
  assert.strictEqual(allowedAccess.decision.watermarkedViewRequired, true);

  await vault.encryptEvidenceContent(state, restricted.evidenceId, "fictitious-content-EVI-VAULT-001", ciberOperator);
  const decrypted = await vault.decryptEvidenceContent(state, restricted.evidenceId, {
    operator: ciberOperator,
    purpose: "CYBERCRIME_ANALYSIS",
    secondApprovalVerified: true,
    supervisionActive: true,
  });
  assert.strictEqual(decrypted.ok, true);
  assert.strictEqual(decrypted.plaintext, "fictitious-content-EVI-VAULT-001");
  assert(state.accessHistory.some((entry) => entry.action === "view" && entry.result === "ALLOWED"));

  await vault.encryptEvidenceContent(state, sensitive.evidenceId, "fictitious-content-EVI-VAULT-002", policeOperator);
  const download = vault.requestEvidenceDownload(state, sensitive.evidenceId, {
    operator: policeOperator,
    purpose: "OPERATIONAL_RESPONSE",
  });
  assert.strictEqual(download.result, "DENIED");

  const temporaryGrant = vault.grantTemporaryEvidenceAccess(state, sensitive.evidenceId, {
    destinationConsoleId: "CON-107",
    purpose: "MEDICAL_ASSISTANCE",
    expiresAt: "2026-07-19T10:00:00-03:00",
  });
  const medicalOperator = {
    id: "OP-107-TEST",
    consoleId: "CON-107",
    rankOrRole: "operador sanitario",
    specialty: "triage",
    sessionId: "SES-107-TEST",
    sessionExpiresAt: "2026-07-18T17:00:00-03:00",
    mfaVerified: true,
    localBiometricVerified: true,
    supervisionActive: true,
  };
  const grantAccess = vault.evaluateEvidenceAccess(state, sensitive, {
    operator: medicalOperator,
    purpose: "MEDICAL_ASSISTANCE",
  });
  assert.strictEqual(grantAccess.allowed, true);
  vault.expireEvidenceGrant(state, temporaryGrant.id);
  const expiredAccess = vault.evaluateEvidenceAccess(state, sensitive, {
    operator: medicalOperator,
    purpose: "MEDICAL_ASSISTANCE",
  });
  assert.strictEqual(expiredAccess.allowed, false);

  const revokedGrant = vault.grantTemporaryEvidenceAccess(state, sensitive.evidenceId, {
    destinationConsoleId: "CON-107",
    purpose: "MEDICAL_ASSISTANCE",
    expiresAt: "2026-07-19T10:00:00-03:00",
  });
  vault.revokeEvidenceAccess(state, revokedGrant.id, "Test revocation");
  const revokedAccess = vault.evaluateEvidenceAccess(state, sensitive, {
    operator: medicalOperator,
    purpose: "MEDICAL_ASSISTANCE",
  });
  assert.strictEqual(revokedAccess.allowed, false);

  assert.strictEqual(vault.applyRetentionPolicy(state, sensitive.evidenceId, "SHORT_OPERATIONAL").ok, true);
  assert.strictEqual(vault.placeRetentionHold(state, restricted.evidenceId).ok, true);
  assert.strictEqual(vault.scheduleEvidenceDeletion(state, sensitive.evidenceId).ok, true);
  assert.strictEqual(vault.simulateEvidenceDeletion(state, sensitive.evidenceId).notice, vault.DELETION_NOTICE);

  const voluntary = await vault.createDigitalAcquisitionRecord(state, {
    acquisitionType: vault.ACQUISITION_TYPES.VOLUNTARY_USER_SUBMISSION,
    acquiredItemIds: [sensitive.evidenceId],
  });
  assert.strictEqual(voluntary.status, "REQUESTED");
  const rejectedForensic = await vault.createDigitalAcquisitionRecord(state, {
    acquisitionType: vault.ACQUISITION_TYPES.AUTHORIZED_FORENSIC_ACQUISITION,
  });
  assert.strictEqual(rejectedForensic.status, "REJECTED");
  const authorizedForensic = await vault.createDigitalAcquisitionRecord(state, {
    acquisitionType: vault.ACQUISITION_TYPES.AUTHORIZED_FORENSIC_ACQUISITION,
    authority: "Fiscalia simulada",
    authorizationId: "AUTH-TEST",
    scope: "Alcance ficticio acotado.",
  });
  assert.strictEqual(vault.authorizeDigitalAcquisition(state, authorizedForensic.acquisitionId).ok, true);
  assert.strictEqual(vault.completeDigitalAcquisition(state, authorizedForensic.acquisitionId, {
    originalHash: "demo-same",
    copyHash: "demo-same",
  }).record.integrityStatus, vault.INTEGRITY_STATUSES.VERIFIED);

  const transfer = await vault.createTransferRecord(state, {
    evidenceId: restricted.evidenceId,
    purpose: "JUDICIAL_REVIEW",
  });
  assert(transfer.integrityReference.startsWith("demo-sha256-transfer"));
  assert.strictEqual(transfer.notice, vault.TRANSFER_NOTICE);

  const restrictedCopy = await vault.buildCitizenSanitizedEvidenceCopy(state, restricted.evidenceId);
  assert.strictEqual(restrictedCopy.ok, false);
  const citizenCopy = await vault.buildCitizenSanitizedEvidenceCopy(state, sensitive.evidenceId);
  assert.strictEqual(citizenCopy.ok, true);
  const copyString = JSON.stringify(citizenCopy.copy);
  assert(!copyString.includes("authorizedOperators"));
  assert(!copyString.includes("accessHistory"));
  assert(!copyString.includes("encryptedRepresentation"));

  const safeLog = vault.safeTechnicalLog("demo_error", "evidence-vault", "observed");
  assert.deepStrictEqual(Object.keys(safeLog).sort(), ["component", "errorCode", "requestId", "status", "timestamp"].sort());

  const ledgerString = JSON.stringify(ledger.getLedgerEvents());
  assert(!ledgerString.includes("fictitious-content-EVI-VAULT"));
  const source = fs.readFileSync(path.join(root, "evidence-vault.js"), "utf8");
  const browserStorageWriteCall = [".set", "Item("].join("");
  assert(!source.includes(browserStorageWriteCall));
  vault.revokeDemoKeyForTest(restricted.evidenceId);
  assert.strictEqual(vault.getDemoKeyPresenceForTest(restricted.evidenceId), false);

  assert(ledger.getLedgerEvents().some((event) => event.type === "evidence.encrypted"));
  assert(ledger.getLedgerEvents().some((event) => event.type === "evidence.integrity.failed"));
  assert.strictEqual(ledger.validateLedgerChain().valid, true);

  console.log("PIPO Evidence Vault tests passed");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
