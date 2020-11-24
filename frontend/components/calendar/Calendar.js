import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { weekDaysEN, monthEN } from '../../lib/utils';
import startOfMonth from 'date-fns/startOfMonth';
import getDaysInMonth from 'date-fns/getDaysInMonth';
import addMonths from 'date-fns/addMonths';
import addYears from 'date-fns/addYears';
import format from 'date-fns/format';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import DaySpan from './DaySpan';
import User from '../main/User';
import CalendarMenu from './CalendarMenu';
import MONTH_RESERVATIONS_QUERY from '../../graphgl/queries/MONTH_RESERVATIONS_QUERY';

const Calendar = (props) => {
  const { guideId, guideName, guideSurname } = props.props;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedYear, setSelectedYear] = useState(
    format(selectedDate, 'y'),
  );
  const [selectedMonth, setSelectedMonth] = useState(
    format(selectedDate, 'MMMM'),
  );
  const [firstDayOfMonth, setFirstDayOfMonth] = useState(
    format(startOfMonth(selectedDate), 'i'),
  );
  const [daysInMonth, setDaysInMonth] = useState(
    getDaysInMonth(selectedDate),
  );
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
    refetch();
  }
  useEffect(() => {
    updateStateWithSelectedDate();
  });
  // handle booking function
  const router = useRouter();
  const handleBooking = (day, currentUserName, currentUserEmail) => {
    router.push({
      pathname: '/confirm_booking',
      query: {
        day,
        selectedMonth,
        selectedYear,
        guideId,
        guideName,
        guideSurname,
      },
    });
  };

  // Months Reservations Query
  // TODO resend Query after state change
  const { loading, error, data, refetch } = useQuery(
    MONTH_RESERVATIONS_QUERY,
    {
      variables: {
        year: selectedYear,
        month: selectedMonth,
        guideID: guideId,
      },
    },
  );
  if (error) return <p>Error:{error}</p>;
  if (loading) {
    return <p>Loading...</p>;
  }

  console.log('data: ', data);
  //console.log('data.days: ',data.days);
  //TODO put it to helpers
  const reservationsQueryDataTransformedToArray = () => {
    const reservationsByDays = {};
    data.days.map((bookings) => {
      //console.log(bookings);
      const { day, reservations } = bookings;
      reservationsByDays[day] = reservations;
    });
    //console.log(reservationsByDays);
    return reservationsByDays;
  };
  const reservations = reservationsQueryDataTransformedToArray();
  return (
    <User>
      {(currentUserPermission, currentUserName, currentUserEmail) => (
        <Card>
          <CalendarMenu
            currentYear={currentYear}
            currentMonth={currentMonth}
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
            handleMonthChange={handleMonthChange}
            handleYearChange={handleYearChange}
          />
          <StyledCalendar>
            {weekNames.map((day) => (
              <Typography key={day} variant="h6">
                {day}
              </Typography>
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
              let booking = handleBooking;
              if (
                currentYear === selectedYear &&
                currentMonth === selectedMonth &&
                parseInt(dayOfMonth) <= parseInt(currentDay)
              ) {
                booking = () => null;
              }
              return (
                <DaySpan
                  key={dayOfMonth}
                  reservation={reservation}
                  dayOfMonth={dayOfMonth}
                  highlight={highlight}
                  handleBooking={booking}
                  currentUserPermission={currentUserPermission}
                ></DaySpan>
              );
            })}
          </StyledCalendar>
        </Card>
      )}
    </User>
  );
};
Calendar.propTypes = {
  guideId: PropTypes.string,
  guideName: PropTypes.string,
  guideSurname: PropTypes.string,
};
const StyledCalendar = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 4px 4px;
`;

export default Calendar;
