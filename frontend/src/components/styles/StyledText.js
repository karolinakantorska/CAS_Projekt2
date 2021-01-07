import styled from 'styled-components';
const primary = '#B71C1C';
export const StyledTextTitle5 = styled.p`
  color: primary;
  font-size: 1.4rem;
  font-weight: 400;
  margin: 0.5rem 0 0 0;
`;
export const StyledTextTitle6 = styled.h4`
  color: var(--colorPrimary);
  font-size: 1.3rem;
  letter-spacing: 0.001rem;
  font-weight: 600;
  //margin: 0.5rem 0 0.5rem 0;
`;
export const StyledTextSubtitle1 = styled.p`
  color: var(--colorsecundary);
  font-size: 1rem;
  letter-spacing: 0.001rem;
  font-weight: 600;
  //margin: 0.5rem 0 0.5rem 0;
`;
export const StyledTextSubtitle2 = styled.p`
  color: var(--colorPrimary);
  font-size: 0.875rem;
  letter-spacing: 0.006rem;
  font-weight: 600;
`;
export const StyledTextBody1 = styled.p`
  color: var(--colorsecundary);
  font-size: 1.06rem;
  margin: 0px;
  letter-spacing: 0.03rem;
  font-weight: 400;
`;
export const StyledTextBody2 = styled.p`
  color: var(--colorPrimary);
  font-size: 0.9rem;
  margin: 0px;
  letter-spacing: 0.056rem;
  font-weight: 400;
  @media (max-width: 600px) {
    font-size: 0.8rem;
  }
  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

export const StyledTextMenuBlack = styled.a`
  color: #212121;
  font-size: 1.2rem;
  letter-spacing: 0.056rem;
  font-weight: 800;
`;
export const StyledTextButtonBlack = styled.a`
  color: var(--colorPrimary);
  font-size: 1.05rem;
  letter-spacing: 0.056rem;
  font-weight: 600;
`;
export const StyledTextButtonColor = styled.a`
  color: var(--colorWarning);
  font-size: 1.05rem;
  font-size: 1.05rem;
  letter-spacing: 0.056rem;
  font-weight: 500;
  font-weight: 500;
`;
export const StyledTextButtonWhite = styled.a`
  color: var(--colorNegativ);
  font-size: 1.1rem;
  letter-spacing: 0.056rem;
  font-weight: 600;
  @media (max-width: 600px) {
    font-size: 0.9rem;
  }
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
  @media (max-width: 460px) {
    font-size: 0.7rem;
  }
`;
