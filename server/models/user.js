const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");

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
    UserName: { type: String },
    Password: { type: String, required: true },
    UserRole: String,
    CreatedOn: { type: Date, default: Date.now },
    ModifiedOn: { type: Date, default: Date.now },
  },
  { collection: "User" }
);

UserSchema.pre("save", function (next) {
  this.Password = bcrypt.hashSync(this.Password, 10);
  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
