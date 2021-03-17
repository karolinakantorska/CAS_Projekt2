import React from 'react';
import PropTypes from 'prop-types';
import { StyledCardWithPadding } from '../styles/StyledCards';
import { ErrorText } from '../styles/Text';
const ErrorCard = ({ error }) => {
  return (
    <StyledCardWithPadding>
      <ErrorText use="body1">{error}</ErrorText>
    </StyledCardWithPadding>
  );
};

ErrorCard.propTypes = {
  errors: PropTypes.string,
};
export default ErrorCard;
