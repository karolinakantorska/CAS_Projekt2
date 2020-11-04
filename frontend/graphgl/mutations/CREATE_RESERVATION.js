import { gql } from '@apollo/client';

const CREATE_RESERVATION = gql`
  mutation CREATE_RESERVATION(
    $year: String!
    $month: String!
    $day: String!
  ) {
    createDay(year: $year, month: $month, day: $day) {
      id
      year
      month
      day
    }
  }
`;

export default CREATE_RESERVATION;
