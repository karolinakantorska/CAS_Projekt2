import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { TextField } from '@rmwc/textfield';
import { Select } from '@rmwc/select';
import { Ripple } from '@rmwc/ripple';
// Components
import User from '../main/User';
import Error from '../reusable/Error';
import ErrorMessage from '../reusable/ErrorMessage';
import Loading from '../reusable/LoadingBar';
import ButtonMain from '../reusable/ButtonMain';

import DAY_QUERY from '../../graphgl/queries/DAY_QUERY';
import CREATE_DAY from '../../graphgl/mutations/CREATE_DAY';
import UPDATE_DAY from '../../graphgl/mutations/UPDATE_DAY';

import { StyledContainer } from '../styles/StyledContainer';
import { StyledCard, StyledSpanPadding } from '../styles/StyledForm';
// utils
import { StyledTextBody1, StyledTextTitle6 } from '../styles/StyledText';
import {
  chooseWholeDay,
  chooseMorning,
  chooseAfternoon,
  useHandleTimeChange,
} from '../../lib/utilsBooking';
import {
  useFormInput,
  addErrorMessage,
  validateFormBookingConfirmation,
  removeErrorMessage,
} from '../../lib/utilsForm';
import { routeToBookingThanks } from '../../lib/utilsRouts';

const BookingConfirmation = ({ props }) => {
  const { day, selectedMonth: month, selectedYear: year, guideId, bookedTime } = props;
  const { time, handleTimeChange } = useHandleTimeChange(bookedTime);
  const description = useFormInput('');
  const nrOfPeople = useFormInput('1');
  const router = useRouter();
  const { loading, error, data: dataDay, refetch } = useQuery(DAY_QUERY, {
    variables: {
      year,
      month,
      day,
    },
    onError: (error) => {
      error;
    },
  });
  const [update_day, { error: errorUpdateDay, data: dataUpdateDay }] = useMutation(
    UPDATE_DAY,
    {
      onCompleted: (dataUpdateDay) => {
        const dayId = dataUpdateDay.updateDay.id;
        routeToBookingThanks(time, dayId, guideId);
      },
      onError: (errorUpdateDay) => {
        errorUpdateDay;
      },
    },
  );
  const [create_day, { error: errorCreateDay, data: dataCreateDay }] = useMutation(
    CREATE_DAY,
    {
      onCompleted: (dataCreateDay) => {
        const dayId = dataCreateDay.createDay.id;
        routeToBookingThanks(time, dayId, guideId);
      },
      onError: (errorCreateDay) => {
        errorCreateDay;
      },
    },
  );
  function handleSubmitt(e, userName, userEmail) {
    e.preventDefault();
    removeErrorMessage();
    const errors = validateFormBookingConfirmation(time);
    addErrorMessage(errors);
    if (errors.length === 0) {
      // day doesn't exist yet
      // returns days=[]
      if (dataDay.days.length === 0) {
        create_day({
          variables: {
            time,
            day,
            month,
            year,
            userName,
            userEmail,
            nrOfPeople: nrOfPeople.value,
            description: description.value,
            id: guideId,
          },
        });
      }
      // day exist
      else {
        const { id } = dataDay.days[0];
        update_day({
          variables: {
            time,
            userName,
            userEmail,
            nrOfPeople: nrOfPeople.value,
            description: description.value,
            id: guideId,
            dayId: id, //existing day id
          },
        });
      }
    }
  }
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error error={error} />;
  }
  if (dataDay) {
    return (
      <User>
        {(currentUserPermission, currentUserName, currentUserEmail, currentUserId) => (
          <>
            <StyledContainer>
              <StyledCard>
                <StyledSpanPadding>
                  <StyledTextTitle6>
                    Hallo {currentUserName}, confirm your booking details!
                  </StyledTextTitle6>
                  <ErrorMessage />
                  {errorCreateDay && <Error error={errorCreateDay} />}
                  {errorUpdateDay && <Error error={errorUpdateDay} />}
                  <StyledTextBody1>
                    Booked Date:{' '}
                    <strong>
                      {year}/{month}/{day}
                    </strong>
                  </StyledTextBody1>

                  {bookedTime === 'PM' && (
                    <StyledTextBody1 onLoad={handleTimeChange}>
                      {chooseMorning}
                    </StyledTextBody1>
                  )}
                  {bookedTime === 'AM' && (
                    <StyledTextBody1 onLoad={handleTimeChange}>
                      {chooseAfternoon}
                    </StyledTextBody1>
                  )}
                  {bookedTime === '' && (
                    <>
                      <StyledTextBody1>
                        Do you preffer Morning or Aftenoon Trip?
                      </StyledTextBody1>
                      <StyledSelect
                        onChange={handleTimeChange}
                        placeholder="Please chose the time of a day"
                      >
                        <option value={chooseWholeDay}>{chooseWholeDay}</option>
                        <option value={chooseMorning}>{chooseMorning}</option>
                        <option value={chooseAfternoon}>{chooseAfternoon}</option>
                      </StyledSelect>
                    </>
                  )}
                  <StyledTextBody1>How big is the group?</StyledTextBody1>

                  <StyledSelect
                    {...nrOfPeople}
                    icon="directions_bike"
                    defaultValue="1"
                    value={nrOfPeople.value}
                    //onChange={(e) => handleNrOfPeopleChange(e)}
                    options={['1', '2', '3', '4', '5']}
                  />
                  <StyledTextBody1>
                    Write us, if you want to arrive latter, stay with us until a late
                    evening? Have some Ideas where would you like to go?
                  </StyledTextBody1>
                  <Ripple>
                    <TextField
                      {...description}
                      textarea
                      fullwidth
                      rows={2}
                      maxLength={100}
                      value={description.value}
                    />
                  </Ripple>
                  <ButtonMain
                    text="Confirm and Go!"
                    onClick={(e) => handleSubmitt(e, currentUserName, currentUserEmail)}
                  />
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
