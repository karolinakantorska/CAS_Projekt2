import React, { useState } from 'react';
import { useMutation, useQuery, useLazyQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// RMWC
import { TextField } from '@rmwc/textfield';
import { Select } from '@rmwc/select';
import { Ripple } from '@rmwc/ripple';
// Components
import Nav from '../main/Nav';
import User from '../main/User';
import DAY_QUERY from '../../graphgl/queries/DAY_QUERY';
import CREATE_DAY from '../../graphgl/mutations/CREATE_DAY';
import CREATE_RESERVATION from '../../graphgl/mutations/CREATE_RESERVATION';
// Components for Styling
import { StyledContainer } from '../styles/StyledContainer';
import {
  StyledCard,
  StyledButton,
  StyledSpanPadding,
} from '../styles/StyledForm';
import {
  StyledTextBody1,
  StyledTextBody2,
  StyledTextTitle5,
  StyledTextTitle6,
  StyledTextSubtitle1,
  StyledTextSubtitle2,
  StyledTextMenuWhite,
  StyledTextButtonBlack,
} from '../styles/StyledText';

// TODO use const instead of strings
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

  const dayChoose = 'Day Trip from 8.00 to 19.00';
  const morning = 'Morning Trip from 8.00 to 12.00';
  const afternoon = 'Afternoon Trip from 13.30 to 19.00';

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
  ] = useMutation(CREATE_DAY, {});
  // TODO Error handling by returning error
  // TODO loading strip
  const [
    create_reservation,
    {
      loading: loadingCreateReservation,
      error: errorCreateReservation,
      data: dataReservation,
    },
  ] = useMutation(CREATE_RESERVATION, {});

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }
  function handleTimeChange(e) {
    console.log(e.target.value);
    switch (e.target.value) {
      case dayChoose:
        setTime('DAY');
        break;
      case morning:
        setTime('AM');
        break;
      case afternoon:
        setTime('PM');
        break;
    }
  }
  function handleNrOfPeopleChange(e) {
    setNrOfPeople(e.target.value);
  }
  const router = useRouter();
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
  }

  return (
    <User>
      {(
        currentUserPermission,
        currentUserName,
        currentUserEmail,
        currentUserId,
      ) => (
        <span>
          <Nav />
          <StyledContainer>
            <StyledCard>
              <StyledSpanPadding>
                <StyledTextTitle6>
                  Hallo {currentUserName}, confirm your booking
                  details!
                </StyledTextTitle6>
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
                {existingTime === 'PM' && (
                  <StyledSelect
                    placeholder="Please chose the time of a day"
                    options={[morning]}
                    onChange={(e) => handleTimeChange(e)}
                  />
                )}
                {existingTime === 'AM' && (
                  <StyledSelect
                    placeholder="Please chose the time of a day"
                    options={[afternoon]}
                    onChange={(e) => handleTimeChange(e)}
                  />
                )}
                {existingTime === '' && (
                  <StyledSelect
                    placeholder="Please chose the time of a day"
                    options={[dayChoose, morning, afternoon]}
                    onChange={(e) => handleTimeChange(e)}
                  />
                )}
                <StyledTextBody1>
                  How big is the group?
                </StyledTextBody1>
                <StyledSelect
                  icon="directions_bike"
                  defaultValue="1"
                  onChange={(e) => handleNrOfPeopleChange(e)}
                  options={['1', '2', '3', '4', '5']}
                />
                <StyledTextBody1>
                  Write us, if you want to arrive latter, stay with us
                  until a late evening? Have some Ideas where would
                  you like to go?
                </StyledTextBody1>
                <Ripple>
                  <StyledTextField
                    textarea
                    fullwidth
                    rows={2}
                    maxLength={100}
                    //value={password}
                    onChange={handleDescriptionChange}
                  />
                </Ripple>

                <StyledButton
                  onClick={(e) =>
                    handleSubmitt(currentUserName, currentUserEmail)
                  }
                  raised
                  theme={['secondaryBg', 'onSecondary']}
                >
                  <StyledTextButtonBlack>
                    Confirm and Go!
                  </StyledTextButtonBlack>
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
const StyledTextField = styled(TextField)`
  background: red;
`;
const StyledSelect = styled(Select)`
  margin-top: -1rem;
  div {
    background-color: white;
  }
`;
export default BookingConfirmation;
