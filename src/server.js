// import WebSocket from "ws";
import SocketIO from "socket.io";
import http from "http";
import express from "express";

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
// const wss = new WebSocket.Server({ server });
const io = SocketIO(server);

io.on("connection", (socket) => {
  socket["nickname"] = `guest-${socket.id}`;
  socket.onAny((event) => console.log(event));
  socket.on("enter_room", (roomname, done) => {
    socket.join(roomname);
    done();
    socket.to(roomname).emit("welcome", socket.nickname);
  });
  socket.on("disconnecting", () => {
    socket.rooms.forEach((room) =>
      socket.to(room).emit("bye", socket.nickname)
    );
    console.log(socket.id);
  });
  socket.on("new_message", (message, room, done) => {
    socket.to(room).emit("new_message", `${socket.nickname}: ${message}`);
    done();
  });
  socket.on("nickname", (nickname) => (socket["nickname"] = nickname));
});

// const sockets = [];

// wss.on("connection", (socket) => {
//   sockets.push(socket);
//   socket["name"] = "Anonymous";
//   console.log("Connected to Browser ✅");
//   socket.on("close", () => console.log("Disconnected from Browser 🚫"));
//   socket.on("message", (msg) => {
//     const message = JSON.parse(msg.toString());
//     if (message.type === "message") {
//       sockets.forEach((aSocket) =>
//         aSocket.send(`${socket.name}: ${message.payload}`)
//       );
//     } else if (message.type === "name") {
//       socket["name"] = message.payload;
//     }
//   });
// });

server.listen(port, handleListen);
