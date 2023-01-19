const { handleError } = require("../utils/handleError");
const statusCodes = require("../utils/statusCodes");
const { uploader, storageFolder } = require("../utils/imageUploader");
const fs = require("fs/promises");
const path = require("path");
const multer = require("multer");
const { optimizeImage } = require("../utils/optimizeImage");
// Uploaders
const singleFileUploader = uploader.single("image");
const multiFileUploader = uploader.array("images");

// upload a sinlge image
exports.upload = async (req, res) => {
  try {
    // Run if a image filed is provided
    await new Promise((resolve, reject) =>
      singleFileUploader(req, res, (err) => {
        // error
        if (err)
          reject({
            message: err.message,
            cause: err.cause,
            status: statusCodes.BAD_REQUEST,
          });
        // success
        resolve();
      })
    );
    // If empty file input provided throw error
    if (!req.file)
      throw {
        status: statusCodes.BAD_REQUEST,
        message: "Please provide a file to be uploaded!",
      };
    // done
    res.send({
      message: "Image uploaded!",
      file: {
        fileName: req.file.filename,
        originalName: req.file.originalname,
      },
    });
    // optimize the image
    optimizeImage(req.file.path, req.query);
  } catch (error) {
    handleError(res, error);
  }
};
// upload multi images
exports.uploadMany = async (req, res) => {
  try {
    // promisify
    await new Promise((resolve, reject) =>
      multiFileUploader(req, res, (err) => {
        // error
        if (err)
          reject({
            message: err.message,
            cause: err.cause,
            status: statusCodes.BAD_REQUEST,
          });
        // success
        resolve();
      })
    );
    // If empty file input provided throw error
    if (!req.files)
      throw {
        status: statusCodes.BAD_REQUEST,
        message: "Please provide a file to be uploaded!",
      };
    // done
    res.send({
      message: "Images uploaded!",
      files: req.files.map((file) => {
        return { fileName: file.filename, originalName: file.originalname };
      }),
    });
    // optimize the image
    req.files.forEach((file) => {
      optimizeImage(file.path, req.query);
    });
  } catch (error) {
    handleError(res, error);
  }
};

exports.destroyFile = async (req, res) => {
  try {
    const { fileName } = req.params;
    const filePath = path.join(storageFolder, fileName);
    await fs.rm(filePath);
    res.send({ message: "Image deleted!" });
  } catch (error) {
    handleError(res, {
      status: statusCodes.NOT_FOUND,
      message: "There is no file in the storage by the give name!",
    });
  }
};
