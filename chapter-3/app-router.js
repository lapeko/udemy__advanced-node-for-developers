const {Router} = require("express");
const authRouter = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");

const appRouter = Router();

appRouter.use("/auth", authRouter);
appRouter.use("/api/blogs", blogRoutes);

module.exports = appRouter;
