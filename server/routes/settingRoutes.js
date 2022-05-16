var express = require("express");
var router = express.Router();
const Setting = require("../models/setting");
const config = require("../config.json");
const { verifyToken, access } = require("../middlewares/authMiddleware");

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

router.get("/:id", verifyToken, access("role"), async (req, res) => {
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

router.post("/", verifyToken, access("role"), async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.put("/:id", verifyToken, access("role"), async (req, res) => {
  try {
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

router.delete("/:id", verifyToken, access("role"), async (req, res) => {
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
