import { gql } from '@apollo/client';

const CREATE_RESERVATION = gql`
  mutation CREATE_RESERVATION(
    $time: Time
    $userName: String
    $userEmail: String
    $nrOfPeople: String
    $description: String
    $guideId: ID
    $id: ID
  ) {
    createDay(
      #data: {
      time: $time
      userName: $userName
      userEmail: $userEmail
      nrOfPeople: $nrOfPeople
      description: $description
      guide: { connect: { guideId: $guideId } }
      relatedDay: { connect: { id: $id} } #}
    ) {
      time
      userName
      userEmail
      nrOfPeople
      description
      guide {
        guideId
      }
      relatedDay {
        id
      }
    }
  }
`;

export default CREATE_RESERVATION;
