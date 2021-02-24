import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import ALL_USERS_WITH_PERMISSION_QUERY from '../../graphgl/queries/ALL_USERS_WITH_PERMISSION_QUERY';

export function useAllUsersWithPermissionQuery(permission) {
  const { loading, error, data } = useQuery(ALL_USERS_WITH_PERMISSION_QUERY, {
    variables: { permissions: permission },
  });
  return { loading, error, data };
}
