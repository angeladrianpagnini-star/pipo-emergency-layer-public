const assert = require("assert");
const childProcess = require("child_process");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const repositoryRoot = path.resolve(root, "..", "..");
const testFiles = [
  "incident-assistant.test.js",
  "field-workflow.test.js",
  "procedure-act.test.js",
  "citizen-closure.test.js",
  "evidence-vault.test.js",
  path.join("server", "secure-backend.test.js"),
];
const requiredDocumentation = [
  "README.md",
  "PRE_EXISTING_WORK.md",
  "BUILD_WEEK_CHANGELOG.md",
  "BUILD_WEEK_ARCHITECTURE.md",
  "AI_SAFETY_AND_LIMITS.md",
  "SECURITY_CONTROL_STATUS.md",
  "DEMO_SCRIPT.md",
  "TEST_PLAN.md",
  "GPT_5_6_BUILD_CONTRIBUTION.md",
  "BUILD_WEEK_FINAL_REPORT.md",
  "RELEASE_CHECKLIST.md",
];

function run(command, args, options = {}) {
  return childProcess.execFileSync(command, args, {
    cwd: repositoryRoot,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    ...options,
  });
}

function walkJavaScriptFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) return walkJavaScriptFiles(absolutePath);
    return entry.name.endsWith(".js") ? [absolutePath] : [];
  });
}

function assertReleaseSurface() {
  const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
  const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
  const vault = fs.readFileSync(path.join(root, "evidence-vault.js"), "utf8");

  ["feedbackComment", "observationDescription"].forEach((id) => {
    assert(html.includes(`for=\"${id}\"`), `Missing explicit accessible label for ${id}`);
  });
  ["perspectiveMessage", "assistantStatus", "procedureMessage", "vaultMessage", "ledgerValidation"].forEach((id) => {
    assert(new RegExp(`id=\"${id}\"[^>]*aria-live=\"polite\"`).test(html), `Missing live status region for ${id}`);
  });

  assert(html.includes("data-internal-for-citizen"), "Internal panels must be marked for citizen isolation.");
  assert(app.includes("[data-internal-vault], [data-internal-for-citizen]"), "Citizen isolation must be rendered from the active perspective.");
  assert(!/initializeCitizenControls\(\);\s*refreshBackendStatus\(\);/.test(app), "Static demo must not query a backend automatically at startup.");
  assert(!vault.includes("localStorage"), "Evidence vault must not persist demo material in localStorage.");
  assert(!vault.includes("sessionStorage"), "Evidence vault must not persist demo material in sessionStorage.");
  assert(!vault.includes("indexedDB"), "Evidence vault must not persist demo material in indexedDB.");
}

function assertNoPublicV36Changes() {
  const changedPublicFiles = run("git", [
    "diff",
    "--name-only",
    "pre-build-week-v36..HEAD",
    "--",
    "docs/index.html",
    "docs/styles.css",
    "docs/app.js",
  ]).trim();
  assert.strictEqual(changedPublicFiles, "", "Public v36 files must remain unchanged from the preservation tag.");
}

function assertNoSecretPatterns() {
  const prefixes = [
    ["s", "k", "-"].join(""),
    ["A", "I", "z", "a"].join(""),
    ["g", "h", "p", "_"].join(""),
    ["g", "i", "t", "h", "u", "b", "_", "p", "a", "t", "_"].join(""),
    ["-", "-", "-", "-", "-", "B", "E", "G", "I", "N"].join(""),
  ];
  const pattern = new RegExp(`(${prefixes[0]}[a-z0-9_-]{12,}|${prefixes[1]}[0-9A-Za-z_-]{20,}|${prefixes[2]}[0-9A-Za-z]{20,}|${prefixes[3]}[0-9A-Za-z_]{20,}|${prefixes[4]})`, "i");
  const sources = walkJavaScriptFiles(root).map((file) => fs.readFileSync(file, "utf8")).join("\n");
  assert(!pattern.test(sources), "Release candidate source must not contain a credential-shaped value.");
}

function main() {
  requiredDocumentation.forEach((file) => {
    assert(fs.existsSync(path.join(root, file)), `Missing release documentation: ${file}`);
  });

  walkJavaScriptFiles(root).forEach((file) => run(process.execPath, ["--check", file]));
  testFiles.forEach((file) => {
    const output = run(process.execPath, [path.join(root, file)]);
    assert(/passed/i.test(output), `Expected passing output from ${file}`);
  });

  assertReleaseSurface();
  assertNoPublicV36Changes();
  assertNoSecretPatterns();
  console.log("PIPO Build Week release candidate tests passed");
}

main();
