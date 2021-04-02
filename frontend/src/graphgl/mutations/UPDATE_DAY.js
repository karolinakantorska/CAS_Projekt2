import { gql } from '@apollo/client';

const UPDATE_DAY = gql`
  mutation UPDATE_DAY(
    $time: Time
    $userName: String
    $userEmail: String
    $nrOfPeople: String
    $description: String
    $id: ID
    $dayId: ID
    $holiday: Boolean
    $confirmed: Boolean
    $guideId: ID
    $gastId: ID
  ) {
    updateDay(
      where: { id: $dayId }
      data: {
        reservations: {
          #create: {
          create: [
            {
              time: $time
              userName: $userName
              userEmail: $userEmail
              nrOfPeople: $nrOfPeople
              description: $description
              holiday: $holiday
              confirmed: $confirmed
              guideId: $guideId
              gastId: $gastId
              guide: { connect: { id: $id } }
            }
          ]
          #}
        }
      }
    ) {
      id
    }
  }
`;
export default UPDATE_DAY;
