import React from 'react';
import PropTypes from 'prop-types';

import MediaQuery from 'react-responsive';
import { StyledTypographyDense } from '../../styles/Text';
import { Typography } from '@rmwc/typography';
import IconConfirmed from '../reusable/IconConfirmed';

const EntryText = ({userName,confirmed}) => {

  return (
      <>
        <MediaQuery minDeviceWidth={401}>
            <Typography use="caption">
              {`Gast: ${userName} `}
              <IconConfirmed confirmed={confirmed} size="xsmall" />
            </Typography>
        </MediaQuery>
        <MediaQuery maxDeviceWidth={400}>
            <StyledTypographyDense use="caption">
              {`Gast: ${userName.substring(0, 3)} `}
              <IconConfirmed confirmed={confirmed} size="xsmall" />
            </StyledTypographyDense>
        </MediaQuery>
          </>
  );
};

EntryText.propTypes = {
  userName: PropTypes.string,
  confirmed: PropTypes.bool,
};
export default EntryText;
