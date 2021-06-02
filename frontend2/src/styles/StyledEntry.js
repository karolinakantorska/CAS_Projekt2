import styled from 'styled-components';
import { DialogButton } from '@rmwc/dialog';
export const EntrySpan = styled.span`
  cursor: pointer;
  display: grid;
  max-width: 138px;
  font-size: 0.9rem;
  margin-top: 6px;
  border-radius: 5px;
  background-color: rgba(217, 217, 217, 0.5);
  align-content: center;
  justify-content: center;
  text-align: center;
`; 
export const EntrySpanNoClick = styled.span`
  display: grid;
  max-width: 138px;
  font-size: 0.9rem;
  margin-top: 6px;
  border-radius: 5px;
  background-color: rgba(217, 217, 217, 0.5);
  align-content: center;
  justify-content: center;
  text-align: center;
`;
export const StyledSpan = styled.span`
  padding: 40px 40px 20px 40px;
  max-width: 344px;
`;
export const StyledButton = styled(DialogButton)`
  min-width: 100px;
  width: 100%;
  max-width: 344px;
  border-radius: 0px 0px 0px 0px;
  margin: 16px 0px 0px 0px;
`;
