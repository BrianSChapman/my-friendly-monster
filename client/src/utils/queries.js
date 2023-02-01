import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query allUsers {
    users {
    _id
    username
    password
    monsters
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query singleUser($userId: ID!) {
    user(userId: $userId) {
        users(userId: $userId)
    }
  }
`;

export const QUERY_MONSTERS = gql`
  query allMonsters {
    users(userId: $userId) {
        monsters
    }
  }
`;

export const QUERY_SINGLE_MONSTER = gql`
  query singleUser($userId: ID!) {
    user(userId: $userId) {
    monsters(monsterId: $monsterId)
    }
  }
`;
