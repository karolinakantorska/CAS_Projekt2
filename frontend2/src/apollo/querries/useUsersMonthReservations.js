import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import MONTH_RESERVATIONS_USER from '../../graphql/queries/MONTH_RESERVATIONS_USER';

export function useUsersMonthReservations(year, month, gastId) {
  const { loading, error, data, refetch } = useQuery(MONTH_RESERVATIONS_USER, {
    variables: {
      year,
      month,
      gastId,
    },
  });
  return { loading, error, data, refetch };
}
