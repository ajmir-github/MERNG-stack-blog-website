const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLBoolean,
} = require("graphql");
const { Post } = require("../models");
const { CommentType } = require("../types/UtilTypes");

const addPost = {
  type: require("../types/PostType"),
  args: {
    userId: { type: GraphQLNonNull(GraphQLID) },
    title: { type: GraphQLNonNull(GraphQLString) },
    body: { type: GraphQLNonNull(GraphQLString) },
    category: { type: GraphQLNonNull(GraphQLString) },
    keywords: { type: GraphQLList(GraphQLString) },
    description: { type: GraphQLString },
    thumbnail: { type: GraphQLString },
    published: { type: GraphQLBoolean, defaultValue: false },
  },
  resolve(parent, args) {
    const post = new Post(args);
    return post.save();
  },
};
const updatePost = {
  type: require("../types/PostType"),
  args: {
    postId: { type: GraphQLNonNull(GraphQLID) },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    category: { type: GraphQLString },
    keywords: { type: GraphQLList(GraphQLString) },
    description: { type: GraphQLString },
    thumbnail: { type: GraphQLString },
    published: { type: GraphQLBoolean },
  },
  resolve(parent, { postId, ...args }) {
    // *** fs:delete the prevuois thumbnail
    return Post.findByIdAndUpdate(postId, args, { new: true });
  },
};
const deletePost = {
  type: GraphQLString,
  args: {
    postId: { type: GraphQLNonNull(GraphQLID) },
  },
  // *** fs:delete the thumbnail
  resolve(parent, { postId }) {
    return Post.findByIdAndDelete(postId);
  },
};

// EXPORTS
module.exports = {
  addPost,
  updatePost,
  deletePost,
};
