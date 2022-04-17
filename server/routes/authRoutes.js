var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const RefreshToken = require("../models/refreshToken");
const Setting = require("../models/setting");
const HttpStatus = require("http-status-codes");
const authConfig = require("../config/auth.config");
const authMiddleware = require("../middlewares/authMiddleware");

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
    console.log("Data", Data);
    if (req.body.UserRole) {
      const Settings = await Setting.create({
        UserRole: req.body.UserRole,
        User: Data._id,
      });
    } else {
      const Settings = await Setting.create({
        UserRole: "user",
        User: Data._id,
      });
    }
    const UserRole = await Setting.findOne({
      User: Data._id,
    });
    console.log("UserRole", UserRole);
    return res.json({
      success: true,
      message: "User Registered Successfully.",
      code: HttpStatus.OK,
      result: { user: Data, role: UserRole.UserRole },
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
  const UserRole = await Setting.findOne({
    User: Users._id,
  });
  // .select("UserRole");

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
        _id: Users._id,
      },
      authConfig.secret,
      {
        expiresIn: authConfig.expiresIn,
      }
    );

    const refreshToken = await RefreshToken.createToken(Users);

    return res.json({
      success: true,
      message: "User Logged in Successfully.",
      code: HttpStatus.OK,
      result: {
        user: Users,
        token: token,
        role: UserRole.UserRole,
        refreshToken: refreshToken,
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

router.post("/refresh-token", async (req, res) => {
  const { refreshToken: requestToken } = req.body;

  if (requestToken == null) {
    return res.status(403).json({ message: "Refresh Token is required!" });
  }
  try {
    let refreshToken = await RefreshToken.findOne({ token: requestToken });

    if (!refreshToken) {
      res.status(403).json({ message: "Refresh token is not in database!" });
      return;
    }

    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.findByIdAndRemove(refreshToken._id, {
        useFindAndModify: false,
      }).exec();

      res.status(403).json({
        message: "Refresh token was expired. Please make a new signin request",
      });
      return;
    }

    const user = await User.findById(refreshToken.user);
    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
        code: HttpStatus.UNAUTHORIZED,
      });
    }
    const newToken = jwt.sign(
      {
        UserName: user.UserName,
        Email: user.Email,
      },
      authConfig.secret,
      {
        expiresIn: authConfig.expiresIn,
      }
    );
    const newRefreshToken = await RefreshToken.createToken(user);
    return res.json({
      success: true,
      message: "Refresh token generated successfully",
      code: HttpStatus.OK,
      result: {
        user: user,
        token: newToken,
        refreshToken: newRefreshToken,
      },
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

// router.delete("/logout", async (req, res) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1];
//     const refreshToken = req.headers.refreshtoken.split(" ")[1];
//     const decoded = jwt.verify(token, "secret123");
//     const decodedRefreshToken = jwt.verify(refreshToken, "secret123");
//     if (decoded.UserName === decodedRefreshToken.UserName) {
//       return res.json({
//         success: true,
//         message: "User Logged out Successfully.",
//         code: HttpStatus.OK,
//       });
//     } else {
//       return res.json({
//         success: false,
//         message: "Invalid Token.",
//         code: HttpStatus.UNAUTHORIZED,
//       });
//     }
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

module.exports = router;
