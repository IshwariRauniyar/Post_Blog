var express = require("express");
var router = express.Router();
const Setting = require("../models/setting");
const config = require("../config.json");
const { verifyToken, access } = require("../middlewares/authMiddleware");

router.get("/", verifyToken, access("role"), async (req, res) => {
  const { limit = 10, offset = 0 } = req.query;
  const query = {};
  try {
    if (req.query.search) {
      query.$or = [
        { Title: { $regex: req.query.search, $options: "i" } },
        { Type: { $regex: req.query.search, $options: "i" } },
      ];
    }
    const settings = await Setting.find(query)
      .skip(offset * 10)
      .limit(limit)
      .sort({ $natural: -1 })
      .then((r) => {
        return r;
      })
      .catch((e) => {
        return [];
      });
    const total = await Setting.find(query).countDocuments();
    const totalPages = Math.ceil(total / limit);
    const currentPage = parseInt(offset) + 1;
    res.json({
      success: true,
      message: "All settings are fetched.",
      code: 200,
      settings,
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

router.get("/:id", verifyToken, access("role"), async (req, res) => {
  const SettingData = await Setting.findById(req.params.id);
  if (!SettingData) {
    return res.json({
      success: false,
      message: "Setting not found.",
      code: 404,
    });
  }
  Setting.findById(req.params.id, (err, setting) => {
    if (err) {
      res.send(err);
    }
    res.json({
      success: true,
      message: "Setting fetched.",
      code: 200,
      setting,
    });
  });
});

router.post("/", verifyToken, access("role"), async (req, res) => {
  try {
    // const menu = config.Menus;
    // console.log("m", menu);
    // const newValue = JSON.stringify(menu);
    // console.log("newValue", newValue);
    // const val = JSON.parse(newValue);
    // console.log("val", val);
    // const data = JSON.stringify(req.body.Value);
    // console.log(JSON.parse(data));
    // const check = newValue.forEach((element) => {
    //   if (element === JSON.parse(data)) {
    //     console.log("true");
    //   }
    // });
    // console.log("check", check);

    // if (check === true) {
    const Settings = await Setting.create({
      Title: req.body.Title,
      UniqueName: req.body.UniqueName,
      IsActive: req.body.IsActive,
      Value: req.body.Value,
    });
    res.json({
      success: true,
      message: "Setting created.",
      code: 200,
      result: Settings,
    });
    // } else {
    //   res.json({
    //     success: false,
    //     message: "Value is not valid.",
    //     code: 500,
    //   });
    // }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
      code: 500,
    });
  }
});

router.put("/:id", verifyToken, access("role"), async (req, res) => {
  try {
    // const menu = config.Menus;
    // const check = menu.includes(JSON.parse(req.body.Value));

    // console.log("check", check);
    const SettingData = await Setting.findById(req.params.id);
    if (!SettingData) {
      return res.json({
        success: false,
        message: "Setting not found.",
        code: 404,
      });
    }

    const Settings = await Setting.findByIdAndUpdate(
      req.params.id,
      {
        Title: req.body?.Title,
        UniqueName: req.body?.UniqueName,
        IsActive: req.body?.IsActive,
        Value: req.body?.Value,
      },
      { new: true }
    );
    res.json({
      success: true,
      message: "Setting updated.",
      code: 200,
      result: Settings,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
      code: 500,
    });
  }
});

router.delete("/:id", verifyToken, access("role"), async (req, res) => {
  try {
    const SettingData = await Setting.findById(req.params.id);
    if (!SettingData) {
      return res.json({
        success: false,
        message: "Setting not found.",
        code: 404,
      });
    }
    const Settings = await Setting.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: "Setting deleted.",
      code: 200,
      result: Settings,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
      code: 500,
    });
  }
});

module.exports = router;
