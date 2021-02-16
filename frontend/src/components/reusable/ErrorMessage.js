import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ErrorMessage = ({ error }) => {
  if (error) {
    return (
      <StyledError className="error_div">
        {error && <StyledP>{error}</StyledP>}
      </StyledError>
    );
  }
  return <StyledError className="error_div"></StyledError>;
};

const StyledError = styled.div`
  color: var(--colorWarning);
  background-color: white;
`;
const StyledP = styled.p`
  height: 15px;
  margin-top: 0px;
`;
ErrorMessage.propTypes = {
  error: PropTypes.string,
};
export default ErrorMessage;
