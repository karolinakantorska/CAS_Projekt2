import React, { useState, useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { weekEN, monthEN } from "../lib/utils";
import startOfMonth from 'date-fns/startOfMonth';
import getDaysInMonth from 'date-fns/getDaysInMonth';
import addMonths from 'date-fns/addMonths';
import addYears from 'date-fns/addYears';
import format from "date-fns/format";
import styled from 'styled-components';

// existiing reservations Querry
const DAYS_WITH_RESERVATIONS_QUERY = gql`
  query DAYS_WITH_RESERVATIONS_QUERY($year: String!, $month: String!, $guideID: ID) {
    days(where: {year:$year, month:$month, reservation_every: {guideID:$guideID}}) {
      day
      reservation{
        id
        time
        userName
        userEmail
      }
    }
  }
`
const CalendarComponent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedYear, setSelectedYear] = useState(format(selectedDate,'y'));
  const [selectedMonth, setSelectedMonth] = useState(format(selectedDate,'MMMM'));
  const [firstDayOfMonth, setFirstDayOfMonth] = useState(format(startOfMonth(selectedDate),'i'));
  const [daysInMonth, setDaysInMonth] = useState(getDaysInMonth(selectedDate));
// TODO find a guide ID and delete this const
  const guideID= 'ckfn05p6sm3ia0950mk1l61v6'
// Calender
  const weekNames = weekEN();
  const currentYear = format((new Date()),'y');
  const currentMonth = format((new Date()),'MMMM');
  const currentDay = format((new Date()),'d');

  const book =() =>{
    console.log("I am booking");
  }
// Calender
  const handleMonthChange = (i) => {
    setSelectedDate(addMonths(selectedDate, i));
  }
  const handleYearChange = (i) => {
    setSelectedDate(addYears(selectedDate, i));
  }
  const updateStateForSelectedData = () => {
    setSelectedMonth(format(selectedDate,'MMMM'));
    setSelectedYear(format(selectedDate,'y'));
    setFirstDayOfMonth(format(startOfMonth(selectedDate),'i'));
    setDaysInMonth(getDaysInMonth(selectedDate));
  }
useEffect(()=>{
  updateStateForSelectedData();
})
  const blankCells =[];
  for (let i=1; i< firstDayOfMonth; i++) {
    blankCells.push(i)
  }
  const daysInMonthArray =[];
  for (let i=1; i<= daysInMonth; i++){
    daysInMonthArray.push(`${i}`)
  }
// Reservations Query
    const { loading, error, data } = useQuery(DAYS_WITH_RESERVATIONS_QUERY, {
      variables:{ year: selectedYear, month: selectedMonth, guideID }
    });
    if (error) return <p>Error:{error}</p>
    if (loading) return <p>Loading...</p>;

// Query data to simpler object
    const reservationsQueryDataToArray =() =>{
      const reservations= {};
      data.days.map(dayEntry=> {
        const { day, reservation } = dayEntry;
        reservations[day] = reservation

      })
      return reservations
    }
    const reservations = reservationsQueryDataToArray();
    
  return (
    <div>
      <section>
        <button onClick={() => handleYearChange(-1)} >&#8592;</button>{selectedYear}<button onClick={() => handleYearChange(1)}>&#8594;</button>
      </section>
      <section>
        <button onClick={() => {handleMonthChange(-1)}}>&#8592;</button>{selectedMonth}<button onClick={() => handleMonthChange(1)}>&#8594;</button>
      </section>
      <CalendarContainer>
      {weekNames.map(day => (
      <span key={day} className='week-day_span'>{day}</span>
      ))}
      {blankCells.map(day => (
        <DaySpan key={day} className='empty-day_span'></DaySpan>
      ))}

      {daysInMonthArray.map(day => {
        let highlightDayNr = '';
        if (currentYear=== selectedYear && currentMonth===selectedMonth && day === currentDay ){
          highlightDayNr = 'highlight';
        }
        if (reservations[day]) {
          return (
            <DaySpan key={day} className='day_span'>
              <p className={highlightDayNr}>{day}</p>
              {reservations[day].map(res => {
                return(
                  <EntrySpan className='entryContainer' key={res.id}>
                    <div className={res.time}>
                      <p>gast name: ${res.name}</p>
                    </div>
                  </EntrySpan>
                )
              })
              }
            </DaySpan>
          )
    }

        return (
              <DaySpan key={day} className='day_span' onClick={book}>
                <p  className={highlightDayNr}>{day}</p>
              </DaySpan>
          )
        })}
      </CalendarContainer>
    </div>
  );
};
const CalendarContainer = styled.div`
    background: white;
    display: grid;
    grid-template-columns: repeat(7,1fr) ;
`;
const DaySpan = styled.span`
    background: white;
    display: grid;
    .highlight {
      color: red;
    }
`;
const EntrySpan = styled.span`
    background: white;
    font-size: 0.6rem;
    & .AM {
      background: lightskyblue;
      border: 1px solid gray;
      padding: 0;
    }
    & .PM {
      background: powderblue;
      border: 1px solid gray;
    }
    & .AM::before {
      content: "AM"
    }
    & .PM::before {
      content: "AM"
    }
`;
export default CalendarComponent;


