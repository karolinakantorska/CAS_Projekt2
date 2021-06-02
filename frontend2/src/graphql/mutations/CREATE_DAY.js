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
    $holiday: Boolean
    $confirmed: Boolean
    $guideId: ID
    $gastId: ID
    $timeStamp: Int
  ) {
    createDay(
      data: {
        year: $year
        month: $month
        day: $day
        timeStamp: $timeStamp
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
              timeStamp: $timeStamp
              guide: { connect: { id: $guideId } }
            }
          ]
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
        gastId
        guide {
          id
        }
      }
    }
  }
`;

export default CREATE_DAY;
