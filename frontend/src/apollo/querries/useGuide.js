import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import ONE_USER_QUERY from '../../graphgl/queries/ONE_USER_QUERY';

export function useGuide(guideId) {
  const { loading, error, data } = useQuery(ONE_USER_QUERY, {
    variables: { id: guideId },
  });
  return { loading, error, data };
}
