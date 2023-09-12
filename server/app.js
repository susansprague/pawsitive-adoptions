const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema/schema.graphql');
const resolvers = require('./resolvers/index');
const { verifyToken } = require('./middleware/authentication');
const { fetchPets } = require('./utils/petfinderAPI');

// Load environment variables from .env
require('dotenv').config();

// Create an Express application
const app = express();

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('error', (error) => {
  console.error('MongoDB Connection Error:', error);
});

// Initialize Apollo Server with GraphQL schema
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // Extract and verify JWT token for authentication
    const token = req.headers.authorization || '';
    const user = verifyToken(token);
    return { user };
  },
});

// Apply Apollo Server as middleware
server.applyMiddleware({ app, path: '/graphql' });

// Set up Petfinder API credentials from environment variables
const PETFINDER_API_KEY = process.env.PETFINDER_API_KEY;
const PETFINDER_API_SECRET = process.env.PETFINDER_API_SECRET;

// Use the fetchPets function to make API requests to Petfinder
app.get('/getPets', async (req, res) => {
  try {
    // Make an API request to fetch pets using the utility function
    const pets = await fetchPets(PETFINDER_API_KEY, PETFINDER_API_SECRET);

    // Respond with the fetched pets
    res.json(pets);
  } catch (error) {
    console.error('Error fetching pets from Petfinder:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the servers
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
