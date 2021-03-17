import { gql } from '@apollo/client';

const DAY_QUERY = gql`
  query DAY_QUERY($year: String!, $month: String!, $day: String!) {
    days(where: { year: $year, month: $month, day: $day }) {
      id
      #year
      #month
      #reservations {
      #  id
      #  time
      #  userName
      #  userEmail
      #  nrOfPeople
      #  description
      #  guide {
      #    id
      #    name
      #  }
      # }
    }
  }
`;
export default DAY_QUERY;
