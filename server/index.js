const express = require("express");
const app = express();
require("./db");
const routes = require("./routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const PORT = process.env.HOST_PORT || 3000;
const HOST = process.env.HOST_URL || "localhost";

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(express.static(__dirname));

app.use(cookieParser());
app.get("/", (req, res, next) => {
  res.send("Hello World!");
  console.log("Welcome to homepage");
  next();
});

app.use("/api", (req, res, next) => {
  // console.log("req.cookies", req.cookies.token);
  next();
}, routes);

app.listen(PORT, HOST, () => {
  console.log(`Server is running at http://${HOST}:${PORT}`);
});
