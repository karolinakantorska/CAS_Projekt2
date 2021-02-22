import React, { useState } from 'react';
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
  function timeFreeToBook() {
    if ((bookedTime = AM)) {
      return PM;
    }
    if ((bookedTime = PM)) {
      AM;
    }
    return '';
  }
  const [time, setValue] = useState(timeFreeToBook());
  console.log('timeFreeToBook', time);
  function handleTimeChange(e) {
    switch (e.target.value) {
      case chooseWholeDay:
        setValue(DAY);
        break;
      case chooseMorning:
        setValue(AM);
        break;
      case chooseAfternoon:
        setValue(PM);
        break;
    }
  }
  return { time, handleTimeChange };
}
