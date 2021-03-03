import React from 'react';
import PropTypes from 'prop-types';
import { StyledTextErrorInline } from '../styles/StyledText';
const ErrorMessage = ({ error }) => {
  return (
    <div>
      <StyledTextErrorInline>{error}</StyledTextErrorInline>
    </div>
  );
};

ErrorMessage.propTypes = {
  errors: PropTypes.string,
};
export default ErrorMessage;
