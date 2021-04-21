import { gql } from '@apollo/client';

const MONTH_RESERVATIONS_USER = gql`
  query MONTH_RESERVATIONS_USER($year: String, $month: String, $gastId: ID) {
    days(where: { year: $year, month: $month, reservations_some: { gastId: $gastId } }) {
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
        trip {
          title
          special
          description
          difficulty
          start
          end
          duration
          costs
          ebikes
          photo
          wholeDay
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
export default MONTH_RESERVATIONS_USER;
