import { gql } from '@apollo/client';

const UPDATE_GUIDE = gql`
  mutation UPDATE_GUIDE(
    $id: ID!
    $email: String
    $name: String
    $surname: String
    $description: String
    $photo: String
  ) {
    updateUser(
      id: $id
      email: $email
      name: $name
      surname: $surname
      description: $description
      photo: $photo
    ) {
      id
      email
      name
      surname
      description
      photo
    }
  }
`;

export default UPDATE_GUIDE;
