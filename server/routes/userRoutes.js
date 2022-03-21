var express = require("express");
var router = express.Router();
const userController = require("../controllers/user");
const catchException = require("../middlewares/catchException");

/**
 * GET /api/user
 */
router.get("/", catchException(userController.fetchAll));

/**
 * GET /api/user/:id
 */
router.get("/:id", catchException(userController.fetchById));

/**
 * POST /api/user
 */
router.post("/", catchException(userController.create));

/**
 * PUT /api/user/:id
 */
router.put("/:id", catchException(userController.update));

/**
 * DELETE /api/user/:id
 */
router.delete("/:id", catchException(userController.deleteuser));

module.exports = router;
