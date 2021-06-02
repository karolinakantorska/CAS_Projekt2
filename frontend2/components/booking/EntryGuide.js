import React from 'react';
import PropTypes from 'prop-types';

//Components
import ErrorGraphql from '../reusable/ErrorGraphql';
import LoadingBar from '../reusable/LoadingBar';
import { ButtonMain, ButtonLink, StyledTextMain } from '../reusable/Buttons';

import BookingDetailsForGuide from './BookingDetailsForGuide';
import EntryText from './EntryTextGuideAndAdmin';
//Utils
import { useConfirmReservation } from '../../apollo/mutations/useConfirmReservation';
import { useDeleteReservation } from '../../apollo/mutations/useDeleteReservation';
// Components for Styling
import {
  H6,
  TextSpecial,
} from '../../styles/Text'; 
import {
  EntrySpan,
  StyledSpan,
  StyledButton,
} from '../../styles/StyledEntry';
// RMWC
import { Dialog } from '@rmwc/dialog';
const EntryGuide = ({ reservation, currentUser }) => {
  const [open, setOpen] = React.useState(false);
  const [
    deleteReservation,
    { loading: loadingDeleteReservation, error: errorDeleteReservation },
  ] = useDeleteReservation();
  const [
    updateReservation,
    { loading: loadingUpdateReservation, error: errorUpdateReservation },
  ] = useConfirmReservation();
  function handleConfirm() {
    updateReservation({ variables: { id: reservation.id, confirmed: true } });
  }
  function handleDelete() {
    deleteReservation({
      variables: { id: reservation.id },
    });
    setOpen(false);
  }
  return (
    <>
      {reservation.holiday ? (
        <EntrySpan className={`${reservation.time} guide`} onClick={() => setOpen(true)}>
          <TextSpecial className="holiday">Free!</TextSpecial>
        </EntrySpan>
      ) : (
        <EntrySpan className={`${reservation.time} guide`} onClick={() => setOpen(true)}>
          <EntryText userName={reservation.userName} confirmed={reservation.confirmed} />
        </EntrySpan>
      )}

      <Dialog
        open={open}
        onClose={(e) => {
          setOpen(false);
        }}
      >
        <StyledSpan>
          {reservation.holiday && (
            <H6 use="headline6">{`Holiday at ${reservation.relatedDay.day} ${reservation.relatedDay.month} 
            ${reservation.relatedDay.year}`}</H6>
          )}
          {!reservation.holiday && (
            <>
              <BookingDetailsForGuide reservation={reservation} />
              {reservation && reservation.guide.id === currentUser.id && (
                <>
                  {loadingUpdateReservation && <LoadingBar />}
                  {errorUpdateReservation && (
                    <ErrorGraphql error={errorUpdateReservation} />
                  )}
                  <ButtonMain
                    disabled={reservation.confirmed || loadingUpdateReservation}
                    text={reservation.confirmed ? 'Confirmed' : 'Confirm'}
                    onClick={handleConfirm}
                  />
                </>
              )}
            </>
          )}

          <StyledButton action="close">
            <StyledTextMain>Close</StyledTextMain>
          </StyledButton>
          {loadingDeleteReservation && <LoadingBar />}
          {errorDeleteReservation && <ErrorGraphql error={errorDeleteReservation} />}
          <ButtonLink text="Cancel Booking" onClick={handleDelete} />
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
