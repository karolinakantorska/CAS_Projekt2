import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Error = ({ error }) => {
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
      <StyledP data-test="testid-graphql-error">
        {error.message.replace('GraphQL error: ', '')}
      </StyledP>
    </React.Fragment>
  );
};

Error.defaultProps = {
  error: {},
};

Error.propTypes = {
  error: PropTypes.object,
};
const StyledP = styled.p`
  color: var(--colorWarning);
`;
export default Error;
