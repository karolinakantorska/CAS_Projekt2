import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import GUIDE_WITHOUT_RESERVATION from '../../graphgl/queries/GUIDE_WITHOUT_RESERVATION';

export function useGuideWithoutReservation(id) {
  const { loading, error, data } = useQuery(GUIDE_WITHOUT_RESERVATION, {
    variables: { id },
  });
  return { loading, error, data };
}
