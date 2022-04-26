const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const User = require("../models/user");
const Setting = require("../models/setting");

const { TokenExpiredError } = jwt;
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
    message: "Unauthorized! Token not valid",
    code: 401,
  });
};

const verifyToken = (req, res, next) => {
  // const token = req.headers.authorization?.split(" ")[1];
  const token = req.session.token;
  console.log("token", token);
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
    console.log("decoded", req.decoded);
    next();
  });
  return req.decoded;
};

const { RefreshTokenExpiredError } = jwt;
const catchRefreshTokenError = (err, req, res, next) => {
  if (err instanceof RefreshTokenExpiredError) {
    return res.json({
      success: false,
      message: "Unauthorized! Refresh token expired",
      code: 401,
    });
  }
  return res.json({
    success: false,
    message: "Unauthorized! Refresh token not valid",
    code: 401,
  });
};

const verifyRefreshToken = async (req, res, next) => {
  // const refreshToken = req.headers["x-refresh-token"];
  const refreshToken = req.session.refreshToken;
  console.log("refreshToken", refreshToken);
  if (!refreshToken) {
    return res.json({
      success: false,
      message: "Unauthorized! Token not found",
      code: 401,
    });
  }
  jwt.verify(refreshToken, config.refreshSecret, (err, decoded) => {
    if (err) {
      return catchRefreshTokenError(err, req, res, next);
    }
    req.decoded = decoded;
    next();
  });
  return req.decoded;
};

function access(data) {
  return async (req, res, next) => {
    const user = req.decoded;
    const userRole = await Setting.findOne({ UniqueName: user?.UserRole });
    if (!userRole.Value.includes(data)) {
      return res.json({
        success: false,
        message: "Unauthorized! You don't have access to this page.",
        code: 401,
      });
    }
    next();
  };
}

const authMiddleware = {
  catchError,
  catchRefreshTokenError,
  verifyToken,
  verifyRefreshToken,
  access,
};

module.exports = authMiddleware;
