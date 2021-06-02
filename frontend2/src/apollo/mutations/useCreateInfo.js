import { gql, useMutation } from '@apollo/client';
import {routeToChangeInfo} from '../../lib/utilsRouts'
import INFOES from '../../graphql/queries/INFOES';
import CREATE_INFO from '../../graphql/mutations/CREATE_INFO';

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
