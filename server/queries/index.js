const { GraphQLObjectType, GraphQLList } = require("graphql");
const userQueries = require("./userQueries");
const postQueries = require("./postQueries");
const authQueries = require("./authQueries");

const query = new GraphQLObjectType({
  name: "Query",
  fields: {
    ...userQueries,
    ...postQueries,
    ...authQueries,
  },
});
// EXPORTS
module.exports = query;
