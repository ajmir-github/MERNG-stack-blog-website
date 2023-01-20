const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
} = require("graphql");
const { User } = require("../models");
const UserType = require("./UserType");
const { DateType, CommentType } = require("./UtilTypes");

const PostType = new GraphQLObjectType({
  name: "Post",
  fields: () => ({
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    category: { type: GraphQLString },
    keywords: { type: GraphQLList(GraphQLString) },
    description: { type: GraphQLString },
    thumbnail: { type: GraphQLString },
    body: { type: GraphQLString },
    commnets: {
      type: GraphQLList(CommentType),
      resolve(parent, args) {
        return parent.comments;
      },
    },
    published: { type: GraphQLBoolean },
    createdAt: { type: DateType },
    updatedAt: { type: DateType },
    views: { type: GraphQLInt },
    author: {
      type: UserType,
      resolve(parent, args) {
        return parent.userId;
      },
    },
  }),
});

module.exports = PostType;
