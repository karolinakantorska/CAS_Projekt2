import React from 'react';
// Components
import Nav from '../main/Nav';
import ErrorMessage from '../reusable/ErrorMessage';

// Styling
import { StyledCardWithPadding } from '../styles/StyledCards';

const NotAllowedToEnter = ({ redirectInfo }) => {
  return (
    <>
      <Nav />
      <StyledCardWithPadding>
        {redirectInfo && <ErrorMessage error={redirectInfo}>{redirectInfo}</ErrorMessage>}
      </StyledCardWithPadding>
    </>
  );
};
export default NotAllowedToEnter;
