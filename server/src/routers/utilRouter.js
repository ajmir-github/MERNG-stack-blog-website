const express = require("express");
const { Stats } = require("../models");

const router = express.Router();

router.get("/stats", (req, res) => {
  const categoriesLimit = +req.query.categoriesLimit || 16;
  const keywordsLimit = +req.query.keywordsLimit || 32;
  res.json(Stats.get(categoriesLimit, keywordsLimit));
});

module.exports = router;
