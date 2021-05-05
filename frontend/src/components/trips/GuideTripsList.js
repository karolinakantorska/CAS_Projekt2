import React from 'react';
import PropTypes from 'prop-types';
// Components
import ErrorGraphql from '../reusable/ErrorGraphql';
import LoadingBar from '../reusable/LoadingBar';
import TripList from './TripList';
// Utils
import { useCurrentUser } from '../../apollo/querries/useCurrentUser';
import { useTripsFromGuide } from '../../apollo/querries/useTripsFromGuide';
import { useHydratationFix } from '../../lib/utils';
// Components for Styling
import {
  StyledContainer,
  StyledSpan,
  StyledCardsContainer,
} from '../styles/StyledContainer';
import { H6 } from '../styles/Text';

const GuideTripsList = ({ guideId }) => {
  const { loading, error, data } = useTripsFromGuide(guideId);
  const {
    loading: loadingCurrentUser,
    error: errorCurrentUser,
    data: dataCurrentUser,
  } = useCurrentUser();
  const hasMounted = useHydratationFix();
  if (!hasMounted) {
    return null;
  }
  return (
    <StyledContainer>
      <StyledSpan>
        <H6 use="headline6">Trips from: {guideId}</H6>
      </StyledSpan>
      {loading && <LoadingBar />}
      {error && <ErrorGraphql error={error} />}
      {errorCurrentUser && <ErrorGraphql error={errorCurrentUser} />}
      {data && dataCurrentUser && (
        <TripList data={data.trips} dataUser={dataCurrentUser} />
      )}
    </StyledContainer>
  );
};

GuideTripsList.propTypes = {
  guideId: PropTypes.string.isRequired,
};
export default GuideTripsList;
