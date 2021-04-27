import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import ONE_TRIP_QUERY from '../../graphgl/queries/ONE_TRIP_QUERY';

export function useTrip(id) {
  const { loading, error, data } = useQuery(ONE_TRIP_QUERY, {
    variables: { id },
  });

  return { loading, error, data };
}
