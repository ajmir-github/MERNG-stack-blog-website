const { graphqlHTTP } = require("express-graphql");
const { GraphQLSchema } = require("graphql");
const query = require("./queries");
const mutation = require("./mutations");
const { applyMiddleware } = require("graphql-middleware");
const premissions = require("./premissions");

const schema = new GraphQLSchema({
  query,
  mutation,
});

const schemaWithPremissons = applyMiddleware(schema, premissions);

// Setup GraphQL server
module.exports = graphqlHTTP({
  // schema: schemaWithPremissons,
  schema,
  graphiql: process.env.NODE_ENV === "development" && {
    // defaultQuery: true,
    headerEditorEnabled: true,
  },
});
