import { gql, useQuery } from '@apollo/client';
import CURRENT_USER_QUERY from '../../graphgl/queries/CURRENT_USER_QUERY';

export function useUser() {
  const noUserLogged = { email: '', id: '', name: '', permissions: '' };
  const { loading, error, data } = useQuery(CURRENT_USER_QUERY, {
    onComplited: (data) => data,
  });
  if (data) {
    return data;
  }
  if (!data) {
    return noUserLogged;
  }
}
