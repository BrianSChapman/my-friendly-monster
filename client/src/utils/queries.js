import { gql } from '@apollo/client';

// export const QUERY_SINGLE_USER = gql`
//   query singleUser($userId: ID!) {
//     user(_Id: $userId) {
//         users(userId: $userId)
//         monsters
//     }
//   }
// `;

export const QUERY_SINGLE_USER = gql`
  query user($_id: ID!) {
    user(_id: $_id) {
      _id
      username
      monsters {
        _id
        fullName
        createdAt
        imageUrl
      }
    }
  }
`;
