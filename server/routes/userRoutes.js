var express = require("express");
var router = express.Router();
const User = require("../models/user");

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
    res.status(200).json({
      success: true,
      message: "All users are fetched.",
      users,
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

router.get("/:id", (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      res.send(err);
    }
    return res.status(200).json({
      success: true,
      message: "User is fetched.",
      user,
    });
  });
});

router.post("/", async (req, res) => {
  const { FirstName, LastName, Email, Password, UserName, UserRole } = req.body;
  try {
    const Users = await User.findOne({
      Email: req.body.Email,
    });
    if (Users?.Email === req.body.Email) {
      res.json({
        success: false,
        message: "Email already exists",
      });
    }
    const user = await User.create({ FirstName, LastName, Email, Password, UserName, UserRole });
    return res.status(200).json({
      success: true,
      message: "User is created.",
      result: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  const { FirstName, LastName, Email, UserName, UserRole } = req.body;
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      const UpdatedUser = await User.findByIdAndUpdate(req.params.id, {
        FirstName, LastName, Email, UserName, UserRole,
      },
        { new: true });
      return res.status(200).json({
        success: true,
        message: "User is updated.",
        result: UpdatedUser,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await User.findByIdAndDelete(req.params.id);
      return res.status(200).json({
        success: true,
        message: "User is deleted.",
        user,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


module.exports = router;
