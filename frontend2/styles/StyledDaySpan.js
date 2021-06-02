import styled from 'styled-components';

export const DaySpanStyled = styled.span`
  display: grid;
  grid-template-rows: 10px 50px 50px;
  //grid-gap: 2px 0px;
  min-height: 110px;
  min-width: 36px;
  justify-content: stretch;
  grid-template-areas:
    'dayNr '
    'bookingAM '
    'bookingPM ';
  .highlight {
    color: red;
  }
  .AM {
    grid-area: bookingAM;
    align-self: start;
    //max-height: 44px;
  }
  .PM {
    grid-area: bookingPM;
    //height: 44px;
    align-self: end;
  }
  .DAY {
    height: 94px;
  }
`;
export const StyledBookingSpanDay = styled.span`
  //height: 94px;
  &:not(.dayInThePast):hover {
    height: 94px;
    //margin-top: 6px;
    border-radius: 5px;
    transition: 0.2s;
    background-color: rgba(21, 21, 21, 0.3);
  }
  &:not(.dayInThePast) {
    height: 94px;
    cursor: pointer;
    border-radius: 5px;
    background-color: rgba(0, 255, 0, 0.15);
  }
`;
export const StyledBookingSpan = styled.span`
  &:not(.dayInThePast):hover {
    height: 44px;
    //margin-top: 6px;
    border-radius: 5px;
    transition: 0.2s;
    background-color: rgba(21, 21, 21, 0.03);
  }
  &:not(.dayInThePast) {
    height: 44px;
    cursor: pointer;
    border-radius: 5px;
    background-color: rgba(0, 255, 0, 0.15);
  }
`;
