const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const User = require("../models/user");

const { TokenExpiredError } = jwt;

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
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized! Token not found",
      code: HttpStatus.UNAUTHORIZED,
    });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return catchError(err, req, res, next);
    }
    // req.decoded = decoded;
    req.userId = decoded.id;
    next();
  });
};

const verifyRefreshToken = (req, res, next) => {
  const refreshToken = req.headers["x-refresh-token"];
  if (!refreshToken) {
    return catchError(err, req, res, next);
  }
  jwt.verify(refreshToken, config.refreshSecret, (err, decoded) => {
    if (err) {
      return catchError(err, req, res, next);
    }
    // req.decoded = decoded;
    req.userId = decoded.id;
    next();
  });
};

const authMiddleware = {
  verifyToken,
  verifyRefreshToken,
};

module.exports = authMiddleware;
