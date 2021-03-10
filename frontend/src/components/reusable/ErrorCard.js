import React from 'react';
import PropTypes from 'prop-types';
import { StyledCardWithPadding } from '../styles/StyledForm';
import { StyledTextErrorCard } from '../styles/StyledText';
const ErrorCard = ({ error }) => {
  return (
    <StyledCardWithPadding>
      <StyledTextErrorCard>{error}</StyledTextErrorCard>
    </StyledCardWithPadding>
  );
};

ErrorCard.propTypes = {
  errors: PropTypes.string,
};
export default ErrorCard;
