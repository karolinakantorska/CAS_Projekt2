import { gql, useMutation } from '@apollo/client';
import { routeToBookingThanks } from '../../lib/utilsRouts';
import CREATE_DAY from '../../graphql/mutations/CREATE_DAY';
import CREATE_DAY_WITH_TRIP from '../../graphql/mutations/CREATE_DAY_WITH_TRIP';
import DAY_QUERY from '../../graphql/queries/DAY_QUERY';
import MONTH_RESERVATIONS_USER from '../../graphql/queries/MONTH_RESERVATIONS_USER';

export function useCreateDay(year, month, day, time, guideId, tripId, gastId) {
  if (tripId === '0') {
    const [createDay, { loading, error, data }] = useMutation(CREATE_DAY, {
      refetchQueries: [
        {
          query: DAY_QUERY,
          variables: { year, month, day },
        },
      ],
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
      awaitRefetchQueries: true,
      onCompleted: (data) => {
        const dayId = data.createDay.id;
        routeToBookingThanks(time, dayId, guideId, tripId);
      },
      onError: (error) => {
        error;
      },
    });
    return [createDay, { loading, error, data }];
  } else {
    const [createDay, { loading, error, data }] = useMutation(CREATE_DAY_WITH_TRIP, {
      refetchQueries: [
        {
          query: DAY_QUERY,
          variables: { year, month, day },
        },
      ],
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
      awaitRefetchQueries: true,
      onCompleted: (data) => {
        const dayId = data.createDay.id;
        routeToBookingThanks(time, dayId, guideId, tripId);
      },
      onError: (error) => {
        error;
      },
    });
    return [createDay, { loading, error, data }];
  }
}
