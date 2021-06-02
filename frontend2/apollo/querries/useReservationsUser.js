import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import MONTH_RESERVATIONS_USER from '../../graphql/queries/MONTH_RESERVATIONS_USER';

export function useReservationsUser(id) {
  console.log('id', id);
  const { loading, error, data } = useQuery(MONTH_RESERVATIONS_USER, {
    variables: {
      id,
    },
  });
  return { loading, error, data };
}
 