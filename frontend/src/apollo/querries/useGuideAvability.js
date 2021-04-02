import React, { useState, useEffect } from 'react';
import { gql, useQuery, useLazyQuery } from '@apollo/client';
import RESERVATION_GUIDE_DAY from '../../graphgl/queries/RESERVATION_GUIDE_DAY';

export function useGuideAvability(dayId, guideId) {
  const [guideAvabilityLazyQuery, { loading, error, data, refetch }] = useLazyQuery(
    RESERVATION_GUIDE_DAY,
    {
      variables: {
        dayId,
        guideId,
      },
      onError: (error) => {
        error;
      },
    },
  );
  return [guideAvabilityLazyQuery, { loading, error, data, refetch }];
}
