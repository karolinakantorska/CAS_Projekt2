import React from 'react';
import { Icon } from '@rmwc/icon';
//Components
import LoadingCicle from '../reusable/LoadingCicle';
import ErrorGraphql from '../reusable/ErrorGraphql';
// Utils
import { useSignout } from '../../apollo/mutations/useSignout';
//Styling
import { StyledMenuMain } from '../styles/Text';

const Signout = () => {
  const [signout, { loading, error }] = useSignout();

  if (loading) {
    return <LoadingCicle size="xsmall" />;
  }
  if (error) {
    return <ErrorGraphql error={error} />;
  }
  return (
    <StyledMenuMain use="body" onClick={signout} className="user">
      <Icon icon="person" aria-label="Logout" />
    </StyledMenuMain>
  );
};
export default Signout;
