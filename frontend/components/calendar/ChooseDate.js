import React, { useState } from 'react';

import DateFnsUtils from '@date-io/date-fns';
import format from 'date-fns/format';

const ChooseDate = (props) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div>
      <h4>Choose a Date:</h4>

      <p>
        Selected Date:
        <strong>{format(selectedDate, '	EEEE do MMMM yyyy')}</strong>
      </p>
      <h4>Choose Time:</h4>
      <p>Morning / Aftenoon</p>
      <button variant="contained" color="primary">
        Confirm
      </button>
    </div>
  );
};

export default ChooseDate;
