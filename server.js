const { PORT } = require("./config");
const express = require("express");
const socket = require("socket.io");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(PORT, function () {
  console.log(`Listening on PORT ${PORT}`);
  console.log(
    `Socket is hosted on -> http://localhost:${PORT}/socket.io/socket.io.js`
  );
  console.log(`http://localhost:${PORT}`);
});

const io = socket(server);

io.on("connection", function (socket) {
  console.log("Client connected");
  socket.on("disconnect", function () {
    console.log("Client disconnected");
  });

  socket.on("new-session", async function () {
    console.log("creating new session");
    const data = await createNewSession();
    socket.emit("new-session-creating-start", data);
    console.log("session created");
  });

  socket.on("start-session", async function (data) {
    console.log("starting new session");
    const res = await startNewSession(data.sessionId, data.sdp);
    socket.emit("new-session-starting", res);
    console.log("session started");
  });
});

async function createNewSession() {
  let res;
  let error;
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "x-api-key":
        "NGIzOWIyYzc2OGU4NGNmZDgyNmNmNDhkY2YzMzZhMmUtMTcwMjQwMTMyNg==",
    },
    body: JSON.stringify({ quality: "medium" }),
  };

  await fetch("https://api.heygen.com/v1/streaming.new", options)
    .then((response) => response.json())
    .then((response) => (res = response))
    .catch((err) => (error = err));

  return {
    error,
    response: res,
  };
}

async function startNewSession(sessionId, sdp) {
  let res;
  let error;
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "x-api-key":
        "NGIzOWIyYzc2OGU4NGNmZDgyNmNmNDhkY2YzMzZhMmUtMTcwMjQwMTMyNg==",
    },
    body: JSON.stringify({
      session_id: sessionId,
      sdp,
    }),
  };

  await fetch("https://api.heygen.com/v1/streaming.start", options)
    .then((response) => response.json())
    .then((response) => (res = response))
    .catch((err) => (error = err));

  return {
    error,
    response: res,
  };
}
