import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button } from '@rmwc/button';
import { Typography } from '@rmwc/typography';

export const ButtonMain = ({ text, onClick, disabled = false }) => {
  return (
    <StyledButton
      onClick={onClick}
      raised
      theme={['secondaryBg', 'onSecondary']}
      disabled={disabled}
    >
      <StyledTextMain use="button">{text}</StyledTextMain>
    </StyledButton>
  );
};
export const ButtonLink = ({ text, onClick, disabled = false }) => {
  return (
    <StyledButton onClick={onClick} className="button_link" disabled={disabled}>
      <StyledTextLink use="button">{text}</StyledTextLink>
    </StyledButton>
  );
};
export const StyledTextMain = styled(Typography)`
  color: var(--colorPrimary);
  text-transform: capitalize;
  font-weight: 600;
`;
const StyledTextLink = styled(Typography)`
  color: var(--colorWarning);
  line-height: 20px;
  text-transform: capitalize;
`;
const StyledButton = styled(Button)`
  min-width: 100px;
  width: 100%;
  max-width: 344px;
  border-radius: 0px 0px 0px 0px;
  margin: 16px 0px 0px 0px;
`;
ButtonLink.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
};
