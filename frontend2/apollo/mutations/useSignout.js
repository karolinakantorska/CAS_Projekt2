import React from 'react';
import { useMutation } from '@apollo/client';
import { routeToSignin } from '../../lib/utilsRouts';
import SIGN_OUT_MUTATION from '../../graphql/mutations/SIGN_OUT_MUTATION';
import CURRENT_USER_QUERY from '../../graphql/queries/CURRENT_USER_QUERY';

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
