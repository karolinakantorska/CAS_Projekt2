import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Components
import ErrorGraphql from '../reusable/ErrorGraphql';
import ErrorMessage from '../reusable/ErrorMessage';
import Loading from '../reusable/LoadingBar';
import ButtonMain from '../reusable/ButtonMain';

import { StyledContainer } from '../styles/StyledContainer';
import { StyledCard, StyledSpanPadding } from '../styles/StyledForm';
// utils
import { StyledTextBody1, StyledTextTitle6 } from '../styles/StyledText';
import {
  chooseWholeDay,
  chooseMorning,
  chooseAfternoon,
  useHandleTimeChange,
  handleBookingConfirmation,
} from '../../lib/utilsBooking';
import { useFormInput } from '../../lib/utilsForm';
import { useCurrentUser } from '../../apollo/querries/useCurrentUser';
import { useDay } from '../../apollo/querries/useDay';
import { useUpdateDay } from '../../apollo/mutations/useUpdateDay';
import { useCreateDay } from '../../apollo/mutations/useCreateDay';

import { TextField } from '@rmwc/textfield';
import { Select } from '@rmwc/select';
import { Ripple } from '@rmwc/ripple';

const BookingConfirmation = ({ props }) => {
  const { day, selectedMonth: month, selectedYear: year, guideId, bookedTime } = props;
  const { time, handleTimeChange } = useHandleTimeChange(bookedTime);
  const description = useFormInput('');
  const nrOfPeople = useFormInput('1');
  const {
    loading: loadingCurrentUser,
    error: errorCurrentUser,
    data: dataCurrentUser,
  } = useCurrentUser();
  const { loading, error, data } = useDayQuery(year, month, day);
  const [updateDay, { loading: loadingUpdateDay, error: errorUpdateDay }] = useUpdateDay(
    time,
    guideId,
  );

  const [createDay, { loading: loadingCreateDay, error: errorCreateDay }] = useCreateDay(
    time,
    guideId,
  );
  if (loadingCurrentUser || loading) {
    return <Loading />;
  }
  if (errorCurrentUser || error) {
    return (
      <StyledContainer>
        {errorCurrentUser && <ErrorGraphql error={errorCurrentUser} />}
        {error && <ErrorGraphql error={error} />}
      </StyledContainer>
    );
  }
  if (dataCurrentUser || data) {
    console.log(data.days);
    return (
      <StyledContainer>
        <StyledCard>
          <StyledSpanPadding>
            <StyledTextTitle6>
              Hallo {dataCurrentUser.currentUser.name}, confirm your booking details!
            </StyledTextTitle6>
            <ErrorMessage />
            {errorCreateDay && <ErrorGraphql error={errorCreateDay} />}
            {errorUpdateDay && <ErrorGraphql error={errorUpdateDay} />}
            <StyledTextBody1>
              Booked Date:{' '}
              <strong>
                {year}/{month}/{day}
              </strong>
            </StyledTextBody1>
            {bookedTime === 'PM' && (
              <StyledTextBody1 onLoad={handleTimeChange}>{chooseMorning}</StyledTextBody1>
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
                  disabled={loadingUpdateDay || loadingCreateDay}
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
              disabled={loadingUpdateDay || loadingCreateDay}
              {...nrOfPeople}
              icon="directions_bike"
              defaultValue="1"
              value={nrOfPeople.value}
              options={['1', '2', '3', '4', '5']}
            />
            <StyledTextBody1>
              Write us, if you want to arrive latter, stay with us until a late evening?
              Have some Ideas where would you like to go?
            </StyledTextBody1>
            <Ripple>
              <TextField
                loading={loadingUpdateDay || loadingCreateDay}
                {...description}
                textarea
                fullwidth
                rows={2}
                maxLength={100}
                value={description.value}
              />
            </Ripple>
            <ButtonMain
              loading={loadingUpdateDay || loadingCreateDay}
              text="Confirm and Go!"
              onClick={(e) => {
                console.log(data.days);
                handleBookingConfirmation(
                  e,
                  time,
                  day,
                  month,
                  year,
                  dataCurrentUser.currentUser.name,
                  dataCurrentUser.currentUser.email,
                  nrOfPeople.value,
                  description.value,
                  guideId,
                  data.days,
                  createDay,
                  updateDay,
                );
              }}
            />
          </StyledSpanPadding>
        </StyledCard>
        ;
      </StyledContainer>
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
