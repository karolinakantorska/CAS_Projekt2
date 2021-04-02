import { gql, useMutation } from '@apollo/client';
import { routeToBookingThanks } from '../../lib/utilsRouts';
import CREATE_DAY from '../../graphgl/mutations/CREATE_DAY';
import DAY_QUERY from '../../graphgl/queries/DAY_QUERY';

export function useCreateDay(year, month, day, time, guideId) {
  const [createDay, { loading, error, data }] = useMutation(CREATE_DAY, {
    refetchQueries: [
      {
        query: DAY_QUERY,
        variables: { year, month, day },
      },
    ],
    awaitRefetchQueries: true,
    onCompleted: (data) => {
      console.log('data.createDay.year', data.createDay.year);
      const dayId = data.createDay.id;
      routeToBookingThanks(time, dayId, guideId);
    },
    onError: (error) => {
      error;
    },
  });
  return [createDay, { loading, error, data }];
}
