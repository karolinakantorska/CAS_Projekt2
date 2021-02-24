import React, { useState, useEffect } from 'react';
import startOfMonth from 'date-fns/startOfMonth';
import getDaysInMonth from 'date-fns/getDaysInMonth';
import addMonths from 'date-fns/addMonths';
import format from 'date-fns/format';

// calendar
export const weekDaysEN = () => {
  const week = [];
  for (let i = 0; i < 7; i++) {
    week.push(
      new Date(2010, 0, 4 + i).toLocaleString('en-GB', {
        weekday: 'short',
      }),
    );
  }
  return week;
};
export const reservationsDataToArray = (queryResult, guideId) => {
  const reservationsByDays = {};
  queryResult.map((bookings) => {
    const { day, reservations } = bookings;
    // filtering out reservations from another guide
    const reservationsFromOneGuide = reservations.filter(
      (reservation) => reservation.guide.id === guideId,
    );
    reservationsByDays[day] = reservationsFromOneGuide;
  });
  return reservationsByDays;
};
export function currentDate() {
  const year = format(new Date(), 'y');
  const month = format(new Date(), 'MMMM');
  const day = format(new Date(), 'd');
  const todayTimestamp = format(new Date(), 't');
  const todayTreeMonthsLaterTimestamp = format(addMonths(new Date(), 3), 't');
  return { year, month, day, todayTimestamp, todayTreeMonthsLaterTimestamp };
}
export function useCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const selectedDateTimestamp = format(selectedDate, 't');
  const selectedMonth = format(selectedDate, 'MMMM');
  const selectedYear = format(selectedDate, 'y');
  const firstDayOfMonth = format(startOfMonth(selectedDate), 'i');
  const daysInMonth = getDaysInMonth(selectedDate);
  //const [selectedYear, setSelectedYear] = useState(format(selectedDate, 'y'));
  //const [selectedMonth, setSelectedMonth] = useState(format(selectedDate, 'MMMM'));
  //const [firstDayOfMonth, setFirstDayOfMonth] = useState(
  //  format(startOfMonth(selectedDate), 'i'),
  //);
  //const [daysInMonth, setDaysInMonth] = useState(getDaysInMonth(selectedDate));
  //changing Month
  function handleMonthChange(i) {
    setSelectedDate(addMonths(selectedDate, i));
  }
  /*
  function updateStateWithSelectedDate() {
    setSelectedMonth(format(selectedDate, 'MMMM'));
    setSelectedYear(format(selectedDate, 'y'));
    setFirstDayOfMonth(format(startOfMonth(selectedDate), 'i'));
    setDaysInMonth(getDaysInMonth(selectedDate));
  }
  */
  /*
  useEffect(() => {
    //updateStateWithSelectedDate();
    setSelectedDate(selectedDate);
  }, [selectedDate]);
  */
  const emptyCells = [];
  for (let i = 1; i < firstDayOfMonth; i++) {
    emptyCells.push(i);
  }
  const daysInMonthArray = [];
  for (let i = 1; i <= daysInMonth; i++) {
    daysInMonthArray.push(`${i}`);
  }
  return {
    handleMonthChange,
    selectedYear,
    selectedMonth,
    emptyCells,
    daysInMonthArray,
    selectedDateTimestamp,
  };
}

/*
  useEffect(() => {

  }, []);
*/
