import { gql } from '@apollo/client';

const ONE_RESERVATION_QUERY = gql`
  query ONE_RESERVATION_QUERY($id: ID!) {
    reservation(where: { id: $id }) {
      id
      time
      userName
      userEmail
      nrOfPeople
      description
      relatedDay{
          year
          month
          day
      }
      guide{
          id
          name
          surname
      }

    }
  }
`;

export default ONE_RESERVATION_QUERY;
