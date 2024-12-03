const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  // Serve the index.html file
  if (req.method === "GET" && req.url === "/") {
    fs.readFile(path.join(__dirname, "index.html"), "utf8", (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end("Error reading the HTML file.");
        return;
      }
      res.setHeader("Content-Type", "text/html");
      res.end(data);
    });
  }
  // Serve CSS files
  else if (req.method === "GET" && req.url.endsWith(".css")) {
    const cssPath = path.join(__dirname, req.url);
    fs.readFile(cssPath, "utf8", (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end("Error reading the CSS file.");
        return;
      }
      res.setHeader("Content-Type", "text/css");
      res.end(data);
    });
  }
  // Serve JavaScript files
  else if (req.method === "GET" && req.url.endsWith(".js")) {
    const jsPath = path.join(__dirname, req.url);
    fs.readFile(jsPath, "utf8", (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end("Error reading the JavaScript file.");
        return;
      }
      res.setHeader("Content-Type", "application/javascript");
      res.end(data);
    });
  }
  // Serve image files
  else if (
    req.method === "GET" &&
    /\.(jpg|jpeg|png|gif|webp|avif)$/.test(req.url)
  ) {
    const imagePath = path.join(__dirname, req.url);
    fs.readFile(imagePath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end("Error reading the image file.");
        return;
      }
      const ext = path.extname(req.url).toLowerCase();
      const contentType =
        {
          ".jpg": "image/jpeg",
          ".jpeg": "image/jpeg",
          ".png": "image/png",
          ".gif": "image/gif",
          ".webp": "image/webp",
          ".avif": "image/avif",
        }[ext] || "application/octet-stream";
      res.setHeader("Content-Type", contentType);
      res.end(data);
    });
  }
  // Handle other cases (404)
  else {
    res.statusCode = 404;
    res.end("Not Found");
  }
});

// Start the server on port 3000
server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
