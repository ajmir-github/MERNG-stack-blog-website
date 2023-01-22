const { rule } = require("graphql-shield");
const { User, Post, Comment } = require("../models");
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
  async (parent, args, { user }, info) => {
    return user.role === Roles.admin;
  }
);

const isOwnerOfUser = rule({ cache: "contextual" })(
  async (parent, { userId }, { user }, info) => {
    console.log({ userId });
    return (
      user._id.toString() === userId ||
      new Error("You are not the ower of this user.")
    );
  }
);

const isOwnerOfPost = rule({ cache: "contextual" })(
  async (parent, { postId }, { user }, info) => {
    const post = await Post.findById(postId, "userId");
    return (
      user._id.toString() === post.userId.toString() ||
      new Error("You are not the ower of this post.")
    );
  }
);

const isOwnerOfComment = rule({ cache: "contextual" })(
  async (parent, { commentId }, { user }, info) => {
    const comment = await Comment.findById(commentId).populate({
      path: "internalAuthor",
      select: "_id",
    });
    if (!comment) return new Error("There is no comment with the given id.");
    // if it has an external author
    if (!comment.internalAuthor)
      return new Error("You are not the ower of this comment.");
    // if it has internal author, match its id
    return (
      comment.internalAuthor._id.toString() === user._id.toString() ||
      new Error("You are not the ower of this comment.")
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
  isOwnerOfComment,
};
