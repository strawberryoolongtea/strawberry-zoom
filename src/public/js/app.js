const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;

let roomname = "";

function addMessage(message) {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message;
  ul.appendChild(li);
}

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  roomname = input.value;

  function handleMessageSubmit(event) {
    event.preventDefault();
    const input = room.querySelector("#message input");
    socket.emit("new_message", input.value, roomname, () => {
      addMessage(`You: ${input.value}`);
      input.value = "";
    });
  }

  function handleNicknameSubmit(event) {
    event.preventDefault();
    const input = room.querySelector("#name input");
    socket.emit("nickname", input.value);
  }

  function showRoom() {
    welcome.hidden = true;
    room.hidden = false;
    const h3 = room.querySelector("h3");
    h3.innerText = `Room ${roomname}`;
    const nicknameForm = room.querySelector("form#name");
    const messageForm = room.querySelector("form#message");
    nicknameForm.addEventListener("submit", handleNicknameSubmit);
    messageForm.addEventListener("submit", handleMessageSubmit);
  }
  socket.emit("enter_room", input.value, showRoom);
  input.value = "";
}
form.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", (user) => {
  addMessage(`${user} joined!`);
});

socket.on("bye", (user) => {
  addMessage(`${user} leaved!`);
});

socket.on("new_message", addMessage);
