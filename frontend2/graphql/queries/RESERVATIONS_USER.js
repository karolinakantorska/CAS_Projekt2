import { gql } from '@apollo/client';

const MONTH_RESERVATIONS_USER = gql`
  query MONTH_RESERVATIONS_USER($gastId: ID) {
    days(where: { gastId: $gastId }) {
      id
      year
      month
      day
      timeStamp
      reservations {
        id
        time
        guide {
          id
          email
          name
          phone
        }
        trip {
          id
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
          timeStamp
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
