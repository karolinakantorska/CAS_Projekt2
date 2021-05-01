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
import { useTripsFromGuide } from '../../apollo/querries/useTripsFromGuide';
// Components for Styling
import { StyledContainer, StyledCardsContainer } from '../styles/StyledContainer';
import { H6, TextGrayDense } from '../styles/Text';

const TripList = ({ guideId }) => {
  const { loading, error, data } = useTripsFromGuide(guideId);
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
        {/*<Nav />*/}
        <StyledContainer>
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

TripList.propTypes = {
  guideId: PropTypes.string.isRequired,
};
export default TripList;
