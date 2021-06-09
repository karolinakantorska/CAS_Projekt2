import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
//Components
import LoadingBar from '../reusable/LoadingBar';
import ErrorGraphql from '../reusable/ErrorGraphql';
//Utils
import { useCurrentUser } from '../../apollo/querries/useCurrentUser';
import { noUser} from '../../lib/utils';
// Components for Styling
import {
  StyledContainer,
  StyledSpan,
} from '../../styles/StyledContainer';
import { H6} from '../../styles/Text';
const CalendarDescrption = ({ guideId, trip}) => {
  const {
    loading: loadingCurrentUser,
    error: errorCurrentUser,
    data: dataCurrentUser,
  } = useCurrentUser();
  if (loadingCurrentUser) {
    return <LoadingBar />;
  }
  if (errorCurrentUser) {
    return (
      <StyledContainer>
        {errorCurrentUser && <ErrorGraphql error={errorCurrentUser} />}
      </StyledContainer>
    );
  }
  if (dataCurrentUser) {
    const currentUser = dataCurrentUser.currentUser
      ? dataCurrentUser.currentUser
      : noUser;
    return (
      <StyledSpan>
        {currentUser.id === guideId ? (
          <H6 use="headline6">Check your work shedule or book a holiday.</H6>
        ) : trip.id === '0' ? (
          <H6 use="headline6">Book yourself a guide.</H6>
        ) : (
          <H6 use="headline6">Book yourself a {trip.title} trip.</H6>
        )}
      </StyledSpan>
    );
  }
};
export default CalendarDescrption;
