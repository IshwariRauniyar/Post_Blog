const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostSchema = new Schema(
  {
    Title: { type: String, required: true },
    Slug: { type: String, required: true },
    SeoTitle: { type: String, required: true },
    SeoDescription: { type: String, required: true },
    Type: { type: String.ObjectId, ref: "Setting", required: true },
    Image: { type: String },
    Description: { type: String },
    Order: { type: Number, default: 0 },
    IsActive: { type: Boolean, default: true },
    Summary: { type: String },
    PublishedAfter: { type: Date },
    CreatedOn: { type: Date, default: Date.now },
    CreatedBy: { type: Schema.ObjectId, ref: "User" },
    ModifiedOn: { type: Date, default: Date.now },
    ModifiedBy: { type: Schema.ObjectId, ref: "User" },
  },
  { collection: "Post" }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
