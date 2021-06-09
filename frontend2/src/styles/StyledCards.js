import styled from 'styled-components';
import { Card } from '@rmwc/card';

export const StyledTripCard = styled(Card)`
  display: grid;
  padding: 8px;
  
  align-content: stretch;
  margin: auto;
  max-width: 344px;
`;
export const StyledGuideCard = styled(Card)`
  display: grid;
  align-content: stretch;
  margin: auto;
  width: 344px;
`;

export const StyledCard = styled(Card)`
  display: grid;
  align-content: stretch;
  margin: auto;
  margin-top: var(--marginTop);
  width: 364px;
`;
export const StyledImagePlacholderCard = styled(Card)`
  display: grid;
  align-content: stretch;
  margin: auto;
  margin-top: 0;
  width: 344px;
`;
export const StyledCardWithPadding = styled(Card)`
  display: grid;
  align-content: stretch;
  margin: auto;
  padding: 40px 40px 20px 40px;
  margin-top: var(--marginTop);
  min-width: 250px;
  max-width: 800px;
`;
export const StyledCardReservation = styled(Card)`
  display: grid;
  align-content: stretch;
  margin: auto;
  padding: 20px 20px 10px 20px;
  margin-bottom: 20px;
  min-width: 250px;
  max-width: 800px;
`;
export const StyledOneGuideGrid = styled.span`
  display: grid;
  column-gap: 10px;
  grid-template-columns: 1fr;
  grid-template-areas:
    ' title title'
    ' subtitle subtitle'
    ' info photo'
    ' desc desc'
    ' button button';
  .title {
    grid-area: title;
  }
  .subtitle {
    grid-area: subtitle;
  }
  .info {
    grid-area: info;
  }
  .photo {
    grid-area: photo;
    justify-self: center;
    margin-bottom: 15px;
  }
  .desc {
    grid-area: desc;
  }
  .button {
    grid-area: button;
  }
  @media (max-width: 720px) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      ' title'
      ' subtitle'
      ' info'
      ' photo'
      ' desc'
      ' button';
    .photo {
      justify-self: center;
      margin: 10px auto 10px auto;
    }
  }
`;
export const StyledInfoGrid = styled.span``;
