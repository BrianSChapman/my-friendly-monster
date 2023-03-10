import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $password: String!) {
    addUser(username: $username, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_MONSTER = gql`
  mutation addMonster($fullName: String!, $imageUrl: String!, $userId: ID!) {
    addMonster(fullName: $fullName, imageUrl: $imageUrl, userId: $userId) {
      _id
      fullName
      createdAt
      imageUrl
      }
    }
`;

export const UPDATE_MONSTER = gql`
mutation updateMonster($fullName: String!, $monsterId: ID!) {
  updateMonster(fullName: $fullName, monsterId: $monsterId) {
    fullName
  }
}
`;

// export const REMOVE_MONSTER = gql`
// mutation removeMonster($monster: ID!, $userId: ID!) {
//   removeMonster(monster: $monster, userId: $userId) {
//     _id
//     monsters {
//       _id
//     }
//   }
//   }
// `;
export const REMOVE_MONSTER = gql`
mutation removeMonster($userId: ID!, $monsterId: ID!) {
  removeMonster(userId: $userId, monsterId: $monsterId) {
    monsters {
      _id
    }
  }
}
`;
