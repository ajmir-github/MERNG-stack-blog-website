const { shield, allow, deny, chain, or, rule } = require("graphql-shield");
const {
  onlyAuthenticated,
  isAuthenticated,
  isAdmin,
  isOwnerOfUser,
  isOwnerOfPost,
  isOwnerOfComment,
  isRoot,
} = require("./rules");

const premissions = shield(
  {
    Query: {
      "*": allow,
    },
    Mutation: {
      // ---- USERS
      addUser: allow,
      updateUser: chain(onlyAuthenticated, or(isOwnerOfUser, isRoot)),
      deleteUser: chain(onlyAuthenticated, or(isOwnerOfUser, isRoot)),
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
      // ---- Premissions
      grantPermission: chain(onlyAuthenticated, isRoot),
    },
  },
  {
    fallbackRule: allow,
  }
);

module.exports = premissions;
