const express = require("express");
const app = express();
require("./db");
const routes = require("./routes");
const cors = require("cors");
const cookie = require("cookie");
const cookieParser = require("cookie-parser");
// const jwt = require("jsonwebtoken");

const PORT = process.env.HOST_PORT || 3000;
const HOST = process.env.HOST_URL || "localhost";

app.set("port", PORT);
app.set("host", HOST);

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(express.static(__dirname));

app.use(cookieParser());
app.get("/", (req, res, next) => {
  res.send("Hello World!");
  console.log("Welcome to homepage");
  next();
});

app.use("/api", (req, res, next) => {
  console.log("req.cookies", req.cookies.token);
  next();
}, routes);

app.listen(app.get("port"), app.get("host"), () => {
  console.log(`Server is running at http://${app.get("host")}:${app.get("port")}`);
});
