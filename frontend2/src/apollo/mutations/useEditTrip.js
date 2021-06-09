import { gql, useMutation } from '@apollo/client';
import UPDATE_TRIP from '../../graphql/mutations/UPDATE_TRIP';
import TRIPS_FROM_GUIDE from '../../graphql/queries/TRIPS_FROM_GUIDE';
import TRIPS from '../../graphql/queries/TRIPS';
export function useEditTrip(guideId) {
  const [updateTrip, { loading, error,data }] = useMutation(UPDATE_TRIP, {
    refetchQueries: [
      {
        query: TRIPS_FROM_GUIDE,
        variables: { id: guideId },
      },
      {
        query: TRIPS,
      },
    ],
    onError: (error) => {
      error;
    },
  });
  return [updateTrip, { loading, error,data }];
}
