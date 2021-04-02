import styled from 'styled-components';
import { Typography } from '@rmwc/typography';
import { Dialog, DialogTitle, DialogContent, DialogButton } from '@rmwc/dialog';
export const EntrySpan = styled.span`
  display: grid;
  //grid-template-rows: 1fr 1fr;
  max-width: 138px;
  font-size: 0.9rem;
  margin-top: 6px;
  border-radius: 5px;
  background: rgba(217, 217, 217, 0.5);
  align-content: center;
  justify-content: center;
  text-align: center;
  .holiday {
    color: var(--colorWarning);
  }
  .your_booking {
    color: var(--colorWarning);
  }
`;
export const StyledSpan = styled.span`
  max-width: 344px;
`;
export const StyledTypography = styled(Typography)`
  color: var(--colorWarning);
  text-align: center;
`;
export const StyledButton = styled(DialogButton)`
  min-width: 100px;
  width: 100%;
  max-width: 344px;
  border-radius: 0px 0px 0px 0px;
  margin: 16px 0px 0px 0px;
`;
