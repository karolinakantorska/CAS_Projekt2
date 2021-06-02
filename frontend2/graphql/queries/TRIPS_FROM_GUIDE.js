import { gql } from '@apollo/client';

const TRIPS_FROM_GUIDE = gql`
  query TRIPS_FROM_GUIDE($id: ID) {
    trips(where: { guide: { id: $id } }) {
      id
      guide {
        id
        name
        surname
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

export default TRIPS_FROM_GUIDE;
