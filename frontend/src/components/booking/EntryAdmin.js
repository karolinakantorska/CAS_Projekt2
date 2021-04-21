import React from 'react';
import PropTypes from 'prop-types';
//Components
import ErrorGraphql from '../reusable/ErrorGraphql';
import Loading from '../reusable/LoadingBar';
import { ButtonLink, StyledTextMain } from '../reusable/Buttons';
import IconConfirmed from '../reusable/IconConfirmed';
//Utils
import { useDeleteReservation } from '../../apollo/mutations/useDeleteReservation';
// Components for Styling
import { H6 } from '../styles/Text';
import {
  EntrySpan,
  StyledSpan,
  StyledTypographyRed,
  StyledTypographyGreen,
  StyledButton,
} from '../styles/StyledEntry';
// RMWC
import { Typography } from '@rmwc/typography';
import { Dialog } from '@rmwc/dialog';
const EntryAdmin = ({ reservation }) => {
  const [open, setOpen] = React.useState(false);
  const [
    deleteReservation,
    { loading: loadingDeleteReservation, error: errorDeleteReservation },
  ] = useDeleteReservation();
  function handleDelete() {
    deleteReservation({
      variables: { id: reservation.id },
    });
    setOpen(false);
  }
  return (
    <>
      <EntrySpan
        className={reservation.time}
        onClick={() => !reservation.holiday && setOpen(true)}
      >
        <Typography use="caption">
          {`Guide: ${reservation.guide.name}`}
          <IconConfirmed confirmed={reservation.confirmed} size="xsmall" />
        </Typography>
      </EntrySpan>

      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <StyledSpan>
          <H6 use="headline6">{`Reservation for ${reservation.relatedDay.day} ${reservation.relatedDay.month} 
            ${reservation.relatedDay.year}`}</H6>
          {errorDeleteReservation && <ErrorGraphql error={errorDeleteReservation} />}
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
            Guide:
            <strong>
              `{reservation.guide.name} {reservation.guide.surname}.`
            </strong>{' '}
          </Typography>
          <Typography use="body2">
            Guide email: <strong>{reservation.guide.email}</strong>.
          </Typography>
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
          {loadingDeleteReservation && <Loading />}
          <ButtonLink text="Delete" onClick={handleDelete} />{' '}
          {reservation.trip && (
            <ButtonLink
              text="Go to Trip description!"
              onClick={() => routeToTripDetails(reservation.trip.id)}
            />
          )}
          <StyledButton action="close">
            <StyledTextMain>Close</StyledTextMain>
          </StyledButton>
        </StyledSpan>
      </Dialog>
    </>
  );
};
EntryAdmin.propTypes = {
  reservation: PropTypes.object,
};
export default EntryAdmin;
