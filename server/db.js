const mongoose = require("mongoose");
require("./env");

const db = process.env.MONGODB_URL; // "mongodb://localhost:27017/TestCMS";

module.exports = mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
