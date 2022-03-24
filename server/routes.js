const routes = require("express").Router();
const postRoutes = require("./routes/postRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

routes.use("/post", postRoutes);
routes.use("/file", uploadRoutes);
module.exports = routes;
