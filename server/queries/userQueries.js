const {
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLID,
} = require("graphql");
const { User } = require("../models");
const { UserType } = require("../types");
const { PageInputType } = require("./InputTypes");

// GET A LIST OF USERS
const users = {
  type: GraphQLList(UserType),
  args: {
    page: {
      type: PageInputType,
      defaultValue: { limit: 8, skip: 0 },
    },
  },
  resolve(parent, args) {
    return User.find().limit(args.page.limit).skip(args.page.skip);
  },
};

// GET SINGLE USER
const user = {
  type: UserType,
  args: {
    _id: { type: GraphQLNonNull(GraphQLID) },
    limit: { type: GraphQLInt, defaultValue: 8 },
    skip: { type: GraphQLInt, defaultValue: 0 },
  },
  resolve(parent, args) {
    return User.findById(args._id).limit(args.limit).skip(args.skip);
  },
};
// EXPORTS
module.exports = {
  users,
  user,
};
