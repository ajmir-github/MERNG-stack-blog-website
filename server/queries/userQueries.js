const {
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} = require("graphql");
const { User } = require("../models");
const { PageInputType, SortUserInputType } = require("./InputTypes");

// GET A LIST OF USERS
const users = {
  type: GraphQLList(require("../types/UserType")),
  args: {
    limit: { type: GraphQLInt, defaultValue: 8 },
    offset: { type: GraphQLInt, defaultValue: 0 },
    sort: {
      type: SortUserInputType,
      defaultValue: { order: -1, by: "createdAt" },
    },
    search: { type: GraphQLString },
    country: { type: GraphQLString },
  },
  resolve(parent, { limit, offset, sort, search, country }) {
    const findQuery = {};
    // search name
    if (search)
      findQuery.name = {
        $regex: search,
        $options: "ig",
      };
    // filter country
    if (country) findQuery.country = country;
    // Apply
    return User.find(findQuery)
      .sort({ [sort.by]: sort.order })
      .limit(limit)
      .skip(offset);
  },
};

// GET SINGLE USER
const user = {
  type: require("../types/UserType"),
  args: {
    userId: { type: GraphQLNonNull(GraphQLID) },
  },
  resolve(parent, { userId }) {
    return User.findById(userId);
  },
};
// EXPORTS
module.exports = {
  users,
  user,
};
