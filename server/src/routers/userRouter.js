const express = require("express");
const { getUsers, getSingleUser } = require("../controllers/userController");
const {
  searchQueryParser,
  pageQueryParser,
  filterQueryParser,
  sortQueryParser,
} = require("../libs/fQuery");
const router = express.Router();

// GET SOME USERS
router.get(
  "/",
  searchQueryParser(["name"]),
  filterQueryParser(),
  pageQueryParser(),
  sortQueryParser({ createdAt: -1 }),
  getUsers
);

// GET SINGLE USER
router.get(
  "/:id",
  searchQueryParser(["title", "description"]),
  filterQueryParser(),
  pageQueryParser(),
  sortQueryParser({ createdAt: -1 }),
  getSingleUser
);

module.exports = router;
