import React, { useState, useEffect } from 'react';
import { gql, useQuery, useLazyQuery } from '@apollo/client';
import MONTH_RESERVATIONS_QUERY from '../../graphql/queries/MONTH_RESERVATIONS_QUERY';

export function useLazyGuideMonthReservations(year, month, id) {
  const [monthReservationsLazyQuery, { loading, error, data, refetch }] = useLazyQuery(
    MONTH_RESERVATIONS_QUERY,
    {
      variables: {
        year,
        month,
        id,
      },
      onCompleted: (data) => {},
      onError: (error) => {
        error;
      },
    },
  );
  return [monthReservationsLazyQuery, { loading, error, data, refetch }];
}
