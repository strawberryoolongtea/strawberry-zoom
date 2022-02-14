const socket = new WebSocket(`ws://${window.location.host}`);

const ul = document.querySelector("ul");
const form = document.querySelector("form");

console.log(ul, form);

socket.addEventListener("open", () => {
  console.log("Connected to Server ✅");
});

socket.addEventListener("message", (message) => {
  console.log("New message: ", message.data);
  ul.innerHTML = message.data;
});

socket.addEventListener("close", () => {
  console.log("Disconnected from Server 🚫");
});

setTimeout(() => {
  socket.send("Hello from the browser 🍒🍒🍒");
}, 5000);
