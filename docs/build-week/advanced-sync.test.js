const assert = require("assert");
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const repository = path.resolve(root, "..", "..");
const advanced = fs.readFileSync(path.join(root, "advanced.html"), "utf8");
const styles = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const navigation = fs.readFileSync(path.join(root, "advanced-sync.js"), "utf8");

[
  "Estado de la edición Build Week",
  "v36 preservada",
  "Presentación Build Week publicada",
  "Módulos avanzados publicados",
  "PR #3, #4 y #5 fusionados",
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
  "Módulo técnico de actuación individual y revisión documental.",
  "No sustituye las actas individuales ni constituye expediente judicial oficial.",
].forEach((value) => assert(advanced.includes(value), `Missing advanced synchronization content: ${value}`));

assert(advanced.includes('href="./#presentationCitizen"'), "The advanced view must link to the guided main presentation.");
assert(advanced.includes('href="./">Volver a la presentación principal'), "The advanced view must keep the return link.");
assert(advanced.includes('advanced-sync.js?v=1'), "The advanced view must load its non-destructive navigation helper.");
assert(!advanced.includes("No se publica esta rama"), "The advanced view must not claim that its branch is unpublished.");
assert(!advanced.includes("Acta maestra referenciada"), "The advanced view must not present Acta Maestra as the final label.");
assert(styles.includes(".advanced-sync-panel"), "The alignment panel requires scoped styles.");
assert(styles.includes(".advanced-sync-nav"), "The advanced navigation requires scoped styles.");
assert(styles.includes(".advanced-service-reference"), "The compact service reference requires scoped styles.");
assert(navigation.includes('details#pipoAdvancedModules'), "Advanced navigation must expand the preserved technical laboratory when needed.");

const protectedFiles = execFileSync("git", ["diff", "--name-only", "main", "--", "docs/index.html", "docs/styles.css", "docs/app.js", "docs/build-week/index.html", "docs/build-week/presentation-unified.js", "docs/build-week/alert-routing-config.js", "LICENSE", "TRADEMARKS.md"], { cwd: repository, encoding: "utf8" }).trim();
assert.strictEqual(protectedFiles, "", "Protected public and guided-presentation files must remain unchanged.");

console.log("PIPO advanced synchronization tests passed");
