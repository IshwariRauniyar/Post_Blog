const mongoose = require("mongoose");
const { Schema } = mongoose;
var URLSlug = require("mongoose-slug-generator");

mongoose.plugin(URLSlug);

const PostSchema = new Schema(
  {
    Title: { type: String, required: true },
    Slug: { type: String, unique: true },
    SeoTitle: { type: String, required: true },
    SeoDescription: {
      type: String,
    },
    PostType: {
      type: String,
      required: true,
      enum: ["post"],
      default: "post",
    },
    Image: { type: String },
    Description: { type: String },
    Order: { type: Number, default: 0 },
    IsActive: { type: Boolean, default: false },
    Summary: { type: String },
    PublishedAfter: { type: Date },
    CreatedOn: { type: Date, default: Date.now },
    CreatedBy: { type: Schema.Types.ObjectId, ref: "User" },
    ModifiedOn: { type: Date, default: Date.now },
    ModifiedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { collection: "Post" }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
