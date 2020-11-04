import React, { useState, useEffect } from 'react';
import { gql, useMutation, useQuery, useLazyQuery } from '@apollo/client';
import User from './User';
import DAY_QUERY from '../graphgl/queries/DAY_QUERY';
import CREATE_DAY from '../graphgl/mutations/CREATE_DAY'; 
import CREATE_RESERVATION from '../graphgl/mutations/CREATE_RESERVATION';

const BookingConfirmation = (props) => {
  const {
    day,
    selectedMonth: month,
    selectedYear: year,
    guideId,
    guideName,
    guideSurname,
  } = props.props.query;
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [nrOfPeople, setNrOfPeople] = useState(1);
  let existingDayID = '';
    const { loading, error, data: dataDay  } = useQuery(DAY_QUERY, {
      variables: {
        year,
        month,
        day
      },
    });
    console.log(dataDay);
  const [create_day, {  data }] = useMutation(CREATE_DAY)
  const [create_reservation, { data: dataReservation }] = useMutation(CREATE_RESERVATION);

 function handleSubmitt(userName, userEmail) {
   if (dataDay.days.length > 0) {
     existingDayID = dataDay.days[0].id;
     console.log(existingDayID);
     create_reservation({
       variables: {
         time,
         userName,
         userEmail,
         nrOfPeople,
         description,
         guideId: guideId,
         id: existingDayID,
       },
     });
   }
   if (dataDay.days.length === 0) {
     create_day({
       variables: {
         year,
         month,
         day,
         time,
         userName,
         userEmail,
         nrOfPeople,
         description,
         id: guideId,
       },
     });
   }
 }
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }
  function handleTimeChange(e) {
    setTime(e.target.value);
  }
  function handleNrOfPeopleChange(e) {
    setNrOfPeople(e.target.value);
  }

  return (
    <User>
      {(
        currentUserPermission,
        currentUserName,
        currentUserEmail,
      ) => (
        <fieldset>
          <p>
            <strong>Hallo: {currentUserName}!</strong>
          </p>
          <h4>Confirm your booking details please!</h4>
          {
            <p>
              Your MTB Guide will be: {guideName} {guideSurname}
            </p>
          }
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
          <label>Morning Trip from 8.00 to 12.00</label>
          <br />
          <input
            type="radio"
            onChange={handleTimeChange}
            name="time"
            value="PM"
          />
          <label>Aftenoon Trip from 13.30 to 19.00</label>
          <br />
          <input
            type="radio"
            onChange={handleTimeChange}
            name="time"
            value="DAY"
          />
          <label>Day Trip from 8.00 to 19.00</label>
          <br />
          <input type="number"  name="numberOfPeople"
       min="1" max="5" defaultValue={1} onChange={handleNrOfPeopleChange} />
          <br />
          <p>
            Write if you want to arrive latter, stay with us until a
            late evening? Have some Ideas where would you like to go?
          </p>
          <br />
          <input type="textarea" onChange={handleDescriptionChange} />
          <br />
          <button
            onClick={(e) =>
              handleSubmitt(currentUserName, currentUserEmail)
            }
          >
            Confirm and Go!
          </button>
        </fieldset>
      )}
    </User>
  );
};

export default BookingConfirmation;

