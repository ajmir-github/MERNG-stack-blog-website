const { GraphQLObjectType, GraphQLList } = require("graphql");
const { users, user } = require("./userQueries");
const { posts, post } = require("./postQueries");
const { signIn, signInWithToken } = require("./authQueries");

const query = new GraphQLObjectType({
  name: "Query",
  fields: {
    // USERS
    users,
    user,
    // POSTS
    posts,
    post,
    // AUTH
    signIn,
    signInWithToken,
  },
});
// EXPORTS
module.exports = query;
