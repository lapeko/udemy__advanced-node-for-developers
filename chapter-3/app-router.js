const {Router} = require("express");
const authRouter = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const appRouter = Router();

appRouter.use("/auth", authRouter);
appRouter.use("/api/blogs", blogRoutes);
appRouter.use("/upload", uploadRoutes);

module.exports = appRouter;
