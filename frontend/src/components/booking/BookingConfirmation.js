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
import Error from '../main/Error';
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
import { chooseWholeDay, chooseMorning, chooseAfternoon } from '../../lib/utils';

const BookingConfirmation = ({ props }) => {
  const {
    day,
    selectedMonth: month,
    selectedYear: year,
    guideId,
    guideName,
    guideSurname,
  } = props;
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [nrOfPeople, setNrOfPeople] = useState(1);
  const [alreadyBookedTime, setAlreadyBookedTime] = useState('');
  const router = useRouter();
  const { loading, error, data: dataDay } = useQuery(DAY_QUERY, {
    variables: {
      year,
      month,
      day,
      id: guideId,
    },
  });
  if (dataDay) {
    dataDay.days.map((day) => {
      day.reservations.map((reservation) => {
        setAlreadyBookedTime(reservation.time);
      });
    });
  }
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
          userName,
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
          userName,
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
  function addErrorMessage(parrentClass, textMessage) {
    const errorContainer = document.querySelector(`.${parrentClass}`);
    errorContainer.insertAdjacentHTML('beforeend', `${textMessage}`);
  }
  function handleSubmitt(userName, userEmail) {
    if (!time) {
      addErrorMessage('error_noTime', 'Please enter the time.');
      return;
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
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <Error error={error} />;
  }
  return (
    <User>
      {(currentUserPermission, currentUserName, currentUserEmail, currentUserId) => (
        <span>
          <Nav />
          <StyledContainer>
            <StyledCard>
              <StyledSpanPadding>
                <StyledTextTitle6>
                  Hallo {currentUserName}, confirm your booking details!
                </StyledTextTitle6>
                <StyledError className="error_noTime">
                  {errorCreateReservation && <Error error={errorCreateReservation} />}
                  {errorCreateDay && <Error error={errorCreateDay} />}
                </StyledError>
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
                {alreadyBookedTime === 'PM' && (
                  <StyledSelect
                    placeholder="Please chose the time of a day"
                    invalid={!Boolean(time)}
                    options={[chooseMorning]}
                    onChange={(e) => handleTimeChange(e)}
                  />
                )}
                {alreadyBookedTime === 'AM' && (
                  <StyledSelect
                    placeholder="Please chose the time of a day"
                    invalid={!Boolean(time)}
                    options={[chooseAfternoon]}
                    onChange={(e) => handleTimeChange(e)}
                  />
                )}
                {alreadyBookedTime === '' && (
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
                  onClick={(e) => handleSubmitt(currentUserName, currentUserEmail)}
                  raised
                  theme={['secondaryBg', 'onSecondary']}
                >
                  <StyledTextButtonBlack>Confirm and Go!</StyledTextButtonBlack>
                </StyledButton>
              </StyledSpanPadding>
            </StyledCard>
          </StyledContainer>
        </span>
      )}
    </User>
  );
};
BookingConfirmation.propTypes = {
  day: PropTypes.string,
  selectedMonth: PropTypes.string,
  selectedYear: PropTypes.string,
  guideId: PropTypes.string,
  guideName: PropTypes.string,
  guideSurname: PropTypes.string,
};
const StyledError = styled.div`
  color: var(--colorWarning);
`;
const StyledSelect = styled(Select)`
  //margin-top: -1rem;
  div {
    background-color: white;
  }
`;
export default BookingConfirmation;
