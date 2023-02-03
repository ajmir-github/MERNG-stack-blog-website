const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = require("graphql");
const { User } = require("../models");
const { matchPassword } = require("../utils/encrypt");
const { signJWT, verfyJWT } = require("../utils/jwt");
const jwt = require("jsonwebtoken");

const UserTypeWithAuth = new GraphQLObjectType({
  name: "UserTypeWithAuth",
  fields: () => ({
    user: { type: require("../types/UserType") },
    token: { type: GraphQLString },
  }),
});

const signIn = {
  type: UserTypeWithAuth,
  args: {
    email: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent, { email, password }) {
    // get user
    const user = await User.findOne({ email });
    // if (!user) return new Error("1:This email is not registered!");
    if (!user) return new Error("a:This email is not registered!");
    // match password
    const matched = await matchPassword(password, user.password);
    if (!matched) return new Error("b:Password is not matched!");
    // sign token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return { user, token };
  },
};

const signInWithToken = {
  type: require("../types/UserType"),
  args: {
    token: { type: GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent, { token }) {
    // verify the hash
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    // get user the user
    const user = await User.findById(userId);
    if (!user) return new Error("This email does not exists anymore!");
    return user;
  },
};

module.exports = {
  signIn,
  signInWithToken,
};
