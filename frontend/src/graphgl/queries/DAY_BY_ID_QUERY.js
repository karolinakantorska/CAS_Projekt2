/*import { gql } from '@apollo/client';

const DAY_BY_ID_QUERY = gql`
  #query DAY_BY_ID_QUERY($id: ID, $guideId: ID) {
  query DAY_BY_ID_QUERY($id: ID) {
    days(
      where: {
        day: { id: $id }

        #reservations_every: { guide: { id: $guideId } }
      }
    ) {
      id
      reservations {
        id
      }
    }
  }
`;

export default DAY_BY_ID_QUERY;
*/
