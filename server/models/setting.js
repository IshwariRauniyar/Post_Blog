const mongoose = require("mongoose");
const { Schema } = mongoose;
const config = require("../config.json");

const SettingSchema = new Schema(
  {
    Title: { type: String, required: true },
    UniqueName: { type: String, required: true, unique: true },
    Type: { type: String, default: "role" },
    Value: { type: String },
    IsActive: { type: Boolean, default: true },
    CreatedOn: { type: Date, default: Date.now },
    ModifiedOn: { type: Date, default: Date.now },
  },
  { collection: "Setting" },
  { timestamps: true }
);

const Setting = mongoose.model("Setting", SettingSchema);

module.exports = Setting;
