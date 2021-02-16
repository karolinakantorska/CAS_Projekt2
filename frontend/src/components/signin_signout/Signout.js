import React from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { Icon } from '@rmwc/icon';
import Error from '../reusable/Error';
import { useUser } from '../../lib/userState';
import SIGN_OUT_MUTATION from '../../graphgl/mutations/SIGN_OUT_MUTATION';
import CURRENT_USER_QUERY from '../../graphgl/queries/CURRENT_USER_QUERY';
import { StyledTextMenuBlack } from '../styles/StyledText';

const Signout = () => {
  const { removeCurrentUser } = useUser();
  const [signout, { loading, error, data }] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
    awaitRefetchQueries: true,
    onCompleted: () => {
      removeCurrentUser();
      router.push('/signin_page');
    },
    onError: (error) => {
      error;
    },
  });
  const router = useRouter();
  const handleSignout = () => {
    signout();
  };
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <Error error={error} />;
  }
  return (
    <StyledTextMenuBlack onClick={handleSignout}>
      <Icon icon="person" aria-label="Logout" />
    </StyledTextMenuBlack>
  );
};

export default Signout;
