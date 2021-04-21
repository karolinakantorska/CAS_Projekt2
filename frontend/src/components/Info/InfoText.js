import React from 'react';
import { text } from '../../lib/text';
import { StyledCardWithPadding } from '../styles/StyledCards';

import Nav from '../main/Nav';
// RMWC
import { Typography } from '@rmwc/typography';
import { H6 } from '../styles/Text';

const InfoText = () => {
  return (
    <>
      <Nav />
      <StyledCardWithPadding>
        <H6 use="headline6">Oberengardin MTB Guides reservation</H6>
        <Typography use="body">Terms and Conditions</Typography>
        <Typography use="body2" className="info1">
          {` ${text}`}
        </Typography>
      </StyledCardWithPadding>
    </>
  );
};

export default InfoText;
