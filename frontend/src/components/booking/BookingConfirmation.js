import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Components
import ErrorGraphql from '../reusable/ErrorGraphql';
import ErrorMessage from '../reusable/ErrorMessage';
import Loading from '../reusable/LoadingBar';
import { ButtonMain } from '../reusable/Buttons';

// utils
import {
  chooseWholeDay,
  chooseMorning,
  chooseAfternoon,
  useHandleTimeChange,
} from '../../lib/utilsBooking';
import { useFormInput, useForm } from '../../lib/utilsForm';
import { useCurrentUser } from '../../apollo/querries/useCurrentUser';
import { useDay } from '../../apollo/querries/useDay';
import { useUpdateDay } from '../../apollo/mutations/useUpdateDay';
import { useCreateDay } from '../../apollo/mutations/useCreateDay';
//Styling
import { StyledCard } from '../styles/StyledCards';
import { StyledFieldset } from '../styles/StyledForm';
import { H6 } from '../styles/Text';
import { Typography } from '@rmwc/typography';
import { TextField } from '@rmwc/textfield';
import { Select } from '@rmwc/select';
import { Ripple } from '@rmwc/ripple';

const BookingConfirmation = ({ props }) => {
  const { day, selectedMonth: month, selectedYear: year, guideId, bookedTime } = props;
  const { time, handleTimeChange } = useHandleTimeChange(bookedTime);
  const {
    loading: loadingCurrentUser,
    error: errorCurrentUser,
    data: dataCurrentUser,
  } = useCurrentUser();
  // forms
  const { value: nrOfPeople, handleChange: handleChangeNrOfPeople } = useFormInput('1');
  const { inputs, handleChange, handleSubmit, errorInput } = useForm(
    handleBookingConfirmation,
    {
      description: { textValue: "Dear Guide, I can't wait to start the trip!" },
    },
  );
  // here!
  //console.log(year, month, day);
  const { loading, error, data } = useDay(year, month, day);
  const [updateDay, { loading: loadingUpdateDay, error: errorUpdateDay }] = useUpdateDay(
    time,
    guideId,
  );

  const [createDay, { loading: loadingCreateDay, error: errorCreateDay }] = useCreateDay(
    time,
    guideId,
  );
  function handleBookingConfirmation() {
    //console.log(' data.days.length', data.days.length);
    if (data.days.length === 0) {
      //console.log('create');
      createDay({
        variables: {
          time,
          day,
          month,
          year,
          userName: dataCurrentUser.currentUser.name,
          userEmail: dataCurrentUser.currentUser.email,
          nrOfPeople,
          description: inputs.description.textValue,
          id: guideId,
        },
      });
    }
    // day exist
    else {
      //console.log('update');
      //console.log('data.days[0].id', data.days[0].id);
      updateDay({
        variables: {
          time,
          userName: dataCurrentUser.currentUser.name,
          userEmail: dataCurrentUser.currentUser.email,
          nrOfPeople,
          description: inputs.description.textValue,
          id: guideId,
          dayId: data.days[0].id,
        },
      });
    }
  }
  if (loadingCurrentUser || loading) {
    return <Loading />;
  }
  if (errorCurrentUser || error) {
    return (
      <StyledCard>
        {errorCurrentUser && <ErrorGraphql error={errorCurrentUser} />}
        {error && <ErrorGraphql error={error} />}
      </StyledCard>
    );
  }
  if (dataCurrentUser || data) {
    //console.log(' data', data);
    //console.log(' data.days.length', data.days.length);
    return (
      <StyledCard>
        <form onSubmit={handleSubmit} method="post">
          <StyledFieldset disabled={loading} aria-busy={loading}>
            <H6 use="headline6">
              {`Hallo ${dataCurrentUser.currentUser.name}, confirm your booking details!`}
            </H6>
            <ErrorMessage />
            {errorCreateDay && <ErrorGraphql error={errorCreateDay} />}
            {errorUpdateDay && <ErrorGraphql error={errorUpdateDay} />}
            <Typography use="body1">
              Choosen Day:
              <strong>
                {year}/{month}/{day}
              </strong>
            </Typography>
            {bookedTime === 'PM' && (
              <Typography use="body1" onLoad={handleTimeChange}>
                {chooseMorning}
              </Typography>
            )}

            {bookedTime === 'AM' && (
              <Typography use="body1" onLoad={handleTimeChange}>
                {chooseAfternoon}
              </Typography>
            )}
            {bookedTime === '' && (
              <>
                <Typography use="body1">
                  Do you preffer Morning or Aftenoon Trip?
                </Typography>
                <StyledSelect
                  required={true}
                  onChange={handleTimeChange}
                  placeholder="Please chose the time of a day"
                >
                  <option value={chooseWholeDay}>{chooseWholeDay}</option>
                  <option value={chooseMorning}>{chooseMorning}</option>
                  <option value={chooseAfternoon}>{chooseAfternoon}</option>
                </StyledSelect>
              </>
            )}
            <Typography use="body1">How big is the group?</Typography>
            <StyledSelect
              disabled={loadingUpdateDay || loadingCreateDay}
              icon="directions_bike"
              defaultValue="1"
              onChange={handleChangeNrOfPeople}
              value={nrOfPeople}
              options={['1', '2', '3', '4', '5']}
            />
            <Typography use="body1">
              Do you want to arrive latter, stay with us until a late evening? Have some
              Ideas where would you like to go?
            </Typography>
            <Ripple>
              <TextField
                fullwidth
                onChange={handleChange}
                name="description"
                placeholder={inputs.description.textValue || ''}
                value={inputs.description.textValue || ''}
                required={false}
                textarea={true}
                rows={4}
                maxLength={300}
              />
            </Ripple>
            <ButtonMain text="Confirm and Go!" />
          </StyledFieldset>
        </form>
      </StyledCard>
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
