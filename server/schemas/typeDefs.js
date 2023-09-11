const { gql } = require('apollo-server-express');

// Define GraphQL types
const typeDefs = gql`
type User {
    _id: ID!
    username: String!
    email: String!
    # Action - Add more user fields as needed
}

type Pet {
    _id: ID!
    name: String!
    species: String!
    age: Int!
    owner: User!
    # Action - Add more pet fields as needed
}

type Query {
    # Retrieve a list of all pets
    getPets: [Pet]!
    
    # Retrieve a specific pet by ID
    getPet(id: ID!): Pet

    # Retrieve the currently authenticated user (if any)
    me: User
}

type Mutation {
    # Create a new pet
    addPet(name: String!, species: String!, age: Int!): Pet

    # Update an existing pet by ID
    updatePet(id: ID!, name: String, species: String, age: Int): Pet

    # Delete a pet by ID
    deletePet(id: ID!): Pet

    # Register a new user
    register(username: String!, email: String!, password: String!): User

    # Log in an existing user
    login(email: String!, password: String!): User
}
`;

module.exports = typeDefs;
