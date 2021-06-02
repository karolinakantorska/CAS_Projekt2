import React from 'react';
import PropTypes from 'prop-types';
//Components
import { ButtonMain, ButtonLink, StyledTextMain } from '../reusable/Buttons';
//Utils
import { timeToString } from '../../lib/utilsBooking';
import { routeToGuidesList, routeToTripDetails } from '../../lib/utilsRouts';
// Components for Styling
import { H6, TextGrayDense } from '../../styles/Text';
const BookingThankyouDetails = ({ data }) => {
  const { day } = data;
  const { nrOfPeople, description, time, userName, guide, trip } = day.reservations[0];
  const writeTime = timeToString(time);
  return (
    <>
      <TextGrayDense use="body1">Your reservation has just been completed.</TextGrayDense>
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
      <ButtonLink text="Book another guide!" onClick={routeToGuidesList} />
    </>
  );
};
BookingThankyouDetails.propTypes = {
  reservation: PropTypes.object,
  currentUser: PropTypes.object,
  handleConfirm: PropTypes.func,
};

export default BookingThankyouDetails;
