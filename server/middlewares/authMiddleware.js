const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const User = require("../models/user");
const Setting = require("../models/setting");

const { TokenExpiredError } = jwt;
// console.log("tok", TokenExpiredError());
const catchError = (err, req, res, next) => {
  if (err instanceof TokenExpiredError) {
    return res.json({
      success: false,
      message: "Unauthorized! Token expired",
      code: 401,
    });
  }
  return res.json({
    success: false,
    message: "Something went wrong",
    code: 500,
  });
};

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  //   const token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase
  if (!token) {
    return res.json({
      success: false,
      message: "Unauthorized! Token not found",
      code: 401,
    });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return catchError(err, req, res, next);
    }
    req.decoded = decoded;
    // console.log("decoded", req.decoded);
    next();
  });
  return req.decoded;
};

const verifyRefreshToken = async (req, res, next) => {
  const refreshToken = req.headers["x-refresh-token"];
  if (!refreshToken) {
    return res.json({
      success: false,
      message: "Unauthorized! Token not found",
      code: 401,
    });
  }
  jwt.verify(refreshToken, config.refreshSecret, (err, decoded) => {
    if (err) {
      return catchError(err, req, res, next);
    }
    req.decoded = decoded;
    next();
  });
  return req.decoded;
};

// async function role(v, req) {
//   const user = req.decoded;
//   console.log("user", user);
//   const userRole = await Setting.findOne(
//     { UniqueName: user.UserRole },
//     { Value: 1, _id: 0 } // [Value]
//   );
//   console.log("userRole", userRole);
//   console.log("userRoleValue", userRole.Value);
//   if (userRole.Value.includes(v)) {
//     return true;
//   }
//   return false;
// }

const role = async (req, res, next, v) => {
  const user = req.decoded;
  console.log("user", user);
  const userRole = await Setting.findOne(
    { UniqueName: user.UserRole },
    { Value: 1, _id: 0 } // [Value]
  );
  console.log("userRole", userRole);
  console.log("userRoleValue", userRole.Value);
  const check = userRole.Value.includes("user");
  console.log("check", check);
  const check1 = userRole.Value.includes("page");
  const check2 = userRole.Value.includes("user");
  const check3 = userRole.Value.includes("role");
  if (check || check1 || check2 || check3 === true) {
    return next();
  } else {
    return res.json({
      success: false,
      message: "Unauthorized! You don't have permission to access this page",
      code: 401,
    });
  }

  // if (check === true) {
  //   next();
  // } else {
  //   return res.json({
  //     success: false,
  //     message: "Unauthorized! You are not allowed to access this route",
  //     code: 401,
  //   });
  // }
  // if (check1 === true) {
  //   next();
  // } else {
  //   return res.json({
  //     success: false,
  //     message: "Unauthorized! You are not allowed to access this route",
  //     code: 401,
  //   });
  // }

  // const menu = userRole.value.array.forEach(element => {

  // });

  // if (roles.UserRole === "superAdmin" || roles.UserRole === "user") {
  //   next();
  // } else {
  //   return res.status(401).json({
  //     success: false,
  //     message: "Unauthorized! You are not authorized to perform this action",
  //     code: 401,
  //   });
  // }
};

const authMiddleware = {
  catchError,
  verifyToken,
  verifyRefreshToken,
  role,
};

module.exports = authMiddleware;
