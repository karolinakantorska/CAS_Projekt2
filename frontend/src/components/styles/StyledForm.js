import styled from 'styled-components';
import { Button } from '@rmwc/button';
import { Card, CardActionButton, CardActionButtons } from '@rmwc/card';
import { Elevation } from '@rmwc/elevation';

// Sign in / Booking confirmation
export const StyledCard = styled(Card)`
  display: grid;
  align-content: stretch;
  margin: auto;
  margin-top: 48px;
  width: 370px;
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
/*
export const StyledButtons = styled(CardActionButtons)`
  //padding: 1rem;
  width: 100%;
`;
*/
export const StyledSpanButon = styled.span`
  display: grid;
  align-content: stretch;
`;
/*
export const StyledButton = styled(CardActionButton)`
  text-transform: capitalize;
  min-width: 100px;
  width: 100%;
  margin-left: -0.5rem;
  padding-right: 1rem;
  border-radius: 0px 0px 0px 0px;
  margin-bottom: 1rem;
  .mdc-card__action--button {
    margin-right: 0px;
  }
`;
*/
export const StyledElevation = styled(Elevation)`
  background-color: white;
  height: 100%;
  margin: auto;
  margin-top: 4rem;
  border-radius: 5px;
  padding: 2%;

  @media (max-width: 480px) {
    padding: 4%;
  }
`;
