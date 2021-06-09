import React from 'react';
import PropTypes from 'prop-types';
import { ErrorText } from '../../styles/Text';
import { StyledContainer, StyledSpan } from '../../styles/StyledContainer';

const ErrorGraphql = ({ error }) => {
  if (!error || !error.message) return null;
  if (
    error.networkError &&
    error.networkError.result &&
    error.networkError.result.errors.length
  ) {
    return error.networkError.result.errors.map((error, i) => (
      <div key={i}>
        <ErrorText use="body2">{error.message.replace('GraphQL error: ', '')}</ErrorText>
      </div>
    ));
  }

  if (error.message.includes('ECONNRESET')) {
    return (
      <>
        <ErrorText>Problem with connection to database, please try again.</ErrorText>
      </>
    );
  }

  if (error.message.includes('ENOTFOUND')) {
    return (
      <>
        <ErrorText>
          The domain you are tryign to reach is unavailable, please check your internet
          connection.
        </ErrorText>
      </>
    );
  }
  return (
    <>
      <ErrorText>{error.message.replace('GraphQL error: ', '')}</ErrorText>
    </>
  );
};

ErrorGraphql.defaultProps = {
  error: {},
};

ErrorGraphql.propTypes = {
  error: PropTypes.object,
};
export default ErrorGraphql;
