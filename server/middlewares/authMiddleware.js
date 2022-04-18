const jwt = require("jsonwebtoken");
const HttpStatus = require("http-status-codes");
const config = require("../config/auth.config");
const User = require("../models/user");
const RefreshToken = require("../models/refreshToken");

const { TokenExpiredError } = jwt;
// console.log("tok", TokenExpiredError());
const catchError = (err, req, res, next) => {
  if (err instanceof TokenExpiredError) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized! Token expired",
      code: HttpStatus.UNAUTHORIZED,
    });
  }
  return res.status(500).json({
    success: false,
    message: "Something went wrong",
    code: HttpStatus.INTERNAL_SERVER_ERROR,
  });
};

const verifyToken = (req, res, next) => {
  // const user = RefreshToken.findOne({
  //   token: req.headers.authorization,
  // });
  // console.log("user", user.schema.obj.user);
  const token = req.headers.authorization?.split(" ")[1];
  //   const token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized! Token not found",
      code: HttpStatus.UNAUTHORIZED,
    });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized! Token is not valid",
        code: HttpStatus.UNAUTHORIZED,
      });
    }
    req.decoded = decoded;
    console.log("decoded", req.decoded);
    next();
  });
  return req.decoded;
  // jwt.verify(token, config.secret, (err, decoded) => {
  //   if (err) {
  //     return catchError(err, req, res, next);
  //   }
  //   // req.decoded = decoded;
  //   req.userId = decoded.id;
  //   console.log("decoded", req.userId);
  //   next();
  // });
};

// const verifyRefreshToken = (req, res, next) => {
//   const refreshToken = req.headers["x-refresh-token"];
//   if (!refreshToken) {
//     return catchError(err, req, res, next);
//   }
//   jwt.verify(refreshToken, config.refreshSecret, (err, decoded) => {
//     if (err) {
//       return catchError(err, req, res, next);
//     }
//     // req.decoded = decoded;
//     req.userId = decoded.id;
//     next();
//   });
// };

const authMiddleware = {
  catchError,
  verifyToken,
  // getUserFromToken,
  //   verifyRefreshToken,
};

module.exports = authMiddleware;
