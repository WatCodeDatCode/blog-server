const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");

// Get blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single blog
router.get("/:id", getBlog, (req, res) => {
  res.json(res.blog)
});

// Create blog
router.post("/", async (req, res) => {
  const blog = new Blog({
    title: req.body.title,
    city: req.body.city,
    country: req.body.country,
    author: req.body.author,
    author_img: req.body.author_img,
    blog_text: req.body.blog_text,
    date_visited: req.body.date_visited,
    place_img: req.body.place_img,
  });

  try {
    const newBlog = await blog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update blog
router.patch("/:id", getBlog, async (req, res) => {
    if (req.body.title != null) {
        res.blog.title = req.body.title
    }
    try {
        const updatedBlog = await res.blog.save()
        res.json(updatedBlog)
    } catch (err) {
        res.status(400).json({ message: err.message })

    }
});

// Delete blog
router.delete("/:id", getBlog, async (req, res) => {
    try {
        await res.blog.remove()
        res.json({ message: 'Blog entry deleted'})
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
});

async function getBlog(req, res, next) {
  let blog;
  try {
    blog = await Blog.findById(req.params.id);
    if (blog == null) {
      return res.status(404).json({ message: "No blog entry found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.blog = blog;
  next();
}

module.exports = router;
