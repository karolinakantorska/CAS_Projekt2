import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button } from '@rmwc/button';
import { StyledTextButtonColor } from '../styles/StyledText';

const ButtonLink = ({ text, onClick }) => {
  return (
    <StyledButtonLink onClick={onClick}>
      <StyledTextButtonColor>{text}</StyledTextButtonColor>
    </StyledButtonLink>
  );
};
export const StyledButtonLink = styled(Button)`
  text-transform: capitalize;
  width: 100%;
  border-radius: 0px 0px 0px 0px;
`;
export const StyledButton = styled(Button)`
  text-transform: capitalize;
  min-width: 100px;
  width: 100%;
  padding-right: 16px;
  border-radius: 0px 0px 0px 0px;
  margin-bottom: 16px;
  //margin-left: -8px;
`;
ButtonLink.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
};

export default ButtonLink;
