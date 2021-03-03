import { gql } from '@apollo/client';

const DELETE_RESERVATIONS_FROM_ONE_GUIDE = gql`
  mutation DELETE_RESERVATIONS_FROM_ONE_GUIDE($guideId: ID!) {
    deleteManyReservations(where: { guide: { id: $guideId } }) {
      count
    }
  }
`;

export default DELETE_RESERVATIONS_FROM_ONE_GUIDE;
