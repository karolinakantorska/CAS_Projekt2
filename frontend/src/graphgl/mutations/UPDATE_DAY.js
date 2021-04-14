import { gql } from '@apollo/client';

const UPDATE_DAY = gql`
  mutation UPDATE_DAY(
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
    $timeStamp: String
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
export default UPDATE_DAY;
