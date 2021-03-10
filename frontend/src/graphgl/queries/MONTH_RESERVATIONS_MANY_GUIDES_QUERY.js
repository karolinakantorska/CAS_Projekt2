import { gql } from '@apollo/client';

const MONTH_RESERVATIONS_MANY_GUIDES_QUERY = gql`
  query MONTH_RESERVATIONS_MANY_GUIDES_QUERY(
    $year: String
    $month: String
    $id1: ID
    $id2: ID
    $id3: ID
  ) {
    days(
      where: {
        year: $year
        month: $month
        reservations_some: {
          OR: [{ guide: { id: $id1 } }, { guide: { id: $id2 } }, { guide: { id: $id3 } }]
        }
      }
    ) {
      year
      month
      day
      id
      reservations {
        userName
        userEmail
        time
        id
        guide {
          id
          email
          name
        }
      }
    }
  }
`;
export default MONTH_RESERVATIONS_MANY_GUIDES_QUERY;
