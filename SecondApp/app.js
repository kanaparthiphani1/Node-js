const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const url = req.url
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>First Node App</title></head>");
    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='message' /> <button type='submit'>Send</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  } else if (url === "/message" && method === "POST") {
    const reqBody = [];
    req.on("data", (chunk) => {
      reqBody.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(reqBody).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFileSync("message.txt", message);
    });

    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>First Node App</title></head>");
  res.write("<body><h1>Hello World!<h1></body>");
  res.write("</html>");
  res.end();
});

server.listen(3000);
