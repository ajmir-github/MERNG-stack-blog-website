const { graphqlHTTP } = require("express-graphql");
const { GraphQLSchema } = require("graphql");
const RootQuery = require("./queries");
const mutation = require("./mutations");

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation,
});

// Setup GraphQL server
module.exports = graphqlHTTP({
  schema,
  graphiql: process.env.NODE_ENV === "development" && {
    // defaultQuery: true,
    headerEditorEnabled: true,
  },
});
