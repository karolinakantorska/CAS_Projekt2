import { gql, useMutation } from '@apollo/client';
import { routeToHomePage } from '../../lib/utilsRouts';
import SIGNUP_MUTATION from '../../graphql/mutations/SIGNUP_MUTATION';
import CURRENT_USER_QUERY from '../../graphql/queries/CURRENT_USER_QUERY';

export function useSignup() {
  const [signup, { loading, error }] = useMutation(SIGNUP_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
    awaitRefetchQueries: true,
    onCompleted: () => {
      routeToHomePage();
    },
    onError: (error) => {
      error;
    },
  });
  return [signup, { loading, error }];
}
