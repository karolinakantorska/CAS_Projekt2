import { gql, useMutation } from '@apollo/client';
import { routeToGuidesList } from '../../lib/utilsRouts';
import { permission } from '../../lib/utils';
import ADD_GUIDE from '../../graphql/mutations/ADD_GUIDE';
import ALL_USERS_WITH_PERMISSION_QUERY from '../../graphql/queries/ALL_USERS_WITH_PERMISSION_QUERY';
export function useCreateGuide() {
  const [addGuide, { loading, error, data }] = useMutation(ADD_GUIDE, {
    refetchQueries: [
      {
        query: ALL_USERS_WITH_PERMISSION_QUERY,
        variables: { permissions: permission.guide },
      },
    ],
    onCompleted: () => {
      routeToGuidesList();
    },
    onError: (error) => {
      error;
    },
  });
  return [addGuide, { loading, error }];
}
