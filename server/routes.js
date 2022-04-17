const routes = require("express").Router();
const postRoutes = require("./routes/postRoutes");
const pageRoutes = require("./routes/pageRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const authRoutes = require("./routes/authRoutes");

routes.use("/post", postRoutes);
routes.use("/page", pageRoutes);
routes.use("/file", uploadRoutes);
routes.use("/auth", authRoutes);
module.exports = routes;
