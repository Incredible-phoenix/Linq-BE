
import { gql } from 'apollo-server';

export default gql`
  type User {
    _id: ID
    userName: String
    email: String
    password: String
    phoneNumber: String
    address: String
  }

  extend type Query {
    users: [User]
    user(_id: ID!): User
  }

  # extend type Mutation {
  # }
`;