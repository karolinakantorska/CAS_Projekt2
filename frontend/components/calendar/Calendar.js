import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { weekDaysEN, monthEN } from '../../lib/utils';
import startOfMonth from 'date-fns/startOfMonth';
import getDaysInMonth from 'date-fns/getDaysInMonth';
import addMonths from 'date-fns/addMonths';
import addYears from 'date-fns/addYears';
import format from 'date-fns/format';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Entry from './Entry';
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
  // Creating Calender
  const blankCells = [];
  for (let i = 1; i < firstDayOfMonth; i++) {
    blankCells.push(i);
  }
  const daysInMonthArray = [];
  for (let i = 1; i <= daysInMonth; i++) {
    daysInMonthArray.push(`${i}`);
  }

  // Calender
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
  }
  useEffect(() => {
    updateStateWithSelectedDate();
  });
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
  const { loading, error, data } = useQuery(
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
  if (loading) return <p>Loading...</p>;
  //console.log('data: ',data);
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

                // reservations[day][0].time !== 'DAY'
                if (reservations[day].length === 1) {
                  //console.log(reservations[day][0]);
                  const {
                    time,
                    userName,
                    userEmail,
                    id,
                  } = reservations[day][0];
                  return (
                    <DaySpan key={day} className="day_span">
                      <p className={generated_className}>{day}</p>
                      <Entry
                        time={time}
                        userName={userName}
                        userEmail={userEmail}
                        id={id}
                        currentUserPermission={currentUserPermission}
                      />
                      {time !== 'DAY' && (
                        <span
                          style={{ backgroundColor: 'red' }}
                          onClick={() =>
                            handleBooking(
                              day,
                              currentUserName,
                              currentUserEmail,
                            )
                          }
                        />
                      )}
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
                <DaySpan key={day} className="day_span">
                  <p className={generated_className}>{day}</p>
                  <span
                    style={{ backgroundColor: 'red' }}
                    onClick={() =>
                      handleBooking(
                        day,
                        currentUserName,
                        currentUserEmail,
                      )
                    }
                  />
                </DaySpan>
              );
            })}
          </CalendarContainer>
        </section>
      )}
    </User>
  );
};

Calendar.propTypes = {
  guideId: PropTypes.string,
  guideName: PropTypes.string,
  guideSurname: PropTypes.string,
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
