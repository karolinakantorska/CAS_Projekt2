import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import CURRENT_USER_QUERY from '../../graphgl/queries/CURRENT_USER_QUERY';

export function useCurrentUser() {
  const notLogged = { currentUser: { name: '', permission: '', email: null, id: null } };
  const { loading, error, data } = useQuery(CURRENT_USER_QUERY, {});

  if (data && data.currentUser === null) {
    return {
      loading,
      error,
      data: notLogged,
    };
  }
  return { loading, error, data };
}
