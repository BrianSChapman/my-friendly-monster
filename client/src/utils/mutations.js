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
  mutation addMonster( $_id: ID!, $fullName: String!, $imageUrl: String!) {
    addMonster(fullName: $fullName, imageUrl: $imageUrl) {
      _id
      fullName
      createdAt
      imageUrl
      }
    }
`;
// export const UPDATE_MONSTER = gql`
// mutation updateMonster($fullName: String!, monsterId: String!) {
//   updateMonster(fullName: $fullName, monsterId: $ID)
// }
// `;

// export const REMOVE_MONSTER = gql`
// mutation removeMonster($fullName: String!, monsterID: String!, imageUrl: string!) {
//   removeMonster(fullName: $fullName, userId: $ID, imageUrl: $imageUrl)
// }
// `;

