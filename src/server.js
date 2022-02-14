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

wss.on("connection", (socket) => {
  console.log("Connected to Browser ✅");
  socket.on("close", () => console.log("Disconnected from Browser 🚫"));
  socket.on("message", (message) =>
    console.log(Buffer.from(message, "base64").toString("utf-8"))
  );
  socket.send("Hello from server 🍓🍓🍓");
});

server.listen(port, handleListen);
