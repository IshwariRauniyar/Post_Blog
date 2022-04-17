const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    FirstName: { type: String, required: true },
    LastName: { type: String },
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
    UserRole: { type: Schema.Types.ObjectId, ref: "Setting" },
    Token: { type: String },
    CreatedOn: { type: Date, default: Date.now },
    ModifiedOn: { type: Date, default: Date.now },
  },
  { collection: "User" }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
