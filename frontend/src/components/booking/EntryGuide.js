import React from 'react';
import PropTypes from 'prop-types';
//Components
import ErrorGraphql from '../reusable/ErrorGraphql';
import Loading from '../reusable/LoadingBar';
import { ButtonMain, ButtonLink, StyledTextMain } from '../reusable/Buttons';
import IconConfirmed from '../reusable/IconConfirmed';
//Utils
import { useConfirmReservation } from '../../apollo/mutations/useConfirmReservation';
// Components for Styling
import { H6, TextSpecial } from '../styles/Text';
import {
  EntrySpan,
  StyledSpan,
  StyledTypographyRed,
  StyledTypographyGreen,
  StyledButton,
} from '../styles/StyledEntry';
// RMWC
import { Typography } from '@rmwc/typography';
import { Dialog, DialogTitle, DialogContent } from '@rmwc/dialog';
const EntryGuide = ({ reservation, currentUser }) => {
  const [open, setOpen] = React.useState(false);
  const [
    updateReservation,
    { loading: loadingUpdateReservation, error: errorUpdateReservation },
  ] = useConfirmReservation();
  function handleConfirm() {
    updateReservation({ variables: { id: reservation.id, confirmed: true } });
  }
  return (
    <>
      <EntrySpan
        className={reservation.time}
        onClick={() => !reservation.holiday && setOpen(true)}
      >
        {reservation.holiday ? (
          <TextSpecial className="holiday">Free!</TextSpecial>
        ) : (
          <Typography use="caption">
            {`Gast: ${reservation.userName} `}
            <IconConfirmed confirmed={reservation.confirmed} size="xsmall" />
          </Typography>
        )}
      </EntrySpan>
      <Dialog
        open={open}
        onClose={(e) => {
          setOpen(false);
        }}
      >
        <StyledSpan>
          <H6 use="headline6">{`Reservation for ${reservation.relatedDay.day} ${reservation.relatedDay.month} 
            ${reservation.relatedDay.year}`}</H6>

          {errorUpdateReservation && <ErrorGraphql error={errorUpdateReservation} />}

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
          {loadingUpdateReservation && <Loading />}
          {reservation.guide.id === currentUser.id && (
            <ButtonMain
              disabled={reservation.confirmed || loadingUpdateReservation}
              text={reservation.confirmed ? 'Confirmed' : 'Confirm'}
              onClick={handleConfirm}
            />
          )}
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
EntryGuide.propTypes = {
  reservation: PropTypes.object,
  currentUser: PropTypes.object,
};

export default EntryGuide;
