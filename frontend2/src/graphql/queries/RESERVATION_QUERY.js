import { gql } from '@apollo/client';

const RESERVATION_QUERY = gql`
  query RESERVATION_QUERY($id: ID) {
    reservation(where: { id: $id }) {
      id
      time
      userName
      userEmail
      nrOfPeople
      description
      holiday
      confirmed
      gastId
      relatedDay {
        id
        year
        month
        day
        timeStamp
      }
      guide {
        id
        name
        surname
        phone
        email
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
`;

export default RESERVATION_QUERY;
