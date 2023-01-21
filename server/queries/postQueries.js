const {
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
} = require("graphql");
const { Post } = require("../models");
// const { PostType } = require("../types");
const {
  PageInputType,
  PublishedInputType,
  SortInputType,
} = require("./InputTypes");

const postPopulate = [
  {
    path: "userId",
  },
  { path: "comments.author.userId", select: "name email profile _id" },
];

// GET A LIST OF POSTS
const posts = {
  type: GraphQLList(require("../types/PostType")),
  args: {
    page: { type: PageInputType, defaultValue: { limit: 8, skip: 0 } },
    publish: { type: PublishedInputType, defaultValue: true },
    sort: { type: SortInputType, defaultValue: { order: -1, by: "createdAt" } },
    search: { type: GraphQLString },
    category: { type: GraphQLString },
    keywords: { type: GraphQLList(GraphQLString) },
    AnyKeyword: { type: GraphQLBoolean, defaultValue: false },
  },
  resolve(
    parent,
    { sort, publish, page, search, category, keywords, AnyKeyword }
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
      .limit(page.limit)
      .skip(page.skip)
      .populate(postPopulate);
  },
};

// GET SINGLE POST
const post = {
  type: require("../types/PostType"),
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
