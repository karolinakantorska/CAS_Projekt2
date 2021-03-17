import { gql } from '@apollo/client';
const UPDATE_RESERVATION = gql`
  mutation UPDATE_RESERVATION(
    #$nrOfPeople: String
    $guideId: ID
    $id: ID
  ) {
    updateReservation(
      id: $dayId 
      guideId:$guideId
      #nrOfPeople: $nrOfPeople
    )
      {id}
`;
export default UPDATE_RESERVATION;
