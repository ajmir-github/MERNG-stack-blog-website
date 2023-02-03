const express = require("express");
const path = require("path");
const { handleError } = require("./utils/handleError");
const statusCodes = require("./utils/statusCodes");
const cors = require("cors");
// Routers
const userRouter = require("./routers/userRouter");
const postRouter = require("./routers/PostRouter");

// Main function
function createApp() {
  const app = express();
  // Express server setup
  app.use(express.static(path.join(__dirname, "public")));
  app.use(express.json()); // req.body
  app.use(express.urlencoded({ extended: false })); // req.body from a form

  // CORs
  app.use(
    cors({
      origin: "*",
      methods: "*",
    })
  );

  // Routers
  app.use("/users", userRouter);
  app.use("/posts", postRouter);

  // NOT_FOUND URL
  app.use("*", (req, res) =>
    handleError(res, {
      message: "Url not found!",
      status: statusCodes.NOT_FOUND,
    })
  );

  // END
  return app;
}

module.exports = createApp;
