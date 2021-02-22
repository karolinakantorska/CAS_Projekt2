import { gql } from '@apollo/client';

const CREATE_DAY = gql`
  mutation CREATE_DAY(
    $year: String!
    $month: String!
    $day: String!
    $time: Time
    $userName: String
    $userEmail: String
    $nrOfPeople: String
    $description: String
    $id: ID
  ) {
    createDay(
      data: {
        year: $year
        month: $month
        day: $day
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
      id
    }
  }
`;

export default CREATE_DAY;
