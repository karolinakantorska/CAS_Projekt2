import { gql, useMutation } from '@apollo/client';
import { routeToBookingThanks } from '../../lib/utilsRouts';
import UPDATE_DAY from '../../graphgl/mutations/UPDATE_DAY';

export function useUpdateDay(time, guideId) {
  const [updateDay, { loading, error, data }] = useMutation(UPDATE_DAY, {
    onCompleted: (data) => {
      const dayId = data.updateDay.id;
      routeToBookingThanks(time, dayId, guideId);
    },
    onError: (error) => {
      error;
    },
  });
  console.log('loading', loading);
  return [updateDay, { loading, error }];
}
