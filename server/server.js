const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema/schema.graphql');
const resolvers = require('./resolvers/index');
const { verifyToken } = require('./middleware/authentication');

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

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
