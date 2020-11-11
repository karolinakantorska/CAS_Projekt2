import React, { useState } from 'react';
import { useMutation, useQuery, useLazyQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import User from '../main/User';
import DAY_QUERY from '../../graphgl/queries/DAY_QUERY';
import CREATE_DAY from '../../graphgl/mutations/CREATE_DAY';
import CREATE_RESERVATION from '../../graphgl/mutations/CREATE_RESERVATION';

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
  let existingTime = '';
  // TODO loading strip
  const { loading, error, data: dataDay } = useQuery(DAY_QUERY, {
    variables: {
      year,
      month,
      day,
      id: guideId,
    },
  });
  //console.log('dataDay');
  //console.log(dataDay);
  if (dataDay) {
    dataDay.days.map((day) => {
      day.reservations.map((reservation) => {
        existingTime = reservation.time;
      });
    });
  }
  // TODO Error handling by returning error
  // TODO loading strip
  const [
    create_day,
    { loading: loadingCreateDay, error: errorCreateDay, data },
  ] = useMutation(CREATE_DAY);
  // TODO Error handling by returning error
  // TODO loading strip
  const [
    create_reservation,
    {
      loading: loadingCreateReservation,
      error: errorCreateReservation,
      data: dataReservation,
    },
  ] = useMutation(CREATE_RESERVATION);
  const router = useRouter();

  return (
    <User>
      {(currentUserPermission, currentUserName, currentUserEmail) => (
        <fieldset>
          <p>
            <strong>Hallo: {currentUserName}!</strong>
          </p>
          <h4>Confirm your booking details please!</h4>
          <p>
            Your MTB Guide will be: {guideName} {guideSurname}
          </p>
          <p>
            Booked Date: {year}/{month}/{day}
          </p>
          <p>Do you preffer Morning or Aftenoon Trip?</p>
          {existingTime !== 'AM' && (
            <span>
              <input
                type="radio"
                onChange={handleTimeChange}
                name="time"
                value="AM"
              />
              <label>Morning Trip from 8.00 to 12.00</label>
              <br />
            </span>
          )}
          {existingTime !== 'PM' && (
            <span>
              <input
                type="radio"
                onChange={handleTimeChange}
                name="time"
                value="PM"
              />
              <label>Aftenoon Trip from 13.30 to 19.00</label>
            </span>
          )}
          {existingTime === '' && (
            <span>
              <input
                type="radio"
                onChange={handleTimeChange}
                name="time"
                value="DAY"
              />
              <label>Day Trip from 8.00 to 19.00</label>
              <br />
            </span>
          )}
          <input
            type="number"
            name="numberOfPeople"
            min="1"
            max="5"
            defaultValue={1}
            onChange={handleNrOfPeopleChange}
          />
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
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }
  function handleTimeChange(e) {
    setTime(e.target.value);
  }
  function handleNrOfPeopleChange(e) {
    setNrOfPeople(e.target.value);
  }
  function handleSubmitt(userName, userEmail) {
    if (dataDay.days.length > 0) {
      const { id } = dataDay.days[0];
      create_reservation({
        variables: {
          time,
          userName,
          userEmail,
          nrOfPeople,
          description,
          guideId,
          id, //existing day id
        },
      });
    }
    if (dataDay.days.length === 0) {
      create_day({
        variables: {
          time,
          day,
          month,
          year,
          userName,
          userEmail,
          nrOfPeople,
          description,
          id: guideId,
        },
      });
    }
    router.push({
      pathname: '/thank_you_for_booking',
      query: {
        time,
        day,
        month,
        year,
        guideName,
        guideSurname,
        guideId,
        userName,
      },
    });
  }
};
BookingConfirmation.PropTypes = {
  day: PropTypes.string,
  selectedMonth: PropTypes.string,
  selectedYear: PropTypes.string,
  guideId: PropTypes.string,
  guideName: PropTypes.string,
  guideSurname: PropTypes.string,
};
export default BookingConfirmation;
