import { gql, useMutation } from '@apollo/client';
import DELETE_RESERVATIONS_FROM_ONE_GUIDE from '../../graphgl/mutations/DELETE_RESERVATIONS_FROM_ONE_GUIDE';

export function useDeleteReservations() {
  const [deleteReservations, { loading, error }] = useMutation(
    DELETE_RESERVATIONS_FROM_ONE_GUIDE,
    {
      onCompleted: () => {
        setButtonDescription('Delete User');
      },
      onError: (error) => {
        error;
      },
    },
  );
  return [deleteReservations, { loading, error }, buttonDescription];
}
