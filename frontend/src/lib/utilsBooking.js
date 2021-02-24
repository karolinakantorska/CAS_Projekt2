import React, { useState } from 'react';
import { routeToBookingConfirmation } from '../lib/utilsRouts';
import {
  validateFormBookingConfirmation,
  addErrorMessage,
  removeErrorMessage,
} from '../lib/utilsForm.js';

export const chooseWholeDay = 'Day Trip from 8.00 to 19.00';
export const chooseMorning = 'Morning Trip from 8.00 to 12.00';
export const chooseAfternoon = 'Afternoon Trip from 13.30 to 19.00';

const AM = 'AM';
const PM = 'PM';
const DAY = 'DAY';

export function timeToString(time) {
  switch (time) {
    case AM:
      return chooseMorning;
    case PM:
      return chooseAfternoon;
    case DAY:
      return chooseWholeDay;
  }
}
export function useHandleTimeChange(bookedTime) {
  console.log('bookedTime', bookedTime);
  function switchBookedTime(bookedTime) {
    if (bookedTime === 'AM') {
      return 'PM';
    }
    if (bookedTime === 'PM') {
      return 'AM';
    }
    if (bookedTime === '') {
      return '';
    }
  }

  const [time, setTime] = useState(switchBookedTime(bookedTime));
  console.log('time', time);
  function handleTimeChange(e) {
    switch (e.target.value) {
      case chooseWholeDay:
        setTime(DAY);
        break;
      case chooseMorning:
        setTime(AM);
        break;
      case chooseAfternoon:
        setTime(PM);
        break;
    }
  }
  return { time, handleTimeChange };
}
export function handleBooking(
  dayInThePast,
  dayTooMuchInFuture,
  day,
  selectedMonth,
  selectedYear,
  guideId,
  bookedTime,
) {
  if (dayInThePast) {
    alert(`You can't book a day in the past`);
    return;
  }
  if (dayTooMuchInFuture) {
    alert(
      `We are sorry but you don't offer bookings for more than tree months in advance`,
    );
    return;
  } else {
    routeToBookingConfirmation(day, selectedMonth, selectedYear, guideId, bookedTime);
  }
}
export function handleBookingConfirmation(e, userName, userEmail) {
  e.preventDefault();
  removeErrorMessage();
  const errors = validateFormBookingConfirmation(time);
  addErrorMessage(errors);
  if (errors.length === 0) {
    // day doesn't exist yet
    // returns days=[]
    if (data.days.length === 0) {
      createDay({
        variables: {
          time,
          day,
          month,
          year,
          userName,
          userEmail,
          nrOfPeople: nrOfPeople.value,
          description: description.value,
          id: guideId,
        },
      });
    }
    // day exist
    else {
      const { id } = data.days[0];
      updateDay({
        variables: {
          time,
          userName,
          userEmail,
          nrOfPeople: nrOfPeople.value,
          description: description.value,
          id: guideId,
          dayId: id, //existing day id
        },
      });
    }
  }
}
