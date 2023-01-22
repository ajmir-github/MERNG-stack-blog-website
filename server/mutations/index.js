const { GraphQLObjectType } = require("graphql");
const userMutations = require("./userMutations");
const postMutations = require("./postMutations");
const commentMutations = require("./commentMutations");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...userMutations,
    ...postMutations,
    ...commentMutations,
  },
});

module.exports = mutation;
