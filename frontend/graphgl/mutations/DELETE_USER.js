import { gql } from '@apollo/client';

const DELETE_USER = gql`
  mutation DELETE_USER($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

export default DELETE_USER;
