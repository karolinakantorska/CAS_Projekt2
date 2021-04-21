import { gql } from '@apollo/client';

const DAY_QUERY = gql`
  query DAY_QUERY($year: String!, $month: String!, $day: String!) {
    days(where: { year: $year, month: $month, day: $day }) {
      id
    }
  }
`;
export default DAY_QUERY;
