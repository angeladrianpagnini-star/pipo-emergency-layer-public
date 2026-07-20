const assert = require("assert");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const source = fs.readFileSync(path.join(root, "citizen-activation.js"), "utf8");
const advancedHtml = fs.readFileSync(path.join(root, "advanced.html"), "utf8");
const styles = fs.readFileSync(path.join(root, "styles.css"), "utf8");

const requiredEvents = [
  "citizen.quick_access.opened",
  "citizen.emergency_type.selected",
  "citizen.permission.location.granted",
  "citizen.permission.audio.granted",
  "citizen.permission.video.granted",
  "citizen.permission.revoked",
  "citizen.alert.confirmed",
  "citizen.live_session.started",
  "citizen.location.shared",
  "citizen.audio.started",
  "citizen.video.started",
  "citizen.media.stopped",
  "citizen.live_session.ended",
  "console.live_context.received",
];

const emergencyTypes = [
  "general",
  "health",
  "fire",
  "violence",
  "childhood",
  "traffic",
  "cyber",
  "stolen",
  "cannotSpeak",
];

function assertContains(value, label) {
  assert(source.includes(value), `Missing ${label}: ${value}`);
}

function assertProductFlow() {
  [
    "pipoCitizenExperience",
    "pipoQuickAccess",
    "pipoQuickMenu",
    "pipoPermissions",
    "pipoLiveSession",
    "pipoCoordination",
    "pipo-primary-nav",
  ].forEach((id) => {
    assertContains(id, "citizen flow control");
  });
  emergencyTypes.forEach((type) => assertContains(`"${type}"`, "emergency type"));
  assertContains('const permissionKeys = ["location", "audio", "video", "description", "device"]', "permission set");
  assertContains('data-pipo-permission="${key}"', "independent permission control");
  assertContains("aria-expanded", "quick access accessibility state");
  assertContains('event.key !== "Escape"', "keyboard close behavior");
}

function assertSimulationBoundaries() {
  const prohibitedFragments = ["get" + "UserMedia", "geo" + "location.", "MediaDevices", "watch" + "Position"];
  prohibitedFragments.forEach((fragment) => {
    assert(!source.includes(fragment), `Citizen activation must not use real sensor API fragment: ${fragment}`);
  });
  assertContains("no instala una aplicación nativa ni activa sensores", "Spanish simulated-only notice");
  assertContains("does not install a native app or activate real sensors", "English simulated-only notice");
  assertContains("La IA no activa sensores", "Spanish AI boundary");
  assertContains("AI does not activate sensors", "English AI boundary");
}

function assertEventsAreAppendOnly() {
  requiredEvents.forEach((eventCode) => assertContains(`\"${eventCode}\"`, "activation event"));
  assertContains("state.events.push", "append-only event creation");
  ["state.events.pop", "state.events.splice", "state.events.shift", "state.events = []"].forEach((mutation) => {
    assert(!source.includes(mutation), `Ledger must not remove event data: ${mutation}`);
  });
  assertContains("previous: previous?.reference", "previous event reference");
  assertContains("reference,", "integrity reference");
}

function assertLocalizationAndRegion() {
  ["es-AR", "en-US", "navigator.language", "pipo_demo_locale", "document.documentElement.lang"].forEach((value) => {
    assertContains(value, "localization control");
  });
  assertContains("AR_BUENOS_AIRES", "Argentina region selector");
  assertContains("INTERNATIONAL", "international region selector");
  assertContains("911 Seguridad / 107 Salud", "Argentina presentation label");
  assertContains("Demonstration response center", "international presentation label");
  const storageMatches = source.match(/localStorage\.(getItem|setItem)/g) || [];
  assert.strictEqual(storageMatches.length, 2, "Only locale preference may use browser storage.");
}

function assertPresentationSurface() {
  assert(advancedHtml.includes('id="pipoCitizenExperience"'), "Citizen product root must be in advanced Build Week HTML.");
  assert(advancedHtml.includes('src="citizen-activation.js?v=1"'), "Citizen activation script must be loaded by advanced.html.");
  [".pipo-phone", ".pipo-quick-access", ".pipo-primary-nav", ".pipo-live-grid", "@media (max-width: 520px)"].forEach((selector) => {
    assert(styles.includes(selector), `Missing responsive product style: ${selector}`);
  });
}

function main() {
  assertProductFlow();
  assertSimulationBoundaries();
  assertEventsAreAppendOnly();
  assertLocalizationAndRegion();
  assertPresentationSurface();
  console.log("PIPO citizen activation tests passed");
}

main();
