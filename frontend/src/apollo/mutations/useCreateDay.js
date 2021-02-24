import { gql, useMutation } from '@apollo/client';
import { routeToBookingThanks } from '../../lib/utilsRouts';
import CREATE_DAY from '../../graphgl/mutations/CREATE_DAY';

export function useCreateDay(time, guideId) {
  const [createDay, { loading, error, data }] = useMutation(CREATE_DAY, {
    onCompleted: (data) => {
      const dayId = data.createDay.id;
      routeToBookingThanks(time, dayId, guideId);
    },
    onError: (error) => {
      error;
    },
  });
  return [createDay, { loading, error }];
}
