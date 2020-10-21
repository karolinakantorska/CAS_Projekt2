import React, { useState, useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { weekEN, monthEN } from "../lib/utils";
import startOfMonth from 'date-fns/startOfMonth';
import getDaysInMonth from 'date-fns/getDaysInMonth';
import addMonths from 'date-fns/addMonths';
import addYears from 'date-fns/addYears';
import format from "date-fns/format";
import styled from 'styled-components';
import Entry from './Entry'

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
const CalendarComponent = (props) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedYear, setSelectedYear] = useState(format(selectedDate,'y'));
  const [selectedMonth, setSelectedMonth] = useState(format(selectedDate,'MMMM'));
  const [firstDayOfMonth, setFirstDayOfMonth] = useState(format(startOfMonth(selectedDate),'i'));
  const [daysInMonth, setDaysInMonth] = useState(getDaysInMonth(selectedDate));
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
      variables:{ year: selectedYear, month: selectedMonth, guideID: props.guideId}
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
      <p>{props.guideId}</p>
      <section>
        {// button inactive in current month
        ((currentYear=== selectedYear && currentMonth===selectedMonth))
          ? <button  disabled >&#8592;</button>
          : <button onClick={() => handleYearChange(-1)} >&#8592;</button>}
        {selectedYear}
        <button onClick={() => handleYearChange(1)}>&#8594;</button>
      </section>
      <section>
        {// button inactive in current month
        ((currentYear=== selectedYear && currentMonth===selectedMonth))
          ? <button  disabled >&#8592;</button>
          : <button onClick={() => handleMonthChange(-1)} >&#8592;</button>}
        {selectedMonth}
        <button onClick={() => handleMonthChange(1)}>&#8594;</button>
      </section>
      <CalendarContainer>
      {weekNames.map(day => (
      <span key={day} className='week-day_span'>{day}</span>
      ))}
      {blankCells.map(day => (
        <DaySpan key={day} className='empty-day_span'></DaySpan>
      ))}

      {daysInMonthArray.map(day => {
        let generated_className = '';
        let disabled = false;
        // if day is a current day becomes highlight
        if (currentYear=== selectedYear && currentMonth===selectedMonth && day === currentDay ){
          generated_className = 'highlight';
        }
        // days before current day current day have inactive buttons
        if (currentYear=== selectedYear && currentMonth===selectedMonth && day < Number(currentDay) ){
          disabled = true;
        }
        // if there are reservations at the day
        if (reservations[day]) {
          // if there is only one reservation at the day
          if (reservations[day].length===1){
            console.log(reservations[day][0]);
            const {time, userName, userEmail, id} = reservations[day][0];
            if(time==='PM'){
              return(
                <DaySpan key={day} className='day_span'>
                <p className={generated_className}>{day}</p>
                <button onClick={book} disabled={disabled} >Book AM Tour!</button>
                <Entry time={time} userName={userName} userEmail={userEmail} id={id} />
              </DaySpan>
              )
            }
            if(time==='AM'){
              return(
                <DaySpan key={day} className='day_span'>
                <p className={generated_className}>{day}</p>
                <Entry time={time} userName={userName} userEmail={userEmail} id={id} />
                <button onClick={book} disabled={disabled} >Book PM Tour!</button>
              </DaySpan>
              )
            }

          }
          return (
            <DaySpan key={day} className='day_span'>
              <p className={generated_className}>{day}</p>
              {reservations[day].map(res => {
                const {time, userName, userEmail, id} = res;
                return(
                  <Entry time={time} userName={userName} userEmail={userEmail} id={id} key={id} />
                )
              })
              }
            </DaySpan>
          )
        }
        return (
              <DaySpan key={day} className='day_span' onClick={book}>
                <p  className={generated_className}>{day}</p>
                <button onClick={book} disabled={disabled} >Book AM Tour!</button>
                <button onClick={book} disabled={disabled}>Book PM Tour!</button>
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

export default CalendarComponent;


