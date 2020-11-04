import { gql } from '@apollo/client';

const MONTH_RESERVATIONS_QUERY = gql`
  query MONTH_RESERVATIONS_QUERY {
    days {
      year
      month
      day
      reservations{
        userName
        userEmail
        time
        id
      }
    }
  }
`;

export default MONTH_RESERVATIONS_QUERY;
