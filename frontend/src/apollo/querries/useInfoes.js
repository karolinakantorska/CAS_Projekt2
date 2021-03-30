import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import INFOES from '../../graphgl/queries/INFOES';

export function useInfoes() {
  const { loading, error, data } = useQuery(INFOES, {});
  return { loading, error, data };
}
