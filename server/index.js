const express = require("express");
const app = express();
require("./db");
const routes = require("./routes");
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));
app.get("/", (req, res, next) => {
  res.send("Hello World!");
  console.log("Welcome to homepage");
  next();
});

app.use(
  "/api",
  (req, res, next) => {
    next();
  },
  routes
);

app.listen(8848, () => {
  console.log("Server started on port 8848");
});
