import React, { useState } from 'react';
import { routeToBookingConfirmation, routeToGuidesList } from '../lib/utilsRouts';
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
export function handleBookingConfirmation(
  e,
  time,
  day,
  month,
  year,
  userName,
  userEmail,
  nrOfPeople,
  description,
  guideId,
  existingDay,
  createDay,
  updateDay,
) {
  e.preventDefault();
  removeErrorMessage();
  const errors = validateFormBookingConfirmation(time);
  addErrorMessage(errors);
  console.log('existingDay', existingDay);
  if (errors.length === 0) {
    if (existingDay.length === 0) {
      console.log('create');
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
      console.log('update');
      console.log('existingDay[0].id', existingDay[0].id);

      updateDay({
        variables: {
          time,
          userName,
          userEmail,
          nrOfPeople: nrOfPeople.value,
          description: description.value,
          id: guideId,
          dayId: existingDay[0].id,
        },
      });
    }
  }
}
export function handleCloseReservationDetails() {
  routeToGuidesList();
}
export function handleDeleteReservation(id, deleteReservation) {
  deleteReservation({
    variables: { id },
  });
}
