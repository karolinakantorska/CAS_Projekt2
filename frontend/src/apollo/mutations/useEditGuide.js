import { gql, useMutation } from '@apollo/client';
import UPDATE_GUIDE from '../../graphgl/mutations/UPDATE_GUIDE';
export function useEditGuide() {
  const [updateUser, { loading, error }] = useMutation(UPDATE_GUIDE, {
    onError: (error) => {
      error;
    },
  });
  return [updateUser, { loading, error }];
}
