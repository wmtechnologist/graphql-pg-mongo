const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLInt
} = require('graphql');

const pgdb = require('../../database/pgdb');
const mdb = require('../../database/mdb');
const ContestType = require('./contest');

module.exports = new GraphQLObjectType({
  name: 'MeType',
  fields: {
    id: {type: GraphQLID },
    email: {type: new GraphQLNonNull(GraphQLString)},
    firstName: {type: GraphQLString},
    lastName: {type: GraphQLString},
    fullName: {
      type: GraphQLString,
      resolve: obj => {
        return `${obj.firstName} ${obj.lastName}`;
      }
    },
    createdAt: {type: GraphQLString},
    contests: {
      type: new GraphQLList(ContestType),
      resolve( obj, args, { pgPool }){
        return pgdb(pgPool).getContests(obj);
      } 
    },
  contestsCount: {
    type: GraphQLInt,
    resolve(obj, args, { mPool }, { fieldname }){
      return mdb(mPool).getCounts(obj, fieldname);
    }
  },
  namesCount: {
    type: GraphQLInt,
    resolve(obj, args, { mPool }, { fieldname }){
      return mdb(mPool).getCounts(obj, fieldname);
    }
  },
  votesCount: {
    type: GraphQLInt,
    resolve(obj, args, { mPool }, { fieldname }){
      return mdb(mPool).getCounts(obj, fieldname);
    }
  }
}
});