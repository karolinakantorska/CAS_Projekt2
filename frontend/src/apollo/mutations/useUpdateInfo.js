import { gql, useMutation } from '@apollo/client';
import UPDATE_INFO from '../../graphgl/mutations/UPDATE_INFO';

export function useUpdateInfo() {
  const [updateInfo, { loading, error }] = useMutation(UPDATE_INFO, {
    onError: (error) => {
      error;
    },
  });
  return [updateInfo, { loading, error }];
}
