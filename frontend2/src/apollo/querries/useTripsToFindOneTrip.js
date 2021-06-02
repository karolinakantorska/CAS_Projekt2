import React from 'react';
import { gql, useQuery } from '@apollo/client';
import TRIPS_WITH_ID from '../../graphql/queries/TRIPS_WITH_ID';

export const noTripChoosen = {
  trips: [{ id: '0', wholeDay: false, title: 'No special Trip Selected' }],
};
export function useTripsToFindOneTrip(id) {
  const { loading, error, data } = useQuery(TRIPS_WITH_ID, {
    variables: {
      id,
    },
    onError: (error) => {
      error;
    },
  });
  if (data && data.trips.length === 0) {
    return {
      loading,
      error,
      data: noTripChoosen,
    };
  }
  return { loading, error, data };
}
