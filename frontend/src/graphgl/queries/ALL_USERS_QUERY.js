import { gql } from '@apollo/client';

const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY {
    users {
      name
      surname
      description
      id
      photo
      permissions
    }
  }
`;

export default ALL_USERS_QUERY;