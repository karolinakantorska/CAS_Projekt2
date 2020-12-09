import React, { useState, useEffect } from 'react';
import { useMutation, useQuery, useLazyQuery } from '@apollo/client';
import Link from 'next/link';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import DAY_QUERY from '../../graphgl/queries/DAY_QUERY';
import User from '../main/User';
import Nav from '../main/Nav';
import BookingCard from './BookingCard';
import { Button } from '@rmwc/button';
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
import { addBusinessDays } from 'date-fns';

const BookingsList = (props) => {
  const { year, month, day, guideId } = props;
  console.log('props', props);
  const { loading, error, data } = useQuery(DAY_QUERY, {
    variables: {
      year,
      month,
      day,
      id: guideId,
    },
  });
  if (error) return <p>Error:{error}</p>;
  if (loading) {
    return <p>Loading...</p>;
  }
  if (data.days.length > 0) {
    const reservations = data.days[0].reservations;
    const dayId = data.days[0].id;
    return (
      <span>
        <StyledTextBody1>
          Reservations at {day} {month} {year}:
        </StyledTextBody1>
        {reservations.map((day) => (
          <BookingCard reservation={day} props={props} key={day.id} />
        ))}
      </span>
    );
  }
  return null;
};

export default BookingsList;
