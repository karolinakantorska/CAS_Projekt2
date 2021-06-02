import { gql } from '@apollo/client';

const ALL_USERS_WITH_PERMISSION_QUERY = gql`
  query ALL_USERS_WITH_PERMISSION_QUERY($permissions: Permission) {
    users(where: { permissions: $permissions }) {
      id
      email
      name
      surname
      description
      photo
      title
      ebike
      mtb
      phone
      specialisations
      location
    }
  }
`;

export default ALL_USERS_WITH_PERMISSION_QUERY;
