import { gql } from '@apollo/client';

const UPDATE_TRIP = gql`
  mutation UPDATE_TRIP(
    $id: ID!
    $title: String
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
    updateTrip(
      data: {
        title: $title
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
      where: { id: $id }
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
export default UPDATE_TRIP;
