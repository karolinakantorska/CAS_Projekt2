import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import ONE_USER_QUERY from '../../graphql/queries/ONE_USER_QUERY';

export function useGuide(id) {
  const { loading, error, data } = useQuery(ONE_USER_QUERY, {
    variables: { id },
  });
  return { loading, error, data };
}
