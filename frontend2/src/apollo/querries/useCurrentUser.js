import React, { useState,useEffect } from 'react';
import {  useQuery } from '@apollo/client';
import CURRENT_USER_QUERY from '../../graphql/queries/CURRENT_USER_QUERY';

export function useCurrentUser() {
    const { loading, error, data } = useQuery(CURRENT_USER_QUERY, {});
  return { loading, error, data };
}
