import React from 'react';
import PropTypes from 'prop-types';
import { text } from '../../lib/text';
import { StyledCardWithPadding } from '../styles/StyledForm';
import { StyledTextBody1, StyledTextTitle6 } from '../styles/StyledText';
const InfoText = () => {
  return (
    <StyledCardWithPadding>
      <StyledTextTitle6>Terms and Conditions</StyledTextTitle6>
      <StyledTextBody1>{text}</StyledTextBody1>
    </StyledCardWithPadding>
  );
};

export default InfoText;
