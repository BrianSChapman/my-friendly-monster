import { gql } from '@apollo/client';

export const QUERY_SINGLE_USER = gql`
  query singleUser($userId: ID!) {
    user(_Id: $userId) {
        users(userId: $userId)
    }
  }
`;
