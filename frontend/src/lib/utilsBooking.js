import React, { useState } from 'react';
export const chooseWholeDay = 'Day Trip from 8.00 to 19.00';
export const chooseMorning = 'Morning Trip from 8.00 to 12.00';
export const chooseAfternoon = 'Afternoon Trip from 13.30 to 19.00';

export function useHandleTimeChange() {
  const [value, setValue] = useState('');

  function handleTimeChange(e) {
    console.log(e.currentTarget.value);

    switch (e.currentTarget.value) {
      case chooseWholeDay:
        setValue('DAY');
        break;
      case chooseMorning:
        setValue('AM');
        break;
      case chooseAfternoon:
        setValue('PM');
        break;
    }
  }
  return { value, onChange: handleTimeChange };
}
