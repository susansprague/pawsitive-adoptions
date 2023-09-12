const { User, Pet } = require('../models'); // Import data models
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
Query: {
    getPets: async () => {
    try {
        // Fetch and return a list of all pets from database
        const pets = await Pet.find();
        return pets;
    } catch (err) {
        throw new Error(err);
    }
    },
    getPet: async (_, { id }) => {
    try {
        // Fetch and return a specific pet by ID from database
        const pet = await Pet.findById(id);
        return pet;
    } catch (err) {
        throw new Error(err);
    }
    },
    me: async (_, __, context) => {
      // Check if the user is authenticated (token verification)
    if (context.user) {
        return await User.findById(context.user._id);
    }
    throw new AuthenticationError('Not authenticated');
    },
},
Mutation: {
    addPet: async (_, args) => {
      // Check if the user is authenticated (token verification)
    if (context.user) {
        try {
          // Create a new pet and associate it with the authenticated user
        const newPet = await Pet.create({
            ...args,
            owner: context.user._id,
        });
        return newPet;
        } catch (err) {
        throw new Error(err);
        }
    }
    throw new AuthenticationError('Not authenticated');
    },
    updatePet: async (_, { id, ...updates }) => {
      // Check if the user is authenticated (token verification)
    if (context.user) {
        try {
          // Update an existing pet by ID
        const updatedPet = await Pet.findByIdAndUpdate(id, updates, {
            new: true,
        });
        return updatedPet;
        } catch (err) {
        throw new Error(err);
        }
    }
    throw new AuthenticationError('Not authenticated');
    },
    deletePet: async (_, { id }) => {
      // Check if the user is authenticated (token verification)
    if (context.user) {
        try {
          // Delete a pet by ID and return the deleted pet
        const deletedPet = await Pet.findByIdAndDelete(id);
        return deletedPet;
        } catch (err) {
        throw new Error(err);
        }
    }
    throw new AuthenticationError('Not authenticated');
    },
    register: async (_, { username, email, password }) => {
    try {
        // Create a new user
        const user = await User.create({ username, email, password });
        // Generate a JWT token for the newly registered user
        const token = signToken(user);
        return { token, user };
    } catch (err) {
        throw new Error(err);
    }
    },
    login: async (_, { email, password }) => {
    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
        throw new AuthenticationError('User not found');
        }
        // Verify the password
        const correctPassword = await user.isCorrectPassword(password);
        if (!correctPassword) {
        throw new AuthenticationError('Incorrect password');
        }
        // Generate a JWT token for the authenticated user
        const token = signToken(user);
        return { token, user };
    } catch (err) {
        throw new Error(err);
    }
    },
},
};

module.exports = resolvers;
