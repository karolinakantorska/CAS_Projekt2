import { gql } from '@apollo/client';

const GUIDE_WITH_RESERVATION_FOR_DAY = gql`
  query GUIDE_WITH_RESERVATION_FOR_DAY($id: ID!) {
    users(
      where: {
        AND: [{ permissions: GUIDE }, { reservations_some: { relatedDay: { id: $id } } }]
      }
    ) {
      id
      name
    }
  }
`;

export default GUIDE_WITH_RESERVATION_FOR_DAY;
