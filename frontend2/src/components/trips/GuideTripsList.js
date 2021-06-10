import React from 'react';
import PropTypes from 'prop-types';
// Components
import ErrorGraphql from '../reusable/ErrorGraphql';
import LoadingBar from '../reusable/LoadingBar';
import TripList from './TripList';
// Utils
import { useGuide } from '../../apollo/querries/useGuide';
import { useCurrentUser } from '../../apollo/querries/useCurrentUser';
import { useTripsFromGuide } from '../../apollo/querries/useTripsFromGuide';
import { useHydratationFix } from '../../lib/useHydratationFix';
import { noUser } from '../../lib/utils';
// Components for Styling
import {
  StyledContainer,
  StyledSpan,
  StyledCardsContainer,
} from '../../styles/StyledContainer';
import { H6 } from '../../styles/Text';

const GuideTripsList = ({ guideId }) => {
  const { loading, error, data } = useTripsFromGuide(guideId);
  const { loading: loadingGuide, error: errorGuide, data: dataGuide } = useGuide(guideId);
  const {
    loading: loadingCurrentUser,
    error: errorCurrentUser,
    data: dataCurrentUser,
  } = useCurrentUser();
  const hasMounted = useHydratationFix();
  if (!hasMounted) {
    return null;
  }
    if (loadingCurrentUser || loadingGuide|| loading) {
      return <LoadingBar />;
    }
  if (errorCurrentUser||error||errorGuide) {
    return (
      <StyledContainer>
        {errorCurrentUser && <ErrorGraphql error={errorCurrentUser} />}
        {error && <ErrorGraphql error={error} />}
      </StyledContainer>
    );
  }
  if (dataCurrentUser&&data&&dataGuide) {
    const currentUser = dataCurrentUser.currentUser
      ? dataCurrentUser.currentUser
      : noUser;
  return (
    <StyledContainer>
      <StyledSpan>
        {dataGuide && <H6 use="headline6">Trips from: {dataGuide.user.name}</H6>}
      </StyledSpan>
      {loading && <LoadingBar />}
      <TripList data={data.trips} dataUser={currentUser} />
    </StyledContainer>
  );
      }
}
GuideTripsList.propTypes = {
  guideId: PropTypes.string.isRequired,
};
export default GuideTripsList;
