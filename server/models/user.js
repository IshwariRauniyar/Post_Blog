const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    FullName: { type: String, required: true },
    Email: {
      type: String,
      required: true,
      unique: true,
      match: [/\S+@\S+\.\S+/, "provided email is invalid"],
      index: true,
    },
    Password: { type: String, required: true },
    Image: String,
    UserName: {
      type: String,
      required: true,
    },
  },
  { collection: "User" },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
