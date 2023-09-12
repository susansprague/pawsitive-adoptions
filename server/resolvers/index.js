const petResolvers = require('./petResolvers');
const authResolvers = require('./authResolvers');

module.exports = {
  Query: {
    ...petResolvers.Query,
  },
  Mutation: {
    ...petResolvers.Mutation,
    ...authResolvers.Mutation,
  },
};
