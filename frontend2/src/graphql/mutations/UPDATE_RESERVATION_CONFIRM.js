import { gql } from '@apollo/client';
const UPDATE_RESERVATION_CONFIRM = gql`
  mutation UPDATE_RESERVATION_CONFIRM($id: ID, $confirmed: Boolean) {
    updateReservation(where: { id: $id }, data: { confirmed: $confirmed }) {
      id
      confirmed
    }
  }
`;
export default UPDATE_RESERVATION_CONFIRM;
