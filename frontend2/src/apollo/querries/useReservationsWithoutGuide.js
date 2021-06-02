
import { gql, useQuery } from '@apollo/client';
import RESERVATIONS_WITHOUT_GUIDE from '../../graphql/queries/RESERVATIONS_WITHOUT_GUIDE';

export function useReservationsWithoutGuide() {
  const { error, loading, data } = useQuery(RESERVATIONS_WITHOUT_GUIDE, {});
  return { loading, error, data };
}
