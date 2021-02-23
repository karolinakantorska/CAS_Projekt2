import React from 'react';
import { Icon } from '@rmwc/icon';
//Components
import LoadingCicle from '../reusable/LoadingCicle';
import Error from '../reusable/Error';
// Utils
import { useSignout } from '../../apollo/mutations/useSignout';

import { StyledTextMenuBlack } from '../styles/StyledText';

const Signout = () => {
  const [signout, { loading, error }] = useSignout();

  if (loading) {
    return <LoadingCicle size="xsmall" />;
  }
  if (error) {
    return <Error error={error} />;
  }
  return (
    <StyledTextMenuBlack onClick={signout}>
      <Icon icon="person" aria-label="Logout" />
    </StyledTextMenuBlack>
  );
};
export default Signout;
