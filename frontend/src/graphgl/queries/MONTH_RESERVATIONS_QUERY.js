import { gql } from '@apollo/client';

const MONTH_RESERVATIONS_QUERY = gql`
  query MONTH_RESERVATIONS_QUERY($year: String, $month: String, $id: ID) {
    days(
      where: { year: $year, month: $month, reservations_every: { guide: { id: $id } } }
    ) {
      year
      month
      day
      reservations {
        userName
        userEmail
        time
        id
        guide {
          name
        }
      }
    }
  }
`;

export default MONTH_RESERVATIONS_QUERY;
