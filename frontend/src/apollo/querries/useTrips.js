import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import TRIPS_FROM_GUIDE from '../../graphgl/queries/TRIPS_FROM_GUIDE';

export function useTripsFromGuide(id) {
  const { loading, error, data } = useQuery(TRIPS_FROM_GUIDE, {
    variables: {
      id,
    },
    onError: (error) => {
      error;
    },
  });
  return { loading, error, data };
}
