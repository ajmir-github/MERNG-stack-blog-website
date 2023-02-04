const express = require("express");
const { getPosts, getSinglePost } = require("../controllers/postController");
const {
  searchQueryParser,
  pageQueryParser,
  filterQueryParser,
  sortQueryParser,
} = require("../libs/fQuery");
const postQueries = require("../middlewares/postQueries");
const router = express.Router();

// GET SOME POSTS
router.get(
  "/",
  postQueries(["title", "description"], 8, { createdAt: -1 }),
  getPosts
);

// GET SINGLE POST
router.get("/:id", pageQueryParser(), getSinglePost);

module.exports = router;
