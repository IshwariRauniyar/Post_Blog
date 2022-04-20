var express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
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

router.get("/:id", async (req, res) => {
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

router.post("/", async (req, res) => {
  //   const user = req.decoded;
  try {
    const menu = config.Menus;
    // const check = menu.some((m) => {
    //   if (m === req.body.Value) {
    //     req.body.Value = m;
    //     console.log("menu", req.body.Value);
    //     return true;
    //   }
    // });
    // console.log("check", check);
    console.log(req.body.Value);
    const Settings = await Setting.create({
      Title: req.body.Title,
      UniqueName: req.body.UniqueName,
      IsActive: req.body.IsActive,
      Value: req.body.Value,
    });
    console.log("Settings", Settings);
    res.json({
      success: true,
      message: "Setting created.",
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
