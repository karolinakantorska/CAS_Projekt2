import { gql, useMutation } from '@apollo/client';
import INFOES from '../../graphgl/queries/INFOES';
import CREATE_INFO from '../../graphgl/mutations/CREATE_INFO';

export function useCreateInfo() {
  const [createInfo, { loading, error, data }] = useMutation(CREATE_INFO, {
    refetchQueries: [{ query: INFOES }],
    onCompleted: () => {
      routeToChangeInfo();
    },
    onError: (error) => {
      error;
    },
  });
  return [createInfo, { loading, error, data }];
}
