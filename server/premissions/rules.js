const { rule } = require("graphql-shield");
const { User, Post } = require("../models");
const jwt = require("jsonwebtoken");
const { Roles } = require("../models");

const onlyAuthenticated = rule({ cache: "contextual" })(
  async (parent, args, context, info) => {
    try {
      // get and check AUTHORIZATION
      const { authorization } = context.headers;
      if (!authorization) throw "1:Access denied due to lack of access token!";
      // get and check token
      const token = authorization.replace("Bearer ", "");
      if (!token)
        throw "2:Authentication faild due to invalid access token provided!";
      // verify token and get the user
      const { userId } = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(userId);
      if (!user) throw "3:Authetication failed due to absence of user!";
      // save
      context.user = user;
      return true;
    } catch (error) {
      return new Error(error);
    }
  }
);

const isAuthenticated = rule({ cache: "contextual" })(
  async (parent, args, context, info) => {
    try {
      // get and check AUTHORIZATION
      const { authorization } = context.headers;
      if (!authorization) return true;
      // get and check token
      const token = authorization.replace("Bearer ", "");
      if (!token)
        throw "2:Authentication faild due to invalid access token provided!";
      // verify token and get the user
      const { userId } = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(userId);
      if (!user) throw "3:Authetication failed due to absence of user!";
      // save
      context.user = user;
      return true;
    } catch (error) {
      return new Error(error);
    }
  }
);

const isAdmin = rule({ cache: "contextual" })(
  async (parent, args, context, info) => {
    return context.user.role === Roles.admin;
  }
);

const isOwnerOfUser = rule({ cache: "contextual" })(
  async (parent, args, context, info) => {
    return (
      context.user._id.toString() === args._id ||
      new Error("You are not the owner of this user account!")
    );
  }
);

const isOwnerOfPost = rule({ cache: "contextual" })(
  async (parent, args, context, info) => {
    const postId = args._id;
    const post = await Post.findById(postId, "userId");
    return (
      context.user._id.toString() === post.userId.toString() ||
      new Error("You are not the owner of this post!")
    );
  }
);

// --- EXPORTS
module.exports = {
  onlyAuthenticated,
  isAuthenticated,
  isAdmin,
  isOwnerOfUser,
  isOwnerOfPost,
};
