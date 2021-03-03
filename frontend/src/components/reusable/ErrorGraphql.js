import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ErrorGraphql = ({ error }) => {
  if (!error || !error.message) return null;
  if (
    error.networkError &&
    error.networkError.result &&
    error.networkError.result.errors.length
  ) {
    return error.networkError.result.errors.map((error, i) => (
      <div key={i}>
        <StyledP data-test="testid-graphql-error">
          {error.message.replace('GraphQL error: ', '')}
        </StyledP>
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
      <StyledP>{error.message.replace('GraphQL error: ', '')}</StyledP>
    </React.Fragment>
  );
};

ErrorGraphql.defaultProps = {
  error: {},
};

ErrorGraphql.propTypes = {
  error: PropTypes.object,
};
const StyledP = styled.p`
  color: var(--colorWarning);
  background-color: white;
`;
export default ErrorGraphql;
