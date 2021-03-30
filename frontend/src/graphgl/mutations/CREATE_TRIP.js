import { gql } from '@apollo/client';

const CREATE_TRIP = gql`
  mutation CREATE_TRIP(
    $title: String
    $guideId: ID
    $special: String
    $description: String
    $difficulty: Difficulty
    $start: String
    $end: String
    $duration: String
    $costs: String
    $ebikes: Boolean
    $photo: String
  ) {
    createTrip(
      data: {
        title: $title
        guide: { connect: { id: $guideId } }
        special: $special
        description: $description
        difficulty: $difficulty
        start: $start
        end: $end
        duration: $duration
        costs: $costs
        ebikes: $ebikes
        photo: $photo
      }
    ) {
      title
      guide {
        id
      }
      special
      description
      difficulty
      start
      end
      duration
      costs
      ebikes
      photo
    }
  }
`;

export default CREATE_TRIP;
