import styled from 'styled-components';
import { CardActionButton, CardActionButtons } from '@rmwc/card';

export const StyledFieldset = styled.fieldset`
  border: none;
  padding: 1rem;
`;
export const StyledButtons = styled(CardActionButtons)`
  padding: 1rem;
  width: 100%;
`;
export const StyledButton = styled(CardActionButton)`
  width: 50%;
  border-radius: ${(props) => props.theme.button.radious};
  :hover {
    border-radius: ${(props) => props.theme.button.radious};
  }
`;
