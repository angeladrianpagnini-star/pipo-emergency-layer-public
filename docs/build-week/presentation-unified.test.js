const assert = require("assert");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const config = require(path.join(root, "alert-routing-config.js"));
const source = fs.readFileSync(path.join(root, "presentation-unified.js"), "utf8");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const styles = fs.readFileSync(path.join(root, "styles.css"), "utf8");

function testRoutingConfig() {
  const expectedAlerts = [
    "general", "security", "health", "fire", "violence", "childhood", "traffic", "cybercrime",
    "stolenDevice", "cannotSpeak", "confidential", "municipal147",
  ];
  assert.strictEqual(config.alerts.length, 12, "The alert configuration must include twelve visible conditions.");
  expectedAlerts.forEach((id) => assert(config.getAlert(id), `Missing ${id} alert.`));
  assert.deepStrictEqual(config.getAlert("general").route, ["master", "security", "health"]);
  assert.deepStrictEqual(config.getAlert("traffic").route, ["security", "health", "traffic", "fire"]);
  assert.deepStrictEqual(config.getAlert("cybercrime").route, ["cybercrime", "prosecution", "station"]);
  assert.deepStrictEqual(config.getAlert("municipal147").route, ["municipal147", "traffic", "civil"]);
  assert.deepStrictEqual(config.getAlert("security").routeWhen.injured, ["health"]);
  ["master", "security", "health", "fire", "civil", "gender", "childhood", "traffic", "prosecution", "cvgrt", "cybercrime", "station", "municipal147"].forEach((id) => {
    assert(config.getConsole(id), `Missing console ${id}.`);
    assert(config.getConsole(id).label["es-AR"], `Missing Spanish label for ${id}.`);
    assert(config.getConsole(id).label["en-US"], `Missing English label for ${id}.`);
  });
}

function testPresentationSurface() {
  ["pipoUnifiedPresentation", "alert-routing-config.js?v=1", "presentation-unified.js?v=4", "presentation-unified"].forEach((value) => {
    assert(html.includes(value), `Missing unified presentation integration: ${value}`);
  });
  [
    "presentationCitizen", "presentationMaster", "presentationConsoles", "presentationField", "presentationJustice",
    "presentationDocumentation", "presentationClosure", "presentationAdvanced", "start-tour", "tour-next", "film", "confidentialFields", "stationScope",
    "renderCitizen", "renderMaster", "renderConsoles", "renderField", "renderJustice", "renderDocumentation", "renderClosure",
  ].forEach((value) => assert(source.includes(value), `Missing presentation flow component: ${value}`));
  [".presentation-hero", ".presentation-phone", ".presentation-console-grid", ".presentation-communications-table", ".presentation-field-layout", ".presentation-closure-layout", "@media (max-width: 420px)"].forEach((selector) => {
    assert(styles.includes(selector), `Missing presentation style: ${selector}`);
  });
}

function testSafetyBoundaries() {
  const forbidden = ["get" + "UserMedia", "geo" + "location", "MediaDevices", "watch" + "Position", 'type="file"', "localStorage", "sessionStorage"];
  forbidden.forEach((fragment) => assert(!source.includes(fragment), `Unified presentation must not use ${fragment}.`));
  ["No es una denuncia real", "Sin anonimato absoluto", "No official connection", "No sensors, tracking", "humanRequired", "confirmResource"].forEach((value) => {
    assert(source.includes(value), `Missing safety or human-control boundary: ${value}`);
  });
}

function testLocalizedFlow() {
  ["es-AR", "en-US", "Spanish", "English", "All consoles", "Todas las consolas", "Prosecution / Justice Access"].forEach((value) => {
    assert(source.includes(value) || JSON.stringify(config).includes(value), `Missing localized content: ${value}`);
  });
  assert(!source.includes("innerHTML = user"), "The demo must not inject user-controlled content.");
}

function main() {
  testRoutingConfig();
  testPresentationSurface();
  testSafetyBoundaries();
  testLocalizedFlow();
  console.log("PIPO unified presentation tests passed");
}

main();
