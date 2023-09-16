const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');

const { typeDefs, resolvers } = require('./schemas');
// const db = require('./config/connection');
// // Load environment variables from .env
// require('dotenv').config();

// Create an Express application
const app = express();
const PORT = process.env.PORT || 4000;

// // Connect to MongoDB using Mongoose
// connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// connection.on('error', (error) => {
//   console.error('MongoDB Connection Error:', error);
// });

// // Initialize Apollo Server with GraphQL schema
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
  // context: ({ req }) => {
  //   // Extract and verify JWT token for authentication
  //   const token = req.headers.authorization || '';
  //   const user = verifyToken(token);
  //   return { user };
  // },
// });

// // Apply Apollo Server as middleware
// server.applyMiddleware({ app, path: '/graphql' });

// // Define a route for other API endpoints
app.get('/api/someendpoint', (req, res) => {
  
  res.json({ message: 'Hello from the API!' });
});

// // Start the Node.js server

// db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });

