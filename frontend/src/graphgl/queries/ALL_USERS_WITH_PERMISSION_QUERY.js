import { gql } from '@apollo/client';

const ALL_USERS_WITH_PERMISSION_QUERY = gql`
  query ALL_USERS_WITH_PERMISSION_QUERY($permissions: Permission) {
    users(where: { permissions: $permissions }) {
      name
      surname
      email
      description
      id
      photo
    }
  }
`;

export default ALL_USERS_WITH_PERMISSION_QUERY;