const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLBoolean,
} = require("graphql");
const { Post } = require("../models");

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
    _id: { type: GraphQLNonNull(GraphQLID) },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    category: { type: GraphQLString },
    keywords: { type: GraphQLList(GraphQLString) },
    description: { type: GraphQLString },
    thumbnail: { type: GraphQLString },
    published: { type: GraphQLBoolean },
  },
  resolve(parent, { _id, ...args }) {
    return Post.findByIdAndUpdate(_id, args, { new: true });
  },
};
const deletePost = {};

// EXPORTS
module.exports = {
  addPost,
  updatePost,
  deletePost,
};
