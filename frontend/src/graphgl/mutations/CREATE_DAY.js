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
    $holiday: Boolean
    $confirmed: Boolean
    $guideId: ID
    $gastId: ID
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
      year
      month
      day
      reservations {
        time
        userName
        userEmail
        nrOfPeople
        description
        holiday
        confirmed
        guideId
        gastId
        guide {
          id
        }
      }
    }
  }
`;

export default CREATE_DAY;
