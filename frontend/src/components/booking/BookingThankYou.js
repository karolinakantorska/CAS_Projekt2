import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// RMWC
import { Button } from '@rmwc/button';
// Components
import Nav from '../main/Nav';
import LoadingBar from '../reusable/LoadingBar';
import ErrorGraphql from '../reusable/ErrorGraphql';
import { ButtonLink } from '../reusable/Buttons';

// Utils
import { useDayIdToQueryReservation } from '../../apollo/querries/useDayIdToQueryReservation';
import { timeToString } from '../../lib/utilsBooking';
import {
  routeToGuidesList,
  routeToCalendar,
  routeToTripDetails,
} from '../../lib/utilsRouts';
// Components for Styling
import { H6, TextGrayDense } from '../styles/Text';
import { StyledContainer } from '../styles/StyledContainer';
import { StyledCardWithPadding } from '../styles/StyledCards';

const BookingThankYou = (props) => {
  const { time, dayId, guideId } = props.props;
  const { loading, error, data } = useDayIdToQueryReservation(dayId, guideId, time);
  if (loading) {
    return <LoadingBar />;
  }
  if (error) {
    return <ErrorGraphql error={error} />;
  }
  if (data) {
    const { day } = data;
    const { nrOfPeople, description, time, userName, guide, trip } = day.reservations[0];
    const writeTime = timeToString(time);
    if (trip) {
      console.log('trip', trip);
    }
    return (
      <>
        <Nav />
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
            {trip && (
              <>
                <TextGrayDense use="body1">
                  You've booked
                  <strong>{` ${trip.title} trip.`}</strong> with a start point in{' '}
                  <strong>{` ${trip.start}.`}</strong>
                </TextGrayDense>
                <ButtonLink
                  text="Go to Trip description!"
                  onClick={() => routeToTripDetails(trip.id)}
                />
              </>
            )}
            <TextGrayDense use="body1">
              You've reservated a trip for
              <strong>{` ${nrOfPeople} `}</strong>
              {nrOfPeople === '1' ? 'guest.' : 'guests.'}
            </TextGrayDense>

            {description && (
              <TextGrayDense use="body1">{`Your message to the Guide: ${description}`}</TextGrayDense>
            )}
            <ButtonLink text="Book again!" onClick={() => routeToCalendar(guideId)} />
            <ButtonLink text="Book another guide!" onClick={routeToGuidesList} />
          </StyledCardWithPadding>
        </StyledContainer>
      </>
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
