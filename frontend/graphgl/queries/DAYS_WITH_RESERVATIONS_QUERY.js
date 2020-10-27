import { gql } from '@apollo/client';

const DAYS_WITH_RESERVATIONS_QUERY = gql`
  query DAYS_WITH_RESERVATIONS_QUERY(
    $year: String!
    $month: String!
    $guideID: ID
  ) {
    days(
      where: {
        year: $year
        month: $month
        reservation_every: { guideID: $guideID }
      }
    ) {
      day
      reservation {
        id
        time
        userName
        userEmail
      }
    }
  }
`;

export default DAYS_WITH_RESERVATIONS_QUERY;
