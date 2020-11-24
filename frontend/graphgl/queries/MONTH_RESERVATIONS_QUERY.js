import { gql } from '@apollo/client';

const MONTH_RESERVATIONS_QUERY = gql`
  query MONTH_RESERVATIONS_QUERY($year: String, $month: String) {
    days(where: { year: $year, month: $month }) {
      year
      month
      day
      reservations {
        userName
        userEmail
        time
        id
      }
    }
  }
`;

export default MONTH_RESERVATIONS_QUERY;
