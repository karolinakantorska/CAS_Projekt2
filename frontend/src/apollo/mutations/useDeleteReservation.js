import { gql, useMutation } from '@apollo/client';
import { routeToGuidesList } from '../../lib/utilsRouts';
import DELETE_RESERVATION from '../../graphgl/mutations/DELETE_RESERVATION';

export function useDeleteReservation() {
  const [deleteReservation, { loading, error }] = useMutation(DELETE_RESERVATION, {
    onCompleted: () => {
      routeToGuidesList();
    },
    onError: (error) => {
      error;
    },
  });
  return [deleteReservation, { loading, error }];
}
