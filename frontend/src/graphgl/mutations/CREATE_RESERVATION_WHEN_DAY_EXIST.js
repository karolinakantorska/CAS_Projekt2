/*import { gql } from '@apollo/client';

const CREATE_RESERVATION_WHEN_DAY_EXIST = gql`
  mutation CREATE_RESERVATION_WHEN_DAY_EXIST(
    $time: Time
    $userName: String
    $userEmail: String
    $nrOfPeople: String
    $description: String
    $guideId: ID
    $dayId: ID #$year: String #$month: String #$day: String
  ) {
    createReservation(
      data: {
        time: $time
        userName: $userName
        userEmail: $userEmail
        nrOfPeople: $nrOfPeople
        description: $description
        #dayId: $id
        #year: $year
        #month: $month
        relatedDay: { connect: { id: $dayId } }
        guide: { connect: { id: $guideId } }
      }
    ) {
      id
      time
      #userName
      userEmail
      nrOfPeople
      description
    }
  }
`;
export default CREATE_RESERVATION_WHEN_DAY_EXIST;
*/
