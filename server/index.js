const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./db");
const routes = require("./routes");
const cors = require("cors");
var fs = require("fs");
var path = require("path");

app.use(cors());
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use("uploads", express.static("uploads"));
app.use(express.static(__dirname));
app.get("/", (req, res, next) => {
  res.send("Hello World!");
  console.log("Welcome to homepage");
  next();
});

app.use(
  "/api",
  (req, _res, next) => {
    next();
  },
  routes
);

app.listen(8848, () => {
  console.log("Server started on port 8848");
});
