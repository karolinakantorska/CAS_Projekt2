import { gql } from '@apollo/client';

const MONTH_RESERVATIONS_USER = gql`
  query MONTH_RESERVATIONS_USER($year: String, $month: String, $gastId: ID) {
    days(
      where: { year: $year, month: $month, reservations_some: { gastId: $gastId } }
      orderBy: timeStamp_ASC
    ) {
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
        relatedDay {
          id
          year
          month
          day
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
        }
        userName
        userEmail
        nrOfPeople
        description
        holiday
        confirmed
        gastId
        timeStamp
      }
    }
  }
`;
export default MONTH_RESERVATIONS_USER;
