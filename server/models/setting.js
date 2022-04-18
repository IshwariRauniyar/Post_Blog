const mongoose = require("mongoose");
const { Schema } = mongoose;

const SettingSchema = new Schema(
  {
    User: { type: Schema.Types.ObjectId, ref: "User" },
    Status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    // PostType: {
    //   type: String,
    //   required: true,
    //   enum: [
    //     "post",
    //     "page",
    //     "product",
    //     "category",
    //     "tag",
    //     "author",
    //     "archive",
    //     "search",
    //     "home",
    //     "404",
    //     "other",
    //   ],
    // },
    // UserType: { type: String, enum: ["new", "old"], default: "new" },
    UserRole: {
      type: String,
      required: true,
      enum: ["superAdmin", "admin", "user"],
      default: "user",
    },
  },
  { collection: "Setting" },
  { timestamps: true }
);

const Setting = mongoose.model("Setting", SettingSchema);

module.exports = Setting;
