const jwt = require('jsonwebtoken');
require('dotenv').config();
// const secret = process.env.SECRET;
const secret = 'TAMAGOTCHI';
const expiration = '2h';

module.exports = {
  signToken: function ({ username, password, _id }) {
    const payload = { username, password, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
