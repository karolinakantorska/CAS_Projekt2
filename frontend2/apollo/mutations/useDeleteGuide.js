import { gql, useMutation } from '@apollo/client';
import DELETE_USER from '../../graphql/mutations/DELETE_USER';
import ALL_USERS_WITH_PERMISSION_QUERY from '../../graphql/queries/ALL_USERS_WITH_PERMISSION_QUERY';
import { permission } from '../../lib/utils';

export function useDeleteGuide() {
  const [deleteUser, { loading, error }] = useMutation(DELETE_USER, {
    onError: (error) => {
      error;
    },
    update(cache, data) {
      cacheDeleteGuide(cache, data);
    },
  });
  return [deleteUser, { loading, error }];
}

function cacheDeleteGuide(cache, data) {
  cache.evict(cache.identify(data.data.deleteUser));
}
