const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models'); // Import data models
const { signToken } = require('../utils/auth');

const authResolvers = {
  Mutation: {
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

module.exports = authResolvers;
