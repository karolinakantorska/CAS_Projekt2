import React from 'react';
import { gql, useQuery } from '@apollo/client';
import DAY_QUERY from '../../graphql/queries/DAY_QUERY';

export function useDay(year, month, day) {
  const { loading, error, data } = useQuery(DAY_QUERY, {
    variables: {
      year,
      month,
      day,
    },
    fetchPolicy: "network-only",
    onError: (error) => {
      error;
    },
  });
  return { loading, error, data };
}
