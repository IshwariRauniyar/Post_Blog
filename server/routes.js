const routes = require("express").Router();
const postRoutes = require("./routes/postRoutes");
const pageRoutes = require("./routes/pageRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const authRoutes = require("./routes/authRoutes");
const settingRoutes = require("./routes/settingRoutes");
const userRoutes = require("./routes/userRoutes");

routes.use("/post", postRoutes);
routes.use("/page", pageRoutes);
routes.use("/file", uploadRoutes);
routes.use("/auth", authRoutes);
routes.use("/setting", settingRoutes);
routes.use("/user", userRoutes);
module.exports = routes;
