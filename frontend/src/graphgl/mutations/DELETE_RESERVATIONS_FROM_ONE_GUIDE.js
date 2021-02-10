import { gql } from '@apollo/client';

const DELETE_RESERVATIONS_FROM_ONE_GUIDE = gql`
  mutation DELETE_RESERVATIONS_FROM_ONE_GUIDE($id: ID!) {
    deleteManyReservations(where: { guide: { id: $id } }) {
      count
    }
  }
`;

export default DELETE_RESERVATIONS_FROM_ONE_GUIDE;
