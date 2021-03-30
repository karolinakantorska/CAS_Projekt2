import React from 'react';
import { text } from '../../lib/text';
import { StyledCardWithPadding } from '../styles/StyledCards';
// RMWC
import { Typography } from '@rmwc/typography';
import { H6 } from '../styles/Text';

const InfoText = () => {
  return (
    <StyledCardWithPadding>
      <H6 use="headline6">Terms and Conditions</H6>
      <Typography use="body2" className="info1">
        {` ${text}`}
      </Typography>
    </StyledCardWithPadding>
  );
};

export default InfoText;
