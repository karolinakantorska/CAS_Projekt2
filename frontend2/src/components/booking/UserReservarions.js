import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
//Components
import IconConfirmed from '../reusable/IconConfirmed';
import { ButtonMain, ButtonLink } from '../reusable/Buttons';
import LoadingBar from '../reusable/LoadingBar';
import ErrorGraphql from '../reusable/ErrorGraphql';
//Utils
import { routeToTripDetails, routeToGuideDetails } from '../../lib/utilsRouts';
import { useDeleteReservation } from '../../apollo/mutations/useDeleteReservation';
// Components for Styling
import { StyledCardReservation } from '../../styles/StyledCards';
import { StyledButtonSpan } from '../../styles/StyledButtonSpan';
import { H6, StyledTypographyRed, StyledTypographyGreen } from '../../styles/Text';
// RMWC
import { Typography } from '@rmwc/typography';

const UsersReservations = ({ reservation }) => {
  const [
    deleteReservation,
    { loading: loadingDeleteReservation, error: errorDeleteReservation },
  ] = useDeleteReservation();
  function handleDelete(id) {
    deleteReservation({
      variables: { id },
    });
  }
  return (
    <>
      {reservation && !reservation.holiday && (
        <StyledCardReservation>
        <span>
          <StyledDiv>
            <H6 use="headline6">{`Reservations at: ${reservation.day} ${reservation.month} ${reservation.year} `}</H6>
          </StyledDiv>
          {reservation.reservations.map((reservation) => (
            <span key={reservation.id}>
              {loadingDeleteReservation && <LoadingBar />}
              {errorDeleteReservation && <ErrorGraphql error={errorDeleteReservation} />}
              <Typography use="body2">
                Tour type: <strong>{reservation.time}</strong> tour
              </Typography>
              {reservation.guide === null ? (
                <Typography use="body2">
                  Unfortunately the guide you have booked can't take any trips for a
                  moment. We will contact you to rebook or chancel your booking.
                </Typography>
              ) : (
                <>
                  <Typography use="body2">
                    Your Guide will be:
                    <strong>{reservation.guide.name}</strong>
                  </Typography>
                  <Typography use="body2">
                    Guide email:
                    <strong>{reservation.guide.email}</strong>
                  </Typography>
                  <Typography use="body2">
                    Gide phone:
                    <strong>{reservation.guide.phone}</strong>
                  </Typography>
                  <Typography use="body2">
                    Gast e-mail:
                    <strong>{reservation.userEmail}</strong>
                  </Typography>
                </>
              )}
              {reservation.trip !== null && (
                <Typography use="body2">
                  You've booked
                  <strong>{` ${reservation.trip.title} trip.`}</strong> with a start point
                  in <strong>{` ${reservation.trip.start}.`}</strong>
                </Typography>
              )}
              <Typography use="body2">
                You've reservated a trip for
                <strong>{` ${reservation.nrOfPeople} `}</strong>
                {reservation.nrOfPeople === '1' ? 'guest.' : 'guests.'}
              </Typography>
              {reservation.description && (
                <Typography use="body2">
                  Your message to the Guide: {reservation.description}
                </Typography>
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
              <StyledButtonSpan>
                {reservation.trip !== null && (
                  <ButtonLink
                    text="Go to Trip description!"
                    onClick={() => routeToTripDetails(reservation.trip.id)}
                  />
                )}
                {reservation.guide !== null && (
                  <ButtonLink
                    text="Go to Guide Bio!"
                    onClick={() => routeToGuideDetails(reservation.guide.id)}
                  />
                )}
              </StyledButtonSpan>
              <StyledButtonSpan>
                <ButtonLink
                  text="Delete Reservation"
                  onClick={() => handleDelete(reservation.id)}
                />
              </StyledButtonSpan>
            </span>
          ))}
        </span>
        </StyledCardReservation>
      )}
    </>
  );
};
UsersReservations.propTypes = {
  currentUserPermission: PropTypes.string,
  guideId: PropTypes.string,
};
const StyledDiv = styled.div`
  border-top: 1px solid grey;
  border-bottom: 1px solid grey;
`;


export default UsersReservations;
