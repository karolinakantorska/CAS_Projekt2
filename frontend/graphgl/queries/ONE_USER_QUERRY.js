import { gql } from '@apollo/client';

const ONE_USER_QUERRY = gql`
  query ONE_USER_QUERRY($id: ID!) {
    user(where: { id: $id }) {
      id
      email
      name
      surname
      description
      photo
    }
  }
`;

export default ONE_USER_QUERRY;
