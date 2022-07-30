const { gql } = require('apollo-server-express');

const typeDefs = gql(`
  scalar Upload

  type File {
    url: String!
  }

  type User {
    _id: ID
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
    _id: ID!
    token: String!
    expiresToken: Int!
  }

  type Query{
    getUser(email: String!): User!
    signIn(email: String!, password: String!): AuthInfo!
  }
  type Mutation {
    createUser(user: InputUser!): User!
    singleFileUpload(file: Upload!): File!
  }
`);

module.exports = typeDefs;