import { gql, useMutation } from '@apollo/client';
import DELETE_USER from '../../graphgl/mutations/DELETE_USER';
import ALL_USERS_WITH_PERMISSION_QUERY from '../../graphgl/queries/ALL_USERS_WITH_PERMISSION_QUERY';
import { permission } from '../../lib/utils';

export function useDeleteGuide() {
  const [delete_user, { loading, error }] = useMutation(DELETE_USER, {
    onError: (error) => {
      error;
    },
    update(cache, data) {
      cacheDeleteGuide(cache, data);
    },
  });
  return [delete_user, { loading, error }];
}

export function cacheDeleteGuide(cache, data) {
  const deletedUserID = data.data.deleteUser.id;
  console.log(deletedUserID);
  //cache.evict(cache.identify(deletedUserID));
  const dataAll = cache.readQuery({
    query: ALL_USERS_WITH_PERMISSION_QUERY,
    variables: { permissions: permission.guide },
  });
  const newDataAll = { ...dataAll };
  newDataAll.users = newDataAll.users.filter((user) => user.id !== deletedUserID);
  cache.writeQuery({
    query: ALL_USERS_WITH_PERMISSION_QUERY,
    variables: { permissions: permission.guide },
    data: { users: [...newDataAll.users] },
  });
}
