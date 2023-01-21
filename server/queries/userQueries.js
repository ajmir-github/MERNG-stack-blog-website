const {
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
} = require("graphql");
const { User } = require("../models");
const { PageInputType, SortUserInputType } = require("./InputTypes");

// GET A LIST OF USERS
const users = {
  type: GraphQLList(require("../types/UserType")),
  args: {
    page: { type: PageInputType, defaultValue: { limit: 8, skip: 0 } },
    sort: {
      type: SortUserInputType,
      defaultValue: { order: -1, by: "createdAt" },
    },
    search: { type: GraphQLString },
    country: { type: GraphQLString },
  },
  resolve(parent, { page, sort, search, country }) {
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
      .limit(page.limit)
      .skip(page.skip);
  },
};

// GET SINGLE USER
const user = {
  type: require("../types/UserType"),
  args: {
    _id: { type: GraphQLNonNull(GraphQLID) },
  },
  resolve(parent, args) {
    return User.findById(args._id);
  },
};
// EXPORTS
module.exports = {
  users,
  user,
};
