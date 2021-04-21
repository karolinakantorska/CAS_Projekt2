import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
//Components
import Nav from '../main/Nav';
import Loading from '../reusable/LoadingBar';
import ErrorGraphql from '../reusable/ErrorGraphql';
import ReservationCard from './ReservationCard';

//Utils
import { useReservationsWithoutGuide } from '../../apollo/querries/useReservationsWithoutGuide';
// Components for Styling
import { H6, TextGrayDense } from '../styles/Text';
import { StyledContainer, StyledCardsContainer } from '../styles/StyledContainer';

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
      <>
        <Nav />
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
export default EmptyReservations;
