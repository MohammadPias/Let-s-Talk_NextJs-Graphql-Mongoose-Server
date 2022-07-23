const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    hello: String
  }

  type User {
    name: String
    email: String
    password: String
    phone: String
  }

  input inputUser {
    name: String!
    email: String!
    password: String!
    phone: String!
  }
  type Mutation {
    createUser(user: inputUser!): User!
  }
`);

module.exports = schema;