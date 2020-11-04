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
          create: {
            time: $time
            userName: $userName
            userEmail: $userEmail
            nrOfPeople: $nrOfPeople
            description: $description
            guide: { connect: { id: $id } }
          }
        }
      }
    ) {
      year
      month
      day
      reservations {
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

export default CREATE_DAY;
