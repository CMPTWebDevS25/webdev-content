const http = require("http");
const fs = require("fs");
const path = require("path");
const querystring = require("querystring");

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/login") {
    let body = "";

    // Collect data from the request
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      // Parse URL-encoded form data
      console.log("Request body", body);
      const parsedData = querystring.parse(body);

      console.log(parsedData);

      // Display received data as rows
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(`
                <h1>Received Data</h1>
                <table border="1">
                    <tr>
                        ${Object.keys(parsedData)
                          .map((key) => `<th>${key}</th>`)
                          .join("")}
                    </tr>
                    <tr>
                        ${Object.values(parsedData)
                          .map((value) => `<td>${value}</td>`)
                          .join("")}
                    </tr>
                </table>
            `);
    });
  } else if (req.method === "GET" && req.url.startsWith("/login")) {
    // Parse query string from URL
    const queryString = req.url.split("?")[1];
    console.log("Query string: ", queryString);
    const parsedData = querystring.parse(queryString);

    console.log(parsedData);

    // Display received data as rows
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
            <h1>Received Data</h1>
            <table border="1">
                <tr>
                    ${Object.keys(parsedData)
                      .map((key) => `<th>${key}</th>`)
                      .join("")}
                </tr>
                <tr>
                    ${Object.values(parsedData)
                      .map((value) => `<td>${value}</td>`)
                      .join("")}
                </tr>
            </table>
        `);
  } else if (req.method === "GET" && req.url === "/") {
    // Serve the HTML form from a separate file
    const formPath = path.join(__dirname, "1.simple_form.html");
    console.log(formPath);
    fs.readFile(formPath, (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error loading simple_form.html");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
