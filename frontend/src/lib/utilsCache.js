import ALL_GUIDES_QUERY from '../graphgl/queries/ALL_GUIDES_QUERY';
import { permission } from '../lib/utils';
export function cacheAllGuides(cache, data) {
  const dataAll = cache.readQuery({
    query: ALL_GUIDES_QUERY,
    variables: { permissions: permission.guide },
  });
  const newUser = {
    ...data.data.createUser,
  };
  cache.writeQuery({
    query: ALL_GUIDES_QUERY,
    variables: { permissions: permission.guide },
    data: {
      users: [...dataAll.users, newUser],
    },
  });
}
export function cacheDeleteGuide(cache, data) {
  const deletedUserID = data.data.deleteUser.id;
  console.log(deletedUserID);
  //cache.evict(cache.identify(deletedUserID));
  const dataAll = cache.readQuery({
    query: ALL_GUIDES_QUERY,
    variables: { permissions: 'GUIDE' },
  });
  const newDataAll = { ...dataAll };
  newDataAll.users = newDataAll.users.filter((user) => user.id !== deletedUserID);
  client.writeQuery({
    query: ALL_GUIDES_QUERY,
    variables: { permissions: 'GUIDE' },
    data: { users: [...newDataAll.users] },
  });
}
