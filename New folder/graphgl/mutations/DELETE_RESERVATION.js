import { gql } from '@apollo/client';

const DELETE_RESERVATION = gql`
  mutation DELETE_RESERVATION($id: ID!) {
    deleteReservation(id: $id) {
      id
    }
  }
`;

export default DELETE_RESERVATION;