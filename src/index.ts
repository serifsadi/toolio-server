import express from "express";
import * as http from "http";

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = 3000;

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
