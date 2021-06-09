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
export const StyledSelect = styled(Select)`
  div {
    background-color: white;
  }
  div.mdc-select__anchor span.mdc-floating-label {
    color: var(--colorWarning);
    margin-left: -10px;
  }
`;
