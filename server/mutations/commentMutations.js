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
  type: GraphQLList(CommentType),
  args: {
    postId: { type: GraphQLNonNull(GraphQLID) },
    body: { type: GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLID },
    email: { type: GraphQLID },
  },
  async resolve(parent, { postId, body, name, email }, { user }) {
    try {
      let comment = { body };
      if (user) {
        comment.author = {
          userId: user._id.toString(),
        };
      } else {
        if (!name || !email) throw "Please provide name and email!";
        comment.author = {
          name,
          email,
        };
      }
      // DONE
      return Comment.create(postId, comment);
    } catch (error) {
      return new Error(error);
    }
  },
};
const deleteComment = {
  type: GraphQLString,
  args: {
    postId: { type: GraphQLNonNull(GraphQLID) },
    commentId: { type: GraphQLNonNull(GraphQLID) },
  },
  async resolve(parent, { postId, commentId }, { user }) {
    try {
      const post = await Post.findById(postId).populate({
        path: "comments.author.userId",
        select: "name email profile _id",
      });
      if (!post) throw "There is no user with the given id!";

      // Get the comment
      const comment = post.comments.id(commentId);
      if (!comment) throw "There is no comment with the given id!";

      const userId = user._id.toString();
      const postAuthorId = post.userId.toString();
      const commentAuthorId =
        comment.author.userId && comment.author.userId._id.toString();
      // if post owner or comment owner
      if (!(postAuthorId === userId || commentAuthorId === userId))
        return new Error("You are not allowd to delete this comment!");
      // DONE
      await comment.remove();
      await post.save();
      return "Comment deleted!";
    } catch (error) {
      return new Error(error);
    }
  },
};

module.exports = {
  addComment,
  deleteComment,
};