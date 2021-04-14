import styled from 'styled-components';
import { Card } from '@rmwc/card';

export const StyledGuideCard = styled(Card)`
  display: grid;
  align-content: stretch;
  margin: auto;
  margin-top: var(--marginTop);
  width: 344px;
`;
export const StyledImagePlacholderCard = styled(Card)`
  display: grid;
  align-content: stretch;
  margin: auto;
  margin-top: 0;
  width: 344px;
`;
export const StyledCard = styled(Card)`
  display: grid;
  align-content: stretch;
  margin: auto;
  margin-top: var(--marginTop);
  width: 364px;
`;
export const StyledCardWithPadding = styled(Card)`
  display: grid;
  align-content: stretch;
  margin: auto;
  padding: 40px 40px 20px 40px;
  margin-top: var(--marginTop);
  max-width: 800px;
`;
/*
export const StyledSpanPadding = styled.span`
  padding: 40px 40px 20px 40px;
`;
*/
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
export const StyledInfoGrid = styled.span`
  display: grid;
  grid-template-rows: repeat(auto-fill, minmax(1.5rem, 1fr));
`;
