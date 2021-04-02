import { gql } from '@apollo/client';

const RESERVATIONS_WITHOUT_GUIDE = gql`
  query RESERVATIONS_WITHOUT_GUIDE {
    reservations(where: { guide: null }) {
      id
      time
      userName
      userEmail
      nrOfPeople
      description
      holiday
      confirmed
      guideId
      gastId
      relatedDay {
        id
        year
        month
        day
      }
    }
  }
`;
export default RESERVATIONS_WITHOUT_GUIDE;
