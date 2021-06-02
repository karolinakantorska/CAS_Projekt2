import { gql } from '@apollo/client';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      name
      permissions
    }
  }
`;

export default SIGNIN_MUTATION;
