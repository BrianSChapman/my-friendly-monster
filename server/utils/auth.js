const jwt = require("jsonwebtoken");
require("dotenv").config();

// const secret = process.env.SECRET;
const secret = "TAMAGOTCHI";
const expiration = "6h";

module.exports = {
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log("Invalid token");
    }
  },

  signToken: function ({ username, password, _id }) {
    const payload = { username, password, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
