const { GraphQLNonNull, GraphQLString, GraphQLID } = require("graphql");
const { User, Post } = require("../models");
const { hashPassword } = require("../utils/encrypt");
const { SocialLinksInputType } = require("./utils");

const addUser = {
  type: require("../types/UserType"),
  args: {
    email: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent, args) {
    const password = await hashPassword(args.password);
    const user = new User({ ...args, password });
    return user.save();
  },
};

const updateUser = {
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
  async resolve(parent, { _id, links, ...args }) {
    let user = args;
    // if links
    if (links) {
      // this is to aovid overwriteing the links object
      for (const [key, val] of Object.entries(links)) {
        user["links." + key] = val;
      }
    }
    // if password update
    if (args.password) {
      user.password = await hashPassword(args.password);
    }

    return User.findByIdAndUpdate(_id, user, {
      new: true,
    });
  },
};

const deleteUser = {
  type: GraphQLString,
  args: {
    _id: { type: GraphQLNonNull(GraphQLID) },
  },
  async resolve(parent, { _id }) {
    const user = await User.findById(_id);
    // make that the user exists
    if (!user) return new Error("There is no user with the given id.");
    // get the post and generate a sinlge promise
    const posts = await Post.find({ userId: _id }, "_id");
    const asyncFuncs = [];
    for (const post of posts) asyncFuncs.push(Post.findByIdAndDelete(post._id));
    // delete all the posts
    await Promise.allSettled(asyncFuncs);
    // *** delete all the thumbnails of posts
    await user.delete();
    // *** delete the profile image of user
    // survay the posts
    const postsLength = posts.length;
    return postsLength === 0
      ? "The user deleted!"
      : `The User with ${postsLength} post/s is deleted!`;
  },
};

module.exports = { addUser, updateUser, deleteUser };
