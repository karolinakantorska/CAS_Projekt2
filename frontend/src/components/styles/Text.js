import React from 'react';
import styled from 'styled-components';
import { Typography } from '@rmwc/typography';

/*
export const TextH6 = ({ text }) => {
  return (
    <H6 use="headline6" className="title">
      {text}
    </H6>
  );
};
*/
export const H6 = styled(Typography)`
  color: var(--colorPrimary);
  margin: 10px 0px 10px 0px;
`;
/*
export const Subtitle2 = ({ text }) => {
  return (
    <Sub2 use="subtitle2" className="subtitle">
      {text}
    </Sub2>
  );
};
*/
//Subtitle
export const Subtitle = styled(Typography)`
  color: var(--colorSecundary);
  margin: -15px 0px 15px 0px;
`;
export const TextLink = styled(Typography)`
  color: var(--colorSecundary);
  text-decoration: underline;
  margin-top: 15px;
  text-transform: none;
`;
export const TextGrayDense = styled(Typography)`
  color: var(--colorSecundary);
  margin: 10px 0px 5px 0px;
`;
/*
export const TextStrong = styled(Typography)`
  font-weight: 600;
`;
*/
/*
export const TextGray = styled(Typography)`
  color: var(--colorSecundary);
  text-transform: none;
`;
*/
/*
export const textGrayStrong = styled(Typography)`
  color: var(--colorSecundary);
  font-weight: 600;
  text-transform: none;
`;
*/
export const ErrorText = styled(Typography)`
  color: var(--colorWarning);
  background-color: white;
`;
export const StyledMenuMain = styled(Typography)`
  font-weight: 600;
  font-size: 1.2rem;
  color: var(--colorPrimary);
  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
  @media (max-width: 420px) {
    font-size: 1rem;
  }
`;
export const StyledMenu2 = styled(Typography)`
  font-weight: 600;
  font-size: 1rem;
  color: var(--colorSecundary);
  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
  @media (max-width: 420px) {
    font-size: 0.9rem;
  }
`;
