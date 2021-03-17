import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// RMWC
import { Button } from '@rmwc/button';
// Components
import Loading from '../reusable/LoadingBar';
import ErrorGraphql from '../reusable/ErrorGraphql';
import { ButtonLink } from '../reusable/Buttons';

// Utils
import { useDayIdToQueryReservation } from '../../apollo/querries/useDayIdToQueryReservation';
import { timeToString } from '../../lib/utilsBooking';
import { routeToGuidesList, routeToCalendar } from '../../lib/utilsRouts';
// Components for Styling
import { H6, TextGrayDense } from '../styles/Text';
import { StyledContainer } from '../styles/StyledContainer';
import { StyledCardWithPadding } from '../styles/StyledCards';

const BookingThankYou = (props) => {
  const { time, dayId, guideId } = props.props;
  const { loading, error, data } = useDayIdToQueryReservation(dayId, guideId, time);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorGraphql error={error} />;
  }
  if (data) {
    console.log(data.day);
    const { day } = data;
    const { nrOfPeople, description, time, userName, guide } = day.reservations[0];
    const writeTime = timeToString(time);
    return (
      <StyledContainer>
        <StyledCardWithPadding>
          <H6 use="headline6">Congratulations!</H6>
          <TextGrayDense use="body1">
            Your reservation has just been completed.
          </TextGrayDense>
          <TextGrayDense use="body1">
            Thank you for booking MTB Guide:
            <strong>{` ${guide.name} ${guide.surname}.`}</strong>
          </TextGrayDense>
          <TextGrayDense use="body1">
            For
            <strong>{` ${day.day} ${day.month} ${day.year}`}</strong>for a{' '}
            <strong>{` ${writeTime}.`}</strong>
          </TextGrayDense>
          <TextGrayDense use="body1">
            You've reservated a trip for
            <strong>{` ${nrOfPeople} `}</strong>
            {nrOfPeople === '1' ? 'guest.' : 'guests.'}
          </TextGrayDense>

          {description && (
            <TextGrayDense use="body1">{`Description: ${description}`}</TextGrayDense>
          )}
          <ButtonLink text="Book again!" onClick={() => routeToCalendar(guideId)} />
          <ButtonLink text="Book another guide!" onClick={routeToGuidesList} />
        </StyledCardWithPadding>
      </StyledContainer>
    );
  }
};
export const StyledButtonLink = styled(Button)`
  text-transform: capitalize;
  border-radius: 0px 0px 0px 0px;
`;
BookingThankYou.propTypes = {
  time: PropTypes.string,
  guideId: PropTypes.string,
  dayId: PropTypes.string,
};
export default BookingThankYou;
