const { Monster, User } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
  Query: {
    // Find a user based upon user Id
    users: async (parent, { userId }) => {
      return User.findOne({ _id: userId, username, password });
    },
  },
  Mutation: {
    // Add a user and assign them a JWT
    addUser: async (parent, { username, password }) => {
      const user = await user.create({ username, password });
      const token = signToken(user);
      return { token, user };
    },
  },
//   Login a user
  login: async (parent, { username, password }) => {
    const user = await user.findOne({ username });
// checking if the username is valid & throwing an error if not
    if (!user) {
      throw new AuthenticationError(
        "Sorry friend! Unable to log you in. Check your username & password. Thanks!"
      );
    }
// Checking for proper password
    const correctPw = await user.isCorrectPassword(password);

    if (!correctPw) {
      throw new AuthenticationError(
        "Sorry friend! Unable to log you in. Check your username & password. Thanks!"
      );
    }
    // If they successfully login, they're issued a JWT
    const token = signToken(user);

    return { token, user };
  },
//   ADD A USER, UPDATE A MONSTER, ADD A MONSTER, REMOVE A MONSTER.
};

module.exports = resolvers;
