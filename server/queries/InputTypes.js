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

const SortInputType = new GraphQLInputObjectType({
  name: "SortInputType",
  fields: {
    order: {
      type: new GraphQLEnumType({
        name: "SortOrderEnums",
        values: {
          asc: { value: 1 },
          desc: { value: -1 },
        },
      }),
      defaultValue: -1,
    },
    by: {
      type: new GraphQLEnumType({
        name: "SortByEnums",
        values: {
          date: { value: "createdAt" },
          title: { value: "title" },
          views: { value: "views" },
        },
      }),
      defaultValue: "createdAt",
    },
  },
});

// EXPORTS
module.exports = {
  PageInputType,
  PublishedInputType,
  SortInputType,
};
