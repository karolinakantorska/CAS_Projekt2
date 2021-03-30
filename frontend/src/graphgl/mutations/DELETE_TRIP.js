import { gql } from '@apollo/client';

const DELETE_TRIP = gql`
  mutation DELETE_TRIP($id: ID!) {
    deleteTrip(where: { id: $id }) {
      id
    }
  }
`;
export default DELETE_TRIP;
