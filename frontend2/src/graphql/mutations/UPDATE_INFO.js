import { gql } from '@apollo/client';

const UPDATE_INFO = gql`
  mutation UPDATE_INFO($id: ID!, $text: String) {
    updateInfo(data: { text: $text }, where: { id: $id }) {
      id
      text
    }
  }
`;
export default UPDATE_INFO;
