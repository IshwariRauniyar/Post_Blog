var express = require("express");
var router = express.Router();
const Post = require("../models/post");
const upload = require("../middlewares/uploads");
const { verifyToken, access } = require("../middlewares/authMiddleware");
const User = require("../models/user");

router.get("/", verifyToken, access("post"), async (req, res) => {
  const { limit = 10, offset = 0 } = req.query;
  const query = {};
  try {
    if (req.query.search) {
      query.$or = [
        { Title: { $regex: req.query.search, $options: "i" } },
        { SeoTitle: { $regex: req.query.search, $options: "i" } },
      ];
    }
    const posts = await Post.find(query)
      .skip(offset * 10)
      .limit(limit)
      .sort({ $natural: -1 })
      .then((r) => {
        return r;
      })
      .catch((e) => {
        console.log(e);
        return [];
      });
    const total = await Post.find(query).countDocuments();
    const totalPages = Math.ceil(total / limit);
    const currentPage = parseInt(offset) + 1;
    // Math.ceil(total % offset) > 0 ? Math.ceil(total % offset) : 1;
    res.status(200).json({
      success: true,
      message: "All posts are fetched.",
      posts,
      total,
      totalPages,
      currentPage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/:id", verifyToken, access("post"), (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) {
      res.send(err);
    }
    // res.json(post);
    return res.status(200).json({
      success: true,
      message: "Post is fetched.",
      post,
      // ...(post && { ...post }),
    });
  });
});

router.post(
  "/",
  verifyToken,
  access("post"),
  upload.single("Image"),
  async (req, res) => {
    // const obj = JSON.parse(JSON.stringify(req.body));
    // console.log("bodydata", obj);
    // console.log("img", req.file);
    const user = req.decoded;
    try {
      const PostData = await Post.create({
        Title: req.body.Title,
        Slug: req.body.Slug,
        SeoTitle: req.body.SeoTitle,
        SeoDescription: req.body.SeoDescription,
        PostType: req.body.PostType,
        Image: req.file?.destination + "/" + req.file?.filename,
        Description: req.body.Description,
        Order: req.body.Order,
        IsActive: req.body.IsActive,
        Summary: req.body.Summary,
        CreatedBy: user._id,
      });
      // PostData.save();
      // const users = await User.findById(PostData?.CreatedBy);
      return res.status(200).json({
        success: true,
        message: "Post Created Successfully.",
        result: {
          PostData,
        },
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Something went wrong while creating.",
        error: err,
      });
    }
  }
);

router.put(
  "/:id",
  verifyToken,
  access("post"),
  upload.single("Image"),
  async (req, res) => {
    const user = req.decoded;
    try {
      const PostData = await Post.findById(req.params.id);
      if (!PostData) {
        return res.status(404).json({
          success: false,
          message: "Post not found.",
        });
      }
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        {
          Title: req.body.Title,
          Slug: req.body.Slug,
          SeoTitle: req.body.SeoTitle,
          SeoDescription: req.body.SeoDescription,
          PostType: req.body.PostType,
          Image: req.file?.destination + "/" + req.file?.filename,
          Description: req.body.Description,
          Order: req.body.Order,
          IsActive: req.body.IsActive,
          Summary: req.body.Summary,
          ModifiedBy: user?._id,
        },
        { new: true }
      );
      return res.status(200).json({
        success: true,
        message: "Post Updated Successfully.",
        result: {
          updatedPost,
        },
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong while updating.",
        error: err,
      });
    }
  }
);

router.delete("/:id", verifyToken, access("post"), async (req, res) => {
  try {
    const PostData = await Post.findById(req.params.id);
    if (!PostData) {
      return res.status(404).json({
        success: false,
        message: "Post not found.",
      });
    }
    // const deletedPost = await Post.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Post Deleted Successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while deleting.",
      error: err,
    });
  }
});

module.exports = router;
