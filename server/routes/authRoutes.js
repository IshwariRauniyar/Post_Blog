var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const HttpStatus = require("http-status-codes");

router.post("/register", async (req, res) => {
  try {
    const newPassword = await bcrypt.hash(req.body.Password, 10);
    const Users = await User.findOne({
      Email: req.body.Email,
    });
    if (Users?.Email === req.body.Email) {
      res.json({
        success: false,
        message: "Email already exists",
      });
    }
    const Data = await User.create({
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Email: req.body.Email,
      Password: newPassword,
      UserName: req.body.UserName,
    });
    return res.json({
      success: true,
      message: "User Registered Successfully.",
      code: HttpStatus.OK,
      result: Data,
      // ...(Data && { ...Data }),
    });
  } catch (e) {
    console.log(e);
    return res.json({
      success: false,
      message: "something went wrong.",
      code: HttpStatus.BAD_REQUEST,
      error: e,
    });
  }
});

router.post("/login", async (req, res, next) => {
  const Users = await User.findOne({
    Email: req.body.Email,
  });
  if (!Users) {
    // return next(Boom.unauthorized("User with this email not found"));
    return res.json({
      success: false,
      message: "User with this email not found",
      code: HttpStatus.BAD_REQUEST,
    });
  }
  const isPasswordValid = await bcrypt.compare(
    req.body.Password,
    Users.Password
  );

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        UserName: Users.UserName,
        Email: Users.Email,
      },
      "secret123"
    );
    return res.json({
      success: true,
      message: "User Logged in Successfully.",
      code: HttpStatus.OK,
      result: {
        user: Users,
        token: token,
      },
    });
  } else {
    return res.json({
      success: false,
      message: "Invalid Password.",
      code: HttpStatus.UNAUTHORIZED,
    });
  }
});

module.exports = router;
