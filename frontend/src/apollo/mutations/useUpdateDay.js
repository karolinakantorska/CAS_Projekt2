import { gql, useMutation } from '@apollo/client';
import { routeToBookingThanks } from '../../lib/utilsRouts';
import UPDATE_DAY from '../../graphgl/mutations/UPDATE_DAY';
import UPDATE_DAY_WITH_TRIP from '../../graphgl/mutations/UPDATE_DAY_WITH_TRIP';

export function useUpdateDay(time, guideId, tripId) {
  if (tripId === '0') {
    const [updateDay, { loading, error, data }] = useMutation(UPDATE_DAY, {
      onCompleted: (data) => {
        const dayId = data.updateDay.id;
        routeToBookingThanks(time, dayId, guideId);
      },
      onError: (error) => {
        error;
      },
    });
    return [updateDay, { loading, error }];
  } else {
    const [updateDay, { loading, error, data }] = useMutation(UPDATE_DAY_WITH_TRIP, {
      onCompleted: (data) => {
        const dayId = data.updateDay.id;
        routeToBookingThanks(time, dayId, guideId);
      },
      onError: (error) => {
        error;
      },
    });
    return [updateDay, { loading, error }];
  }
}
