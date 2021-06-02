import styled from 'styled-components';
export const StyledSpan2 = styled.span`
  grid-column: 1 / span 2;
`;
export const StyledCalendarContainer = styled.div`
  max-width: var(--maxWidth);
  background-color: white;
  margin: auto;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(7, 1fr);
  grid-template-areas: ' year year month month month guide guide';
  padding: 25px 10px 15px 10px;
  border-radius: 10px;
  justify-content: center;
  grid-gap: 1% 0.5%;
  @media (max-width: 401px) {
    grid-template-areas:
      'year year year guide guide guide guide'
      'month month month month month month month';
  }
`;

export const StyledSpan = styled.span`
  grid-area: guide;
  display: grid;
  justify-content: center;
  padding-top: 5px;
`;
export const StyledDayName = styled.div`
  font-family: var(--fontFamilyCalendar);
  font-size: 1.2rem;
  color: var(--colorSecundary);
  padding-top: 10px;
  display: grid;
  ::after {
    content: '';
    width: 100%;
    height: 5px;
    border-radius: 5px;
    background: var(--calendarColorNumbers);
  }
`;
