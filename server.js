const express = require("express");
const socket = require("socket.io");

const app = express();

const port = 2821;

const server = app.listen(port, function () {
  console.log(`Listening on port ${port}`);
  console.log(
    `Socket is hosted on -> http://localhost:${port}/socket.io/socket.io.js`
  );
  console.log(`http://localhost:${port}`);
});

const io = socket(server);

io.on("connection", function (scoket) {
  console.log("Client connected", " ", socket);
});
