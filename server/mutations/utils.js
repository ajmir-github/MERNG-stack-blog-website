const { GraphQLInputObjectType, GraphQLString } = require("graphql");

const SocialLinksInputType = new GraphQLInputObjectType({
  name: "LinksInputType",
  fields: {
    facebook: { type: GraphQLString },
    instagram: { type: GraphQLString },
    gmail: { type: GraphQLString },
    github: { type: GraphQLString },
    youtube: { type: GraphQLString },
  },
});

const deleteImage = (url) => {
  console.log({
    action: "DELETE",
    url,
  });
};

module.exports = {
  SocialLinksInputType,
  deleteImage,
};
