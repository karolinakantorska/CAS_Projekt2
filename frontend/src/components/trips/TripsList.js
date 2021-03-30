import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// Components
import ErrorGraphql from '../reusable/ErrorGraphql';
import ErrorMessage from '../reusable/ErrorMessage';
import Loading from '../reusable/LoadingBar';
import ButtonMain from '../reusable/ButtonMain';
import GuideAvatar from '../reusable/GuideAvatar';
import TripCard from '../trips/TripCard';

import { trips } from '../../lib/trip';
// Utils
import { useCurrentUser } from '../../apollo/querries/useCurrentUser';
import { useTripsFromGuide } from '../../apollo/querries/useTrips';

// Components for Styling
import { StyledContainer } from '../styles/StyledContainer';
import { StyledTextTitle5 } from '../styles/StyledText';
// TODO put this element to styles
import { StyledCardsContainer } from '../guide/GuidesList';

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
            <StyledTextTitle5>Trips added by:</StyledTextTitle5>
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
