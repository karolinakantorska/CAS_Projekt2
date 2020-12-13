import styled from 'styled-components';

export const StyledContainer = styled.span`
  display: grid;

  max-width: ${(props) => props.theme.maxWidth};
  margin: auto;
`;
