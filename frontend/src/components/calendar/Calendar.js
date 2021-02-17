import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

import PropTypes from 'prop-types';
import styled from 'styled-components';
// Components
import DaySpan from './DaySpan';
import User from '../main/User';
import CalendarMenu from './CalendarMenu';
import GuideAvatar from '../reusable/GuideAvatar';
import Year from './Year';
import Loading from '../reusable/LoadingBar';
import Error from '../reusable/Error';

// Utils
import {
  useCalendar,
  currentDate,
  weekDaysEN,
  reservationsDataToArray,
} from '../../lib/utilsCalendar';

// Queries
import MONTH_RESERVATIONS_QUERY from '../../graphgl/queries/MONTH_RESERVATIONS_QUERY';
// Components for Styling
import { StyledElevation } from '../styles/StyledForm';
import { StyledAvatar } from '../styles/StyledAvatar';
import { StyledContainer } from '../styles/StyledContainer';

const Calendar = ({ props }) => {
  const { guideId, guideName, guideSurname } = props;
  const weekNames = weekDaysEN();
  const today = currentDate();
  const {
    handleMonthChange,
    selectedYear,
    selectedMonth,
    emptyCells,
    daysInMonthArray,
  } = useCalendar();
  const { loading, error, data, refetch } = useQuery(MONTH_RESERVATIONS_QUERY, {
    variables: {
      year: selectedYear,
      month: selectedMonth,
      id: guideId,
    },
  });
  useEffect(() => {
    refetch();
  }, [selectedMonth]);
  //console.log('selectedDate', selectedDate);
  const Router = useRouter();
  const handleBooking = (day, dayInThePast, bookedTime, userName) => {
    if (dayInThePast) {
      alert(`you can't book a day in the past`);
      return;
    } else {
      Router.push({
        pathname: '/confirm_booking',
        query: {
          day,
          selectedMonth,
          selectedYear,
          guideId,
          //take it away?
          guideName,
          guideSurname,
          userName,
          bookedTime,
        },
      });
    }
  };
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error error={error} />;
  }
  if (data) {
    const reservations = reservationsDataToArray(data.days, guideId);
    return (
      <User>
        {(currentUserPermission, currentUserName, currentUserEmail) => (
          <StyledContainer>
            <StyledElevation z={5}>
              <StyledCalendarMenuContainer>
                <Year selectedYear={selectedYear} />
                <CalendarMenu
                  currentYear={today.year}
                  currentMonth={today.month}
                  selectedYear={selectedYear}
                  selectedMonth={selectedMonth}
                  handleMonthChange={handleMonthChange}
                />
                <StyledSpan>
                  <GuideAvatar guideId={guideId} />
                </StyledSpan>
              </StyledCalendarMenuContainer>
              <StyledCalendarContainer>
                {weekNames.map((day) => (
                  <StyledDayName key={day}>{day}</StyledDayName>
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
                      //reservation={reservation}
                      reservation={
                        reservations[dayOfMonth] ? reservations[dayOfMonth] : []
                      }
                      dayOfMonth={dayOfMonth}
                      highlight={
                        today.year === selectedYear &&
                        today.month === selectedMonth &&
                        today.day === dayOfMonth
                      }
                      handleBooking={handleBooking}
                      currentUserPermission={currentUserPermission}
                      currentUserName={currentUserName}
                      dayInThePast={
                        today.year === selectedYear &&
                        today.month === selectedMonth &&
                        parseInt(dayOfMonth) <= parseInt(today.day)
                      }
                    ></DaySpan>
                  );
                })}
              </StyledCalendarContainer>
            </StyledElevation>
          </StyledContainer>
        )}
      </User>
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
  margin: auto;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  justify-content: center;
  grid-gap: 1% 0.5%;
`;
const StyledCalendarMenuContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr 2fr;
`;
const StyledSpan = styled.span`
  display: grid;
  justify-content: center;
  padding-top: 5px;
`;
const StyledDayName = styled.div`
  font-family: var(--fontFamilyCalendar);
  font-size: 1.2rem;
  color: var(--colorSecundary);
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
