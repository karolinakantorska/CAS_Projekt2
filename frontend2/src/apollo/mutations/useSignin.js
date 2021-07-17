import { gql, useMutation } from '@apollo/client';
import { routeToGuidesList, routeBack } from '../../lib/utilsRouts';
import SIGNIN_MUTATION from '../../graphql/mutations/SIGNIN_MUTATION';
import CURRENT_USER_QUERY from '../../graphql/queries/CURRENT_USER_QUERY';

export function useSignin() {
  const [signin, { loading, error }] = useMutation(SIGNIN_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
    awaitRefetchQueries: true,
    onCompleted: () => {
      console.log(window)
      routeToGuidesList();
    },
    onError: (error) => {
      error;
    },
  });
  return [signin, { loading, error }];
}
