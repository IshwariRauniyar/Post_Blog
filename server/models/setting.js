const mongoose = require("mongoose");
const { Schema } = mongoose;
const config = require("../config.json");
// const menu = config.Menus;
// console.log("menu", menu);

const SettingSchema = new Schema(
  {
    Title: { type: String, required: true },
    UniqueName: { type: String, required: true, unique: true },
    Type: { type: String, default: "role" },
    Value: { type: String },
    //  enum: menu },
    IsActive: { type: Boolean, default: true },
    CreatedOn: { type: Date, default: Date.now },
    ModifiedOn: { type: Date, default: Date.now },
  },
  { collection: "Setting" },
  { timestamps: true }
);

const Setting = mongoose.model("Setting", SettingSchema);

module.exports = Setting;
