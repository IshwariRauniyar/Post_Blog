var express = require("express");
var router = express.Router();
const Setting = require("../models/setting");
const config = require("../config.json");

router.get("/", async (req, res) => {
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
    res.status(200).json({
      success: true,
      message: "All settings are fetched.",
      settings,
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
  const SettingData = await Setting.findById(req.params.id);
  if (!SettingData) {
    return res.status(404).json({
      success: false,
      message: "Setting not found.",
    });
  }
  Setting.findById(req.params.id, (err, setting) => {
    if (err) {
      res.send(err);
    }
    res.status(200).json({
      success: true,
      message: "Setting fetched.",
      setting,
    });
  });
});

router.post("/", async (req, res) => {
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
    res.status(200).json({
      success: true,
      message: "Setting created.",
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
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    // const menu = config.Menus;
    // const check = menu.includes(JSON.parse(req.body.Value));

    // console.log("check", check);
    const SettingData = await Setting.findById(req.params.id);
    if (!SettingData) {
      return res.status(404).json({
        success: false,
        message: "Setting not found.",
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
    res.status(200).json({
      success: true,
      message: "Setting updated.",
      result: Settings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.delete("/:id",  async (req, res) => {
  try {
    const SettingData = await Setting.findById(req.params.id);
    if (!SettingData) {
      return res.status(404).json({
        success: false,
        message: "Setting not found.",
      });
    }
    const Settings = await Setting.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Setting deleted.",
      code: 200,
      result: Settings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
