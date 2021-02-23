import { gql, useMutation } from '@apollo/client';
import { routeToGuidesList } from '../../lib/utilsRouts';
import SIGNIN_MUTATION from '../../graphgl/mutations/SIGNIN_MUTATION';
import CURRENT_USER_QUERY from '../../graphgl/queries/CURRENT_USER_QUERY';

export function useSignin() {
  const [signin, { loading, error }] = useMutation(SIGNIN_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
    awaitRefetchQueries: true,
    onCompleted: () => {
      routeToGuidesList();
    },
    onError: (error) => {
      error;
    },
  });
  return [signin, { loading, error }];
}
