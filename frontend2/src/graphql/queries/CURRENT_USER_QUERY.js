import { gql } from '@apollo/client';

const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    currentUser {
      id
      email
      name
      permissions
    }
  }
`;

export default CURRENT_USER_QUERY;
