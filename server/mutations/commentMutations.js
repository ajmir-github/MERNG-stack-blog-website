const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLBoolean,
} = require("graphql");
const { Post, Comment } = require("../models");
const { CommentType } = require("../types/UtilTypes");

const addComment = {
  type: CommentType,
  args: {
    postId: { type: GraphQLNonNull(GraphQLID) },
    body: { type: GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLID },
    email: { type: GraphQLID },
  },
  async resolve(parent, { postId, body, name, email }, { user }) {
    let comment = { body, postId };
    if (user) {
      // internalAuthor
      comment.internalAuthor = user._id;
    } else {
      // externalAuthor
      if (!name || !email) throw "Please defined your name and email.";
      comment.externalAuthor = {
        name,
        email,
      };
    }
    // Create
    return (await Comment.create(comment)).populate({
      path: "internalAuthor",
      select: "_id name profile",
    });
  },
};
const deleteComment = {
  type: CommentType,
  args: {
    postId: { type: GraphQLNonNull(GraphQLID) },
    commentId: { type: GraphQLNonNull(GraphQLID) },
  },
  async resolve(parent, { commentId }) {
    return Comment.findByIdAndDelete(commentId);
  },
};

module.exports = {
  addComment,
  deleteComment,
};
