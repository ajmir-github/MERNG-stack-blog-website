const express = require("express");
const { getPosts, getSinglePost } = require("../controllers/postController");
const {
  searchQueryParser,
  pageQueryParser,
  filterQueryParser,
  sortQueryParser,
} = require("../libs/fQuery");
const router = express.Router();

// GET SOME POSTS
router.get(
  "/",
  searchQueryParser(["title", "description"]),
  filterQueryParser(),
  pageQueryParser(),
  sortQueryParser({ createdAt: -1 }),
  getPosts
);

// GET SINGLE POST
router.get("/:id", pageQueryParser(), getSinglePost);

module.exports = router;
