const routes = require("express").Router();
const postRoutes = require("./routes/postRoutes");

routes.use("/post", postRoutes);
module.exports = routes;
