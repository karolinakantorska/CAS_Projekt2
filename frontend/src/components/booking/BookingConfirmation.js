import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { TextField } from '@rmwc/textfield';
import { Select } from '@rmwc/select';
import { Ripple } from '@rmwc/ripple';

import Nav from '../main/Nav';
import User from '../main/User';
//import { useUser } from '../../lib/userState';
import Error from '../main/Error';
import ErrorMessage from '../main/ErrorMessage';

import DAY_QUERY from '../../graphgl/queries/DAY_QUERY';
import CREATE_DAY from '../../graphgl/mutations/CREATE_DAY';
import CREATE_RESERVATION from '../../graphgl/mutations/CREATE_RESERVATION';

import { StyledContainer } from '../styles/StyledContainer';
import { StyledCard, StyledButton, StyledSpanPadding } from '../styles/StyledForm';
import {
  StyledTextBody1,
  StyledTextTitle6,
  StyledTextButtonBlack,
} from '../styles/StyledText';
import {
  chooseWholeDay,
  chooseMorning,
  chooseAfternoon,
  addErrorMessage,
  validateFormBookingConfirmation,
  removeErrorMessage,
} from '../../lib/utils';
const BookingConfirmation = ({ props }) => {
  /*
  const { currentUser } = useUser();
  const userName = currentUser.name;
  const userEmail = currentUser.email;
  console.log('userName', userName);
  console.log('userEmail', userEmail);
  */
  const {
    day,
    selectedMonth: month,
    selectedYear: year,
    guideId,
    guideName,
    guideSurname,
    bookedTime,
  } = props;
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [nrOfPeople, setNrOfPeople] = useState(1);
  //const [alreadyBookedTime, setAlreadyBookedTime] = useState('');
  const router = useRouter();
  const { loading, error, data: dataDay } = useQuery(DAY_QUERY, {
    variables: {
      year,
      month,
      day,
      id: guideId,
    },
    onError: (error) => {
      error;
    },
  });
  /*
  if (dataDay) {
    dataDay.days.map((day) => {
      day.reservations.map((reservation) => {
        setAlreadyBookedTime(reservation.time);
      });
    });
  }*/
  const [
    create_reservation,
    { error: errorCreateReservation, onCompleted },
  ] = useMutation(CREATE_RESERVATION, {
    onCompleted: (data) => {
      router.push({
        pathname: '/thank_you',
        query: {
          time,
          day,
          month,
          year,
          guideName,
          guideSurname,
          guideId,
          //userName,
        },
      });
    },
    onError: (errorCreateReservation) => {
      errorCreateReservation;
    },
  });
  const [create_day, { error: errorCreateDay, data }] = useMutation(CREATE_DAY, {
    onCompleted: (data) => {
      router.push({
        pathname: '/thank_you',
        query: {
          time,
          day,
          month,
          year,
          guideName,
          guideSurname,
          guideId,
          //userName,
        },
      });
    },
    onError: (errorCreateDay) => {
      errorCreateDay;
    },
  });
  function handleTimeChange(e) {
    switch (e.target.value) {
      case chooseWholeDay:
        setTime('DAY');
        break;
      case chooseMorning:
        setTime('AM');
        break;
      case chooseAfternoon:
        setTime('PM');
        break;
    }
  }
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }
  function handleNrOfPeopleChange(e) {
    setNrOfPeople(e.target.value);
  }
  function handleSubmitt(e, userName, userEmail) {
    e.preventDefault();
    removeErrorMessage();
    const errors = validateFormBookingConfirmation(time);
    addErrorMessage(errors);
    console.log(userName);
    console.log(userEmail);
    if (errors.length === 0) {
      // day doesn't exist yet
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
      // day exist
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
    }
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <Error error={error} />;
  }
  if (dataDay) {
    return (
      <User>
        {(currentUserPermission, currentUserName, currentUserEmail, currentUserId) => (
          <>
            <Nav />
            <StyledContainer>
              <StyledCard>
                <StyledSpanPadding>
                  <StyledTextTitle6>
                    Hallo {currentUserName}, confirm your booking details!
                  </StyledTextTitle6>
                  <ErrorMessage />
                  {errorCreateReservation && <Error error={errorCreateReservation} />}
                  {errorCreateDay && <Error error={errorCreateDay} />}
                  <StyledTextBody1>
                    Your MTB Guide will be:{' '}
                    <strong>
                      {guideName} {guideSurname}
                    </strong>
                  </StyledTextBody1>
                  <StyledTextBody1>
                    Booked Date:{' '}
                    <strong>
                      {year}/{month}/{day}
                    </strong>
                  </StyledTextBody1>

                  <StyledTextBody1>
                    Do you preffer Morning or Aftenoon Trip?
                  </StyledTextBody1>
                  {bookedTime === 'PM' && (
                    <StyledSelect
                      placeholder="Please chose the time of a day"
                      invalid={!Boolean(time)}
                      options={[chooseMorning]}
                      onChange={(e) => handleTimeChange(e)}
                    />
                  )}
                  {bookedTime === 'AM' && (
                    <StyledSelect
                      placeholder="Please chose the time of a day"
                      invalid={!Boolean(time)}
                      options={[chooseAfternoon]}
                      onChange={(e) => handleTimeChange(e)}
                    />
                  )}
                  {bookedTime === '' && (
                    <StyledSelect
                      placeholder="Please chose the time of a day"
                      invalid={!Boolean(time)}
                      options={[chooseWholeDay, chooseMorning, chooseAfternoon]}
                      onChange={(e) => handleTimeChange(e)}
                    />
                  )}
                  <StyledTextBody1>How big is the group?</StyledTextBody1>
                  <StyledSelect
                    icon="directions_bike"
                    defaultValue="1"
                    onChange={(e) => handleNrOfPeopleChange(e)}
                    options={['1', '2', '3', '4', '5']}
                  />
                  <StyledTextBody1>
                    Write us, if you want to arrive latter, stay with us until a late
                    evening? Have some Ideas where would you like to go?
                  </StyledTextBody1>
                  <Ripple>
                    <TextField
                      textarea
                      fullwidth
                      rows={2}
                      maxLength={100}
                      //value={password}
                      onChange={handleDescriptionChange}
                    />
                  </Ripple>

                  <StyledButton
                    onClick={(e) => handleSubmitt(e, currentUserName, currentUserEmail)}
                    raised
                    theme={['secondaryBg', 'onSecondary']}
                  >
                    <StyledTextButtonBlack>Confirm and Go!</StyledTextButtonBlack>
                  </StyledButton>
                </StyledSpanPadding>
              </StyledCard>
            </StyledContainer>
          </>
        )}
      </User>
    );
  }
};
BookingConfirmation.propTypes = {
  day: PropTypes.string,
  selectedMonth: PropTypes.string,
  selectedYear: PropTypes.string,
  guideId: PropTypes.string,
  guideName: PropTypes.string,
  guideSurname: PropTypes.string,
};

const StyledSelect = styled(Select)`
  div {
    background-color: white;
  }
`;
export default BookingConfirmation;
