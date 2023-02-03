const { GraphQLString, GraphQLObjectType, GraphQLID } = require("graphql");

const { DateType, SocialLinksType, RoleType } = require("./UtilTypes");
const { posts } = require("../queries/postQueries");

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    _id: { type: GraphQLID },
    email: { type: GraphQLString },
    role: { type: RoleType },
    name: { type: GraphQLString },
    bio: { type: GraphQLString },
    profile: { type: GraphQLString },
    country: { type: GraphQLString },
    links: { type: SocialLinksType },
    createdAt: { type: DateType },
    updatedAt: { type: DateType },
    posts,
  }),
});

// ---------- EXPORTS
module.exports = UserType;
