import { gql, useMutation } from '@apollo/client';
import { routeToChangeInfo } from '../../lib/utilsRouts';
import UPDATE_INFO from '../../graphql/mutations/UPDATE_INFO';
import INFOES from '../../graphql/queries/INFOES';

export function useUpdateInfo() {
  const [updateInfo, { loading, error, data }] = useMutation(UPDATE_INFO, {
    refetchQueries: [{ query: INFOES }],
    onCompleted: () => {
      routeToChangeInfo();
    },
    onError: (error) => {
      error;
    },
  });
  return [updateInfo, { loading, error, data }];
}
