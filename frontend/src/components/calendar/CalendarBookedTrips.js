import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// Components
import Nav from '../main/Nav';
import Calendar from './Calendar';
import LoadingBar from '../reusable/LoadingBar';
import ErrorGraphql from '../reusable/ErrorGraphql';
// Utils
import { useUsersMonthReservations } from '../../apollo/querries/useUsersMonthReservations';
import { useCalendar, filterUserReservationsData } from '../../lib/utilsCalendar';
import { noTripChoosen } from '../../apollo/querries/useTripsToFindOneTrip';

import { StyledContainer } from '../styles/StyledContainer';

const CalendarBookedTrips = ({ gastId }) => {
  const {
    handleMonthChange,
    selectedYear,
    selectedMonth,
    emptyCells,
    daysInMonthArray,
    selectedDateTimestamp,
  } = useCalendar();
  const { loading, error, data, refetch } = useUsersMonthReservations(
    selectedYear,
    selectedMonth,
    gastId,
  );
  const trip = noTripChoosen;
  useEffect(() => {
    refetch();
  }, [selectedMonth]);
  if (loading) {
    return <LoadingBar />;
  }
  if (error) {
    return (
      <StyledContainer>
        {errorCurrentUser && <ErrorGraphql error={errorCurrentUser} />}
      </StyledContainer>
    );
  }
  if (data) {
    const reservations = filterUserReservationsData(data.days, gastId);
    return (
      <>
        <Calendar
          handleMonthChange={handleMonthChange}
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          emptyCells={emptyCells}
          daysInMonthArray={daysInMonthArray}
          selectedDateTimestamp={selectedDateTimestamp}
          guideId="0"
          reservations={reservations}
          trip={trip}
        />
      </>
    );
  }
};
CalendarBookedTrips.propTypes = {
  gastId: PropTypes.string,
};

export default CalendarBookedTrips;
