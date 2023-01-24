const express = require("express");
const path = require("path");
const graphQLServer = require("./graphQLServer");
const storage = require("./storage");
const { handleError } = require("./utils/handleError");
const statusCodes = require("./utils/statusCodes");
const cors = require("cors");

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

  // GraphQL Server setup
  app.use("/graphql", graphQLServer);

  // Storage
  app.use("/images", storage);

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
