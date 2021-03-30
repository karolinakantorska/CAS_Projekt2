import { gql, useMutation } from '@apollo/client';
import UPDATE_TRIP from '../../graphgl/mutations/UPDATE_TRIP';

export function useEditTrip() {
  const [updateTrip, { loading, error }] = useMutation(UPDATE_TRIP, {
    onError: (error) => {
      error;
    },
  });
  return [updateTrip, { loading, error }];
}
