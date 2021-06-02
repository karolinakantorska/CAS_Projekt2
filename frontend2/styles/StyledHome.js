import styled from 'styled-components';
import { Button } from '@rmwc/button';

export const ContainerHomepage = styled.div`
  display: grid;
`;
export const StyledButton__Homepage = styled(Button)`
  && {
    align-self: end;
    justify-self: center;
    margin-top: 65vh;
    padding: 5px;
    color: white;
    background-color: rgba(33, 33, 33, 0.7);
    text-transform: capitalize;
  }
`;
