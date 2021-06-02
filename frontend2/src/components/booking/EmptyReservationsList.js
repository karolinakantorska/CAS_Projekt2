import React from 'react';
import styled from 'styled-components';
//Components
import LoadingBar from '../reusable/LoadingBar';
import ErrorGraphql from '../reusable/ErrorGraphql';
import ReservationCard from './ReservationCard';
import { useHydratationFix } from '../../lib/useHydratationFix';
//Utils
import { useReservationsWithoutGuide } from '../../apollo/querries/useReservationsWithoutGuide';
// Components for Styling
import { H6} from '../../styles/Text';
import {
  StyledContainer,
  StyledSpan,
} from '../../styles/StyledContainer';

const EmptyReservationsList = () => {
  const { loading, error, data } = useReservationsWithoutGuide();
  const hasMounted = useHydratationFix();
  if (!hasMounted) {
    return null;
  }
    return (
      <StyledContainer>
        {loading && <LoadingBar />}
        {error && <ErrorGraphql error={error} />}
        <StyledSpan>
          <H6 use="headline6">Reserwations without guide</H6>
        </StyledSpan>
        {data &&
          data.reservations.map((reservation) => (
            <ReservationCard reservation={reservation} key={reservation.id} />
          ))}
      </StyledContainer>
    );
};

export default EmptyReservationsList;
