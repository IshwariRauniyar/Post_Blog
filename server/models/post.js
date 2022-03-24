const mongoose = require("mongoose");
const { Schema } = mongoose;
var URLSlug = require("mongoose-slug-generator");

mongoose.plugin(URLSlug);

const PostSchema = new Schema(
  {
    Title: { type: String, required: true },
    Slug: { type: String, slug: "title", lowercase: true, unique: true },
    SeoTitle: { type: String, required: true },
    SeoDescription: { type: String },
    PostType: {
      type: String,
      required: true,
      enum: [
        "post",
        "page",
        "product",
        "category",
        "tag",
        "blog",
        "author",
        "archive",
        "search",
        "home",
        "other",
      ],
      default: "post",
    },
    Image: { type: String },
    // Image: {
    //   data: Buffer,
    //   contentType: String,
    // },
    Description: { type: String },
    Order: { type: Number, default: 0 },
    IsActive: { type: Boolean, default: true },
    Summary: { type: String },
    PublishedAfter: { type: Date },
    CreatedOn: { type: Date, default: Date.now },
    // CreatedBy: { type: Schema.ObjectId, ref: "User" },
    ModifiedOn: { type: Date, default: Date.now },
    // ModifiedBy: { type: Schema.ObjectId, ref: "User" },
  },
  { collection: "Post" }
);

PostSchema.pre("save", function (next) {
  this.Slug = this.Title.split(" ")
    .join("-")
    .replace(/[^a-zA-Z0-9]+/g, "");
  next();
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
