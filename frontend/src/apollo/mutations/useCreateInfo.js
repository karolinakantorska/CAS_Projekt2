import { gql, useMutation } from '@apollo/client';
// { routeToGuidesList } from '../../lib/utilsRouts';
//import { permission } from '../../lib/utils';
import CREATE_INFO from '../../graphgl/mutations/CREATE_INFO';
//import ALL_USERS_WITH_PERMISSION_QUERY from '../../graphgl/queries/ALL_USERS_WITH_PERMISSION_QUERY';

export function useCreateInfo() {
  const [createInfo, { loading, error, data }] = useMutation(CREATE_INFO, {
    onError: (error) => {
      error;
    },
    /*
    update(cache, data) {
      cacheAllGuides(cache, data);
    },
    */
  });
  return [createInfo, { loading, error, data }];
}
/*
function cacheAllGuides(cache, data) {
  console.log('data', data);
  const dataAll = cache.readQuery({
    query: ALL_USERS_WITH_PERMISSION_QUERY,
    variables: { permissions: permission.guide },
  });
  const newUser = {
    ...data.data.createUser,
  };
  console.log('newUser', newUser);
  cache.writeQuery({
    query: ALL_USERS_WITH_PERMISSION_QUERY,
    variables: { permissions: permission.guide },
    data: {
      users: [...dataAll.users, newUser],
    },
  });
}
*/
