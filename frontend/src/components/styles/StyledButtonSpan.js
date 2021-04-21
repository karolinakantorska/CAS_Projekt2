import styled from 'styled-components';

export const StyledButtonSpan = styled.span`
  display: grid;
  //align-content: stretch;
  justify-items: center;
  column-gap: 30px;
  grid-template-columns: 1fr 1fr;
  @media (max-width: 420px) {
    grid-template-columns: 1fr;
  }
`;
