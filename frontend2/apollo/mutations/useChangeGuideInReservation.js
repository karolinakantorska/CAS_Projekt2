import { gql, useMutation } from '@apollo/client';
import UPDATE_RESERVATION_GUIDE from '../../graphql/mutations/UPDATE_RESERVATION_GUIDE';

export function useChangeGuideInReservaton() {
  const [updateReservation, { loading, error,data }] = useMutation(UPDATE_RESERVATION_GUIDE, {
    onError: (error) => {
      error;
    },

  });
  return [updateReservation, { loading, error,data }];
}
