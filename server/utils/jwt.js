const jwt = require("jsonwebtoken");
const statusCodes = require("./statusCodes");
// Sign secure token for auth
const signJWT = (data) =>
  new Promise((resolve, reject) => {
    try {
      if (typeof data !== "string")
        throw new Error("JWT only accepts string data as its parameter!");
      const token = jwt.sign({ data }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
      resolve(token);
    } catch ({ status, message }) {
      reject({ status, message });
    }
  });

// verfy token for auth
const verfyJWT = (token) =>
  new Promise((resolve, reject) => {
    try {
      const { data } = jwt.verify(token, process.env.JWT_SECRET);
      resolve(data);
    } catch ({ name }) {
      return reject({
        status: statusCodes.NOT_AUTHORIZED,
        message:
          name === "TokenExpiredError"
            ? "Your access token is expired. Please log in again!"
            : "Invalid credentials was provided!",
      });
    }
  });

module.exports = {
  signJWT,
  verfyJWT,
};
