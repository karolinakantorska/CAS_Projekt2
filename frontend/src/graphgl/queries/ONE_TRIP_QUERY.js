import { gql } from '@apollo/client';

const ONE_TRIP_QUERY = gql`
  query ONE_TRIP_QUERY($id: ID!) {
    trip(where: { id: $id }) {
      id
      guide {
        id
      }
      title
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

export default ONE_TRIP_QUERY;
