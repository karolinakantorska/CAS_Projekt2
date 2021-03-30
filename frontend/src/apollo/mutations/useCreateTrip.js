import { gql, useMutation } from '@apollo/client';
import { routeToGuidesList } from '../../lib/utilsRouts';
import CREATE_TRIP from '../../graphgl/mutations/CREATE_TRIP';
import ALL_USERS_WITH_PERMISSION_QUERY from '../../graphgl/queries/ALL_USERS_WITH_PERMISSION_QUERY';

export function useCreateTrip() {
  const [createTrip, { loading, error }] = useMutation(CREATE_TRIP, {
    onError: (error) => {
      error;
    },
    /*
    update(cache, data) {
      cacheAllGuides(cache, data);
    },
    */
  });
  return [createTrip, { loading, error }];
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
}*/
