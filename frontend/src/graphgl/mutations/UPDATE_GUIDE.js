import { gql } from '@apollo/client';

const UPDATE_GUIDE = gql`
  mutation UPDATE_GUIDE(
    $id: ID!
    $email: String
    $name: String
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
    updateUser(
      data: {
        email: $email
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
      where: { id: $id }
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
      permissions
      specialisations
      location
    }
  }
`;
export default UPDATE_GUIDE;
