// imports
const express = require("express");
// Middlewares
const { upload, uploadMany, destroyFile } = require("./imageStorage");
// Vars
const router = express.Router();

// Upload an image
router.post("/upload", upload);
router.post("/upload-many", uploadMany);

// Destroy an image
router.delete("/:fileName", destroyFile);

module.exports = router;
