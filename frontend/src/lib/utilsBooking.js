import React, { useState } from 'react';

// tested:
export function checkGuideAvability(data, reservationTime) {
  if (data) {
    if (data.reservations.length === 0) {
      return true;
    }
    if (data.reservations.length === 2) {
      return false;
    }
    if (data.reservations.length > 0) {
      const newArray = [];
      data.reservations.map((res) => {
        newArray.push(res.time);
      });
      if (newArray.includes('DAY')) {
        return false;
      }
      if (newArray.includes(reservationTime)) {
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
  const [time, setTime] = useState(switchBookedTime(bookedTime));
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
      default:
    }
  }
  return { time, handleTimeChange };
}
