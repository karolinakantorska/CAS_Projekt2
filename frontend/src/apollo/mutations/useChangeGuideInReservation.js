import { gql, useMutation } from '@apollo/client';
import UPDATE_RESERVATION_GUIDE from '../../graphgl/mutations/UPDATE_RESERVATION_GUIDE';
import RESERVATIONS_WITHOUT_GUIDE from '../../graphgl/queries/RESERVATIONS_WITHOUT_GUIDE';
export function useChangeGuideInReservaton() {
  const [updateReservation, { loading, error }] = useMutation(UPDATE_RESERVATION_GUIDE, {
    /*
    refetchQueries: [
      {
        query: RESERVATIONS_WITHOUT_GUIDE,
      },
    ],
    awaitRefetchQueries: true,
    */
    onError: (error) => {
      error;
    },
  });
  return [updateReservation, { loading, error }];
}
