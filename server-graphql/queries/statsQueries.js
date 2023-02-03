const {
  GraphQLList,
  GraphQLString,
  GraphQLObjectType,
  GraphQLInt,
} = require("graphql");
const { Stats } = require("../models");

const CountStatsType = new GraphQLObjectType({
  name: "CountStatsType",
  fields: () => ({
    users: { type: GraphQLInt },
    posts: { type: GraphQLInt },
    comments: { type: GraphQLInt },
  }),
});

const KeywordStatsType = new GraphQLObjectType({
  name: "KeywordStatsType",
  fields: () => ({
    keyword: { type: GraphQLString },
    count: { type: GraphQLInt },
  }),
});
const CategoryStatsType = new GraphQLObjectType({
  name: "CategoryStatsType",
  fields: () => ({
    category: { type: GraphQLString },
    count: { type: GraphQLInt },
  }),
});

const StatsType = new GraphQLObjectType({
  name: "StatsType",
  fields: () => ({
    count: { type: CountStatsType },
    categories: { type: GraphQLList(CategoryStatsType) },
    keywords: { type: GraphQLList(KeywordStatsType) },
  }),
});

// GET SINGLE USER
const stats = {
  type: StatsType,
  args: {
    categoriesLimit: { type: GraphQLInt, defaultValue: 8 },
    keywordsLimit: { type: GraphQLInt, defaultValue: 16 },
  },
  resolve(parent, { categoriesLimit, keywordsLimit }) {
    return Stats.get(categoriesLimit, keywordsLimit);
  },
};
// EXPORTS
module.exports = {
  stats,
};
