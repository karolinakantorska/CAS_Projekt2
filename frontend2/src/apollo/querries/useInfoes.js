import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import INFOES from '../../graphql/queries/INFOES';

export function useInfoes() {
  const { loading, error, data, refetch } = useQuery(INFOES, {});
  return { loading, error, data, refetch };
}
