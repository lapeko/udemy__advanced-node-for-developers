const { Router } = require("express");

const requireLogin = require('../middlewares/requireLogin');
const cache = require("../middlewares/cache");
const Blog = require("../models/Blog");

const blogRouter = Router();

blogRouter.use(requireLogin);

blogRouter.route("/", cache)
  .get(async (req, res) => {
    const blogs = await Blog.find({ _user: req.user.id });

    res.send(blogs);
  })
  .post(async (req, res) => {
    const { title, content, image } = req.body;

    const blog = new Blog({
      title,
      content,
      _user: req.user.id
    });

    if (image) blog.image = image;

    try {
      await blog.save();
      res.send(blog);
    } catch (err) {
      res.send(400, err);
    }
  });

blogRouter.route("/:id", cache)
  .get(async (req, res) => {
    const blog = await Blog.findOne({
      _user: req.user.id,
      _id: req.params.id
    });

    res.send(blog);
  });

module.exports = blogRouter;
