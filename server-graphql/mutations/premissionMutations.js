const { GraphQLEnumType, GraphQLNonNull, GraphQLID } = require("graphql");
const { Roles, User } = require("../models");

// --------------- grantPermission
const RoleInputType = new GraphQLEnumType({
  name: "RoleInputType",
  values: {
    admin: { value: Roles.admin },
    user: { value: Roles.user },
  },
});

const grantPermission = {
  type: require("../types/UserType"),
  args: {
    userId: { type: GraphQLNonNull(GraphQLID) },
    role: { type: GraphQLNonNull(RoleInputType) },
  },
  async resolve(parent, { userId, role }) {
    return User.findByIdAndUpdate(
      userId,
      { role },
      {
        new: true,
      }
    );
  },
};

module.exports = {
  grantPermission,
};
