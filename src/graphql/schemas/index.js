
import { gql } from 'apollo-server';
import user from './user';

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
  user
];

export default typeDefs;