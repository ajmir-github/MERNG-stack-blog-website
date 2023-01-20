const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLEnumType,
  GraphQLScalarType,
  GraphQLID,
} = require("graphql");
const simplifyNum = require("../utils/simplifyNum");

const SocialLinksType = new GraphQLObjectType({
  name: "Links",
  fields: () => ({
    facebook: { type: GraphQLString },
    instagram: { type: GraphQLString },
    gmail: { type: GraphQLString },
    github: { type: GraphQLString },
    youtube: { type: GraphQLString },
  }),
});

const DateType = new GraphQLScalarType({
  name: "DateType",
  serialize(value) {
    return value.toJSON();
  },
});

const RoleType = new GraphQLEnumType({
  name: "RoleTypeEnum",
  values: {
    root: { value: "Root" },
    admin: { value: "Admin" },
    user: { value: "User" },
  },
});

const AuthorType = new GraphQLObjectType({
  name: "AuthorType",
  fields: () => ({
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    profile: { type: GraphQLString },
  }),
});

const CommentAuthorType = new GraphQLObjectType({
  name: "CommentAuthor",
  fields: () => ({
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    profile: { type: GraphQLString },
    _id: { type: GraphQLID },
  }),
});

const CommentType = new GraphQLObjectType({
  name: "Comment",
  fields: () => ({
    author: {
      type: CommentAuthorType,
      resolve(parent) {
        return parent.author.userId || parent.author;
      },
    },
    body: { type: GraphQLString },
  }),
});

const ViewsType = new GraphQLScalarType({
  name: "ViewsType",
  serialize(value) {
    return simplifyNum(value);
  },
});

module.exports = {
  SocialLinksType,
  DateType,
  RoleType,
  CommentType,
  ViewsType,
};
