import React from 'react';
import { Icon } from '@rmwc/icon';
//Components
import LoadingCicle from '../reusable/LoadingCicle';
import ErrorGraphql from '../reusable/ErrorGraphql';
// Utils
import { useSignout } from '../../apollo/mutations/useSignout';

import { StyledTextMenuBlack } from '../styles/StyledText';

const Signout = () => {
  const [signout, { loading, error }] = useSignout();

  if (loading) {
    return <LoadingCicle size="xsmall" />;
  }
  if (error) {
    return <ErrorGraphql error={error} />;
  }
  return (
    <StyledTextMenuBlack onClick={signout}>
      <Icon icon="person" aria-label="Logout" />
    </StyledTextMenuBlack>
  );
};
export default Signout;
