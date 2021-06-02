import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// Components
import { ButtonMain, ButtonLink } from '../reusable/Buttons';
import ErrorGraphql from '../reusable/ErrorGraphql';
import LoadingBar from '../reusable/LoadingBar';
import SelectGuide from './SelectGuide';
//Utils
import { useDeleteReservation } from '../../apollo/mutations/useDeleteReservation';
import { useChangeGuideInReservaton } from '../../apollo/mutations/useChangeGuideInReservation';
// Components for Styling
import { StyledButtonSpan } from '../../styles/StyledButtonSpan';
import { StyledCardReservation } from '../../styles/StyledCards';
import { H6, TextSpecial } from '../../styles/Text';
// RMWC
import { Typography } from '@rmwc/typography';

const ReservationCard = ({ reservation }) => {
  const [newGuide, setNewGuide] = useState('');
  const [
    updateReservation,
    { loading: loadingUpdateGuide, error: errorUpdateGuide, data: dataUpdateGuide },
  ] = useChangeGuideInReservaton();
  const [
    deleteReservation,
    { loading: loadingDeleteReservation, error: errorDeleteReservation },
  ] = useDeleteReservation();

  function handleUpdateGuide() {
    updateReservation({
      variables: {
        id: reservation.id,
        guideId: newGuide,
      },
    });
  }
  function handleGuideChange(e) {
    setNewGuide(e.target.value);
  }
  function handleDelete() {
    deleteReservation({
      variables: { id: reservation.id },
    });
  }
  return (
    <StyledCardReservation>
      {!reservation.relatedDay && <TextSpecial>Succesfully rebooked!</TextSpecial>}
      {reservation.relatedDay && (
        <>
          <H6 use="headline6">{`Reservation for ${reservation.relatedDay.day} ${reservation.relatedDay.month} 
            ${reservation.relatedDay.year}`}</H6>
          <TypographyCorrected use="body2">
            Booked by:
            <strong> {reservation.userName}</strong>
          </TypographyCorrected>
          <TypographyCorrected use="body2">
            Gast email: <strong>{reservation.userEmail}</strong>.
          </TypographyCorrected>
          <TypographyCorrected use="body2">
            Tour type: <strong>{reservation.time}</strong> tour
          </TypographyCorrected>
          <TypographyCorrected use="body2">
            You've reservated a trip for
            <strong>{` ${reservation.nrOfPeople} `}</strong>
            {reservation.nrOfPeople === '1' ? 'guest.' : 'guests.'}
          </TypographyCorrected>
          {reservation.description && (
            <TypographyCorrected use="body2">
              Description: {reservation.description}
            </TypographyCorrected>
          )}
          {reservation.confirmed ? (
            <TextSpecial use="body2">Confirmed</TextSpecial>
          ) : (
            <TextSpecial use="body2">Not Confirmed</TextSpecial>
          )}
          <StyledFieldset
            disabled={loadingDeleteReservation || loadingUpdateGuide}
            aria-busy={loadingDeleteReservation || loadingUpdateGuide}
          >
            {loadingUpdateGuide && <LoadingBar />}
            {errorUpdateGuide && <ErrorGraphql error={errorUpdateGuide} />}
            <SelectGuide
              handleGuideChange={(e) => handleGuideChange(e)}
              dayId={reservation.relatedDay.id}
            />
            {loadingDeleteReservation && <LoadingBar />}
            <StyledButtonSpan className="button">
              <ButtonMain text="Change Guide" onClick={handleUpdateGuide} />
              <ButtonLink text="Delete Reservation" onClick={handleDelete} />
          </StyledButtonSpan>
          </StyledFieldset>
        </>
      )}
    </StyledCardReservation>
  );
};
ReservationCard.propTypes = {
  reservation: PropTypes.object,
};
const StyledFieldset = styled.fieldset`
  padding: 0px;
  border: none;
`;
const TypographyCorrected = styled(Typography)`
  margin: 0px;
`;
export default ReservationCard;
