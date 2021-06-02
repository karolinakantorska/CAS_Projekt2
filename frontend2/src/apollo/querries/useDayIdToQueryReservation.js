import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import DAY_WHERE_ID_QUERY from '../../graphql/queries/DAY_WHERE_ID_QUERY';

export function useDayIdToQueryReservation(dayId, guideId, time) {
  const { loading, error, data } = useQuery(DAY_WHERE_ID_QUERY, {
    variables: {
      id: dayId,
      guideId,
      time,
    },
    onError: (error) => {
      error;
    },
  });
  return { loading, error, data };
}
