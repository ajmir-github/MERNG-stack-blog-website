const { GraphQLObjectType } = require("graphql");
const { addUser, updateUser, deleteUser } = require("./userMutations");
const { addPost, updatePost, deletePost } = require("./postMutations");
const { addComment, deleteComment } = require("./commentMutation");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // ---- USERS
    addUser,
    updateUser,
    deleteUser,
    // ---- POSTS
    addPost,
    updatePost,
    deletePost,
    // ---- POST COMMENTS
    addComment,
    deleteComment,
  },
});

module.exports = mutation;
