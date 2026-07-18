const http = require("http");
const fs = require("fs");
const path = require("path");
const { handleAnalyzeIncident, handleBackendStatus } = require("./analyze-incident");
const { getServerConfig } = require("./config");

const BUILD_WEEK_ROOT = path.resolve(__dirname, "..");
const PORT = Number.parseInt(process.env.PIPO_BACKEND_PORT || "4189", 10);

const CONTENT_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
};

function sendStaticFile(res, requestedPath) {
  const normalizedPath = requestedPath === "/" ? "/index.html" : requestedPath;
  const absolutePath = path.resolve(BUILD_WEEK_ROOT, `.${normalizedPath}`);
  const relativePath = path.relative(BUILD_WEEK_ROOT, absolutePath);

  if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(absolutePath, (error, content) => {
    if (error) {
      res.writeHead(error.code === "ENOENT" ? 404 : 500);
      res.end(error.code === "ENOENT" ? "Not found" : "Server error");
      return;
    }

    const contentType = CONTENT_TYPES[path.extname(absolutePath).toLowerCase()] || "application/octet-stream";
    res.writeHead(200, {
      "Content-Type": contentType,
      "Cache-Control": "no-store",
    });
    res.end(content);
  });
}

function createServer(options = {}) {
  const config = options.config || getServerConfig(options.env);
  return http.createServer((req, res) => {
    const url = new URL(req.url, "http://127.0.0.1");
    if (url.pathname === "/api/analyze-incident") {
      handleAnalyzeIncident(req, res, { ...options, config });
      return;
    }
    if (url.pathname === "/api/backend-status") {
      handleBackendStatus(req, res, { ...options, config });
      return;
    }
    sendStaticFile(res, url.pathname);
  });
}

if (require.main === module) {
  const server = createServer();
  server.listen(PORT, () => {
    const config = getServerConfig();
    console.log(`PIPO Build Week backend listening on http://127.0.0.1:${PORT}`);
    console.log(`Mode: OPENAI_SECURE_BACKEND / model: ${config.model} / contract: ${config.contractVersion}`);
  });
}

module.exports = {
  createServer,
};
