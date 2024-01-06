const { Router } = require("express");

const requireLogin = require('../middlewares/requireLogin');
const Blog = require("../models/Blog");

const blogRouter = Router();

blogRouter.use(requireLogin);

blogRouter.route("/")
  .get(async (req, res) => {
    const blogs = await Blog.find({ _user: req.user.id });

    res.send(blogs);
  })
  .post(async (req, res) => {
    const { title, content } = req.body;

    const blog = new Blog({
      title,
      content,
      _user: req.user.id
    });

    try {
      await blog.save();
      res.send(blog);
    } catch (err) {
      res.send(400, err);
    }
  });

blogRouter.route("/:id")
  .get(async (req, res) => {
    const blog = await Blog.findOne({
      _user: req.user.id,
      _id: req.params.id
    });

    res.send(blog);
  });

module.exports = blogRouter;
