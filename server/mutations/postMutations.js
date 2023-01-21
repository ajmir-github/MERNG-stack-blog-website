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
const updatePost = {};
const deletePost = {};

// EXPORTS
module.exports = {
  addPost,
  updatePost,
  deletePost,
};
