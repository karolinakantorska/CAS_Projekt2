import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';
// Components
import DaySpan from './DaySpan';
import CalendarMenu from './CalendarMenu';
import GuideAvatar from '../reusable/GuideAvatar';
import Year from './Year';
import Loading from '../reusable/LoadingBar';
import ErrorGraphql from '../reusable/ErrorGraphql';
// Utils
import {
  useCalendar,
  currentDate,
  weekDaysEN,
  reservationsDataToArray,
} from '../../lib/utilsCalendar';
import { useCurrentUser } from '../../apollo/querries/useCurrentUser';
import { useGuideMonthReservations } from '../../apollo/querries/useGuideMonthReservations';

const Calendar = ({ props }) => {
  const { guideId } = props;
  const weekNames = weekDaysEN();
  const today = currentDate();
  const {
    handleMonthChange,
    selectedYear,
    selectedMonth,
    emptyCells,
    daysInMonthArray,
    selectedDateTimestamp,
  } = useCalendar();
  const { loading, error, data, refetch } = useGuideMonthReservations(
    selectedYear,
    selectedMonth,
    guideId,
  );
  const {
    loading: loadingCurrentUser,
    error: errorCurrentUser,
    data: dataCurrentUser,
  } = useCurrentUser();
  useEffect(() => {
    refetch();
  }, [selectedMonth]);
  if (loading || loadingCurrentUser) {
    return <Loading />;
  }
  if (error || errorCurrentUser) {
    return (
      <StyledContainer>
        {error && <ErrorGraphql error={error} />}
        {errorCurrentUser && <ErrorGraphql error={errorCurrentUser} />}
      </StyledContainer>
    );
  }
  if (data && dataCurrentUser) {
    const reservations = reservationsDataToArray(data.days, guideId);
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
        <StyledSpan className="avatar_span">
          <GuideAvatar guideId={guideId} />
        </StyledSpan>

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
              dayOfMonth={dayOfMonth}
              selectedYear={selectedYear}
              selectedMonth={selectedMonth}
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
      </StyledCalendarContainer>
    );
  }
};
Calendar.propTypes = {
  guideId: PropTypes.string,
  guideName: PropTypes.string,
  guideSurname: PropTypes.string,
  guidePhoto: PropTypes.string,
};

const StyledCalendarContainer = styled.div`
  max-width: var(--maxWidth);
  background-color: white;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-areas: ' year year month month month guide guide';
  padding: 25px 10px 15px 10px;
  margin-top: 4rem;
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
  //grid-area: menu;
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
