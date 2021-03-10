import React, { useState, useEffect } from 'react';
import { gql, useQuery, useLazyQuery } from '@apollo/client';
import MONTH_RESERVATIONS_MANY_GUIDES_QUERY from '../../graphgl/queries/MONTH_RESERVATIONS_MANY_GUIDES_QUERY';

export function useManyGuidesMonthReservations(year, month, id1, id2, id3) {
  const [monthReservationsLazyQuery, { loading, error, data, refetch }] = useLazyQuery(
    MONTH_RESERVATIONS_MANY_GUIDES_QUERY,
    {
      variables: {
        year,
        month,
        id1,
        id2,
        id3,
      },
      onCompleted: (data) => {},
      onError: (error) => {
        error;
      },
    },
  );
  return [monthReservationsLazyQuery, { loading, error, data, refetch }];
}
