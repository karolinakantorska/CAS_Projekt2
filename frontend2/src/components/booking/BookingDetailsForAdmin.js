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
const BookingDetailsForAdmin = ({ reservation }) => {
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
      {reservation.guide ? (
        <>
          <Typography use="body2">
            Guide:
            <strong>
              `{reservation.guide.name} {reservation.guide.surname}.`
            </strong>{' '}
          </Typography>
          <Typography use="body2">
            Guide email: <strong>{reservation.guide.email}</strong>.
          </Typography>
        </>
      ) : (
        <Typography>No Guide is covering this Trip!</Typography>
      )}
      {reservation.trip && (
        <Typography use="body2">
          Trip:
          <strong>{` ${reservation.trip.title} trip.`}</strong>
        </Typography>
      )}
      <Typography use="body2">
        Number of guests:
        <strong>{` ${reservation.nrOfPeople}. `}</strong>
      </Typography>
      {reservation.description && (
        <Typography use="body2">Description: {reservation.description}</Typography>
      )}
      {reservation.confirmed ? (
        <>
          <StyledTypographyGreen use="body2">
            <IconConfirmed confirmed={reservation.confirmed} size="large" />
          </StyledTypographyGreen>
          <StyledTypographyGreen use="body2">
            Reservation confirmed by Guide.
          </StyledTypographyGreen>
        </>
      ) : (
        <>
          <StyledTypographyRed use="body2">
            <IconConfirmed confirmed={reservation.confirmed} size="large" />
          </StyledTypographyRed>
          <StyledTypographyRed use="body2">
            Reservation haven't been confirmed yet.
          </StyledTypographyRed>
        </>
      )}
    </>
  );
};
BookingDetailsForAdmin.propTypes = {
  reservation: PropTypes.object,
};

export default BookingDetailsForAdmin;
