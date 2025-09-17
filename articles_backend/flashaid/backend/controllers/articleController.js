// controllers/articleController.js
const Article = require("../models/Article");

// Create new article
exports.createArticle = async (req, res) => {
  try {
    const { title, body, tags } = req.body;
    const article = await Article.create({ title, body, tags });
    res.status(201).json(article);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all articles
exports.getArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single article
exports.getArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "Not found" });
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update article
exports.updateArticle = async (req, res) => {
  try {
    const { title, body, tags } = req.body;
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      { title, body, tags },
      { new: true }
    );
    if (!article) return res.status(404).json({ message: "Not found" });
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete article
exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Article deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
