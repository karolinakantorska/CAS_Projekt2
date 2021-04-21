import { gql, useMutation } from '@apollo/client';
import { routeToBookingThanks } from '../../lib/utilsRouts';
import CREATE_DAY from '../../graphgl/mutations/CREATE_DAY';
import CREATE_DAY_WITH_TRIP from '../../graphgl/mutations/CREATE_DAY_WITH_TRIP';
import DAY_QUERY from '../../graphgl/queries/DAY_QUERY';

export function useCreateDay(year, month, day, time, guideId, tripId) {
  if (tripId === '0') {
    const [createDay, { loading, error, data }] = useMutation(CREATE_DAY, {
      refetchQueries: [
        {
          query: DAY_QUERY,
          variables: { year, month, day },
        },
      ],
      awaitRefetchQueries: true,
      onCompleted: (data) => {
        const dayId = data.createDay.id;
        routeToBookingThanks(time, dayId, guideId);
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
      awaitRefetchQueries: true,
      onCompleted: (data) => {
        const dayId = data.createDay.id;
        routeToBookingThanks(time, dayId, guideId);
      },
      onError: (error) => {
        error;
      },
    });
    return [createDay, { loading, error, data }];
  }
}
