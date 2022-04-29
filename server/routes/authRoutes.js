var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const authConfig = require("../config/auth.config");

// router.post("/register", async (req, res) => {
//   try {
//     const newPassword = await bcrypt.hash(req.body.Password, 10);
//     const Users = await User.findOne({
//       Email: req.body.Email,
//     });
//     if (Users?.Email === req.body.Email) {
//       res.json({
//         success: false,
//         message: "Email already exists",
//       });
//     }
//     const Data = await User.create({
//       FirstName: req.body.FirstName,
//       LastName: req.body.LastName,
//       Email: req.body.Email,
//       Password: newPassword,
//     });
//     if (req.body.UserRole) {
//       const Settings = await Setting.create({
//         UserRole: req.body.UserRole,
//         User: Data._id,
//       });
//     } else {
//       const Settings = await Setting.create({
//         UserRole: "user",
//         User: Data._id,
//       });
//     }
//     const UserRole = await Setting.findOne({
//       User: Data._id,
//     });
//     console.log("UserRole", UserRole);
//     return res.json({
//       success: true,
//       message: "User Registered Successfully.",
//       code: HttpStatus.OK,
//       result: { user: Data, role: UserRole.UserRole },
//       // ...(Data && { ...Data }),
//     });
//   } catch (e) {
//     console.log(e);
//     return res.json({
//       success: false,
//       message: "something went wrong.",
//       code: HttpStatus.BAD_REQUEST,
//       error: e,
//     });
//   }
// });


router.post("/login", async (req, res, next) => {
  try {
    const Users = await User.findOne({
      Email: req.body.Email,
    });
    if (!Users) {
      return res.status(404).json({
        success: false,
        message: "User with this email not found",
      });
    }
    // const isPasswordValid = await bcrypt.compare(
    //   req.body.Password,
    //   Users.Password
    // );
    const isPasswordValid = req.body.Password === Users.Password;

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

      // res.setHeader("Set-Cookie", cookie.serialize("token", token, {
      //   httpOnly: true,
      //   // maxAge: 60 * 60 * 24 * 7,
      //   path: "/",
      // }));

      res.cookie("token", token, {
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
      // return res.setHeader("Set-Cookie", [
      //   `token=${token}; HttpOnly; Max-Age=${authConfig.expiresIn}`,
      // ]).json({
      return res.json({
        success: true,
        message: "User Logged in Successfully.",
        result: {
          user: {
            UserName: Users.UserName,
            // Email: Users.Email,
            UserRole: Users.UserRole,
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
    res.clearCookie("token");
    // res.setHeader("Set-Cookie", cookie.serialize("token", "", {
    //   httpOnly: true,
    //   // maxAge: new Date(0),
    //   path: "/",
    // }));
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
