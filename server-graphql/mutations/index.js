const { GraphQLObjectType } = require("graphql");
const userMutations = require("./userMutations");
const postMutations = require("./postMutations");
const commentMutations = require("./commentMutations");
const premissionMutations = require("./premissionMutations");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...userMutations,
    ...postMutations,
    ...commentMutations,
    ...premissionMutations,
  },
});

module.exports = mutation;
