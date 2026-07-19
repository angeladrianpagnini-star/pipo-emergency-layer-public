const assert = require("assert");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const source = fs.readFileSync(path.join(root, "operational-journey.js"), "utf8");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const styles = fs.readFileSync(path.join(root, "styles.css"), "utf8");

const requiredEvents = [
  "master.alert.received",
  "master.alert.validated",
  "master.priority.confirmed",
  "master.multiagency.routing.started",
  "agency.alert.received",
  "agency.resource.suggested",
  "agency.resource.assigned",
  "field.context.received",
  "field.resource.departed",
  "field.resource.arrived",
  "field.intervention.started",
  "field.intervention.completed",
  "master.documentation.received",
  "master.closure.validated",
  "citizen.final.package.delivered",
];

function assertContains(value, label) {
  assert(source.includes(value), `Missing ${label}: ${value}`);
}

function assertGuidedFlow() {
  [
    "journeyCitizenZone",
    "journeyMasterZone",
    "journeyAgencyZone",
    "journeyResourceZone",
    "journeyFieldZone",
    "journeyDocumentZone",
    "journeyClosureZone",
    "journeyPackageZone",
    "startJourney",
    "moveStep",
    "restartJourney",
    "focusCurrentStep",
  ].forEach((value) => assertContains(value, "guided journey component"));
  ["step1", "step2", "step3", "step4", "step5", "step6", "step7", "step8"].forEach((step) => {
    assertContains(step, "guided step");
  });
}

function assertMultiAgencyScenario() {
  ["security", "health", "traffic", "fire"].forEach((agency) => assertContains(`"${agency}"`, "specialized agency"));
  ["107-04", "911-12", "T-08", "B-03"].forEach((resource) => assertContains(`"${resource}"`, "fictional field resource"));
  ["1.8 km", "2.1 km", "0.9 km", "3.4 km"].forEach((distance) => assertContains(`"${distance}"`, "simulated distance"));
  assertContains("confirmOutstandingResources", "human resource confirmation");
  assertContains("selectionRule", "resource selection rule");
  ["mapUnit", "selectionCriterion", "availability", "operationalStatus", "mainCriterion"].forEach((value) => {
    assertContains(value, "enriched map resource detail");
  });
  ["healthSelectionCriterion", "securitySelectionCriterion", "trafficSelectionCriterion", "fireSelectionCriterion"].forEach((value) => {
    assertContains(value, "agency-specific selection criterion");
  });
  ["health: text(\"onWay\")", "security: text(\"assigned\")", "traffic: text(\"arrived\")", "fire: text(\"onWay\")"].forEach((value) => {
    assertContains(value, "parallel field state");
  });
  ["fieldDeparted, `${resources.health.unit}", "fieldDeparted, `${resources.fire.unit}", "fieldArrived, `${resources.traffic.unit}"].forEach((value) => {
    assertContains(value, "parallel state ledger event");
  });
  assertContains("pendingHumanConfirmation", "pending human assignment state");
  assertContains("assignmentRequired", "human assignment gate");
  assertContains("if (next >= 5 && !confirmOutstandingResources())", "no automatic assignment gate");
  assert(!source.includes("if (!state.assignments[agency]) state.assignments[agency] = true;"), "Resources must not be automatically assigned.");
}

function assertCitizenDeviceClosure() {
  [
    "journey-final-phone",
    "journey-closure-flow",
    "closureFlowMaster",
    "closureFlowValidation",
    "closureFlowPackage",
    "closureFlowDevice",
    "demoCitizen",
    "regionLabel",
    "incidentClosed",
    "simulatedClosureTime",
    "followUpOwner",
    "packageIntegrity",
    "receiptConfirmation",
    "packageReceived",
    "documentationAvailable",
    "emergencySessionEnded",
    "viewSummary",
    "viewDocuments",
    "nextSteps",
    "confirmReceipt",
  ].forEach((value) => assertContains(value, "citizen device closure content"));
  assertContains("pkg-${shortHash(incidentId())}", "linked final integrity reference");
}

function assertLedgerAndSafety() {
  requiredEvents.forEach((eventCode) => assertContains(`"${eventCode}"`, "operational ledger event"));
  assertContains("state.events.push", "append-only ledger write");
  assertContains("previous: previous?.reference", "ledger previous reference");
  assertContains("reference,", "ledger integrity reference");
  assertContains("state.events.slice().reverse()", "complete visible ledger");
  assert(!source.includes("state.events.slice(-8)"), "Operational ledger must not hide earlier journey events.");
  ["get" + "UserMedia", "geo" + "location.", "MediaDevices", "watch" + "Position"].forEach((fragment) => {
    assert(!source.includes(fragment), `Operational journey must not use real sensor API: ${fragment}`);
  });
  assert(!source.includes("localStorage.setItem"), "Operational journey must not persist demo state.");
}

function assertLocalizationAndSurface() {
  ["es-AR", "en-US", "pipo-demo-locale-change", "pipo-demo-region-change", "AR_BUENOS_AIRES", "INTERNATIONAL"].forEach((value) => {
    assertContains(value, "locale or region integration");
  });
  assert(html.includes('id="pipoOperationalJourney"'), "Operational journey root must exist.");
  assert(html.includes('src="operational-journey.js?v=1"'), "Operational journey script must load.");
  [".journey-main-grid", ".journey-agency-grid", ".journey-map", ".journey-map-resource-grid", ".journey-final-phone", ".journey-field-cards", ".journey-ledger"].forEach((selector) => {
    assert(styles.includes(selector), `Missing operational journey style: ${selector}`);
  });
}

function main() {
  assertGuidedFlow();
  assertMultiAgencyScenario();
  assertCitizenDeviceClosure();
  assertLedgerAndSafety();
  assertLocalizationAndSurface();
  console.log("PIPO operational journey tests passed");
}

main();
