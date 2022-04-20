var express = require("express");
var router = express.Router();
const Page = require("../models/page");
const upload = require("../middlewares/uploads");
const {
  verifyRefreshToken,
  verifyToken,
  access,
} = require("../middlewares/authMiddleware");
const User = require("../models/user");
const Setting = require("../models/setting");

router.get("/", verifyToken, access("page"), async (req, res) => {
  const { limit = 10, offset = 0 } = req.query;
  const query = {};
  try {
    if (req.query.search) {
      query.$or = [
        { Title: { $regex: req.query.search, $options: "i" } },
        { SeoTitle: { $regex: req.query.search, $options: "i" } },
      ];
    }
    const pages = await Page.find(query)
      .skip(offset * 10)
      .limit(limit)
      .sort({ $natural: -1 })
      .then((r) => {
        return r;
      })
      .catch((e) => {
        return [];
      });
    const total = await Page.find(query).countDocuments();
    const totalPages = Math.ceil(total / limit);
    const currentPage = parseInt(offset) + 1;
    res.json({
      success: true,
      message: "All pages are fetched.",
      code: 200,
      pages,
      total,
      totalPages,
      currentPage,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
      code: 500,
    });
  }
});

router.get("/:id", verifyToken, access("page"), async (req, res) => {
  Page.findById(req.params.id, (err, page) => {
    if (err) {
      res.send(err);
    }
    res.json({
      success: true,
      message: "Page fetched.",
      code: 200,
      page,
    });
  });
});

router.post(
  "/",
  verifyToken,
  access("page"),
  upload.single("Image"),
  async (req, res) => {
    const user = req.decoded;
    try {
      const PageData = await Page.create({
        Title: req.body.Title,
        Slug: req.body.Slug,
        SeoTitle: req.body.SeoTitle,
        SeoDescription: req.body.SeoDescription,
        Description: req.body.Description,
        IsActive: req.body.IsActive,
        Image: req.file?.destination + "/" + req.file?.filename,
        CreatedBy: user._id,
      });
      console.log("PageDts", PageData);
      //   const users = await User.find({
      //     _id: { $in: PageData.CreatedBy },
      //   });

      const users = await User.findById(PageData.CreatedBy);
      //   console.log("dsjfjd", users);
      const role = await Setting.findOne({
        User: users._id,
      });
      //   console.log("role", role);
      res.json({
        success: true,
        message: "Page created Successfully",
        code: 200,
        result: {
          PageData,
          user: {
            _id: users._id,
            Email: users.Email,
            UserName: users.UserName,
            FirstName: users.FirstName,
            LastName: users.LastName,
            UserRole: role.UserRole,
          },
        },
      });
    } catch (error) {
      return res.json({
        success: false,
        message: error.message,
        code: 500,
      });
    }
  }
);

router.put(
  "/:id",
  verifyToken,
  access("page"),
  upload.single("Image"),
  async (req, res) => {
    const user = req.decoded;
    // console.log("user", user);
    try {
      const PageData = await Page.findById(req.params.id);
      if (!PageData) {
        return res.json({
          success: false,
          message: "Page not found.",
          code: 404,
        });
      }
      const updatedPage = await Page.findByIdAndUpdate(
        req.params.id,
        {
          Title: req.body.Title,
          Slug: req.body.Slug,
          SeoTitle: req.body.SeoTitle,
          SeoDescription: req.body.SeoDescription,
          // PostType: req.body.PostType,
          Description: req.body.Description,
          IsActive: req.body.IsActive,
          Image: req.file?.destination + "/" + req.file?.filename,
          ModifiedBy: user?._id,
        },
        { new: true }
      );
      //   console.log("updatedPage", updatedPage);
      const users = await User.findById(updatedPage.ModifiedBy);
      const role = await Setting.findOne({
        User: users._id,
      });
      return res.json({
        success: true,
        message: "Page updated Successfully",
        code: 200,
        result: {
          updatedPage,
          user: {
            _id: users._id,
            Email: users.Email,
            UserName: users.UserName,
            FirstName: users.FirstName,
            LastName: users.LastName,
            UserRole: role.UserRole,
          },
        },
      });
    } catch (error) {
      return res.json({
        success: false,
        message: error.message,
        code: 500,
      });
    }
  }
);

router.delete("/:id", verifyToken, access("page"), async (req, res) => {
  try {
    const PageData = await Page.findById(req.params.id);
    if (!PageData) {
      return res.json({
        success: false,
        message: "Page not found.",
        code: 404,
      });
    }
    const deletedPage = await Page.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: "Page deleted Successfully",
      code: 200,
      PageData: deletedPage,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
      code: 500,
    });
  }
});

module.exports = router;
