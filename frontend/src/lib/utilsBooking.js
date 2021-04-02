import React, { useState } from 'react';
import { routeToBookingConfirmation } from '../lib/utilsRouts';

export function checkGuideAvability(data, reservationTime) {
  if (data) {
    if (data.reservations.length === 0) {
      return true;
    } else {
      const newArray = [];
      data.reservations.map((res) => {
        newArray.push(res.time);
      });
      console.log(newArray);
      if (newArray.includes('DAY')) {
        console.log('incudesDay');
        return false;
      }

      if (newArray.includes('AM' && 'PM')) {
        console.log('includes AM PM');
        return false;
      }
      if (newArray.includes(reservationTime)) {
        console.log('includes', time);
        return false;
      }
      return true;
    }
  }
}

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
