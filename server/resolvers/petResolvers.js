const { AuthenticationError } = require('apollo-server-express');
const { User, Pet } = require('../models'); // Import your data models
const { verifyToken } = require('../middleware/authentication');

const petResolvers = {
  Query: {
    getPets: async (_, __, context) => {
      // Check if the user is authenticated (token verification)
      const user = verifyToken(context.authToken);
      if (!user) {
        throw new AuthenticationError('Not authenticated');
      }

      try {
        // Fetch and return a list of all pets associated with the authenticated user
        const pets = await Pet.find({ owner: user._id });
        return pets;
      } catch (err) {
        throw new Error(err);
      }
    },
    getPet: async (_, { id }) => {
      try {
        // Fetch and return a specific pet by ID from your database
        const pet = await Pet.findById(id);
        return pet;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    addPet: async (_, args, context) => {
      // Check if the user is authenticated (token verification)
      const user = verifyToken(context.authToken);
      if (!user) {
        throw new AuthenticationError('Not authenticated');
      }

      try {
        // Create a new pet and associate it with the authenticated user
        const newPet = await Pet.create({
          ...args,
          owner: user._id,
        });
        return newPet;
      } catch (err) {
        throw new Error(err);
      }
    },
    updatePet: async (_, { id, ...updates }, context) => {
      // Check if the user is authenticated (token verification)
      const user = verifyToken(context.authToken);
      if (!user) {
        throw new AuthenticationError('Not authenticated');
      }

      try {
        // Update an existing pet by ID, ensuring it belongs to the authenticated user
        const updatedPet = await Pet.findOneAndUpdate(
          { _id: id, owner: user._id },
          updates,
          { new: true }
        );
        if (!updatedPet) {
          throw new Error('Pet not found or unauthorized');
        }
        return updatedPet;
      } catch (err) {
        throw new Error(err);
      }
    },
    deletePet: async (_, { id }, context) => {
      // Check if the user is authenticated (token verification)
      const user = verifyToken(context.authToken);
      if (!user) {
        throw new AuthenticationError('Not authenticated');
      }

      try {
        // Delete a pet by ID, ensuring it belongs to the authenticated user
        const deletedPet = await Pet.findOneAndDelete({ _id: id, owner: user._id });
        if (!deletedPet) {
          throw new Error('Pet not found or unauthorized');
        }
        return deletedPet;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

module.exports = petResolvers;
