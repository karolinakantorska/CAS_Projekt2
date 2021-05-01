import { gql } from '@apollo/client';

const TRIPS = gql`
  query TRIPS {
    trips {
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

export default TRIPS;
