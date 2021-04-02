import { gql, useMutation } from '@apollo/client';
import CREATE_TRIP from '../../graphgl/mutations/CREATE_TRIP';
import TRIPS_FROM_GUIDE from '../../graphgl/queries/TRIPS_FROM_GUIDE';

export function useCreateTrip() {
  const [createTrip, { loading, error, data }] = useMutation(CREATE_TRIP, {
    onError: (error) => {
      error;
    },
    update(cache, data) {
      cacheTrips(cache, data);
    },
  });
  return [createTrip, { loading, error, data }];
}
function cacheTrips(cache, data) {
  const guideId = cache.data.data.ROOT_QUERY.currentUser.__ref.replace('User:', '');
  const dataTrips = cache.readQuery({
    query: TRIPS_FROM_GUIDE,
    variables: { id: guideId },
  });
  const newTrip = {
    ...data.data.createTrip,
  };
  cache.writeQuery({
    query: TRIPS_FROM_GUIDE,
    variables: { id: guideId },
    data: {
      trips: [...dataTrips.trips, newTrip],
    },
  });
}
