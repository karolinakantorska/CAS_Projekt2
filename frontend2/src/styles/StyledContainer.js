import styled from 'styled-components';

export const StyledContainer = styled.span`
  display: grid;
  max-width: var(--maxWidth);
  margin: auto;
`;
export const StyledCardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(352px, 1fr));
  grid-gap: 1% 2%;
  row-gap: 15px;
  justify-content: space-between;
`;
export const StyledSpan = styled.span`
padding-top:80px;
padding-left: 4px;
margin: auto;
`;
export const StyledSpanLong = styled.span`
  padding-top: 80px;
  padding-left: 4px;
`;
