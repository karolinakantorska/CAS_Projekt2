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
              guide: { connect: { id: $id } }
            }
          ]
          #}
        }
      }
    ) {
      year
      month
      day
      reservations {
        id
        time
        userName
        userEmail
        nrOfPeople
        description
        guide {
          id
        }
      }
    }
  }
`;

export default UPDATE_DAY;
