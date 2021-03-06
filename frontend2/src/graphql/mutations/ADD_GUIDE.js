import { gql } from '@apollo/client';

const ADD_GUIDE = gql`
  mutation ADD_GUIDE(
    $email: String!
    $password: String!
    $name: String!
    $surname: String
    $description: String
    $photo: String
    $title: String
    $ebike: Boolean
    $mtb: Boolean
    $phone: String
    $permissions: Permission!
    $specialisations: [Specialisation!]
    $location: String
  ) {
    createUser(
      data: {
        email: $email
        password: $password
        name: $name
        surname: $surname
        description: $description
        photo: $photo
        title: $title
        ebike: $ebike
        mtb: $mtb
        phone: $phone
        permissions: $permissions
        specialisations: { set: $specialisations }
        location: $location
      }
    ) {
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
    }
  }
`;

export default ADD_GUIDE;
