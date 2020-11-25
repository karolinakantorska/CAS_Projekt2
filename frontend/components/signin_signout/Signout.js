import React from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import SIGN_OUT_MUTATION from '../../graphgl/mutations/SIGN_OUT_MUTATION';
import CURRENT_USER_QUERY from '../../graphgl/queries/CURRENT_USER_QUERY';

const Signout = (props) => {
  const [signout, { loading, error, data }] = useMutation(
    SIGN_OUT_MUTATION,
    {
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    },
  );
  const router = useRouter();
  const handleSignout = () => {
    signout();
    router.push('/signin_page');
  };
  return <a onClick={handleSignout}>Sign Out</a>;
};

export default Signout;
