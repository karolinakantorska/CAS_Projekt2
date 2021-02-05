import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { weekDaysEN, monthEN } from '../../lib/utils';
import startOfMonth from 'date-fns/startOfMonth';
import getDaysInMonth from 'date-fns/getDaysInMonth';
import addMonths from 'date-fns/addMonths';
import addYears from 'date-fns/addYears';
import format from 'date-fns/format';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// Components
import DaySpan from './DaySpan';
import User from '../main/User';
import CalendarMenu from './CalendarMenu';
// Queries
import MONTH_RESERVATIONS_QUERY from '../../graphgl/queries/MONTH_RESERVATIONS_QUERY';
// Components for Styling
import { StyledElevation } from '../styles/StyledForm';
import { StyledAvatar } from '../styles/StyledAvatar';

const Calendar = ({ props }) => {
  const { guideId, guideName, guideSurname, guidePhoto, currentUserName } = props;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedYear, setSelectedYear] = useState(format(selectedDate, 'y'));
  const [selectedMonth, setSelectedMonth] = useState(format(selectedDate, 'MMMM'));
  const [firstDayOfMonth, setFirstDayOfMonth] = useState(
    format(startOfMonth(selectedDate), 'i'),
  );
  const [daysInMonth, setDaysInMonth] = useState(getDaysInMonth(selectedDate));
  // Calender
  const weekNames = weekDaysEN();
  const currentYear = format(new Date(), 'y');
  const currentMonth = format(new Date(), 'MMMM');
  const currentDay = format(new Date(), 'd');
  // Calender creating empty days
  const blankCells = [];
  for (let i = 1; i < firstDayOfMonth; i++) {
    blankCells.push(i);
  }
  const daysInMonthArray = [];
  for (let i = 1; i <= daysInMonth; i++) {
    daysInMonthArray.push(`${i}`);
  }
  // Calender changing month and year
  function handleMonthChange(i) {
    setSelectedDate(addMonths(selectedDate, i));
  }
  function handleYearChange(i) {
    setSelectedDate(addYears(selectedDate, i));
  }
  function updateStateWithSelectedDate() {
    setSelectedMonth(format(selectedDate, 'MMMM'));
    setSelectedYear(format(selectedDate, 'y'));
    setFirstDayOfMonth(format(startOfMonth(selectedDate), 'i'));
    setDaysInMonth(getDaysInMonth(selectedDate));
    //refetch();
  }

  useEffect(() => {
    updateStateWithSelectedDate();
  });

  // handle booking function
  const router = useRouter();
  const handleBooking = (day, dayInThePast, bookedTime, userName) => {
    console.log(userName);
    if (dayInThePast === 'dayInThePast') {
      alert(`you can't book a day in the past`);
      return;
    } else {
      router.push({
        pathname: '/confirm_booking',
        query: {
          day,
          selectedMonth,
          selectedYear,
          guideId,
          guideName,
          guideSurname,
          userName,
          bookedTime,
        },
      });
    }
  };
  const { loading, error, data, refetch } = useQuery(MONTH_RESERVATIONS_QUERY, {
    variables: {
      year: selectedYear,
      month: selectedMonth,
      id: guideId,
    },
  });
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <Error error={error} />;
  }
  if (data) {
    if (data.days.length > 0) {
      console.log(data.days[0]);
    }
    const reservationsQueryDataTransformedToArray = () => {
      const reservationsByDays = {};
      data.days.map((bookings) => {
        const { day, reservations } = bookings;
        reservationsByDays[day] = reservations;
      });
      return reservationsByDays;
    };
    const reservations = reservationsQueryDataTransformedToArray();
    return (
      <User>
        {(currentUserPermission, currentUserName, currentUserEmail) => (
          <StyledElevation z={5}>
            <StyledCalendarMenuContainer>
              <CalendarMenu
                currentYear={currentYear}
                currentMonth={currentMonth}
                selectedYear={selectedYear}
                selectedMonth={selectedMonth}
                handleMonthChange={handleMonthChange}
                handleYearChange={handleYearChange}
              />
              <StyledSpan>
                <StyledAvatar src={guidePhoto} size="xlarge" interactive />
              </StyledSpan>
            </StyledCalendarMenuContainer>

            <StyledCalendarContainer>
              {weekNames.map((day) => (
                <StyledDayName key={day} variant="h6" color="Dark">
                  {day}
                </StyledDayName>
              ))}
              {blankCells.map((day) => (
                <span key={day}></span>
              ))}

              {daysInMonthArray.map((dayOfMonth) => {
                // if day is a current day becomes highlight
                // TODO put it in function
                let highlight = false;
                if (
                  currentYear === selectedYear &&
                  currentMonth === selectedMonth &&
                  dayOfMonth === currentDay
                ) {
                  highlight = true;
                }
                // reservation prop
                let reservation = [];
                if (reservations[dayOfMonth]) {
                  reservation = reservations[dayOfMonth];
                }
                // disable booking in the past and on the current day
                let dayInThePast = '';
                if (
                  currentYear === selectedYear &&
                  currentMonth === selectedMonth &&
                  parseInt(dayOfMonth) <= parseInt(currentDay)
                ) {
                  dayInThePast = 'dayInThePast';
                }
                return (
                  <DaySpan
                    key={dayOfMonth}
                    reservation={reservation}
                    dayOfMonth={dayOfMonth}
                    highlight={highlight}
                    handleBooking={handleBooking}
                    currentUserPermission={currentUserPermission}
                    currentUserName={currentUserName}
                    dayInThePast={dayInThePast}
                  ></DaySpan>
                );
              })}
            </StyledCalendarContainer>
          </StyledElevation>
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
  align-content: center;
  justify-content: center;
`;
const StyledSpan = styled.span`
  display: grid;
  justify-content: center;
  padding-top: 0.5rem;
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
