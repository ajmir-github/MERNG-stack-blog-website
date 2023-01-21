const {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
} = require("graphql");
const { User } = require("../models");
const { SocialLinksInputType } = require("./utils");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // ---- USERS
    // add user
    addUser: {
      type: require("../types/UserType"),
      args: {
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const user = User(args);
        return user.save();
      },
    },
    // update user
    updateUser: {
      type: require("../types/UserType"),
      args: {
        _id: { type: GraphQLNonNull(GraphQLID) },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        name: { type: GraphQLString },
        bio: { type: GraphQLString },
        profile: { type: GraphQLString },
        country: { type: GraphQLString },
        links: { type: SocialLinksInputType },
      },
      resolve(parent, { _id, links, ...args }) {
        let user = args;
        // if links
        if (links) {
          // this is to aovid overwriteing the links object
          for (const [key, val] of Object.entries(links)) {
            user["links." + key] = val;
          }
        }
        return User.findByIdAndUpdate(_id, user, {
          new: true,
        });
      },
    },
    // delete user
    deleteUser: {
      type: require("../types/UserType"),
      args: {
        _id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, { _id }) {
        return User.findByIdAndDelete(_id);
      },
    },
    // ---- POSTS
    // add post
    // update post
    // delete post
  },
});

module.exports = mutation;
