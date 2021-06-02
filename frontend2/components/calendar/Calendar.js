import React from 'react';
import PropTypes from 'prop-types';

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
//Styles
import { StyledContainer } from '../../styles/StyledContainer';
import {StyledSpan2,
StyledCalendarContainer,
StyledSpan,
StyledDayName} from '../../styles/StyledCalendar.js';
const Calendar = ({
  guideId,
  reservations,
  handleMonthChange,
  selectedYear,
  selectedMonth,
  nrOfMonth,
  emptyCells,
  daysInMonthArray,
  //selectedDateTimestamp,
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
                false
                //today.todayTreeMonthsLaterTimestamp < selectedDateTimestamp
              }
              timeStamp={
                dayOfMonth.length === 1
                  ? selectedYear + nrOfMonth + 0 + dayOfMonth
                  : selectedYear + nrOfMonth + dayOfMonth
              }
              //selectedDateTimestamp={selectedDateTimestamp}
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
  //selectedDateTimestamp: PropTypes.string,
};
export default Calendar;
