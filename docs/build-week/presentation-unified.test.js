const assert = require("assert");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const config = require(path.join(root, "alert-routing-config.js"));
const source = fs.readFileSync(path.join(root, "presentation-unified.js"), "utf8");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const advancedHtml = fs.readFileSync(path.join(root, "advanced.html"), "utf8");
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
  assert.strictEqual(typeof config.getCommunicationRows, "function", "Communication rows must use the shared routing configuration.");
  ["master", "security", "health", "fire", "civil", "gender", "childhood", "traffic", "prosecution", "cvgrt", "cybercrime", "station", "municipal147"].forEach((id) => {
    assert(config.getConsole(id), `Missing console ${id}.`);
    assert(config.getConsole(id).label["es-AR"], `Missing Spanish label for ${id}.`);
    assert(config.getConsole(id).label["en-US"], `Missing English label for ${id}.`);
  });
}

function testPresentationSurface() {
  ["pipoUnifiedPresentation", "alert-routing-config.js?v=2", "presentation-unified.js?v=5", "presentation-unified"].forEach((value) => {
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

function routeFor(alertId, options = {}) {
  const selected = config.getAlert(alertId);
  const route = [...selected.route];
  if (options.injured && selected.routeWhen?.injured) selected.routeWhen.injured.forEach((id) => {
    if (!route.includes(id)) route.push(id);
  });
  return route;
}

function testAdvancedModules() {
  assert(!html.includes("<template"), "The primary presentation must not keep the technical application inside a template.");
  assert(html.includes('body class="presentation-unified"'), "The unified presentation must remain the default page.");
  assert(source.includes('href="advanced.html"'), "The advanced exploration link must open advanced.html.");
  assert(advancedHtml.includes("Funcionamiento avanzado de PIPO"), "advanced.html must identify the technical demonstration.");
  assert(advancedHtml.includes('href="./"'), "advanced.html must link back to the primary presentation.");
  [
    "data-models.js", "ledger.js", "incident-scenarios.js", "ai-service.js", "incident-assistant.js",
    "field-workflow.js", "procedure-act.js", "citizen-closure.js", "evidence-vault.js", "app.js",
    "citizen-activation.js", "operational-journey.js",
  ].forEach((script) => assert(advancedHtml.includes(script), `advanced.html must load ${script}.`));
}

function testRouteBoundCommunications() {
  const securityRoute = routeFor("security", { injured: true });
  assert.deepStrictEqual(securityRoute, ["master", "security", "station", "prosecution", "health"]);
  const securityRows = config.getCommunicationRows(securityRoute, "es-AR");
  assert.deepStrictEqual(securityRows.map((row) => row.id), ["COM-DEMO-001", "COM-DEMO-002", "COM-DEMO-003", "COM-DEMO-004", "COM-DEMO-005"]);
  securityRows.forEach((row) => assert(config.isCommunicationAllowed(row, securityRoute), `${row.id} must stay within the active security route.`));
  assert(!securityRows.some((row) => row.sender === "traffic" || row.recipient === "traffic" || row.sender === "fire" || row.recipient === "fire"), "Security scenario must not show Traffic or Fire Service.");

  const trafficRoute = routeFor("traffic");
  const trafficRows = config.getCommunicationRows(trafficRoute, "es-AR");
  trafficRows.forEach((row) => assert(config.isCommunicationAllowed(row, trafficRoute), `${row.id} must stay within the active road-incident route.`));
  assert(trafficRows.some((row) => row.sender === "traffic" || row.recipient === "traffic"), "Road incident must allow Traffic communications.");
  assert(trafficRows.some((row) => row.sender === "fire" || row.recipient === "fire"), "Road incident must allow Fire Service communications.");

  const fireRoute = routeFor("fire");
  const fireRows = config.getCommunicationRows(fireRoute, "es-AR");
  fireRows.forEach((row) => assert(config.isCommunicationAllowed(row, fireRoute), `${row.id} must stay within the active fire route.`));
  assert(fireRows.some((row) => row.sender === "fire" || row.recipient === "fire"), "Fire scenario must allow Fire Service communications.");
  assert(fireRows.some((row) => row.sender === "civil" || row.recipient === "civil"), "Fire scenario must allow Civil Protection communications.");
}

function testPublicVersionProtection() {
  const { execFileSync } = require("child_process");
  const repository = path.resolve(root, "..", "..");
  const changed = execFileSync("git", ["diff", "--name-only", "main", "--", "docs/index.html", "docs/styles.css", "docs/app.js"], { cwd: repository, encoding: "utf8" }).trim();
  assert.strictEqual(changed, "", "v36 public files must remain unchanged.");
}

function testSafetyBoundaries() {
  const forbidden = ["get" + "UserMedia", "geo" + "location", "MediaDevices", "watch" + "Position", 'type="file"', "localStorage", "sessionStorage"];
  forbidden.forEach((fragment) => assert(!source.includes(fragment), `Unified presentation must not use ${fragment}.`));
  ["No es una denuncia real", "Sin anonimato absoluto", "No official connection", "No sensors, tracking", "humanRequired", "confirmResource", "Demostración conceptual sin conexión institucional real."].forEach((value) => {
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
  testAdvancedModules();
  testRouteBoundCommunications();
  testSafetyBoundaries();
  testLocalizedFlow();
  testPublicVersionProtection();
  console.log("PIPO unified presentation tests passed");
}

main();
