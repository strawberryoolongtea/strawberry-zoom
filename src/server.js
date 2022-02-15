import WebSocket from "ws";

const http = require("http");
const express = require("express");
const app = express();
const port = 3000;

const handleListen = () => {
  console.log("Welcome Strawberry Zoom Server at: ", __dirname);
};

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

// app.listen(port, handleListen);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const sockets = [];

wss.on("connection", (socket) => {
  sockets.push(socket);
  socket["name"] = "Anonymous";
  console.log("Connected to Browser ✅");
  socket.on("close", () => console.log("Disconnected from Browser 🚫"));
  socket.on("message", (msg) => {
    const message = JSON.parse(msg.toString());
    if (message.type === "message") {
      sockets.forEach((aSocket) =>
        aSocket.send(`${socket.name}: ${message.payload}`)
      );
    } else if (message.type === "name") {
      socket["name"] = message.payload;
    }
  });
});

server.listen(port, handleListen);
