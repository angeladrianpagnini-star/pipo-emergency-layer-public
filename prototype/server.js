const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = 4181;
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
};

const server = http.createServer((req, res) => {
  const clean = decodeURIComponent(req.url.split("?")[0]);
  const target = clean === "/" ? "index.html" : clean.replace(/^\/+/, "");
  const file = path.resolve(root, target);

  if (!file.startsWith(root)) {
    res.writeHead(403);
    res.end("forbidden");
    return;
  }

  fs.readFile(file, (error, data) => {
    if (error) {
      res.writeHead(404);
      res.end("not found");
      return;
    }

    res.writeHead(200, {
      "Content-Type": types[path.extname(file)] || "application/octet-stream",
    });
    res.end(data);
  });
});

server.listen(port, "127.0.0.1", () => {
  console.log(`PIPO public demo running at http://127.0.0.1:${port}`);
});
