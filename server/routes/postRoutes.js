var express = require("express");
var router = express.Router();
const Post = require("../models/post");
const HttpStatus = require("http-status-codes");
const upload = require("../middlewares/uploads");

router.get("/", async (req, res) => {
  const { limit = 10, offset = 0 } = req.query;
  const query = {};
  try {
    if (req.query.search) {
      query.$or = [
        { Title: { $regex: req.query.search, $options: "i" } },
        { SeoTitle: { $regex: req.query.search, $options: "i" } },
        { Slug: { $regex: req.query.search, $options: "i" } },
      ];
    }
    const posts = await Post.find(query)
      .skip(offset * limit)
      .limit(limit * 1)
      // .sort({ CreatedOn: -1 })
      .exec();
    const total = await Post.find(query).countDocuments();
    const totalPages = Math.ceil(total / limit);
    const currentPage = parseInt(offset) + 1;
    // Math.ceil(total % offset) > 0 ? Math.ceil(total % offset) : 1;
    res.status(HttpStatus.OK).json({
      success: true,
      message: "All posts are fetched.",
      code: HttpStatus.OK,
      posts,
      total,
      totalPages,
      currentPage,
    });
  } catch (error) {
    res.send(error);
  }
});

router.get("/:id", (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) {
      res.send(err);
    }
    // res.json(post);
    return res.status(HttpStatus.OK).json({
      success: true,
      message: "Post is fetched.",
      code: HttpStatus.OK,
      post,
      // ...(post && { ...post }),
    });
  });
});

router.post("/", upload.single("Image"), async (req, res) => {
  const obj = JSON.parse(JSON.stringify(req.body));
  console.log("bodydata", obj);
  console.log("img", req.file);
  try {
    const PostData = await Post.create({
      Title: req.body.Title,
      Slug: req.body.Slug,
      SeoTitle: req.body.SeoTitle,
      SeoDescription: req.body.SeoDescription,
      PostType: req.body.PostType,
      Image: req.file?.path,
      Description: req.body.Description,
      Order: req.body.Order,
      IsActive: req.body.IsActive,
      Summary: req.body.Summary,
    });
    // PostData.save();
    console.log("success", PostData);
    return res.status(HttpStatus.OK).json({
      success: true,
      message: "Post Created Successfully.",
      code: HttpStatus.OK,
      result: PostData,
    });
  } catch (err) {
    console.log(err);
    return res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: "Something went wrong while creating.",
      code: HttpStatus.BAD_REQUEST,
      error: err,
    });
  }
});

router.put("/:id", upload.single("Image"), async (req, res) => {
  try {
    const PostData = await Post.findByIdAndUpdate(
      req.params.id,
      {
        Title: req.body.Title,
        Slug: req.body.Slug,
        SeoTitle: req.body.SeoTitle,
        SeoDescription: req.body.SeoDescription,
        PostType: req.body.PostType,
        Image: req.file?.path,
        Description: req.body.descripton,
        Order: req.body.Order,
        IsActive: req.body.IsActive,
        Summary: req.body.Summary,
      },
      { new: true }
    );
    console.log("editsuccess", PostData);
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
    return res.status(HttpStatus.OK).json({
      success: true,
      message: "Post Deleted Successfully.",
      code: HttpStatus.OK,
    });
  } catch (err) {
    console.log(err);
    return res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: "Something went wrong while deleting.",
      code: HttpStatus.BAD_REQUEST,
      error: err,
    });
  }
});

module.exports = router;
