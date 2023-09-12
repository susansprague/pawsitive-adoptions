const { gql } = require('apollo-server-express');

// Defines GraphQL type definitions using the provided schema
const typeDefs = gql`
  type Pet {
    id: ID!
    name: String!
    breed: String!
    age: Int!
    description: String
  }

  type Query {
    getPets: [Pet]
    getPet(id: ID!): Pet
  }

  type Mutation {
    addPet(name: String!, breed: String!, age: Int!, description: String): Pet
    signUp(username: String!, password: String!): AuthPayload
    signIn(username: String!, password: String!): AuthPayload
  }

  type AuthPayload {
    token: String!
  }
`;

module.exports = typeDefs;
