import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import RESERVATION_QUERY from '../../graphql/queries/RESERVATION_QUERY';

export function useReservation(id) {
  const { error, loading, data } = useQuery(RESERVATION_QUERY, {
    variables: { id },
  });
  return { loading, error, data };
}
