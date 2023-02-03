const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLEnumType,
} = require("graphql");
const { User, Post, Roles, Stats } = require("../models");
const { hashPassword } = require("../utils/encrypt");
const { SocialLinksInputType, deleteImage } = require("./utils");

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
    // update the stats
    Stats.update();
    return user.save();
  },
};

const updateUser = {
  type: require("../types/UserType"),
  args: {
    userId: { type: GraphQLNonNull(GraphQLID) },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    name: { type: GraphQLString },
    bio: { type: GraphQLString },
    profile: { type: GraphQLString },
    country: { type: GraphQLString },
    links: { type: SocialLinksInputType },
  },
  async resolve(parent, { userId, links, ...args }) {
    const selectedUser = new User.findById(userId);
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
    // detele the previous file
    if (args.profile && selectedUser.profile)
      await deleteImage(selectedUser.profile);

    return User.findByIdAndUpdate(userId, user, {
      new: true,
    });
  },
};

const deleteUser = {
  type: GraphQLString,
  args: {
    userId: { type: GraphQLNonNull(GraphQLID) },
  },
  async resolve(parent, { userId }) {
    // -------- DELETE USER
    const user = await User.findById(userId);
    if (!user) return new Error("There is no user with the given id.");
    await user.delete();
    if (user.profile) await deleteImage(user.profile);
    // -------- DELETE POST
    const posts = await Post.find({ userId });
    for (const post of posts) {
      await Post.findByIdAndDelete(post._id);
      // thumbnail deletetion
      if (post.thumbnail) await deleteImage(post.thumbnail);
      // pack the comments
      const comments = await Comment.find({ postId: post._id });
      for (const comment of comments) {
        await Comment.findByIdAndDelete(comment._id);
      }
    }
    // survay the posts
    return "The User with all posts is deleted!";
  },
};

module.exports = { addUser, updateUser, deleteUser };
