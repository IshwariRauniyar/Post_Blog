var express = require("express");
var router = express.Router();
const User = require("../models/user");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", async (req, res, next) => {
  const { limit = 10, offset = 0 } = req.query;
  const query = {};
  try {
    if (req.query.search) {
      query.$or = [
        { FirstName: { $regex: req.query.search, $options: "i" } },
        { LastName: { $regex: req.query.search, $options: "i" } },
        { Email: { $regex: req.query.search, $options: "i" } },
      ];
    }
    const users = await User.find(query)
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
    const total = await User.find(query).countDocuments();
    const totalPages = Math.ceil(total / limit);
    const currentPage = parseInt(offset) + 1;
    res.json({
      success: true,
      message: "All users are fetched.",
      code: 200,
      users,
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

module.exports = router;
