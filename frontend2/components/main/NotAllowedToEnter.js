import React from 'react';
// Components
import ErrorMessage from '../reusable/ErrorMessage';
// Styling
import { StyledCardWithPadding } from '../../styles/StyledCards';

const NotAllowedToEnter = ({ redirectInfo }) => {
  return (
    <>
      <StyledCardWithPadding>
        {redirectInfo && <ErrorMessage error={redirectInfo}>{redirectInfo}</ErrorMessage>}
      </StyledCardWithPadding>
    </>
  );
};
export default NotAllowedToEnter;
