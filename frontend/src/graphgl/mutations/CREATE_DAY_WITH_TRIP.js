import { gql } from '@apollo/client';

const CREATE_DAY_WITH_TRIP = gql`
  mutation CREATE_DAY_WITH_TRIP(
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
    $timeStamp: String
    $tripId: ID
  ) {
    createDay(
      data: {
        year: $year
        month: $month
        day: $day
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
              trip: { connect: { id: $tripId } }
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

export default CREATE_DAY_WITH_TRIP;
