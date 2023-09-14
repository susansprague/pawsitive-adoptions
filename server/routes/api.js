const express = require('express');
const router = express.Router();

// Import necessary models
const User = require('../models/user'); // Import your User model
const Pet = require('../models/pet');   // Import your Pet model

// API routes and their handlers defined
// route to get a list of pets
router.get('/pets', async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching pets.' });
  }
});

// route to create a new user
router.post('/users', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating a user.' });
  }
});

// Add more routes once aligned on rewquirements

module.exports = router;
