import React, { useState, useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";
import DateFnsUtils from "@date-io/date-fns";
import format from "date-fns/format";

import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";



const ChooseDate = (props) => {
  const [selectedDate, setSelectedDate] = useState(new Date());


  return (
    <div>
      <h4>Choose a Date:</h4>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          variant="static"
          orientation="landscape"
          value={selectedDate}
          onChange={setSelectedDate}
        />
      </MuiPickersUtilsProvider>

      <p>
        Selected Date:
        <strong>{format(selectedDate, "	EEEE do MMMM yyyy")}</strong>
      </p>
      <h4>Choose Time:</h4>
      <p>Morning / Aftenoon</p>
      <Button variant="contained" color="primary">
        Confirm
      </Button>
    </div>
  );
};


export default ChooseDate;
