import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// Components
import Nav from '../main/Nav';
import ErrorGraphql from '../reusable/ErrorGraphql';
import Loading from '../reusable/LoadingBar';

import TripCard from '../trips/TripCard';

// Utils
import { useCurrentUser } from '../../apollo/querries/useCurrentUser';
import { useTripsFromGuide } from '../../apollo/querries/useTrips';

// Components for Styling
import { StyledContainer, StyledCardsContainer } from '../styles/StyledContainer';
import { H6, TextGrayDense } from '../styles/Text';

const AddInfo = ({ guideId }) => {
  const { loading, error, data } = useTripsFromGuide(guideId);
  const {
    loading: loadingCurrentUser,
    error: errorCurrentUser,
    data: dataCurrentUser,
  } = useCurrentUser();
  if (loadingCurrentUser || loading) {
    return <Loading />;
  }
  if (errorCurrentUser || error) {
    return <ErrorGraphql error={errorCurrentUser || error} />;
  }
  if (dataCurrentUser && data) {
    return (
      <>
        <Nav />
        <StyledContainer>
          <StyledCardsContainer>
            {data.trips.map((trip) => (
              <TripCard
                key={trip.id}
                tripId={trip.id}
                currentUserPermission={dataCurrentUser.currentUser.permissions}
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
const StyledSpan = styled.span`
  margin: 50px auto 0px auto;
`;
AddInfo.propTypes = {
  guideId: PropTypes.string.isRequired,
};
export default AddInfo;
