import { gql } from '@apollo/client';

const MONTH_RESERVATIONS_ALL_GUIDES = gql`
  query MONTH_RESERVATIONS_MANY_GUIDES_QUERY($year: String, $month: String) {
    days(where: { year: $year, month: $month }) {
      id
      year
      month
      day
      reservations {
        id
        time
        guide {
          id
          email
          name
          phone
        }
        relatedDay {
          id
          year
          month
          day
        }
        userName
        userEmail
        nrOfPeople
        description
        holiday
        confirmed
        gastId
      }
    }
  }
`;
export default MONTH_RESERVATIONS_ALL_GUIDES;
