import { gql, useMutation } from '@apollo/client';
import { permission } from '../../lib/utils';
import UPDATE_GUIDE from '../../graphql/mutations/UPDATE_GUIDE';
import ALL_USERS_WITH_PERMISSION_QUERY from '../../graphql/queries/ALL_USERS_WITH_PERMISSION_QUERY';
export function useEditGuide() {
  const [updateUser, { loading, error,data }] = useMutation(UPDATE_GUIDE, {
    refetchQueries: [
      {
        query: ALL_USERS_WITH_PERMISSION_QUERY,
        variables: { permissions: permission.guide },
      },
    ],
    onError: (error) => {
      error;
    },
  });
  return [updateUser, { loading, error,data }];
}
