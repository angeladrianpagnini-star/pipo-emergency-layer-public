const DEFAULT_MODEL = "gpt-5.6";
const CONTRACT_VERSION = "4A.0.0";
const DEFAULT_PROVIDER_ENDPOINT = "https://api.openai.com/v1/responses";
const DEFAULT_TIMEOUT_MS = 12000;
const DEFAULT_MAX_FREE_TEXT_CHARS = 2500;
const DEFAULT_MAX_BODY_BYTES = 32 * 1024;

function readPositiveInteger(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function getServerConfig(env = process.env) {
  const providerCredential = String(env.PIPO_OPENAI_CREDENTIAL || "").trim();
  const model = String(env.PIPO_OPENAI_MODEL || DEFAULT_MODEL).trim() || DEFAULT_MODEL;
  const providerEndpoint = String(env.PIPO_OPENAI_RESPONSES_URL || DEFAULT_PROVIDER_ENDPOINT).trim() || DEFAULT_PROVIDER_ENDPOINT;
  const timeoutMs = readPositiveInteger(env.PIPO_OPENAI_TIMEOUT_MS, DEFAULT_TIMEOUT_MS);
  const maxFreeTextChars = readPositiveInteger(env.PIPO_OPENAI_MAX_FREE_TEXT_CHARS, DEFAULT_MAX_FREE_TEXT_CHARS);
  const maxBodyBytes = readPositiveInteger(env.PIPO_OPENAI_MAX_BODY_BYTES, DEFAULT_MAX_BODY_BYTES);
  const demoOnly = String(env.PIPO_BACKEND_DEMO_ONLY || "").trim() === "1";

  return {
    mode: "OPENAI_SECURE_BACKEND",
    contractVersion: CONTRACT_VERSION,
    model,
    providerEndpoint,
    timeoutMs,
    maxFreeTextChars,
    maxBodyBytes,
    providerCredential,
    providerCredentialPresent: Boolean(providerCredential),
    demoOnly,
  };
}

function getPublicBackendStatus(config = getServerConfig()) {
  return {
    mode: "OPENAI_SECURE_BACKEND",
    contractVersion: config.contractVersion,
    model: config.model,
    available: config.providerCredentialPresent && !config.demoOnly,
    credentialConfigured: config.providerCredentialPresent,
    endpointConfigured: Boolean(config.providerEndpoint),
    timeoutMs: config.timeoutMs,
    maxFreeTextChars: config.maxFreeTextChars,
    productionReady: false,
    storagePolicy: "metadata-only audit; no narrative persistence",
    warning: "Experimental Build Week backend. Fictitious data only. Human validation required.",
  };
}

module.exports = {
  DEFAULT_MODEL,
  CONTRACT_VERSION,
  DEFAULT_PROVIDER_ENDPOINT,
  DEFAULT_TIMEOUT_MS,
  DEFAULT_MAX_FREE_TEXT_CHARS,
  DEFAULT_MAX_BODY_BYTES,
  getServerConfig,
  getPublicBackendStatus,
};
