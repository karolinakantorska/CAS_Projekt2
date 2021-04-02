import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import DAY_QUERY from '../../graphgl/queries/DAY_QUERY';

export function useDay(year, month, day) {
  console.log(year, month, day);
  const { loading, error, data } = useQuery(DAY_QUERY, {
    variables: {
      year,
      month,
      day,
    },
    onError: (error) => {
      error;
    },
  });
  return { loading, error, data };
}
