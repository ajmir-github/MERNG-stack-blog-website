const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
  GraphQLID,
} = require("graphql");
const { Comment } = require("../models");
const { DateType, CommentType, ViewsType } = require("./UtilTypes");

const PostType = new GraphQLObjectType({
  name: "Post",
  fields: () => ({
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    category: { type: GraphQLString },
    keywords: {
      type: GraphQLList(GraphQLString),
      resolve(parent) {
        return parent.keywords;
      },
    },
    description: { type: GraphQLString },
    thumbnail: { type: GraphQLString },
    body: { type: GraphQLString },
    commnets: {
      type: GraphQLList(CommentType),
      resolve(parent, args) {
        return Comment.find({ postId: parent._id }).populate(
          "internalAuthor",
          "_id name profile"
        );
      },
    },
    published: { type: GraphQLBoolean },
    createdAt: { type: DateType },
    updatedAt: { type: DateType },
    views: { type: ViewsType },
    author: {
      type: require("./UserType"), // direct import is to avoid circular error
      resolve(parent, args) {
        return parent.userId;
      },
    },
  }),
});

module.exports = PostType;
