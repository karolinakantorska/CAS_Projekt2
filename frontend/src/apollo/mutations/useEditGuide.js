import { gql, useMutation } from '@apollo/client';
import { routeToGuidesList } from '../../lib/utilsRouts';
import UPDATE_GUIDE from '../../graphgl/mutations/UPDATE_GUIDE';

export function useEditGuide() {
  const [updateUser, { loading, error }] = useMutation(UPDATE_GUIDE, {
    onCompleted: () => {
      routeToGuidesList();
    },
    onError: (error) => {
      error;
    },
  });
  return [updateUser, { loading, error }];
}
