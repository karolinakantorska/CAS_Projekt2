import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import MONTH_RESERVATIONS_QUERY from '../../graphql/queries/MONTH_RESERVATIONS_QUERY';

export function useGuideMonthReservations(year, month, id) {
  const { loading, error, data, refetch } = useQuery(MONTH_RESERVATIONS_QUERY, {
    variables: {
      year,
      month,
      id,
    },
  });
  return { loading, error, data, refetch };
}
