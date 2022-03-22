var fn = require("fn");
module.exports = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch((error) => next(error));
