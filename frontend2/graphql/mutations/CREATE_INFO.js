import { gql } from '@apollo/client';

const CREATE_INFO = gql`
  mutation CREATE_INFO($text: String!) {
    createInfo(data: { text: $text }) {
      id
      text
    }
  }
`;

export default CREATE_INFO;
