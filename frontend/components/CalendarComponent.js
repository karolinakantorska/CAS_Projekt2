import React, { useState, useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { weekEN, monthEN } from "../lib/utils";
import DateFns from "@date-io/date-fns";
import startOfMonth from 'date-fns/startOfMonth';
import getDaysInMonth from 'date-fns/getDaysInMonth';
import addMonths from 'date-fns/addMonths';
import format from "date-fns/format";
import styled from 'styled-components';

const CalendarComponent = () => {
  const [firstDayOfMonth, setFirstDayOfMonth] = useState(format(startOfMonth(new Date()),'i'));
  const [selectedMonth, setSelectedMonth] = useState(format((new Date()),'MMMM'));
  const [selectedYear, setSelectedYear] = useState(format((new Date()),'y'));
  const [daysInMonth, setDaysInMonth] = useState(getDaysInMonth(new Date()));
  const [selectedDate, setDaysMonth] = useState(new Date());

    const weekNames = weekEN();
    const monthNames = monthEN();

    const currentYear = format((new Date()),'y');
    const currentMonth = format((new Date()),'MMMM');
    const currentDay = format((new Date()),'d');

      useEffect(() => {
        if (currentMonth === selectedMonth && currentYear === selectedYear ){
          const highlitedParagraph = document.querySelector(`.day${currentDay}`);
          highlitedParagraph.classList.add('highlight');
          // TODO make class highlight work
          highlitedParagraph.textContent += ' today';
        }
      });
// fake data 1
    const fakeData = {
      21: [
        {
        day: 21,
        guide: 'goofy',
        email: 'kot@malpa',
        name: 'modliszka',
        time: 'AM'
        },
        {
        day: 21,
        guide: 'mickey',
        email: 'kotka@malpa',
        name: 'chyra',
        time: 'PM'
        },
    ],
      10: [{
        day: 10,
        email: 'kotka@malpa',
        name: 'chyra',
        time: 'AM'
      },{
        day: 10,
        email: 'mala@malpa',
        name: 'lila',
        time: 'AM'
      },],
      24: [{
        day: 10,
        email: 'kkota@malpa',
        name: 'szybka',
        time: 'DAY'
      }]
    }
// fake data end

  const blankCells =[];
  for (let i=1; i< firstDayOfMonth; i++) {
    blankCells.push(i)
  }

  const daysInMonthArray =[];
  for (let i=1; i<= daysInMonth; i++){
    daysInMonthArray.push(i)
  }

   // console.log('blankCells' , blankCells.length )

  return (
    <div>
      <section>
        <button>&#8592;</button>{selectedYear}<button>&#8594;</button>
      </section>
      <section>
        <button>&#8592;</button>{selectedMonth}<button>&#8594;</button>
      </section>
      <CalendarContainer>
      {weekNames.map(day => (
      <span key={day} className='week-day_span'>{day}</span>
      ))}
      {blankCells.map(day => (
        <DaySpan key={day} className='empty-day_span'><p></p></DaySpan>
      ))}
      {daysInMonthArray.map(day => {
        if (day in fakeData){
          return (
          <DaySpan key={day} className='day_span' >
            <p  className={`day${day}`}>{day}</p>
            {fakeData[day].map(entry => {
              console.log(entry.time);
              return(
                <EntrySpan key={entry.guide, day, entry.time, entry.name }>
                  <div className={entry.time}>
                    <p>gast name: {entry.name}</p>
                    <p>gast email:{entry.email}</p>
                    <p>guide name:{entry.guide}</p>
                  </div>
                </EntrySpan>)
            })}
          </DaySpan>
          )
        }
        return (
          <DaySpan key={day} className='day_span'>
            <p className={`day${day}`}>{day}</p>
          </DaySpan>
          )
      })
    }
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
`;
const EntrySpan = styled.span`
    background: white;
    font-size: 0.6rem;
    & .highlight {
      background: lightyellow;
      font-size: 0.8rem;
      color: red;
    }
    & .AM {
      background: lightskyblue;
      border: 1px solid gray;
      padding: 0;
    }
    & .PM {
      background: powderblue;
      border: 1px solid gray;
    }
    & .DAY {
      background: lightsalmon;
      border: 1px solid gray;
    }
    & .AM::before {
      content: "AM"
    }
    & .PM::before {
      content: "AM"
    }
    & .DAY::before {
      content: "AM"
    }
`;
export default CalendarComponent;
