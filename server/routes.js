const routes = require("express").Router();
const postRoutes = require("./routes/postRoutes");
const pageRoutes = require("./routes/pageRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const authRoutes = require("./routes/authRoutes");
const settingRoutes = require("./routes/settingRoutes");
const userRoutes = require("./routes/userRoutes");
const { verifyToken, access } = require("./middlewares/authMiddleware");

routes.use("/post", verifyToken, access("post"), postRoutes);
routes.use("/page", verifyToken, access("page"), pageRoutes);
routes.use("/file", uploadRoutes);
routes.use("/auth", authRoutes);
routes.use("/setting", verifyToken, access("role"), settingRoutes);
routes.use("/user", verifyToken, access("user"), userRoutes);
module.exports = routes;
