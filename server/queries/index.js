const { GraphQLObjectType, GraphQLList } = require("graphql");
const { users, user } = require("./userQueries");
const { posts, post } = require("./postQueries");

const RootQuery = new GraphQLObjectType({
  name: "Query",
  fields: {
    // USERS
    users,
    user,
    // POSTS
    posts,
    post,
  },
});
// EXPORTS
module.exports = RootQuery;
