import { gql } from '@apollo/client';

const TRIPS = gql`
  query TRIPS {
    trips(where: { NOT: { guide: null } }) {
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

export default TRIPS;
