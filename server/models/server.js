const express = require('express');

const { MongoClient } = require('mongodb');

const app = express();
const port = 27017

const connectionStringURI = `mongodb://127.0.0.1:127017`;

const client = new MongoClient(connectionStringURI);

let db;

const dbName = 'petsDB';

client.connect()
 .then(client => {
    db = client.db(dbName);
    console.log('Connected successfully to MongoDB');

    app.listen(port, () => {
      console.log(`Server running on port http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.log('Mongo connection error: ', err.message);
  });

  app.use(express.json());

  app.post('/create', (req, res) => {
    db.collection('dogsCollection').insertOne({
        name: req.body.name,
        breed: req.body.breed,
        age: req.body.age,
        gender: req.body.gender,
        color: req.body.color,
    })
    .then(results => res.json(results))
    .catch(err => {
        if (err) throw err;
    });
  });

  app.get('/read', (req, res) => {
    db.collection('dogsCollection')
    .find()
    .toArray()
    .then(results => res.json(results))
    .catch(err => {
        if (err) throw err;
    });
  })