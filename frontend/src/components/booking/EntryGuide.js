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
  StyledTypography,
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
        onClosed={(e) => console.log(e.detail.action)}
      >
        <StyledSpan>
          <DialogTitle>
            <H6 use="headline6">{`Reservation for ${reservation.relatedDay.day} ${reservation.relatedDay.month} 
            ${reservation.relatedDay.year}`}</H6>
          </DialogTitle>
          {errorUpdateReservation && <ErrorGraphql error={errorUpdateReservation} />}
          <DialogContent>
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
              You've reservated a trip for
              <strong>{` ${reservation.nrOfPeople} `}</strong>
              {reservation.nrOfPeople === '1' ? 'guest.' : 'guests.'}
            </Typography>
            {reservation.description && (
              <Typography use="body2">Description: {reservation.description}</Typography>
            )}
            <StyledTypography use="body2">
              <IconConfirmed confirmed={reservation.confirmed} size="large" />
            </StyledTypography>
            {loadingUpdateReservation && <Loading />}
            {reservation.guide.id === currentUser.id && (
              <ButtonMain
                disabled={reservation.confirmed || loadingUpdateReservation}
                text={reservation.confirmed ? 'Confirmed' : 'Confirm'}
                onClick={handleConfirm}
              />
            )}
            <StyledButton action="close">
              <StyledTextMain>Close</StyledTextMain>
            </StyledButton>
          </DialogContent>
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
