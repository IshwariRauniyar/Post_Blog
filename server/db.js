const mongoose = require("mongoose");

const db = process.env.MONGODB_URL; // "mongodb://localhost:27017/POST";

mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
