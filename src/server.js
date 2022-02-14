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

app.listen(port, handleListen);
