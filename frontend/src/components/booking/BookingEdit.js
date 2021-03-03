import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { routeToGuidesList } from '../../lib/utilsRouts';
import { Button } from '@rmwc/button';

import ErrorGraphql from '../reusable/ErrorGraphql';
import Loading from '../reusable/LoadingBar';
import ButtonLink from '../reusable/ButtonLink';

import { useCurrentUser } from '../../apollo/querries/useCurrentUser';
import { useReservation } from '../../apollo/querries/useReservation';
import { useDeleteReservation } from '../../apollo/mutations/useDeleteReservation';

import {
  handleCloseReservationDetails,
  handleDeleteReservation,
} from '../../lib/utilsBooking';

import { StyledCard, StyledSpanPadding } from '../styles/StyledForm';
import {
  StyledTextBody1,
  StyledTextTitle6,
  StyledTextButtonColor,
} from '../styles/StyledText';

const BookingEdit = ({ id }) => {
  const { loading, error, data } = useReservation(id);
  const [
    deleteReservation,
    { loading: loadingDeleteReservation, error: errorDeleteReservation },
  ] = useDeleteReservation();

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorGraphql error={error} />;
  }
  if (data) {
    const { reservation } = data;
    return (
      <StyledCard>
        <StyledButtonLinkClose
          disabled={loadingDeleteReservation}
          onClick={handleCloseReservationDetails}
        >
          <StyledTextButtonColor>X</StyledTextButtonColor>
        </StyledButtonLinkClose>
        <StyledSpanPadding>
          <StyledTextTitle6>
            Reservation on {reservation.relatedDay.day} {reservation.relatedDay.month}{' '}
            {reservation.relatedDay.year}
          </StyledTextTitle6>
          {errorDeleteReservation && <ErrorGraphql error={error} />}
          <StyledTextBody1>
            Booked by: <strong>{reservation.userName}</strong>. for ,{' '}
            <strong>{reservation.nrOfPeople}</strong> guest(s).
          </StyledTextBody1>
          <StyledTextBody1>
            Email: <strong>{reservation.userEmail}</strong>.
          </StyledTextBody1>
          <StyledTextBody1>
            Tour type: <strong>{reservation.time}</strong> tour
          </StyledTextBody1>
          {reservation.description && (
            <StyledTextBody1>{reservation.description}</StyledTextBody1>
          )}
          <ButtonLink
            loading={loadingDeleteReservation}
            text="Delete"
            onClick={() => handleDeleteReservation(reservation.id, deleteReservation)}
          />
        </StyledSpanPadding>
      </StyledCard>
    );
  }
};
BookingEdit.propTypes = {
  id: PropTypes.string,
};
export const StyledButtonLinkClose = styled(Button)`
  text-transform: capitalize;
  max-width: 64px;
  justify-self: end;
  align-self: end;
  //margin: -1rem;
  border-radius: 0px 0px 0px 0px;
`;
export const StyledButtonLinkDelete = styled(Button)`
  text-transform: capitalize;
  border-radius: 0px 0px 0px 0px;
`;
export default BookingEdit;
