import { gql, useMutation } from '@apollo/client';

import CREATE_INFO from '../../graphgl/mutations/CREATE_INFO';

export function useCreateInfo() {
  const [createInfo, { loading, error, data }] = useMutation(CREATE_INFO, {
    onError: (error) => {
      error;
    },
  });
  return [createInfo, { loading, error, data }];
}
