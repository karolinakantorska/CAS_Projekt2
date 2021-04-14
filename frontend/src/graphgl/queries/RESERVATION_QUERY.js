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
      }
      guide {
        id
        name
        surname
        phone
        email
      }
    }
  }
`;

export default RESERVATION_QUERY;
