const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} = require('graphql');

const pgdb = require('../database/pgdb');
const MeType = require('./types/me');

// The root query type is where in the data graph
// we can start asking questions
const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',

  fields: {
    me: {
      type: MeType,
      description: 'The current super user indentified by an api key',
      args: {
        key: { type: new GraphQLNonNull(GraphQLString)}
      },
      resolve: (obj, args, { pgPool }) => {
        return pgdb(pgPool).getUser(args.key);
      }
    }
  }
});

const ncSchema = new GraphQLSchema({
  query: RootQueryType
  // mutation: ... 
});

module.exports = ncSchema;