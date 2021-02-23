import React, { useState, useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';
import { routeToEditGuide, routeToSignin, routeToCalendar } from '../../lib/utilsRouts';
import SIGN_OUT_MUTATION from '../../graphgl/mutations/SIGN_OUT_MUTATION';
import CURRENT_USER_QUERY from '../../graphgl/queries/CURRENT_USER_QUERY';

export function useSignout() {
  const [signout, { loading, error }] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
    awaitRefetchQueries: true,
    onCompleted: () => {
      routeToSignin();
    },
    onError: (error) => {
      error;
    },
  });
  return [signout, { loading, error }];
}
