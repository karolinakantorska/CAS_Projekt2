import { gql } from '@apollo/client';

const RESERVATION_GUIDE_DAY = gql`
  query RESERVATION_GUIDE_DAY($dayId: ID, $guideId: ID) {
    reservations(
      where: { AND: [{ relatedDay: { id: $dayId } }, { guide: { id: $guideId } }] }
    ) {
      id
      time
    }
  }
`;
export default RESERVATION_GUIDE_DAY;
