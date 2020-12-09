import React, { useState, useEffect } from 'react';
import { useMutation, useQuery, useLazyQuery } from '@apollo/client';
import Link from 'next/link';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import User from '../main/User';
import Nav from '../main/Nav';
import { Button } from '@rmwc/button';
import { StyledContainer } from '../styles/StyledContainer';
import DELETE_RESERVATION from '../../graphgl/mutations/DELETE_RESERVATION';
import DAY_QUERY from '../../graphgl/queries/DAY_QUERY';
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
  const { year, month, day, guideId } = props;

  const {
    id,
    time,
    userName,
    userEmail,
    nrOfPeople,
    description,
  } = props.reservation;

  const [
    delete_reservation,
    { loading, error, called, data },
  ] = useMutation(DELETE_RESERVATION, {
    update(cache, data) {
      console.log(data.data.deleteReservation.id);
      console.log(cache);
      const deletedReservationID = data.data.deleteReservation.id;
      // Get the current reservations list
      const dataAll = cache.readQuery({
        query: DAY_QUERY,
        variables: {
          year,
          month,
          day,
          reservations_every: { guide: { id: guideId } },
        },
      });
      console.log('dataAll');
      console.log(dataAll);
    },

    /*
      update(cache, data) {
        const deletedReservationID = data.data.deleteUser.id;
        // Get the current RESERVATIOB list
        const dataAll = cache.readQuery({
          query: ALL_GUIDES_QUERY,
          variables: { permissions: 'GUIDE' },
        });
        // spreading users to a new variable
        const newDataAll = { ...dataAll };
        // filter out a user by ID
        newDataAll.users = newDataAll.users.filter(
          (user) => user.id !== deletedUserID,
        );
        client.writeQuery({
          query: ALL_GUIDES_QUERY,
          variables: { permissions: 'GUIDE' },
          data: { users: [...newDataAll.users] },
        });
      },
      */
  });
  function handleDeleteReservation() {
    delete_reservation({
      variables: { id },
      /*
      optimisticResponse: {
        __typename: 'Mutation',
        deleteUser: {
          __typename: 'User',
          id,
        },
      },
      */
    });
  }
  return (
    <StyledCard>
      <StyledSpanPadding>
        <StyledButtonLink onClick={handleDeleteReservation}>
          <StyledTextButtonColor>X</StyledTextButtonColor>
        </StyledButtonLink>
        <StyledTextBody1>
          Booked by: <strong>{userName}</strong> @{' '}
          <strong>{userEmail}</strong> for <strong>{time}</strong>{' '}
          tour, <strong>{nrOfPeople}</strong> guest(s).
        </StyledTextBody1>
        {description && (
          <StyledTextBody1>{description}</StyledTextBody1>
        )}
      </StyledSpanPadding>
    </StyledCard>
  );
};
export const StyledButtonLink = styled(Button)`
  text-transform: capitalize;
  max-width: 64px;
  justify-self: end;
  margin: -1rem;
  border-radius: 0px 0px 0px 0px;
`;
export default BookingCard;
