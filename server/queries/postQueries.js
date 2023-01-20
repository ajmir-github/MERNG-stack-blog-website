const { GraphQLList, GraphQLID, GraphQLNonNull } = require("graphql");
const { User, Post } = require("../models");
const { PostType } = require("../types");
const { PageInputType, PublishedInputType } = require("./InputTypes");

const postPopulate = [
  {
    path: "userId",
  },
  { path: "comments.author.userId", select: "name email profile _id" },
];

// GET A LIST OF POSTS
const posts = {
  type: GraphQLList(PostType),
  args: {
    page: { type: PageInputType, defaultValue: { limit: 8, skip: 0 } },
    publish: { type: PublishedInputType, defaultValue: true },
  },
  resolve(parent, args) {
    let findQuery = {};
    // publish
    if (args.publish !== -1) findQuery.published = args.publish;
    // Apply
    return Post.find(findQuery)
      .limit(args.page.limit)
      .skip(args.page.skip)
      .populate(postPopulate);
  },
};

// GET SINGLE POST
const post = {
  type: PostType,
  args: {
    _id: { type: GraphQLNonNull(GraphQLID) },
  },
  resolve(parent, args) {
    return Post.findById(args._id).populate(postPopulate);
  },
};

// EXPORTS
module.exports = {
  posts,
  post,
};
