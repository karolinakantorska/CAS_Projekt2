import { gql } from '@apollo/client';

const INFOES_QUERY = gql`
  query INFOES_QUERY {
    infoes {
      id
      text
    }
  }
`;
export default INFOES_QUERY;
