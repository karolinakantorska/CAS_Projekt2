import React from 'react';
import PropTypes from 'prop-types';
// Components

import ErrorGraphql from '../reusable/ErrorGraphql';
import ErrorMessage from '../reusable/ErrorMessage';
import LoadingBar from '../reusable/LoadingBar';
import { ButtonMain, ButtonLink } from '../reusable/Buttons';
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
import { useTripsToFindOneTrip } from '../../apollo/querries/useTripsToFindOneTrip';
import { routeBack } from '../../lib/utilsRouts';
//Styling
import { StyledCard, StyledCardWithPadding } from '../../styles/StyledCards';
import { StyledFieldset, StyledSelect } from '../../styles/StyledForm';
import { H6 } from '../../styles/Text';
import { Typography } from '@rmwc/typography';
import { TextField } from '@rmwc/textfield';
import { Ripple } from '@rmwc/ripple';
import { StyledButtonSpan } from '../../styles/StyledButtonSpan';

const BookingConfirmation = ({ props }) => {
  const {
    day,
    selectedMonth: month,
    nrOfMonth,
    selectedYear: year,
    guideId,
    tripId,
    bookedTime,
    timeStamp,
  } = props;
  const {
    loading: loadingCurrentUser,
    error: errorCurrentUser,
    data: dataCurrentUser,
  } = useCurrentUser();
  const {
    loading: loadingTrip,
    error: errorTrip,
    data: dataTrip,
  } = useTripsToFindOneTrip(tripId);
  const { time, handleTimeChange } = useHandleTimeChange(bookedTime);
  // forms
  const { value: nrOfPeople, handleChange: handleChangeNrOfPeople } = useFormInput('1');
  const { inputs, handleChange, handleSubmit, errorInput } = useForm(
    handleBookingConfirmation,
    {
      description: { textValue: "Dear Guide, I can't wait to start the trip!" },
    },
  );
  const { loading, error, data } = useDay(year, month, day);
  const [updateDay, { loading: loadingUpdateDay, error: errorUpdateDay }] = useUpdateDay(
    year,
    month,
    time,
    guideId,
    tripId,
    dataCurrentUser.currentUser.id,
  );
  const [createDay, { loading: loadingCreateDay, error: errorCreateDay }] = useCreateDay(
    year,
    month,
    day,
    time,
    guideId,
    tripId,
    dataCurrentUser.currentUser.id,
  );
  function handleBookingConfirmation() {
    if (data.days.length === 0) {
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
          guideId,
          tripId,
          holiday: guideId === dataCurrentUser.currentUser.id,
          confirmed: false,
          gastId: dataCurrentUser.currentUser.id,
          timeStamp,
        },
      });
    }
    // day exist
    else {
      updateDay({
        variables: {
          time,
          userName: dataCurrentUser.currentUser.name,
          userEmail: dataCurrentUser.currentUser.email,
          nrOfPeople,
          description: inputs.description.textValue,
          guideId,
          tripId,
          dayId: data.days[0].id,
          holiday: guideId === dataCurrentUser.currentUser.id,
          confirmed: false,
          gastId: dataCurrentUser.currentUser.id,
          timeStamp,
        },
      });
    }
  }
  if (loadingCurrentUser || loading || loadingTrip) {
    return <LoadingBar />;
  }
  if (errorCurrentUser || error || errorTrip) {
    return (
      <StyledCardWithPadding>
        {errorCurrentUser && <ErrorGraphql error={errorCurrentUser} />}
        {error && <ErrorGraphql error={error} />}
      </StyledCardWithPadding>
    );
  }
  if (dataCurrentUser && data && dataTrip) {
    const trip = dataTrip.trips[0];
    return (
      <>
        <StyledCard>
          <form onSubmit={handleSubmit} method="post">
            <StyledFieldset
              disabled={loadingUpdateDay || loadingCreateDay}
              aria-busy={loadingUpdateDay || loadingCreateDay}
            >
              {dataCurrentUser.currentUser.id === guideId && (
                <H6 use="headline6">{`Reserve yourself a day off !`}</H6>
              )}
              {dataCurrentUser.currentUser.id !== guideId && (
                <H6 use="headline6">
                  {`Hallo ${dataCurrentUser.currentUser.name}, confirm your booking details!`}
                </H6>
              )}
              <ErrorMessage />
              {errorCreateDay && <ErrorGraphql error={errorCreateDay} />}
              {errorUpdateDay && <ErrorGraphql error={errorUpdateDay} />}
              {dataCurrentUser.currentUser.id !== guideId && trip.title && (
                <Typography use="body1">
                  Trip:
                  <strong>{` ${trip.title}`}</strong>
                </Typography>
              )}
              <Typography use="body1">
                Choosen Day:
                <strong>{` ${year}/${month}/${day}`}</strong>
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
              {bookedTime === '' && trip.wholeDay && (
                <Typography use="body1" onLoad={handleTimeChange}>
                  <strong>{chooseWholeDay}</strong>
                </Typography>
              )}
              {bookedTime === '' && !trip.wholeDay && (
                <>
                  <Typography use="body1">Choose the time of a day:</Typography>
                  <StyledSelect
                    required={true}
                    onChange={handleTimeChange}
                    placeholder="Please choose the time of a day"
                  >
                    <option value={chooseWholeDay}>{chooseWholeDay}</option>
                    <option value={chooseMorning}>{chooseMorning}</option>
                    <option value={chooseAfternoon}>{chooseAfternoon}</option>
                  </StyledSelect>
                </>
              )}
              {dataCurrentUser.currentUser.id !== guideId && (
                <>
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
                    Do you want to arrive latter, stay with us until a late evening? Have
                    some Ideas where would you like to go?
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
                </>
              )}
              {dataCurrentUser.currentUser.id === guideId && (
                <ButtonMain text="Confirm Your Day Off !" />
              )}
            </StyledFieldset>
          </form>
          <ButtonLink text="Chancel" onClick={() => routeBack()} />
        </StyledCard>
      </>
    );
  }
};
BookingConfirmation.propTypes = {
  day: PropTypes.string,
  Month: PropTypes.string,
  Year: PropTypes.string,
  guideId: PropTypes.string,
  guideName: PropTypes.string,
  guideSurname: PropTypes.string,
};

export default BookingConfirmation;
