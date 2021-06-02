import { gql } from '@apollo/client';

const CREATE_DAY_WITH_TRIP = gql`
  mutation CREATE_DAY_WITH_TRIP(
    $time: Time
    $userName: String
    $userEmail: String
    $nrOfPeople: String
    $description: String
    $dayId: ID
    $holiday: Boolean
    $confirmed: Boolean
    $guideId: ID
    $gastId: ID
    $tripId: ID
    $timeStamp: Int
  ) {
    updateDay(
      where: { id: $dayId }
      data: {
        reservations: {
          create: [
            {
              time: $time
              userName: $userName
              userEmail: $userEmail
              nrOfPeople: $nrOfPeople
              description: $description
              holiday: $holiday
              confirmed: $confirmed
              gastId: $gastId
              guide: { connect: { id: $guideId } }
              trip: { connect: { id: $tripId } }
              timeStamp: $timeStamp
            }
          ]
        }
      }
    ) {
      id
    }
  }
`;
export default CREATE_DAY_WITH_TRIP;
