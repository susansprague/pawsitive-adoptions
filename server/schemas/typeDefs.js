// Define GraphQL types
const typeDefs = `#graphql
type User {
    _id: ID!
    first: String!
    last: String!
    email: String!
    # Action - Add more user fields as needed
}

type Pet {
    name: String!
    species: String!
    age: Int!
    owner: User!
    # Action - Add more pet fields as needed
}

type Animal {
    type: String
    age: String
    gender: String
}

type Query {
    # Retrieve a list of all pets
    getPets: [Pet]!
    
    # Retrieve a specific pet by ID
    getPet(id: ID!): Pet

    # Retrieve the currently authenticated user (if any)
    me: User

    # Get all animals from API
    getAnimals: [Animal]
}

type Mutation {
    # Create a new pet
    addPet(name: String!, species: String!, age: Int!): Pet

    # Update an existing pet by ID
    updatePet(id: ID!, name: String, species: String, age: Int): Pet

    # Delete a pet by ID
    deletePet(id: ID!): Pet

    # Register a new user
    register(first: String!,last:String!, email: String!, password: String!): Auth

    # Log in an existing user
    login(email: String!, password: String!): Auth
}
`;

module.exports = typeDefs;
