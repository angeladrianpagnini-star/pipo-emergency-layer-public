const AUDIT_EVENTS = [];

function toAuditMetadata(input = {}) {
  return {
    requestId: input.requestId,
    timestamp: input.timestamp || new Date().toISOString(),
    incidentId: input.incidentId,
    mode: input.mode,
    durationMs: input.durationMs,
    success: Boolean(input.success),
    contractVersion: input.contractVersion,
    model: input.model,
    errorCode: input.errorCode || null,
    charCount: input.charCount || 0,
  };
}

function recordAuditEvent(input = {}) {
  const event = toAuditMetadata(input);
  AUDIT_EVENTS.push(Object.freeze(event));
  return event;
}

function getAuditEvents() {
  return AUDIT_EVENTS.map((event) => ({ ...event }));
}

function clearAuditEvents() {
  AUDIT_EVENTS.splice(0, AUDIT_EVENTS.length);
}

module.exports = {
  recordAuditEvent,
  getAuditEvents,
  clearAuditEvents,
};
