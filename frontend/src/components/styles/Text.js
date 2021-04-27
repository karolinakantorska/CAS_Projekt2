import React from 'react';
import styled from 'styled-components';
import { Typography } from '@rmwc/typography';

export const H6 = styled(Typography)`
  color: var(--colorPrimary);
  margin: 10px 0px 10px 0px;
`;
export const Subtitle = styled(Typography)`
  color: var(--colorSecundary);
  margin: -15px 0px 15px 0px;
`;
export const TextLink = styled(Typography)`
  cursor: pointer;
  color: var(--colorSecundary);
  text-decoration: underline;
  margin-top: 15px;
  text-transform: none;
`;
export const TextGrayDense = styled(Typography)`
  color: var(--colorSecundary);
  margin: 10px 0px 5px 0px;
`;
export const ErrorText = styled(Typography)`
  color: var(--colorWarning);
  background-color: white;
`;
export const TextSpecial = styled(Typography)`
  color: var(--colorWarning);
  font-weight: 600;
`;
export const StyledMenuMain = styled(Typography)`
  font-weight: 600;
  line-height: 90%;
  font-size: 1.2rem;
  color: var(--colorPrimary);
  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
  @media (max-width: 420px) {
    font-size: 1rem;
  }
`;
export const StyledTopMenu = styled(Typography)`
  line-height: 90%;
`;
export const StyledMenu2 = styled(Typography)`
  font-weight: 600;
  line-height: 90%;
  font-size: 1rem;
  color: var(--colorSecundary);
  :hover {
    color: var(--colorLight);
  }
  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
  @media (max-width: 420px) {
    font-size: 0.9rem;
  }
`;
export const StyledButtonTextWhite = styled(Typography)`
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--colorNegativ);
  @media (max-width: 480px) {
    font-size: 1rem;
  }
  @media (max-width: 420px) {
    font-size: 0.9rem;
  }
`;
