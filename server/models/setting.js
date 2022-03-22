const mongoose = require("mongoose");
const { Schema } = mongoose;

const SettingSchema = new Schema(
  {
    Status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    PostType: {
      type: String,
      required: true,
      enum: [
        "post",
        "page",
        "product",
        "category",
        "tag",
        "author",
        "archive",
        "search",
        "home",
        "404",
        "other",
      ],
      default: "post",
    },
    UserType: { type: String, enum: ["new", "old"], default: "new" },
    UserRole: {
      type: String,
      enum: ["superAdmin", "admin", "user"],
      default: "user",
    },
    CreatedOn: { type: Date, default: Date.now },
    // CreatedBy: { type: Schema.ObjectId, ref: "User" },
    ModifiedOn: { type: Date, default: Date.now },
    // ModifiedBy: { type: Schema.ObjectId, ref: "User" },
    IsActive: { type: Boolean, default: true },
  },
  { collection: "Setting" },
  { timestamps: true }
);

const Setting = mongoose.model("Setting", SettingSchema);

module.exports = Setting;
