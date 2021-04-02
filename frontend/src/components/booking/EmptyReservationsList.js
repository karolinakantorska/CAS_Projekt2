import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
//Components
import Loading from '../reusable/LoadingBar';
import ErrorGraphql from '../reusable/ErrorGraphql';
import ReservationCard from './ReservationCard';
import GuideAvatar from '../reusable/GuideAvatar';
import { StyledTextMain } from '../reusable/Buttons';
import IconConfirmed from '../reusable/IconConfirmed';
//Utils
import { useReservationsWithoutGuide } from '../../apollo/querries/useReservationsWithoutGuide';
// Components for Styling
import { StyledContainer, StyledCardsContainer } from '../styles/StyledContainer';
import { H6, TextSpecial } from '../styles/Text';
import {
  EntrySpan,
  StyledSpan,
  StyledTypography,
  StyledButton,
} from '../styles/StyledEntry';
// RMWC
import { Typography } from '@rmwc/typography';
import { Dialog, DialogTitle, DialogContent } from '@rmwc/dialog';
const EmptyReservations = () => {
  const { loading, error, data } = useReservationsWithoutGuide();
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return (
      <StyledContainer>
        <ErrorGraphql error={error} />
      </StyledContainer>
    );
  }
  if (data) {
    return (
      <StyledContainer>
        {data.reservations.map((reservation) => (
          <ReservationCard reservation={reservation} key={reservation.id} />
        ))}
      </StyledContainer>
    );
  }
};

const StyledSpanAvatar = styled.div`
  margin: 50px auto 20px auto;
`;
export default EmptyReservations;
