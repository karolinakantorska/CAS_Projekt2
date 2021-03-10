import { gql } from '@apollo/client';

const GUIDE_WITHOUT_RESERVATION = gql`
  query GUIDE_WITHOUT_RESERVATION($id: ID!) {
    users(
      where: {
        AND: [{ permissions: GUIDE }, { reservations_none: { relatedDay: { id: $id } } }]
      }
    ) {
      id
      name
    }
  }
`;

export default GUIDE_WITHOUT_RESERVATION;
