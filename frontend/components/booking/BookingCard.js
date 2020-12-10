import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

import styled from 'styled-components';
import PropTypes from 'prop-types';
// RMWC
import { Button } from '@rmwc/button';
// Queries
import DELETE_RESERVATION from '../../graphgl/mutations/DELETE_RESERVATION';
import RESERVATION_QUERY from '../../graphgl/queries/RESERVATION_QUERY';
// Components for Styling
import { StyledContainer } from '../styles/StyledContainer';
import {
  StyledCard,
  StyledButton,
  StyledSpanPadding,
} from '../styles/StyledForm';
import {
  StyledTextBody1,
  StyledTextBody2,
  StyledTextTitle5,
  StyledTextTitle6,
  StyledTextSubtitle1,
  StyledTextSubtitle2,
  StyledTextMenuWhite,
  StyledTextButtonBlack,
  StyledTextButtonColor,
} from '../styles/StyledText';

const BookingCard = (props) => {
  const { id } = props;
  const router = useRouter();
  const { error, loading, data } = useQuery(RESERVATION_QUERY, {
    variables: { id },
  });
  //
  const [
    delete_reservation,
    { data: dataDeleteReservation },
  ] = useMutation(DELETE_RESERVATION, {});
  if (error) return <p>Error:{error}</p>;
  if (loading) {
    return <p>Loading...</p>;
  }
  if (data) {
    console.log(data);
    const {
      description,
      nrOfPeople,
      time,
      userEmail,
      userName,
    } = data.reservation;
    const { day, month, year } = data.reservation.relatedDay;
    const {
      id: guideId,
      name,
      surname,
      photo,
    } = data.reservation.guide;

    function handleClose() {
      router.push({
        pathname: '/booking_guide',
        query: {
          guideId,
          guideName: name,
          guideSurname: surname,
          guidePhoto: photo,
        },
      });
    }
    function handleDelete() {
      console.log('delete');
      delete_reservation({
        variables: { id },
      });
      handleClose();
    }
    return (
      <StyledCard>
        <StyledButtonLinkClose onClick={handleClose}>
          <StyledTextButtonColor>X</StyledTextButtonColor>
        </StyledButtonLinkClose>
        <StyledSpanPadding>
          <StyledTextTitle6>
            Reservation on {day} {month} {year}
          </StyledTextTitle6>

          <StyledTextBody1>
            Booked by: <strong>{userName}</strong>. for ,{' '}
            <strong>{nrOfPeople}</strong> guest(s).
          </StyledTextBody1>
          <StyledTextBody1>
            Email: <strong>{userEmail}</strong>.
          </StyledTextBody1>
          <StyledTextBody1>
            Tour type: <strong>{time}</strong> tour
          </StyledTextBody1>
          {description && (
            <StyledTextBody1>{description}</StyledTextBody1>
          )}
          <StyledButtonLinkDelete onClick={handleDelete}>
            <StyledTextButtonColor>Delete</StyledTextButtonColor>
          </StyledButtonLinkDelete>
        </StyledSpanPadding>
      </StyledCard>
    );
  }
};
BookingCard.PropTypes = {
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
export default BookingCard;
