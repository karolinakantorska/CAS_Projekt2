import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Error from '../main/Error';

const ErrorMessage = ({ error }) => {
  return <StyledError className="error_div"></StyledError>;
};

ErrorMessage.propTypes = {
  error: PropTypes.string,
};
const StyledError = styled.div`
  color: var(--colorWarning);
`;
export default ErrorMessage;
