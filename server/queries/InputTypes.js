const {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLEnumType,
} = require("graphql");

const PageInputType = new GraphQLInputObjectType({
  name: "PageInputType",
  fields: {
    limit: { type: GraphQLInt },
    skip: { type: GraphQLInt },
  },
});

const PublishedInputType = new GraphQLEnumType({
  name: "PublishedInputTypes",
  values: {
    published: { value: true },
    unpublished: { value: false },
    both: { value: -1 },
  },
});

// EXPORTS
module.exports = {
  PageInputType,
  PublishedInputType,
};
