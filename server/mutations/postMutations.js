const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLBoolean,
} = require("graphql");
const { Post, Comment } = require("../models");
const { deleteImage } = require("./utils");

const addPost = {
  type: require("../types/PostType"),
  args: {
    title: { type: GraphQLNonNull(GraphQLString) },
    body: { type: GraphQLNonNull(GraphQLString) },
    category: { type: GraphQLNonNull(GraphQLString) },
    keywords: { type: GraphQLList(GraphQLString) },
    description: { type: GraphQLString },
    thumbnail: { type: GraphQLString },
    published: { type: GraphQLBoolean, defaultValue: false },
  },
  resolve(parent, args, { user }) {
    const post = new Post({ ...args, userId: user._id });
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
  async resolve(parent, { postId, ...args }) {
    const post = new Post.findById(postId);
    if (args.thumbnail && post.thumbnail) await deleteImage(post.thumbnail);
    return Post.findByIdAndUpdate(postId, args, { new: true });
  },
};
const deletePost = {
  type: GraphQLString,
  args: {
    postId: { type: GraphQLNonNull(GraphQLID) },
  },
  async resolve(parent, { postId }) {
    const post = await Post.findById(postId);
    if (!post) new Error("There is no post with the given id.");
    await post.delete();
    // thumbnail deletetion
    if (post.thumbnail) await deleteImage(post.thumbnail);
    // pack the comments
    const comments = await Comment.find({ postId: post._id });
    for (const comment of comments) {
      await Comment.findByIdAndDelete(comment._id);
    }
    // DONE
    return "The post was deleted!";
  },
};

// EXPORTS
module.exports = {
  addPost,
  updatePost,
  deletePost,
};
