import { gql } from '@apollo/client';

const UPDATE_RESERVATION_GUIDE = gql`
  mutation UPDATE_RESERVATION_GUIDE($guideId: ID, $id: ID) {
    updateReservationAddGuide(
      where: { id: $id }
      data: { guide: { connect: { id: $guideId } } }
    ) {
      id
      time
      guide {
        id
      }
      relatedDay {
        id
      }
      userName
      userEmail
      nrOfPeople
      description
      holiday
      confirmed
      gastId
    }
  }
`;
export default UPDATE_RESERVATION_GUIDE;
