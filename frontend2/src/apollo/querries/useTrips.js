import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import TRIPS from '../../graphql/queries/TRIPS';

export function useTrips() {
  const { loading, error, data } = useQuery(TRIPS, {
    onError: (error) => {
      error;
    },
  });
  return { loading, error, data };
}
