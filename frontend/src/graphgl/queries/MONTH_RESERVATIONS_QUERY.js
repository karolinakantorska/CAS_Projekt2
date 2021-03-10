import { gql } from '@apollo/client';

const MONTH_RESERVATIONS_QUERY = gql`
  query MONTH_RESERVATIONS_QUERY($year: String, $month: String, $id: ID) {
    days(
      where: { year: $year, month: $month, reservations_some: { guide: { id: $id } } }
    ) {
      year
      month
      day
      id
      reservations {
        userName
        userEmail
        time
        id
        guide {
          id
          email
          name
        }
      }
    }
  }
`;
export default MONTH_RESERVATIONS_QUERY;
