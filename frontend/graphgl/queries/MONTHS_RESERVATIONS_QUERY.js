import { gql } from '@apollo/client';

const MONTHS_RESERVATIONS_QUERY = gql`
  query MONTHS_RESERVATIONS_QUERY($year: String!, $month: String!, $guideID: ID!) {
    reservations(
      where: { year: $year, month: $month, guideID: $guideID }
    ) {
      reservationID
      year
      month
      day
      time
      guide {
        name
        email
      }
    }
  }
`;

export default MONTHS_RESERVATIONS_QUERY;
