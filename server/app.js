const express = require("express");
const path = require("path");
const graphQLServer = require("./graphQLServer");

function createApp() {
  const app = express();
  // Express server setup
  app.use(express.static(path.join(__dirname, "public")));
  app.use(express.json()); // req.body
  app.use(express.urlencoded({ extended: false })); // req.body from a form
  // GraphQL Server setup
  app.use("/graphql", graphQLServer);

  // END
  return app;
}

module.exports = createApp;
