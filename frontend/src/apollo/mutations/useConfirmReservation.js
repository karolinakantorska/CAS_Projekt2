import { gql, useMutation } from '@apollo/client';
import UPDATE_RESERVATION_CONFIRM from '../../graphgl/mutations/UPDATE_RESERVATION_CONFIRM';
export function useConfirmReservation() {
  const [updateReservation, { loading, error }] = useMutation(
    UPDATE_RESERVATION_CONFIRM,
    {
      onError: (error) => {
        error;
      },
    },
  );
  return [updateReservation, { loading, error }];
}
