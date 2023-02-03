const {
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
} = require("graphql");
const { Post } = require("../models");
// const { PostType } = require("../types");
const {
  PageInputType,
  PublishedInputType,
  SortInputType,
} = require("./InputTypes");

// GET A LIST OF POSTS
const posts = {
  type: GraphQLList(require("../types/PostType")),
  args: {
    limit: { type: GraphQLInt, defaultValue: 8 },
    offset: { type: GraphQLInt, defaultValue: 0 },
    publish: { type: PublishedInputType, defaultValue: true },
    sort: { type: SortInputType, defaultValue: { order: -1, by: "createdAt" } },
    search: { type: GraphQLString },
    category: { type: GraphQLString },
    keywords: { type: GraphQLList(GraphQLString) },
    AnyKeyword: { type: GraphQLBoolean, defaultValue: false },
  },
  resolve(
    parent,
    { sort, publish, limit, offset, search, category, keywords, AnyKeyword }
  ) {
    let findQuery = {};
    // publish
    if (publish !== -1) findQuery.published = publish;
    // search title and description
    if (search) {
      const pattern = {
        $regex: search,
        $options: "ig",
      };
      findQuery.$or = [{ title: pattern }, { description: pattern }];
    }
    // category
    if (category) {
      findQuery.category = category;
    }

    // keywords
    if (keywords) {
      // has all the keywords given
      if (!AnyKeyword) {
        findQuery.keywords = { $all: keywords };
      } else {
        // has aleast on of the keywords
        findQuery.$or = keywords.map((keyword) => ({
          keywords: { $elemMatch: { $eq: keyword } },
        }));
      }
    }
    // if is nested in the user object
    if (parent) findQuery.userId = parent._id;

    // Apply
    return Post.find(findQuery)
      .sort({ [sort.by]: sort.order })
      .limit(limit)
      .skip(offset)
      .populate("userId");
  },
};

// GET SINGLE POST
const post = {
  type: require("../types/PostType"),
  args: {
    postId: { type: GraphQLNonNull(GraphQLID) },
  },
  async resolve(parent, { postId }) {
    const post = await Post.findById(postId).populate("userId");
    post.views++;
    await post.save();
    return post;
  },
};

// EXPORTS
module.exports = {
  posts,
  post,
};
