import { gql } from '@apollo/client';
const DAY_WHERE_ID_QUERY = gql`
  query DAY_WHERE_ID_QUERY($id: ID, $time: Time, $guideId: ID) {
    day(where: { id: $id }) {
      year
      month
      day
      timeStamp
      reservations(where: { time: $time, guide: { id: $guideId } }) {
        id
        time
        userName
        userEmail
        nrOfPeople
        description
        guide {
          id
          name
          surname
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
      }
    }
  }
`;

export default DAY_WHERE_ID_QUERY;
