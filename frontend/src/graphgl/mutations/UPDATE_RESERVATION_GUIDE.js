import { gql } from '@apollo/client';

const UPDATE_RESERVATION_GUIDE = gql`
  mutation UPDATE_RESERVATION_GUIDE($guideId: ID, $id: ID) {
    updateReservation(
      where: { id: $id }
      data: { guide: { disconnect: true, connect: { id: $guideId } }, guideId: $guideId }
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
      guideId
      gastId
    }
  }
`;
export default UPDATE_RESERVATION_GUIDE;
