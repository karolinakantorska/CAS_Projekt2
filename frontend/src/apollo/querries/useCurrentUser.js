import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import CURRENT_USER_QUERY from '../../graphgl/queries/CURRENT_USER_QUERY';

export function useCurrentUser() {
  const noUser = { currentUser: { name: '', permissions: '', email: '', id: '' } };
  const { loading, error, data } = useQuery(CURRENT_USER_QUERY, {});

  if (data && data.currentUser === null) {
    return {
      loading,
      error,
      data: noUser,
    };
  }

  return { loading, error, data };
}
