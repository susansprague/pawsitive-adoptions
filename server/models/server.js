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
  })