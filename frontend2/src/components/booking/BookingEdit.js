import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

//Components
import ErrorGraphql from '../reusable/ErrorGraphql';
import LoadingBar from '../reusable/LoadingBar';
import { ButtonMain, ButtonLink } from '../reusable/Buttons';
import SelectGuide from './SelectGuide';
// Utils
import { permission } from '../../lib/utils';
import { routeBack } from '../../lib/utilsRouts';
import { useCurrentUser } from '../../apollo/querries/useCurrentUser';
import { useReservation } from '../../apollo/querries/useReservation';
import { useDeleteReservation } from '../../apollo/mutations/useDeleteReservation';
import { useConfirmReservation } from '../../apollo/mutations/useConfirmReservation';

// Components for Styling
import { StyledFieldset } from '../../styles/StyledForm';
import { StyledCard } from '../../styles/StyledCards';
import { H6, TextGrayDense } from '../../styles/Text';

// RMWC
import { Typography } from '@rmwc/typography';
import { Icon } from '@rmwc/icon';

const BookingEdit = ({ id }) => {
  const { loading, error, data } = useReservation(id);
  const {
    loading: loadingCurrentUser,
    error: errorCurrentUser,
    data: dataCurrentUser,
  } = useCurrentUser();
  const [
    deleteReservation,
    { loading: loadingDeleteReservation, error: errorDeleteReservation },
  ] = useDeleteReservation();
  const [
    updateReservation,
    { loading: loadingUpdateReservation, error: errorUpdateReservation },
  ] = useConfirmReservation();
  function handleConfirm() {
    updateReservation({ variables: { id, confirmed: true } });
  }
  function handleDelete() {
    deleteReservation({
      variables: { id },
    });
  }
  if (loading || loadingCurrentUser) {
    return <LoadingBar />;
  }
  if (error || errorCurrentUser) {
    return <ErrorGraphql error={error} />;
  }
  if (data && dataCurrentUser) {
    console.log(data);
    const { reservation } = data;
    return (
      <StyledCard>
        <StyledFieldset
          disabled={loadingDeleteReservation || loadingUpdateReservation}
          aria-busy={loadingDeleteReservation || loadingUpdateReservation}
        >
          <H6 use="headline6">{`Reservation for ${reservation.relatedDay.day} ${reservation.relatedDay.month} 
            ${reservation.relatedDay.year}`}</H6>
          {errorDeleteReservation && <ErrorGraphql error={errorDeleteReservation} />}
          {errorUpdateReservation && <ErrorGraphql error={errorUpdateReservation} />}
          <Typography use="body1">
            Booked by:
            <strong> {reservation.userName}</strong>
          </Typography>
          <Typography use="body1">
            Gast email: <strong>{reservation.userEmail}</strong>.
          </Typography>
          <Typography use="body1">
            Tour type: <strong>{reservation.time}</strong> tour
          </Typography>
          <Typography use="body1">
            You've reservated a trip for
            <strong>{` ${reservation.nrOfPeople} `}</strong>
            {reservation.nrOfPeople === '1' ? 'guest.' : 'guests.'}
          </Typography>
          <Typography use="body1">
            Guide:
            <strong>
              `{reservation.guide.name} {reservation.guide.surname}.`
            </strong>{' '}
          </Typography>
          <Typography use="body1">
            Guide email: <strong>{reservation.guide.email}</strong>.
          </Typography>
          {reservation.description && (
            <Typography use="body1">Description: {reservation.description}</Typography>
          )}
          <StyledTypography use="body1">
            {reservation.confirmed ? (
              <Icon icon={{ icon: 'done', size: 'large' }} />
            ) : (
              <Icon icon={{ icon: 'minimize', size: 'large' }} />
            )}
          </StyledTypography>

          {dataCurrentUser.currentUser.permissions === permission.guide && (
            <ButtonMain
              disabled={reservation.confirmed}
              text={reservation.confirmed ? 'Confirmed' : 'Confirm'}
              onClick={handleConfirm}
            />
          )}
          {dataCurrentUser.currentUser.permissions === permission.admin && (
            <>
              <H6 use="headline6">Other Guides Avaiable:</H6>
              <SelectGuide id={reservation.relatedDay.id} />
              <ButtonLink text="Delete" onClick={handleDelete} />
            </>
          )}
          <ButtonLink text="Close" onClick={routeBack} />
        </StyledFieldset>
      </StyledCard>
    );
  }
};
BookingEdit.propTypes = {
  id: PropTypes.string,
};
export const StyledTypography = styled(Typography)`
  color: var(--colorWarning);
  text-align: center;
`;

export default BookingEdit;
