var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Setting = require("../models/setting");
const authConfig = require("../config/auth.config");

router.post("/login", async (req, res, next) => {
  try {
    const Users = await User.findOne({
      Email: req.body.Email,
    });
    const Role = await Setting.findOne({
      UniqueName: Users?.UserRole
    });
    if (!Users) {
      return res.status(404).json({
        success: false,
        message: "User with this email not found",
      });
    }
    const isPasswordValid = await bcrypt.compare(req.body.Password, Users.Password);

    if (isPasswordValid) {
      const token = jwt.sign(
        {
          UserName: Users.UserName,
          Email: Users.Email,
          _id: Users._id,
          UserRole: Users.UserRole,
        },
        authConfig.secret,
        {
          expiresIn: authConfig.expiresIn,
        }
      );

      res.cookie("SID", token, {
        httpOnly: true,
      });

      const refreshToken = jwt.sign(
        {
          UserName: Users.UserName,
          Email: Users.Email,
          _id: Users._id,
          UserRole: Users.UserRole,
        },
        authConfig.refreshSecret,
        {
          expiresIn: authConfig.refreshExpiresIn,
        }
      );
      return res.json({
        success: true,
        message: "User Logged in Successfully.",
        result: {
          user: {
            UserName: Users.UserName,
            // Email: Users.Email,
            UserRole: Users.UserRole,
            role: Role.Value,
          },
          token: token,
          refreshToken: refreshToken,
        },
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid Password.",
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "something went wrong.",
      error: e,
    });
  }
});

router.post("/logout", async (req, res, next) => {
  try {
    res.clearCookie("SID");
    return res.status(200).json({
      success: true,
      message: "User Logged out Successfully.",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "something went wrong.",
      error: e,
    });
  }
});

module.exports = router;
