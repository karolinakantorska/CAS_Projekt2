import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import CURRENT_USER_QUERY from '../../graphgl/queries/CURRENT_USER_QUERY';

export function useUser() {
  //const [currentUser, setCurrentUser] = useState(initialValue);
  const { loading, error, data } = useQuery(CURRENT_USER_QUERY, {});

  console.log(data);

  return { loading, error, data };
}
