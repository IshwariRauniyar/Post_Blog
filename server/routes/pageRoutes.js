var express = require("express");
var router = express.Router();
const Page = require("../models/page");
const upload = require("../middlewares/uploads");

router.get("/", async (req, res) => {
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
      .skip(offset * limit)
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
    res.status(200).json({
      success: true,
      message: "All pages are fetched.",
      pages,
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

router.get("/:id", async (req, res) => {
  Page.findById(req.params.id, (err, page) => {
    if (err) {
      res.send(err);
    }
    res.status(200).json({
      success: true,
      message: "Page fetched.",
      page,
    });
  });
});

router.post("/", upload.single("Image"),async (req, res) => {
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
      res.status(200).json({
        success: true,
        message: "Page created Successfully",
        result: {
          PageData,
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

router.put("/:id", upload.single("Image"), async (req, res) => {
    const user = req.decoded;
    // console.log("user", user);
    try {
      const PageData = await Page.findById(req.params.id);
      if (!PageData) {
        return res.status(404).json({
          success: false,
          message: "Page not found.",
        });
      }
      const updatedPage = await Page.findByIdAndUpdate(
        req.params.id,
        {
          Title: req.body.Title,
          Slug: req.body.Slug,
          SeoTitle: req.body.SeoTitle,
          SeoDescription: req.body.SeoDescription,
          Description: req.body.Description,
          IsActive: req.body.IsActive,
          Image: req.file?.destination + "/" + req.file?.filename,
          ModifiedBy: user?._id,
        },
        { new: true }
      );
      //   console.log("updatedPage", updatedPage);
      // const users = await User.findById(updatedPage?.ModifiedBy);
      return res.status(200).json({
        success: true,
        message: "Page updated Successfully",
        result: {
          updatedPage,
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

router.delete("/:id", async (req, res) => {
  try {
    const PageData = await Page.findById(req.params.id);
    if (!PageData) {
      return res.status(404).json({
        success: false,
        message: "Page not found.",
      });
    }
    res.status(200).json({
      success: true,
      message: "Page deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
