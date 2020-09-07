const { GraphQLScalarType } = require('graphql');
const { Kind } = require("graphql/language");

const { UserRsvM, UserRsvQ } = require('./resolvers/userRsv');
const { ClientRsvM, ClientRsvQ } = require('./resolvers/clientRsv');
const { EucharistRsvM, EucharistRsvQ } = require('./resolvers/eucharistRsv');

const resolvers = {
  DateTime: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(+ast.value) // ast value is always in string format
      }
      return null;
    },
  }),
  Query: {
    hello: () => 'Hello world!',
    ...ClientRsvQ,
    ...UserRsvQ,
    ...EucharistRsvQ
  },
  Mutation: {
    ...UserRsvM,
    ...ClientRsvM,
    ...EucharistRsvM
  }
};

module.exports = resolvers;