import React from 'react';
import { gql, useQuery } from '@apollo/client';
import GUIDE_WITH_RESERVATION_FOR_DAY from '../../graphql/queries/GUIDE_WITH_RESERVATION_FOR_DAY';

export function useGuideWithReservationForDay(id) {
  const { loading, error, data } = useQuery(GUIDE_WITH_RESERVATION_FOR_DAY, {
    variables: { id },
  });
  return { loading, error, data };
}
