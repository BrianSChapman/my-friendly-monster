const { Monster, User } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
  Query: {
    // Find a user based upon user Id
    user: async (parent, { _id }) => {
      return await User.findById({ _id }).populate('monsters');
    },
    monsters: async (parent, { username }) => {
      const params = username ? { username } : {};
      return await Monster.find(params).sort({ createdAt: -1 })
    }
  },

  Mutation: {
    // Add a user and assign them a JWT
    addUser: async (parent, { username, password }) => {
      const user = await User.create({ username, password });
      const token = signToken(user);
      return { token, user };
    },
    //   Login a user
    login: async (parent, { username, password }) => {
      console.log("I GOT HERE");
      const user = await User.findOne({ username });
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
      console.log("PING");
      console.log(token);
      console.log(user);
      console.log("PING");
      return { token, user };
    },

    addMonster: async (parent, { fullName, userId, imageUrl }, context) => {
      // if (context.user) {
      const monster = await Monster.create({
        fullName,
        imageUrl
      });

      await User.findOneAndUpdate(
        // { _id: context.user._id },
        { _id: userId },
        { $addToSet: { monsters: monster._id } }
      );

      return monster;
      // }
      // throw new AuthenticationError('You need to be logged in!');
      return await Monster.create({ fullName, userId });
    },

    updateMonster: async (parent, { id, userId }) => {
      return await Monster.findOneAndUpdate(
        { _id: id },
        { userId },
        { new: true }
      );
    },
    //  Might need a second opinion on this one in particular)
    // removeMonster: async (parent, { monsterId, userId }, context) => {
    //     // const monster = await Monster.findOneAndDelete({
    //     //   _id: monsterId,
    //     // });
    //     console.log(monsterId);
    //     console.log(userId);
    //     const monster = await User.findOneAndUpdate(
    //       { _id: userId },
    //       { $pull: { monsters: {_id: monsterId } }}
    //     );
    //     return monster;
    //   }
    // }

    removeMonster: async (parent, { monsterId, userId }, context) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { monsters: { _id: monsterId } } },
        { new: true }
      );

      // if (!updatedUser) {
      // throw new Error(User with id ${userId} not found);
      // }

      return updatedUser;
    }
  }
  };

  module.exports = resolvers;
