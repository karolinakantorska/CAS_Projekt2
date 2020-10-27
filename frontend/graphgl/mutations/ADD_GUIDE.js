import { gql } from '@apollo/client';

const ADD_GUIDE = gql`
  mutation ADD_GUIDE(
    $email: String!
    $password: String!
    $name: String!
    $surname: String
    $description: String
    $photo: String
  ) {
    createUser(
      email: $email
      password: $password
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

export default ADD_GUIDE;