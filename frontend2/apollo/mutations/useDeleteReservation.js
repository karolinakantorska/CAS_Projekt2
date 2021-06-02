import { gql, useMutation } from '@apollo/client';
import DELETE_RESERVATION from '../../graphql/mutations/DELETE_RESERVATION';

export function useDeleteReservation() {
  const [deleteReservation, { loading, error }] = useMutation(DELETE_RESERVATION, {
    onError: (error) => {
      error;
    },
    update(cache, data) {
      cacheDeleteGuide(cache, data);
    },
  });
  return [deleteReservation, { loading, error }];
}
function cacheDeleteGuide(cache, data) {
  cache.evict(cache.identify(data.data.deleteReservation));
}
