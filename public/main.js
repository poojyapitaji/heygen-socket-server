let sessionData;

const socket = io();

const newSession = document.getElementById("new-session");
const startSession = document.getElementById("start-session");

newSession.addEventListener("click", function () {
  socket.emit("new-session");
});

socket.on("new-session-creating-start", function (data) {
  newSession.disabled = true;
  if (data?.response) {
    if (data?.response.code === 100) {
      newSession.innerText = "Session Created.";
      startSession.disabled = false;
      sessionData = data.response.data;
      console.log(data);
    }
  } else {
    newSession.innerText = "Session Creation failed.";
  }
});

startSession.addEventListener("click", function () {
  socket.emit("start-session", {
    sessionId: sessionData.session_id,
    sdp: sessionData.sdp,
  });
});

socket.on("new-session-starting", function (data) {
  console.log(data);
});
