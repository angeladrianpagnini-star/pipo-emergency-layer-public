const assert = require("assert");
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const repository = path.resolve(root, "..", "..");
const advanced = fs.readFileSync(path.join(root, "advanced.html"), "utf8");
const styles = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const navigation = fs.readFileSync(path.join(root, "advanced-sync.js"), "utf8");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const procedure = fs.readFileSync(path.join(root, "procedure-act.js"), "utf8");
const fieldWorkflow = fs.readFileSync(path.join(root, "field-workflow.js"), "utf8");
const dataModels = fs.readFileSync(path.join(root, "data-models.js"), "utf8");
const navigationMarkup = advanced.match(/<nav class="advanced-sync-nav"[\s\S]*?<\/nav>/)?.[0] || "";

[
  "Estado de la edición Build Week",
  "v36 preservada",
  "Presentación Build Week publicada",
  "Módulos avanzados publicados",
  "Flujo final consolidado",
  "Presentación principal y laboratorio avanzado consolidados en",
  "Sin conexiones oficiales ni sensores reales",
  "Flujo operativo y documental final",
  "Informe Maestro Interno",
  "Remisión institucional simulada",
  "Resumen de Cierre Ciudadano",
  "Móvil 911-12",
  "Unidad sanitaria 107-04",
  "Estos recursos aparecen únicamente cuando su finalidad resulta pertinente.",
  "Control de servicio",
  "La ubicación operativa es ficticia",
  "Módulo técnico de integración y revisión documental.",
  "No sustituye las actas individuales ni constituye expediente judicial oficial.",
  "Demo multiagencia",
  "ESCENARIO PRINCIPAL",
  "ESCENARIOS AVANZADOS",
  "Los operadores mostrados representan capacidades disponibles para distintos escenarios avanzados.",
  "Las capacidades avanzadas se habilitan según el escenario seleccionado.",
  "Registro Integrado de Procedimiento y revisión documental",
  "Documento interno de integración y revisión que referencia las actas individuales sin sustituirlas, fusionarlas ni modificar sus fuentes.",
  "Los modelos separan bitácora operativa, decisiones humanas, actas individuales, Registro Integrado de Procedimiento e Informe Maestro Interno.",
  "Demo documental",
].forEach((value) => assert(advanced.includes(value), `Missing advanced synchronization content: ${value}`));

[
  "pipoCitizenExperience",
  "pipoOperationalJourney",
  'citizen-activation.js?v=1',
  'operational-journey.js?v=1',
  "Demo 4 organismos",
  ">Demo Etapa 5<",
  "PR #3, #4 y #5 fusionados",
  "Demo multidisciplinaria",
].forEach((value) => assert(!advanced.includes(value), `Obsolete advanced content must be removed: ${value}`));

[
  "data-models.js",
  "ledger.js",
  "incident-scenarios.js",
  "ai-service.js",
  "incident-assistant.js",
  "field-workflow.js",
  "procedure-act.js",
  "citizen-closure.js",
  "evidence-vault.js",
  "app.js",
  "advanced-sync.js",
].forEach((script) => assert(advanced.includes(script), `Advanced technical script must remain loaded: ${script}`));

assert(advanced.includes('href="./#presentationCitizen"'), "The advanced view must link to the guided main presentation.");
assert(advanced.includes('href="./">Volver a la presentación principal'), "The advanced view must keep the return link.");
assert(advanced.includes('advanced-sync.js?v=1'), "The advanced view must load its non-destructive navigation helper.");
assert(advanced.includes('data-field-action="demo"'), "The multi-agency demo must preserve its existing field action.");
assert(!advanced.includes("No se publica esta rama"), "The advanced view must not claim that its branch is unpublished.");
assert(!advanced.includes("Acta maestra referenciada"), "The advanced view must not present Acta Maestra as the final label.");
assert(styles.includes(".advanced-sync-panel"), "The alignment panel requires scoped styles.");
assert(styles.includes(".advanced-sync-nav"), "The advanced navigation requires scoped styles.");
assert(styles.includes(".advanced-service-reference"), "The compact service reference requires scoped styles.");
assert(styles.includes(".advanced-sync-nav { position: sticky") && styles.includes("flex-wrap: wrap"), "Desktop advanced navigation must wrap instead of creating a horizontal scrollbar.");
assert(styles.includes(".advanced-sync-nav { top: 0; margin-top: 10px; flex-wrap: nowrap; overflow-x: auto; }"), "Mobile advanced navigation must keep horizontal scrolling within the control.");
assert(styles.includes("@media print") && styles.includes("position: static;") && styles.includes("box-shadow: none;"), "Printed advanced navigation must be static and non-overlapping.");
assert(fieldWorkflow.includes('shortLabel: "Oficial Móvil Demo · 911"'), "The Field Operator must expose its compact presentation label.");
assert(app.includes("operator.shortLabel ||"), "The compact Field Operator label must be used in the selector.");
assert(app.includes("Modo simulado activo. El backend local opcional no está desplegado en GitHub Pages."), "The Incident Assistant must explain simulated mode without a deployed backend.");
assert(app.includes("La demostración puede utilizarse completamente sin backend."), "The Incident Assistant must remain usable without a backend.");
assert(!app.includes("Estado pendiente. En GitHub Pages el backend puede no estar disponible."), "The Incident Assistant must not present a pending backend as a failure.");
assert(app.includes('backend-status ${backend?.available ? "online" : "simulated"}'), "Simulated mode must use a neutral visual status class.");
assert(!app.includes('backend-status ${backend?.available ? "online" : "offline"}'), "Simulated mode must not use the offline status class.");
assert(styles.includes(".backend-status.simulated"), "The neutral simulated backend style must be scoped.");
[
  "Registro Integrado de Procedimiento pendiente de generar.",
  "Registro integrado no generado.",
  "Informe Maestro Interno pendiente.",
  "Registro Integrado de Procedimiento",
].forEach((value) => assert(`${app}\n${procedure}`.includes(value), `Missing final documentary copy: ${value}`));
assert(app.includes('const blockingLabel = completeness.blockingErrors.length === 1 ? "Bloqueante" : "Bloqueantes";'), "The singular blocking label must remain visible.");
assert(procedure.includes('blockingErrors: ["registro integrado pendiente."]'), "The visible blocking message must identify the pending integrated record.");
assert(!procedure.includes("acta individual de procedimiento"), "The central procedure module must not use the individual-act name.");
assert(!advanced.includes("Acta individual de procedimiento"), "Visible advanced copy must not use the individual-act name for the central module.");
assert(dataModels.includes('key: "digitalAct"') && dataModels.includes('name: "Registro Integrado de Procedimiento"'), "The model name may change without changing its key.");
["procedureAct", "actId", "function createProcedureAct", "function finalizeProcedureAct", "procedure.act.created"].forEach((value) => {
  assert(procedure.includes(value), `Internal procedure API must remain stable: ${value}`);
});
assert(advanced.includes("<h3>Acta individual</h3>") && app.includes('"Acta individual finalizada y bloqueada."'), "Field Operator acts must remain individual documents.");
const documentaryFlow = advanced.match(/<div class="advanced-documentary-flow"[\s\S]*?<\/div>/)?.[0] || "";
assert(documentaryFlow.indexOf("Actas individuales") < documentaryFlow.indexOf("Registro Integrado de Procedimiento"), "The integrated record must follow individual acts in the visible documentary flow.");
assert(documentaryFlow.indexOf("Registro Integrado de Procedimiento") < documentaryFlow.indexOf("Control de consistencia documental"), "The consistency control must follow the integrated record in the visible documentary flow.");
[
  "Acta Digital de Procedimiento",
  "Expediente maestro pendiente.",
].forEach((value) => assert(!`${app}\n${procedure}`.includes(value), `Legacy documentary copy must be removed: ${value}`));
const internalHrefs = [...navigationMarkup.matchAll(/href="(#[^"]+)"/g)].map((match) => match[1]);
assert(internalHrefs.length > 0, "Advanced navigation must include internal destinations.");
internalHrefs.forEach((href) => assert(advanced.includes(`id="${href.slice(1)}"`), `Missing navigation destination: ${href}`));
assert(navigation.includes("scrollIntoView"), "Advanced navigation must scroll to the selected destination.");
assert(navigation.includes("prefers-reduced-motion: reduce"), "Advanced navigation must respect reduced-motion preferences.");
assert(navigation.includes("history.replaceState"), "Advanced navigation must update the selected hash without a reload.");
const obsoleteWrapper = ["pipo", "AdvancedModules"].join("");
assert(!navigation.includes(obsoleteWrapper), "Advanced navigation must not depend on a non-source wrapper.");

const protectedFiles = execFileSync("git", ["diff", "--name-only", "main", "--", "docs/index.html", "docs/styles.css", "docs/app.js", "docs/build-week/index.html", "docs/build-week/alert-routing-config.js", "LICENSE", "TRADEMARKS.md"], { cwd: repository, encoding: "utf8" }).trim();
assert.strictEqual(protectedFiles, "", "Protected public and guided-presentation files must remain unchanged.");

console.log("PIPO advanced synchronization tests passed");
