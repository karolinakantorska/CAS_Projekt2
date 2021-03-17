import React from 'react';
import PropTypes from 'prop-types';
import { ErrorText } from '../styles/Text';

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
  /*
  if (error.graphQLErrors) {
    error.graphQLErrors.map((error) => console.log(error.code));
  }
  */
  return (
    <React.Fragment>
      <ErrorText>{error.message.replace('GraphQL error: ', '')}</ErrorText>
    </React.Fragment>
  );
};

ErrorGraphql.defaultProps = {
  error: {},
};

ErrorGraphql.propTypes = {
  error: PropTypes.object,
};
export default ErrorGraphql;
