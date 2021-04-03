import React, { useState, useEffect } from 'react';
import { gql, useQuery, useLazyQuery } from '@apollo/client';
import MONTH_RESERVATIONS_MANY_GUIDES_QUERY from '../../graphgl/queries/MONTH_RESERVATIONS_ALL_GUIDES';

export function useLazyAllMonthReservations(year, month) {
  const [allMonthReservationsLazyQuery, { loading, error, data, refetch }] = useLazyQuery(
    MONTH_RESERVATIONS_MANY_GUIDES_QUERY,
    {
      variables: {
        year,
        month,
      },
      onCompleted: (data) => {},
      onError: (error) => {
        error;
      },
    },
  );
  return [allMonthReservationsLazyQuery, { loading, error, data, refetch }];
}
