const { gql } = require('apollo-server-express');

const typeDefs = gql`

type User {
    _id: ID!
    username: String!,
    password: String!,
    monsters: [Monster]
}

type Monster {
    _id: ID!,
    fullName: String,
    createdAt: String!,
    userId: User
}

type Auth {
    token: ID
    user: User
}

type Query {
    monsters(userId: ID): [Monster]
    monster(_id: ID!): Monster
    users:[User]
    user: User
}

type Mutation {
    addUser(
        username: String!
        password: String!
        ) : Auth
    addMonster(monsters: ID!) : User
    updateMonster(
        fullName: String
    ) : Monster
    removeMonster: Monster
    login(username: String!, password: String!) : Auth
}
`;

module.exports = typeDefs;