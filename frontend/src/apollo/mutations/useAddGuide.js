import { gql, useMutation } from '@apollo/client';
import { routeToGuidesList } from '../../lib/utilsRouts';
import { permission } from '../../lib/utils';
import ADD_GUIDE from '../../graphgl/mutations/ADD_GUIDE';
import ALL_USERS_WITH_PERMISSION_QUERY from '../../graphgl/queries/ALL_USERS_WITH_PERMISSION_QUERY';

export function useAddGuide() {
  const [addGuide, { loading, error }] = useMutation(ADD_GUIDE, {
    onError: (error) => {
      error;
    },
    update(cache, data) {
      cacheAllGuides(cache, data);
    },
  });
  return [addGuide, { loading, error }];
}
function cacheAllGuides(cache, data) {
  const dataAll = cache.readQuery({
    query: ALL_USERS_WITH_PERMISSION_QUERY,
    variables: { permissions: permission.guide },
  });
  const newUser = {
    ...data.data.createUser,
  };
  cache.writeQuery({
    query: ALL_USERS_WITH_PERMISSION_QUERY,
    variables: { permissions: permission.guide },
    data: {
      users: [...dataAll.users, newUser],
    },
  });
}
