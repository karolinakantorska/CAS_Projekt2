import React from 'react';
import PropTypes from 'prop-types';
import { ErrorText } from '../../styles/Text';

const ErrorMessage = ({ error }) => {
  return (
    <div>
      <ErrorText use="body2">{error}</ErrorText>
    </div>
  );
};

ErrorMessage.propTypes = {
  error: PropTypes.string,
};
export default ErrorMessage;
