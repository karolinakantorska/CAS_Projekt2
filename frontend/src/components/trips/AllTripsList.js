import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// Components
import Nav from '../main/Nav';
import ErrorGraphql from '../reusable/ErrorGraphql';
import LoadingBar from '../reusable/LoadingBar';
import TripCard from '../trips/TripCard';
// Utils
import { useCurrentUser } from '../../apollo/querries/useCurrentUser';
import { useTrips } from '../../apollo/querries/useTrips';
// Components for Styling
import {
  StyledContainer,
  StyledSpan,
  StyledCardsContainer,
} from '../styles/StyledContainer';
import { H6, TextGrayDense } from '../styles/Text';

const AllTripsList = () => {
  const { loading, error, data } = useTrips();
  const {
    loading: loadingCurrentUser,
    error: errorCurrentUser,
    data: dataCurrentUser,
  } = useCurrentUser();
  if (loadingCurrentUser || loading) {
    return <LoadingBar />;
  }
  if (errorCurrentUser || error) {
    return <ErrorGraphql error={errorCurrentUser || error} />;
  }
  if (dataCurrentUser && data) {
    return (
      <>
        <Nav />
        <StyledContainer>
          <StyledSpan>
            <H6 use="headline6">Trips offered by our MTB Guides:</H6>
          </StyledSpan>
          <StyledCardsContainer>
            {data.trips.map((trip) => (
              <TripCard
                key={trip.id}
                tripId={trip.id}
                currentUser={dataCurrentUser.currentUser}
              >
                trip
              </TripCard>
            ))}
          </StyledCardsContainer>
        </StyledContainer>
      </>
    );
  }
};

export default AllTripsList;
