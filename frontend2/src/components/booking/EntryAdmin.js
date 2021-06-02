import React from 'react';
import PropTypes from 'prop-types';
//Components
import ErrorGraphql from '../reusable/ErrorGraphql';
import LoadingBar from '../reusable/LoadingBar';
import { ButtonLink, StyledTextMain } from '../reusable/Buttons';
import IconConfirmed from '../reusable/IconConfirmed';
import BookingDetailsForAdmin from './BookingDetailsForAdmin';
import EntryText from './EntryTextGuideAndAdmin';
//Utils
import { routeToTripDetails } from '../../lib/utilsRouts';
import { useDeleteReservation } from '../../apollo/mutations/useDeleteReservation';
// Components for Styling
import {
  H6,
  TextSpecial,
} from '../../styles/Text';
import { EntrySpan, StyledSpan, StyledButton } from '../../styles/StyledEntry';
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
      {reservation.holiday ? (
        <EntrySpan className={reservation.time} onClick={() => setOpen(true)}>
          <TextSpecial className="holiday">Free!</TextSpecial>
        </EntrySpan>
      ) : (
        <EntrySpan className={reservation.time} onClick={() => setOpen(true)}>
          <EntryText userName={reservation.userName} confirmed={reservation.confirmed} />
        </EntrySpan>
      )}
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <StyledSpan>
          {reservation.holiday && (
            <H6 use="headline6">{`Holiday at ${reservation.relatedDay.day} ${reservation.relatedDay.month} 
            ${reservation.relatedDay.year}`}</H6>
          )}
          {!reservation.holiday && <BookingDetailsForAdmin reservation={reservation} />}
          <StyledButton action="close">
            <StyledTextMain>Close</StyledTextMain>
          </StyledButton>
          {reservation.trip && (
            <ButtonLink
              text="Go to Trip description!"
              onClick={() => routeToTripDetails(reservation.trip.id)}
            />
          )}
          {loadingDeleteReservation && <LoadingBar />}
          {errorDeleteReservation && <ErrorGraphql error={errorDeleteReservation} />}
          <ButtonLink text="Chancel Booking" onClick={handleDelete} />
        </StyledSpan>
      </Dialog>
    </>
  );
};
EntryAdmin.propTypes = {
  reservation: PropTypes.object,
};
export default EntryAdmin;
