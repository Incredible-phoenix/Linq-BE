
import { gql } from 'apollo-server';
import user from './user';
import auth from './auth';

const link = gql`
  scalar Date
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`;

const typeDefs = [
  link,
  user,
  auth,
];

export default typeDefs;
