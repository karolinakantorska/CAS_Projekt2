import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// Components
import ErrorGraphql from '../reusable/ErrorGraphql';
import Loading from '../reusable/LoadingBar';
import { ButtonMain } from '../reusable/Buttons';
import GuideAvatar from '../reusable/GuideAvatar';
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

  if (dataCurrentUser || data) {
    //console.log(dataCurrentUser.currentUser.permissions);
    //console.log(data.trips);
    return (
      <>
        <StyledContainer>
          <StyledSpan>
            <H6 use="headline6">Trips added by:</H6>

            <GuideAvatar guideId={guideId} />
          </StyledSpan>
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
  display: grid;
  margin-left: 100px;
  justify-content: start;
`;
AddInfo.propTypes = {
  guideId: PropTypes.string.isRequired,
};
export default AddInfo;
