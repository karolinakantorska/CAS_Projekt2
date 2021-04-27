import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// Components
import DaySpan from './DaySpan';
import CalendarMenu from './CalendarMenu';
import GuideAvatar from '../reusable/GuideAvatar';
import NonGuideAvatar from '../reusable/NonGuideAvatar';
import Year from './Year';
import LoadingBar from '../reusable/LoadingBar';
import ErrorGraphql from '../reusable/ErrorGraphql';
// Utils
import { currentDate, weekDaysEN } from '../../lib/utilsCalendar';
import { useCurrentUser } from '../../apollo/querries/useCurrentUser';

const Calendar = ({
  guideId,
  reservations,
  handleMonthChange,
  selectedYear,
  selectedMonth,
  nrOfMonth,
  emptyCells,
  daysInMonthArray,
  selectedDateTimestamp,
  trip,
}) => {
  const weekNames = weekDaysEN();
  const today = currentDate();
  const {
    loading: loadingCurrentUser,
    error: errorCurrentUser,
    data: dataCurrentUser,
  } = useCurrentUser();
  if (loadingCurrentUser) {
    return <LoadingBar />;
  }
  if (errorCurrentUser) {
    return (
      <StyledContainer>
        {errorCurrentUser && <ErrorGraphql error={errorCurrentUser} />}
      </StyledContainer>
    );
  }
  if (dataCurrentUser) {
    return (
      <StyledCalendarContainer>
        <Year selectedYear={selectedYear} className="year_component" />
        <CalendarMenu
          className="month_component"
          currentYear={today.year}
          currentMonth={today.month}
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          handleMonthChange={handleMonthChange}
        />
        {guideId === '0' ? (
          <NonGuideAvatar currentUser={dataCurrentUser.currentUser} />
        ) : (
          <StyledSpan>
            <GuideAvatar guideId={guideId} />
          </StyledSpan>
        )}
        {weekNames.map((day) => (
          <StyledDayName key={day} className="dayName_span">
            {day}
          </StyledDayName>
        ))}
        {emptyCells.map((day) => (
          <span key={day}></span>
        ))}
        {daysInMonthArray.map((dayOfMonth) => {
          let reservation = [];
          if (reservations[dayOfMonth]) {
            reservation = reservations[dayOfMonth];
          }
          return (
            <DaySpan
              key={dayOfMonth}
              reservation={reservations[dayOfMonth] ? reservations[dayOfMonth] : []}
              guideId={guideId}
              trip={trip}
              dayOfMonth={dayOfMonth}
              selectedYear={selectedYear}
              selectedMonth={selectedMonth}
              nrOfMonth={nrOfMonth}
              highlight={
                today.year === selectedYear &&
                today.month === selectedMonth &&
                today.day === dayOfMonth
              }
              currentUser={dataCurrentUser.currentUser}
              dayInThePast={
                today.year === selectedYear &&
                today.month === selectedMonth &&
                parseInt(dayOfMonth) < parseInt(today.day)
              }
              dayTooMuchInFuture={
                today.todayTreeMonthsLaterTimestamp < selectedDateTimestamp
              }
            ></DaySpan>
          );
        })}
        <StyledSpan2>
          <p>-</p>
        </StyledSpan2>
      </StyledCalendarContainer>
    );
  }
};

Calendar.propTypes = {
  guideId: PropTypes.string,
  reservations: PropTypes.object,
  handleMonthChange: PropTypes.func,
  selectedYear: PropTypes.string,
  selectedMonth: PropTypes.string,
  emptyCells: PropTypes.array,
  daysInMonthArray: PropTypes.array,
  selectedDateTimestamp: PropTypes.string,
};

const StyledSpan2 = styled.span`
  grid-column: 1 / span 2;
`;
const StyledCalendarContainer = styled.div`
  max-width: var(--maxWidth);
  background-color: white;
  margin: auto;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(7, 1fr);
  grid-template-areas: ' year year month month month guide guide';
  padding: 25px 10px 15px 10px;
  margin-top: var(--marginTop);
  border-radius: 10px;
  justify-content: center;
  grid-gap: 1% 0.5%;
`;

const StyledSpan = styled.span`
  grid-area: guide;
  display: grid;
  justify-content: center;
  padding-top: 5px;
`;
const StyledDayName = styled.div`
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
export default Calendar;
