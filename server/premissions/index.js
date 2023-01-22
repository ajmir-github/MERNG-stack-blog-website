const { shield, allow, deny, chain, or, rule } = require("graphql-shield");
const {
  onlyAuthenticated,
  isAuthenticated,
  isAdmin,
  isOwnerOfUser,
  isOwnerOfPost,
  isOwnerOfComment,
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
      updateUser: chain(onlyAuthenticated, or(isOwnerOfUser, isAdmin)),
      deleteUser: chain(onlyAuthenticated, or(isOwnerOfUser, isAdmin)),
      // ---- POSTS
      addPost: onlyAuthenticated,
      updatePost: chain(onlyAuthenticated, or(isOwnerOfPost, isAdmin)),
      deletePost: chain(onlyAuthenticated, or(isOwnerOfPost, isAdmin)),
      // ---- COMMENTS
      addComment: isAuthenticated,
      deleteComment: chain(
        onlyAuthenticated,
        or(isOwnerOfComment, isOwnerOfPost, isAdmin)
      ),
    },
  },
  {
    fallbackRule: allow,
  }
);

module.exports = premissions;
