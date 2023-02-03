const bcrypt = require("bcryptjs");

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

// hash using bcryptjs and handle unexpected errors
exports.hashPassword = (password) =>
  new Promise(async (resolve, reject) => {
    try {
      const hash = await bcrypt.hash(password, salt);
      resolve(hash);
    } catch (err) {
      reject({ message: "bcryptjs has failed to hash the password." });
    }
  });

// match the password using bcryptjs and handle unexpected errors
exports.matchPassword = (password, hashPassword) =>
  new Promise(async (resolve, reject) => {
    try {
      const matched = await bcrypt.compare(password, hashPassword);
      resolve(matched);
    } catch (err) {
      reject({
        message: "bcryptjs has failed to match the password with the hash.",
      });
    }
  });
