import { gql, useMutation } from '@apollo/client';
import UPDATE_GUIDE from '../../graphgl/mutations/UPDATE_GUIDE';
import ONE_USER_QUERY from '../../graphgl/queries/ONE_USER_QUERY';
export function useEditGuide() {
  const [updateUser, { loading, error }] = useMutation(UPDATE_GUIDE, {
    /*
    onCompleted: () => {
      
    },
    */
    //refetchQueries: [{ query: ONE_USER_QUERY }],
    onError: (error) => {
      error;
    },
  });
  return [updateUser, { loading, error }];
}
