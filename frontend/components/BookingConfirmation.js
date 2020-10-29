import React, { useState, useEffect } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import ONE_USER_QUERRY from '../graphgl/queries/ONE_USER_QUERRY';
import DAY_QUERRY from '../graphgl/queries/DAY_QUERRY';

const BookingConfirmation = (props) => {
  const {
    guideId,
    name,
    email,
    year,
    month,
    day,
  } = props.props.query;
/*
  const { loading, error, data } = useQuery(ONE_USER_QUERRY, {
    variables: { id: guideId },
  });
*/
/*
  const { loadingDay, errorDay, dataDay } = useQuery(DAY_QUERRY, {
    variables: { year, month },
  });
  */
  //console.log(data)
  //console.log(dataDay);
  //const { name: guideName,  surname: guideSurname  } = data.user;
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }
  function handleTimeChange(e) {
    setTime(e.target.value);
  }

  return (
    <fieldset>
      <p>
        <strong>Hallo: {name}!</strong>
      </p>
      <h4>Confirm your booking details please!</h4>
      {/*      <p>
        Your MTB Guide will be: {guideName} {guideSurname}
      </p>/*/}
      <p>
        Booked Date: {year}/{month}/{day}
      </p>

      <p>Do you preffer Morning or Aftenoon Trip?</p>
      <input
        type="radio"
        onChange={handleTimeChange}
        name="time"
        value="AM"
      />
      <label for="time">Morning Trip from 8.00 to 12.00</label>
      <br />
      <input
        type="radio"
        onChange={handleTimeChange}
        name="time"
        value="PM"
      />
      <label for="time">Aftenoon Trip from 13.30 to 19.00</label>
      <br />
      <input
        type="radio"
        onChange={handleTimeChange}
        name="time"
        value="DAY"
      />
      <label for="time">Day Trip from 8.00 to 19.00</label>
      <br />
      <p>
        Write if you want to arrive latter, stay with us until a late
        evening? Have some Ideas where would you like to go?
      </p>
      <br />
      <input
        type="textarea"
        onChange={handleDescriptionChange}
        defaultValue={description}
      />
      <br />
      <button>Confirm and Go!</button>
    </fieldset>
  );
};

export default BookingConfirmation;
/*
      <form>
        <p>Morning or Aftenoon Trip?</p>
        <input type="radio"  name="time" value="AM" />
        <label for="AM">Morning Trip from 8 to 12</label><br>
        <input type="radio"  name="time" value="PM" />
        <label for="PM">Aftenoon Trip from 13 to 19</label><br>
        <input type="radio"  name="time" value="DAY" />
        <label for="DAY">Day Trip from 8 to 19</label>
      </form>
      */
