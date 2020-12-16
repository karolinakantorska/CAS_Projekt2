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
      relatedDay {
        year
        month
        day
      }
      guide {
        id
        name
        surname
        photo
      }
    }
  }
`;

export default RESERVATION_QUERY;
