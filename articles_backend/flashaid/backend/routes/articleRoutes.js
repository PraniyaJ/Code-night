// routes/articleRoutes.js
const express = require("express");
const router = express.Router();
const {
  createArticle,
  getArticles,
  getArticle,
  updateArticle,
  deleteArticle
} = require("../controllers/articleController");

// Routes
router.post("/", createArticle);      // Create article
router.get("/", getArticles);         // List all articles
router.get("/:id", getArticle);       // Get one article
router.put("/:id", updateArticle);    // Update
router.delete("/:id", deleteArticle); // Delete

module.exports = router;
