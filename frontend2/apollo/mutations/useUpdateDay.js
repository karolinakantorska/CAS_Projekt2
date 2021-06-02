import { gql, useMutation } from '@apollo/client';
import { routeToBookingThanks } from '../../lib/utilsRouts';
import UPDATE_DAY from '../../graphql/mutations/UPDATE_DAY';
import UPDATE_DAY_WITH_TRIP from '../../graphql/mutations/UPDATE_DAY_WITH_TRIP';
import MONTH_RESERVATIONS_USER from '../../graphql/queries/MONTH_RESERVATIONS_USER';

export function useUpdateDay(year, month, time, guideId, tripId, gastId) {
  if (tripId === '0') {
    const [updateDay, { loading, error, data }] = useMutation(UPDATE_DAY, {
      refetchQueries: [
        {
          query: MONTH_RESERVATIONS_USER,
          variables: {
            year,
            month,
            gastId,
          },
        },
      ],
      onCompleted: (data) => {
        const dayId = data.updateDay.id;
        routeToBookingThanks(time, dayId, guideId, tripId);
      },
      onError: (error) => {
        error;
      },
    });
    return [updateDay, { loading, error }];
  } else {
    const [updateDay, { loading, error, data }] = useMutation(UPDATE_DAY_WITH_TRIP, {
      refetchQueries: [
        {
          query: MONTH_RESERVATIONS_USER,
          variables: {
            year,
            month,
            gastId,
          },
        },
      ],
      onCompleted: (data) => {
        const dayId = data.updateDay.id;
        routeToBookingThanks(time, dayId, guideId, tripId);
      },
      onError: (error) => {
        error;
      },
    });
    return [updateDay, { loading, error }];
  }
}
