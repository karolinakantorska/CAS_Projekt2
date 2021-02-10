import { gql } from '@apollo/client';

const DAY_QUERY = gql`
  query DAY_QUERY(
    $year: String!
    $month: String!
    $day: String! #$id: ID
  ) {
    days(
      where: {
        year: $year
        month: $month
        day: $day
        #reservations_every: { guide: { id: $id } }
      }
    ) {
      id
      year
      month
      reservations {
        id
        time
        userName
        userEmail
        nrOfPeople
        description
        guide {
          name
        }
      }
    }
  }
`;

export default DAY_QUERY;
