import React from 'react';
import PropTypes from 'prop-types';
//Components
import { ButtonMain, ButtonLink, StyledTextMain } from '../reusable/Buttons';
import LoadingBar from '../reusable/LoadingBar';
import ErrorGraphql from '../reusable/ErrorGraphql';
//Utils
import { useCurrentUser } from '../../apollo/querries/useCurrentUser';
import { timeToString } from '../../lib/utilsBooking';
import { routeToGuidesList, routeToTripDetails } from '../../lib/utilsRouts';
import { useTripsToFindOneTrip } from '../../apollo/querries/useTripsToFindOneTrip';
// Components for Styling
import {
  StyledContainer,
  StyledSpan,
  StyledCardsContainer,
} from '../../styles/StyledContainer';
import { H6, TextGrayDense } from '../../styles/Text';
const CalendarDescrption = ({ guideId, tripId }) => {
  const {
    loading: loadingCurrentUser,
    error: errorCurrentUser,
    data: dataCurrentUser,
  } = useCurrentUser();
  const {
    loading: loadingTrip,
    error: errorTrip,
    data: dataTrip,
  } = useTripsToFindOneTrip(tripId);
  if (loadingCurrentUser || loadingCurrentUser || loadingTrip) {
    return <LoadingBar />;
  }
  if (errorCurrentUser || errorCurrentUser || errorTrip) {
    return (
      <StyledContainer>
        {errorCurrentUser && <ErrorGraphql error={errorCurrentUser} />}
      </StyledContainer>
    );
  }
  if (dataCurrentUser && dataCurrentUser && dataTrip) {
    return (
      <StyledSpan>
        {dataCurrentUser.currentUser.id === guideId ? (
          <H6 use="headline6">Check your work shedule or book a holiday.</H6>
        ) : tripId === '0' ? (
          <H6 use="headline6">Book yourself a guide.</H6>
        ) : (
          <H6 use="headline6">Book yourself a {dataTrip.trips[0].title} trip.</H6>
        )}
      </StyledSpan>
    );
  }
};
CalendarDescrption.propTypes = {
  reservation: PropTypes.object,
  currentUser: PropTypes.object,
  handleConfirm: PropTypes.func,
};

export default CalendarDescrption;
