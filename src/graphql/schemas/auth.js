
import { gql } from 'apollo-server';

export default gql`
  type LoginResponse {
    token: String
    user: User
  }
  extend type Mutation {
    login(userName: String!, password: String!, remember: Boolean!): LoginResponse!
    adminLogin(email: String!, password: String!, remember: Boolean!): LoginResponse!
  }
`;