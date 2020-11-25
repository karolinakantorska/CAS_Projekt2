import { gql } from '@apollo/client';

const ALL_GUIDES_QUERY = gql`
  query ALL_GUIDES_QUERY($permissions: Permission) {
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

export default ALL_GUIDES_QUERY;
