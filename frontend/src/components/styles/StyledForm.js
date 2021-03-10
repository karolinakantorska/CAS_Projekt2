import styled from 'styled-components';
import { Card } from '@rmwc/card';

export const StyledCard = styled(Card)`
  display: grid;
  align-content: stretch;
  margin: auto;
  margin-top: 98px;
  width: 370px;
`;
export const StyledCardWithPadding = styled(Card)`
  display: grid;
  align-content: stretch;
  margin: auto;
  padding: 40px 40px 20px 40px;
  margin-top: 98px;
  max-width: 800px;
`;
export const StyledSpanPadding = styled.span`
  display: grid;
  align-content: stretch;
  padding: 1rem;
`;
export const StyledFieldset = styled.fieldset`
  border: none;
`;
export const StyledSpanErrors = styled.div`
  height: 25px;
  margin-bottom: 5px;
`;
export const StyledSpanButon = styled.span`
  display: grid;
  align-content: stretch;
`;
