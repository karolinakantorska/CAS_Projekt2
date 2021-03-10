import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { routeToGuidesList } from '../../lib/utilsRouts';

import ErrorGraphql from '../reusable/ErrorGraphql';
import Loading from '../reusable/LoadingBar';
import ButtonLink from '../reusable/ButtonLink';
import ButtonMain from '../reusable/ButtonMain';
import SelectGuide from './SelectGuide';

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
import { Button } from '@rmwc/button';

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
    console.log(data);
    const { reservation } = data;
    const relatedDayId = reservation.relatedDay.id;
    console.log('relatedDayId', relatedDayId);
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
            {`Reservation for ${reservation.relatedDay.day} ${reservation.relatedDay.month} 
            ${reservation.relatedDay.year}`}
          </StyledTextTitle6>
          {errorDeleteReservation && <ErrorGraphql error={error} />}
          <StyledTextBody1>
            Booked by: <strong>{reservation.userName}</strong>
          </StyledTextBody1>
          <StyledTextBody1>
            Gast email: <strong>{reservation.userEmail}</strong>.
          </StyledTextBody1>
          <StyledTextBody1>
            Tour type: <strong>{reservation.time}</strong> tour
          </StyledTextBody1>
          <StyledTextBody1>
            {reservation.nrOfPeople &&
              `Trip for${reservation.nrOfPeople}`(
                reservation.nrOfPeople === '1' ? 'guest.' : 'guests.',
              )}
          </StyledTextBody1>
          <StyledTextBody1>
            Guide:
            <strong>
              `{reservation.guide.name} {reservation.guide.surname}.`
            </strong>{' '}
          </StyledTextBody1>
          <StyledTextBody1>
            Guide email: <strong>{reservation.guide.email}</strong>.
          </StyledTextBody1>
          {reservation.description && (
            <StyledTextBody1>{reservation.description}</StyledTextBody1>
          )}
          {/*if ADMIN*/}
          <StyledTextTitle6>Other Guides Avaiable:</StyledTextTitle6>
          <SelectGuide id={reservation.relatedDay.id} />
          <ButtonMain loading={false} text="Edit" onClick={() => null} />
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
  border-radius: 0px 0px 0px 0px;
`;
export const StyledButtonLinkDelete = styled(Button)`
  text-transform: capitalize;
  border-radius: 0px 0px 0px 0px;
`;
export default BookingEdit;
