const { GraphQLInputObjectType, GraphQLString } = require("graphql");
const { storageFolder } = require("../storage/imageUploader");

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

const deleteImage = (fileName, throwError = false) =>
  new Promise(async (resolve, reject) => {
    try {
      await fs.rm(path.join(storageFolder, fileName));
      resolve("Deleted");
    } catch (error) {
      if (throwError) reject(error);
    }
  });

module.exports = {
  SocialLinksInputType,
  deleteImage,
};
