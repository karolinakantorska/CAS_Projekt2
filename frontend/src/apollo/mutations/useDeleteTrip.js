import { gql, useMutation } from '@apollo/client';
import DELETE_TRIP from '../../graphgl/mutations/DELETE_TRIP';

export function useDeleteTrip() {
  const [deleteTrip, { loading, error }] = useMutation(DELETE_TRIP, {
    onError: (error) => {
      error;
    },
    update(cache, data) {
      cacheDeleteTrip(cache, data);
    },
  });
  return [deleteTrip, { loading, error }];
}

function cacheDeleteTrip(cache, data) {
  cache.evict(cache.identify(data.data.deleteTrip));
}
