const { shield, allow, deny, chain, or } = require("graphql-shield");
const {
  onlyAuthenticated,
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
      addUser: chain(onlyAuthenticated, isAdmin),
      updateUser: chain(onlyAuthenticated, or(isAdmin, isOwnerOfUser)),
      deleteUser: chain(onlyAuthenticated, or(isAdmin, isOwnerOfUser)),
      // ---- POSTS
      addPost: onlyAuthenticated,
      updatePost: chain(onlyAuthenticated, or(isAdmin, isOwnerOfPost)),
      deletePost: chain(onlyAuthenticated, or(isAdmin, isOwnerOfPost)),
      addComment: isAuthenticated,
      deleteComment: onlyAuthenticated,
    },
  },
  {
    fallbackRule: allow,
  }
);

module.exports = premissions;
