import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button } from '@rmwc/button';
import { StyledTextButtonBlack } from '../styles/StyledText';

const ButtonMain = ({ text, onClick }) => {
  return (
    <StyledButton onClick={onClick} raised theme={['secondaryBg', 'onSecondary']}>
      <StyledTextButtonBlack>{text}</StyledTextButtonBlack>
    </StyledButton>
  );
};
export const StyledButton = styled(Button)`
  text-transform: capitalize;
  min-width: 100px;
  width: 100%;
  padding-right: 16px;
  border-radius: 0px 0px 0px 0px;
  margin-bottom: 16px;
  //margin-left: -8px;
`;
ButtonMain.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
};

export default ButtonMain;
