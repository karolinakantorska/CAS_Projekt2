import styled from 'styled-components';
import { Select } from '@rmwc/select';

export const StyledFieldset = styled.fieldset`
  padding: 10px 8px 20px 8px;
  border: none;
`;
export const StyledSpanErrors = styled.div`
  height: 25px;
  margin-bottom: 5px;
`;
export const StyledSelectColors = styled(Select)`
  .Col1 {
    background-color: var(--col1);
  }
  .Col2 {
    background-color: var(--col2);
  }
  .Col3 {
    background-color: var(--col3);
  }
  .Col4 {
    background-color: var(--col4);
  }
  .Col5 {
    background-color: var(--col5);
  }
  .Col6 {
    background-color: var(--col6);
  }
  .Col7 {
    background-color: var(--col7);
  }
  .Col8 {
    background-color: var(--col8);
  }
  .Col9 {
    background-color: var(--col9);
  }
`;
/*
export const StyledSpanButon = styled.span`
  display: grid;
  align-content: stretch;
`;
*/
