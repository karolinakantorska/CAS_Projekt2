import React from 'react';
// Components
import ErrorGraphql from '../reusable/ErrorGraphql';
import LoadingBar from '../reusable/LoadingBar';
import TripList from './TripList';
import { useHydratationFix } from '../../lib/useHydratationFix';
// Utils
import { useCurrentUser } from '../../apollo/querries/useCurrentUser';
import { useTrips } from '../../apollo/querries/useTrips';
import { noUser } from '../../lib/utils';
// Components for Styling
import { StyledContainer, StyledSpan } from '../../styles/StyledContainer';
import { H6 } from '../../styles/Text';

const AllTripsList = () => {
  const { loading, error, data } = useTrips();
  const {
    loading: loadingCurrentUser,
    error: errorCurrentUser,
    data: dataCurrentUser,
  } = useCurrentUser();
  const hasMounted = useHydratationFix();
  if (!hasMounted) {
    return null;
  }
    if (loadingCurrentUser || loading) {
      return <LoadingBar />;
    }
  if (errorCurrentUser|| error) {
    return (
      <StyledContainer>
        {errorCurrentUser && <ErrorGraphql error={errorCurrentUser} />}
        {error && <ErrorGraphql error={error} />}
      </StyledContainer>
    );
  }
  if (dataCurrentUser&&data) {
      const currentUser = dataCurrentUser.currentUser
        ? dataCurrentUser.currentUser
        : noUser;
  return (
    <StyledContainer>
      <StyledSpan>
        <H6 use="headline6">Trips offered by our MTB Guides:</H6>
      </StyledSpan>
      
      <TripList data={data.trips} dataUser={currentUser} />
    </StyledContainer>
  );
      }
};

export default AllTripsList;
