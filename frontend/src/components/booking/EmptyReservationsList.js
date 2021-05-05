import React from 'react';
import styled from 'styled-components';
//Components
import LoadingBar from '../reusable/LoadingBar';
import ErrorGraphql from '../reusable/ErrorGraphql';
import ReservationCard from './ReservationCard';
import { useHydratationFix } from '../../lib/utils';
//Utils
import { useReservationsWithoutGuide } from '../../apollo/querries/useReservationsWithoutGuide';
// Components for Styling
import { H6, TextGrayDense } from '../styles/Text';
import { StyledContainer, StyledCardsContainer } from '../styles/StyledContainer';

const EmptyReservationsList = () => {
  const { loading, error, data } = useReservationsWithoutGuide();
  const hasMounted = useHydratationFix();
  if (!hasMounted) {
    return null;
  }
  if (loading) {
    return <LoadingBar />;
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
      <>
        <StyledContainer>
          <StyledSpan>
            <H6 use="headline6">Reserwations without guide</H6>
          </StyledSpan>

          {data.reservations.map((reservation) => (
            <ReservationCard reservation={reservation} key={reservation.id} />
          ))}
        </StyledContainer>
      </>
    );
  }
};

const StyledSpan = styled.span`
  margin: 20px auto 20px auto;
`;
export default EmptyReservationsList;
