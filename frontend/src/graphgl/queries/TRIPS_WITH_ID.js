import { gql } from '@apollo/client';

const TRIPS_WITH_ID = gql`
  query TRIPS_WITH_ID($id: ID) {
    trips(where: { id: $id }) {
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
      wholeDay
    }
  }
`;

export default TRIPS_WITH_ID;
