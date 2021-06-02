import React from 'react';
import PropTypes from 'prop-types';
//Components
import { ButtonMain, ButtonLink, StyledTextMain } from '../reusable/Buttons';
import IconConfirmed from '../reusable/IconConfirmed';
//Utils
import { routeToTripDetails } from '../../lib/utilsRouts';
// Components for Styling
import {
  H6,
  TextSpecial,
  StyledTypographyRed,
  StyledTypographyGreen,
} from '../../styles/Text';
// RMWC
import { Typography } from '@rmwc/typography';
const BookingDetailsForGuide = ({ reservation }) => {
  return (
    <>
      <H6 use="headline6">{`Reservation for ${reservation.relatedDay.day} ${reservation.relatedDay.month} 
            ${reservation.relatedDay.year}`}</H6>
      <Typography use="body2">
        Booked by:
        <strong> {reservation.userName}</strong>
      </Typography>
      <Typography use="body2">
        Gast email: <strong>{reservation.userEmail}</strong>.
      </Typography>
      <Typography use="body2">
        Tour type: <strong>{reservation.time}</strong> tour
      </Typography>
      <Typography use="body2">
        Number of guests:
        <strong>{` ${reservation.nrOfPeople}. `}</strong>
      </Typography>
      {reservation.description && (
        <Typography use="body2">Description: {reservation.description}</Typography>
      )}
      {reservation.trip && (
        <Typography use="body2">
          Trip:
          <strong>{` ${reservation.trip.title} trip.`}</strong>
        </Typography>
      )}
      {reservation.confirmed ? (
        <StyledTypographyGreen use="body2">
          <IconConfirmed confirmed={reservation.confirmed} size="large" />
        </StyledTypographyGreen>
      ) : (
        <StyledTypographyRed use="body2">
          <IconConfirmed confirmed={reservation.confirmed} size="large" />
        </StyledTypographyRed>
      )}

      {reservation.trip && (
        <ButtonLink
          text="Go to Trip description!"
          onClick={() => routeToTripDetails(reservation.trip.id)}
        />
      )}
    </>
  );
};
BookingDetailsForGuide.propTypes = {
  reservation: PropTypes.object,
};

export default BookingDetailsForGuide;
