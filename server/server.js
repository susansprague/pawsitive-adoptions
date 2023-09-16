const express = require('express');
const { ApolloServer } = require('@apollo/server');
// Run npm install mongodb and require mongodb and MongoClient class
const { MongoClient } = require('mongodb');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
// Load environment variables from .env
require('dotenv').config();

// Create an Express application
const app = express();
const PORT = process.env.PORT || 4000;

// Connection string to local instance of MongoDB
const connectionStringURI = `mongodb://127.0.0.1:27017`;

// Initialize a new instance of MongoClient
const client = new MongoClient(connectionStringURI);


// Create variable to hold our database name
const dbName = 'petsDB';

// Use connect method to connect to the mongo server
client.connect()
  .then(() => {
    console.log('Connected successfully to MongoDB');
    // Use client.db() constructor to add new db instance
    db = client.db(dbName);

    // start up express server
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Mongo connection error: ', err.message);
  });

// Built in Express function that parses incoming requests to JSON
app.use(express.json());

app.post('/create', (req, res) => {
  // Use db connection to add a document
  db.collection('petCollection').insertOne(
    { name: req.body.name, breed: req.body.breed }
  )
    .then(results => res.json(results))
    .catch(err => {
      if (err) throw err;
    });
});

app.get('/read', (req, res) => {
  // Use db connection to find all documents in collection
  db.collection('petCollection')
    .find()
    .toArray()
    .then(results => res.json(results))
    .catch(err => {
      if (err) throw err;
    });
});
// Connect to MongoDB using Mongoose
connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection.on('error', (error) => {
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

// Define a route for other API endpoints (optional)
app.get('/api/someendpoint', (req, res) => {
  
  //Handle other API requests here
  res.json({ message: 'Hello from the API!' });
});

// Start the Node.js server

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
});





















