const socket = new WebSocket(`ws://${window.location.host}`);

const messageList = document.querySelector("ul");
const nameForm = document.querySelector("#name");
const messageForm = document.querySelector("#chat");

function makeMessage(type, payload) {
  const msg = { type, payload };
  return JSON.stringify(msg);
}

socket.addEventListener("open", () => {
  console.log("Connected to Server ✅");
});

socket.addEventListener("message", (message) => {
  // console.log("New message: ", message.data);
  console.log(message);
  const li = document.createElement("li");
  li.innerText = message.data;
  messageList.append(li);
});

socket.addEventListener("close", () => {
  console.log("Disconnected from Server 🚫");
});

function handleMessageSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(makeMessage("message", input.value));
  input.value = "";
}

function handleNameSubmit(event) {
  event.preventDefault();
  const input = nameForm.querySelector("input");
  socket.send(makeMessage("name", input.value));
}

messageForm.addEventListener("submit", handleMessageSubmit);
nameForm.addEventListener("submit", handleNameSubmit);
