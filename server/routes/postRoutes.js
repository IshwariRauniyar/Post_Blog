var express = require("express");
var router = express.Router();
const Post = require("../models/post");
const Setting = require("../models/setting");
const HttpStatus = require("http-status-codes");

router.get("/", (req, res) => {
  Post.find({}, (err, posts) => {
    if (err) {
      res.send(err);
    }
    res.json(posts);
  });
});

router.get("/:id", (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) {
      res.send(err);
    }
    res.json(post);
  });
});

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const PostData = await Post.create({
      Title: req.body.Title,
      Slug: req.body.Slug,
      SeoTitle: req.body.SeoTitle,
      SeoDescription: req.body.SeoDescription,
      PostType: req.body.PostType,
      Image: req.body.Image,
      Description: req.body.descripton,
      Order: req.body.Order,
      IsActive: req.body.IsActive,
      Summary: req.body.Summary,
    });
    PostData.save();
    return res.status(HttpStatus.OK).json({
      success: true,
      message: "Post Created Successfully.",
      code: HttpStatus.OK,
      result: PostData,
    });
  } catch (err) {
    return res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: "Something went wrong while creating.",
      code: HttpStatus.BAD_REQUEST,
      error: err,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const PostData = await Post.findByIdAndUpdate(req.params.id, {
      Title: req.body.Title,
      Slug: req.body.Slug,
      SeoTitle: req.body.SeoTitle,
      SeoDescription: req.body.SeoDescription,
      PostType: req.body.PostType,
      Image: req.body.Image,
      Description: req.body.descripton,
      Order: req.body.Order,
      IsActive: req.body.IsActive,
      Summary: req.body.Summary,
    });
    PostData.save();
    return res.status(HttpStatus.OK).json({
      success: true,
      message: "Post Updated Successfully.",
      code: HttpStatus.OK,
      result: PostData,
    });
  } catch (err) {
    return res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: "Something went wrong while updating.",
      code: HttpStatus.BAD_REQUEST,
      error: err,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({
      status: "ok",
      message: "Post deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "something went wrong while deleting" });
  }
});

module.exports = router;
