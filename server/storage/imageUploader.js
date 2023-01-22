const multer = require("multer");
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");
//
const publicFolder = path.join(process.cwd(), "public");
const storageFolder = path.join(publicFolder, "images");
const allowedMimetypes = [
  "image/jpeg",
  "image/png",
  // "image/gif",
  // "image/bmp",
  // "image/webp",
];

// This is beacause github delete empty dirs
(() => {
  // Make sure that the storage folder exists
  fs.stat(storageFolder, (err, stats) => {
    if (!err) return;
    // if not created
    fs.mkdir(storageFolder, (err) => {
      if (err) throw err;
    });
  });
})();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, storageFolder),
  filename: (req, file, cb) =>
    cb(null, uuid.v4() + path.extname(file.originalname)),
});

function fileFilter(req, file, cb) {
  // if allowed type
  if (allowedMimetypes.includes(file.mimetype)) return cb(null, true);
  // if not allowed
  cb(
    new Error("This file extension cannot be processed!", {
      cause: {
        allowedMimetypes,
        fileName: file.originalname,
        mimetype: file.mimetype,
      },
    })
  );
}
const uploader = multer({ storage, fileFilter });
// Exports
module.exports.publicFolder = publicFolder;
module.exports.storageFolder = storageFolder;
module.exports.uploader = uploader;
