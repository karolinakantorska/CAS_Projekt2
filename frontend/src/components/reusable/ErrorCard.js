import React from 'react';
import PropTypes from 'prop-types';
import { StyledCard } from '../styles/StyledForm';
import { StyledTextErrorCard } from '../styles/StyledText';
const ErrorCard = ({ error }) => {
  return (
    <StyledCard>
      <StyledTextErrorCard>{error}</StyledTextErrorCard>
    </StyledCard>
  );
};

ErrorCard.propTypes = {
  errors: PropTypes.string,
};
export default ErrorCard;
