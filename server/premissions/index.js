const { shield, allow, deny, chain, or } = require("graphql-shield");
const {
  isAuthenticated,
  isAdmin,
  isOwnerOfUser,
  isOwnerOfPost,
} = require("./rules");

const premissions = shield(
  {
    Query: {
      "*": allow,
    },
    Mutation: {
      // "*": deny,
      // ---- USERS
      addUser: chain(isAuthenticated, isAdmin),
      updateUser: chain(isAuthenticated, or(isAdmin, isOwnerOfUser)),
      deleteUser: chain(isAuthenticated, or(isAdmin, isOwnerOfUser)),
      // ---- POSTS
      addPost: chain(isAuthenticated),
      updatePost: chain(isAuthenticated, or(isAdmin, isOwnerOfPost)),
      deletePost: chain(isAuthenticated, or(isAdmin, isOwnerOfPost)),
    },
  },
  {
    fallbackRule: allow,
  }
);

module.exports = premissions;
