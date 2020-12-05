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
  res.json(res.blog);
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
    location: {
      lat: req.body.lat,
      lng: req.body.lng,
    },
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
    res.blog.title = req.body.title;
  }
  if (req.body.city != null) {
    res.blog.city = req.body.city;
  }
  if (req.body.country != null) {
    res.blog.country = req.body.country;
  }
  if (req.body.author != null) {
    res.blog.author = req.body.author_img;
  }
  if (req.body.author_img != null) {
    res.blog.author_img = req.body.author_img;
  }
  if (req.body.blog_text != null) {
    res.blog.blog_text = req.body.blog_text;
  }
  if (req.body.date_visited != null) {
    res.blog.date_visited = req.body.date_visited;
  }
  if (req.body.place_img != null) {
    res.blog.place_img = req.body.place_img;
  }
  if (req.body.lat != null) {
    res.blog.location.lat = req.body.lat;
  }
  if (req.body.lng != null) {
    res.blog.location.lng = req.body.lng;
  }
  try {
    const updatedBlog = await res.blog.save();
    res.json(updatedBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete blog
router.delete("/:id", getBlog, async (req, res) => {
  try {
    await res.blog.remove();
    res.json({ message: "Blog entry deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
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
