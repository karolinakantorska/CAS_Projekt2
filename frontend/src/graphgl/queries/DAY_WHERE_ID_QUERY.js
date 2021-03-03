import { gql } from '@apollo/client';
const DAY_WHERE_ID_QUERY = gql`
  query DAY_WHERE_ID_QUERY($id: ID, $time: Time, $guideId: ID) {
    day(where: { id: $id }) {
      year
      month
      day
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
      }
    }
  }
`;

export default DAY_WHERE_ID_QUERY;
