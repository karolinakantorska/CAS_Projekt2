import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Button } from '@rmwc/button';

import Error from '../main/Error';
import DELETE_RESERVATION from '../../graphgl/mutations/DELETE_RESERVATION';
import RESERVATION_QUERY from '../../graphgl/queries/RESERVATION_QUERY';

import { StyledCard, StyledSpanPadding } from '../styles/StyledForm';
import {
  StyledTextBody1,
  StyledTextTitle6,
  StyledTextButtonColor,
} from '../styles/StyledText';

const BookingEdit = (props) => {
  const { id } = props;
  const router = useRouter();
  const { error, loading, data } = useQuery(RESERVATION_QUERY, {
    variables: { id },
  });
  function handleClose() {
    router.push({
      pathname: '/guides',
    });
  }
  function handleDelete() {
    console.log('delete');
    delete_reservation({
      variables: { id },
    });
    handleClose();
  }
  const [delete_reservation, { data: dataDeleteReservation }] = useMutation(
    DELETE_RESERVATION,
    {},
  );
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <Error error={error} />;
  }
  if (data) {
    const { description, nrOfPeople, time, userEmail, userName } = data.reservation;
    const { day, month, year } = data.reservation.relatedDay;
    const { id: guideId, name, surname, photo } = data.reservation.guide;
    return (
      <StyledCard>
        <StyledButtonLinkClose onClick={handleClose} data-test="a-close">
          <StyledTextButtonColor>X</StyledTextButtonColor>
        </StyledButtonLinkClose>
        <StyledSpanPadding>
          <StyledTextTitle6>
            Reservation on {day} {month} {year}
          </StyledTextTitle6>
          l
          <StyledTextBody1>
            Booked by: <strong>{userName}</strong>. for , <strong>{nrOfPeople}</strong>{' '}
            guest(s).
          </StyledTextBody1>
          <StyledTextBody1>
            Email: <strong>{userEmail}</strong>.
          </StyledTextBody1>
          <StyledTextBody1>
            Tour type: <strong>{time}</strong> tour
          </StyledTextBody1>
          {description && <StyledTextBody1>{description}</StyledTextBody1>}
          <StyledButtonLinkDelete onClick={handleDelete} data-test="a-delete">
            <StyledTextButtonColor>Delete</StyledTextButtonColor>
          </StyledButtonLinkDelete>
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
