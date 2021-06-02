import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// Components
import LoadingBar from '../reusable/LoadingBar';
import ErrorGraphql from '../reusable/ErrorGraphql';
import UsersReservationsList from './UserReservarions';
// Utils
import { useReservationsUser } from '../../apollo/querries/useReservationsUser';
import { useCalendar } from '../../lib/utilsCalendar';
import {
  filterReservationsForUser,
  filterReservationsByTimestamp,
} from '../../lib/utilsBooking';

import { useHydratationFix } from '../../lib/useHydratationFix';
import { StyledCardReservation } from '../../styles/StyledCards';
import { H6} from '../../styles/Text';
import { StyledContainer,StyledSpan } from '../../styles/StyledContainer';

const MyBookedTripsList = ({ gastId }) => {
  
  const { selectedDateTimestamp } = useCalendar();
  const { loading, error, data } = useReservationsUser(gastId);
  let filtered = [];
  const hasMounted = useHydratationFix();
  if (!hasMounted) {
    return null;
  }
  if (data) {
    console.log('data',data)
    filtered = filterReservationsForUser(data.days, gastId, selectedDateTimestamp);
    console.log('filtered', filtered);
  }
    return (
      <StyledContainer>
        <StyledSpan>
          <H6 use="headline6">Booked By You:</H6>
          {loading && <LoadingBar />}
          {error && <ErrorGraphql error={error} />}
        </StyledSpan>
          {data &&
            filtered.map((reservation) => (
              <UsersReservationsList
                key={`${reservation.id}`}
                reservation={reservation}
              />
            ))}

      </StyledContainer>
    );
  }

MyBookedTripsList.propTypes = {
  gastId: PropTypes.string,
};

export default MyBookedTripsList;
