import React, { useState, useEffect } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Router, useRouter } from 'next/router';
import Link from 'next/link';
import { weekEN, monthEN } from '../lib/utils';
import startOfMonth from 'date-fns/startOfMonth';
import getDaysInMonth from 'date-fns/getDaysInMonth';
import addMonths from 'date-fns/addMonths';
import addYears from 'date-fns/addYears';
import format from 'date-fns/format';
import styled from 'styled-components';
import Entry from './Entry';
import User from './User';
import CalendarMenu from './CalendarMenu';
import DAYS_WITH_RESERVATIONS_QUERY from '../graphgl/queries/DAYS_WITH_RESERVATIONS_QUERY';

const Calendar = (props) => {
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
  const { guideId } = props;
  // Calender
  const weekNames = weekEN();
  const currentYear = format(new Date(), 'y');
  const currentMonth = format(new Date(), 'MMMM');
  const currentDay = format(new Date(), 'd');
  // routing and booking
  const router = useRouter();

  const handleBooking = (
    name,
    email,
    year,
    month,
    day,
    alreadyBooked,
  ) => {
    router.push({
      pathname: '/confirm_booking',
      query: {
        guideId,
        name,
        email,
        year,
        month,
        day,
      },
    });
  };
  // Calender
  const handleMonthChange = (i) => {
    setSelectedDate(addMonths(selectedDate, i));
  };
  const handleYearChange = (i) => {
    setSelectedDate(addYears(selectedDate, i));
  };
  const updateStateForSelectedDate = () => {
    setSelectedMonth(format(selectedDate, 'MMMM'));
    setSelectedYear(format(selectedDate, 'y'));
    setFirstDayOfMonth(format(startOfMonth(selectedDate), 'i'));
    setDaysInMonth(getDaysInMonth(selectedDate));
  };
  useEffect(() => {
    updateStateForSelectedDate();
  });
  // Calender
  const blankCells = [];
  for (let i = 1; i < firstDayOfMonth; i++) {
    blankCells.push(i);
  }
  const daysInMonthArray = [];
  for (let i = 1; i <= daysInMonth; i++) {
    daysInMonthArray.push(`${i}`);
  }
  // Reservations Query
  const { loading, error, data } = useQuery(
    DAYS_WITH_RESERVATIONS_QUERY,
    {
      variables: {
        year: selectedYear,
        month: selectedMonth,
        guideID: guideId,
      },
    },
  );
  if (error) return <p>Error:{error}</p>;
  if (loading) return <p>Loading...</p>;
  // Query data transformed to simpler object
  const reservationsQueryDataToArray = () => {
    const reservations = {};
    data.days.map((dayEntry) => {
      const { day, reservation } = dayEntry;
      reservations[day] = reservation;
    });
    return reservations;
  };
  const reservations = reservationsQueryDataToArray();

  return (
    <User>
      {(currentUserPermission, currentUserName, currentUserEmail) => (
        <section>
          <CalendarMenu
            currentYear={currentYear}
            currentMonth={currentMonth}
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
            handleMonthChange={handleMonthChange}
            handleYearChange={handleYearChange}
          />

          <CalendarContainer>
            {weekNames.map((day) => (
              <span key={day} className="week-day_span">
                {day}
              </span>
            ))}
            {blankCells.map((day) => (
              <DaySpan key={day} className="empty-day_span"></DaySpan>
            ))}
            {daysInMonthArray.map((day) => {
              let generated_className = '';
              // if day is a current day becomes highlight
              if (
                currentYear === selectedYear &&
                currentMonth === selectedMonth &&
                day === currentDay
              ) {
                generated_className = 'highlight';
              }
              // if there are reservations at the day
              if (reservations[day]) {
                // if there is only one reservation at the day
                if (reservations[day].length === 1) {
                  console.log(reservations[day][0]);
                  const {
                    time,
                    userName,
                    userEmail,
                    id,
                  } = reservations[day][0];
                  return (
                    <DaySpan
                      key={day}
                      className="day_span"
                      onClick={() =>
                        handleBooking(
                          currentUserName,
                          currentUserEmail,
                          selectedYear,
                          selectedMonth,
                          day,
                        )
                      }
                    >
                      <p className={generated_className}>{day}</p>
                      <Entry
                        time={time}
                        userName={userName}
                        userEmail={userEmail}
                        id={id}
                        currentUserPermission={currentUserPermission}
                      />
                    </DaySpan>
                  );
                }
                // if there are 2 reservations at the day
                return (
                  <DaySpan key={day} className="day_span">
                    <p className={generated_className}>{day}</p>
                    {reservations[day].map((res) => {
                      const { time, userName, userEmail, id } = res;
                      return (
                        <Entry
                          time={time}
                          userName={userName}
                          userEmail={userEmail}
                          id={id}
                          currentUserPermission={
                            currentUserPermission
                          }
                          key={id}
                        />
                      );
                    })}
                  </DaySpan>
                );
              }
              // if there is no reservation at the day
              return (
                <DaySpan
                  key={day}
                  className="day_span"
                  onClick={() =>
                    handleBooking(
                      currentUserName,
                      currentUserEmail,
                      selectedYear,
                      selectedMonth,
                      day,
                    )
                  }
                >
                  <p className={generated_className}>{day}</p>
                </DaySpan>
              );
            })}
          </CalendarContainer>
        </section>
      )}
    </User>
  );
};
const CalendarContainer = styled.div`
  background: white;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;
const DaySpan = styled.span`
  background: white;
  display: grid;
  .highlight {
    color: red;
  }
`;

export default Calendar;
