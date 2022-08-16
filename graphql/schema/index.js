const { gql } = require('apollo-server-express');

const typeDefs = gql(`
  scalar Upload

  type File {
    url: String!
  }

  type User {
    id: ID
    name: String
    email: String
    password: String
    phone: String
    role: String
    avatar: String
  }

  input InputUser {
    name: String!
    email: String!
    password: String!
    phone: String
    role: String
    avatar: String
  }

  type AuthInfo{
    id: ID!
    token: String!
    expiresToken: Int!
  }
  type ErrorMsg{
    status: Int!
    error: String
    message: String
  }
  union GetUsers = User | ErrorMsg

  type Query{
    getAllUsers: [User!]
    getUser(email: String!): User!
    signIn(email: String!, password: String!): AuthInfo!
    # singOut(): String!
  }
  type Mutation {
    createUser(user: InputUser!): User!
    singleFileUpload(file: Upload!): File!
  }
`);

module.exports = typeDefs;