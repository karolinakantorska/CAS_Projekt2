import { gql } from '@apollo/client';

const DAY_QUERY = gql`
  query DAY_QUERY($year: String!, $month: String!, $day: String!, $id:ID) {
    days(
      where: {
        year: $year
        month: $month
        day: $day
        reservations_every: {
          guide: { id: $id}
        }
      }
    ) {
      id
      year
      month
      reservations {
        userName
        time
      }
    }
  }
`;

export default DAY_QUERY;
