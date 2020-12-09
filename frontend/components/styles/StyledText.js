import styled from 'styled-components';

export const StyledTextTitle5 = styled.p`
  color: ${(props) => props.theme.colorText.primary};
  font-size: ${(props) => props.theme.fontSize.title5};
  font-weight: ${(props) => props.theme.fontWeight.title5};
  margin: 1rem 0 0 0;
`;
export const StyledTextTitle6 = styled.h4`
  color: ${(props) => props.theme.colorText.primary};
  font-size: ${(props) => props.theme.fontSize.title6};
  //letter-spacing: ${(props) => props.theme.letterSpacing.title6};
  font-weight: ${(props) => props.theme.fontWeight.title5};
  margin: 0.5rem 0 0.5rem 0;
`;
export const StyledTextSubtitle1 = styled.p`
  color: ${(props) => props.theme.colorText.secundary};
  font-size: ${(props) => props.theme.fontSize.subtitle1};
  //letter-spacing: ${(props) => props.theme.letterSpacing.subtitle1};
  font-weight: ${(props) => props.theme.fontWeight.title5};
  margin: -0.5rem 0 0.5rem 0;
`;
export const StyledTextSubtitle2 = styled.p`
  color: ${(props) => props.theme.colorText.primary};
  font-size: ${(props) => props.theme.fontSize.subtitle2};
  //letter-spacing: ${(props) => props.theme.letterSpacing.subtitle2};
  font-weight: ${(props) => props.theme.fontWeight.title5};
`;
export const StyledTextBody1 = styled.p`
  color: ${(props) => props.theme.colorText.secundary};
  font-size: ${(props) => props.theme.fontSize.body1};
  //letter-spacing: ${(props) => props.theme.letterSpacing.body1};
  font-weight: ${(props) => props.theme.fontWeight.title5};
`;
export const StyledTextBody2 = styled.p`
  color: ${(props) => props.theme.colorText.primary};
  font-size: ${(props) => props.theme.fontSize.body2};
  margin: 0px;
  //letter-spacing: ${(props) => props.theme.letterSpacing.body2};
  font-weight: ${(props) => props.theme.fontWeight.title5};
`;
//export const StyledTextMenuWhite = styled.a`
export const StyledTextMenuWhite = styled.a`
  color: ${(props) => props.theme.colorText.negativ};
  font-size: ${(props) => props.theme.fontSize.menu};
  // letter-spacing: ${(props) => props.theme.letterSpacing.menu};
  font-weight: ${(props) => props.theme.fontWeight.menu};
`;
export const StyledTextButtonBlack = styled.a`
  color: ${(props) => props.theme.colorText.primary};
  font-size: ${(props) => props.theme.fontSize.menu};
  //letter-spacing: ${(props) => props.theme.letterSpacing.menu};
  font-weight: ${(props) => props.theme.fontWeight.buttonStrong};
`;
export const StyledTextButtonColor = styled.a`
  color: ${(props) => props.theme.colorText.warning};
  font-size: ${(props) => props.theme.fontSize.menu};
  //letter-spacing: ${(props) => props.theme.letterSpacing.menu};
  font-weight: ${(props) => props.theme.fontWeight.buttonLight};
`;
export const StyledTextButtonWhite = styled.a`
  font-size: ${(props) => props.theme.fontSize.menu};
  //letter-spacing: ${(props) => props.theme.letterSpacing.menu};
  font-weight: ${(props) => props.theme.fontWeight.buttonLight};
`;
