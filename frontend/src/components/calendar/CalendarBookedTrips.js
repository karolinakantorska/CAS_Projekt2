import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

// Components
import Nav from '../main/Nav';
import Calendar from './Calendar';
import Loading from '../reusable/LoadingBar';
import ErrorGraphql from '../reusable/ErrorGraphql';
// Utils
import { useUsersMonthReservations } from '../../apollo/querries/useUsersMonthReservations';
import {
  useCalendar,
  filterReservationsData,
  filterUserReservationsData,
} from '../../lib/utilsCalendar';
import { currentDate, weekDaysEN } from '../../lib/utilsCalendar';
import { useCurrentUser } from '../../apollo/querries/useCurrentUser';

const BookedTrips = ({ gastId }) => {
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

  useEffect(() => {
    refetch();
  }, [selectedMonth]);
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return (
      <StyledContainer>
        {errorCurrentUser && <ErrorGraphql error={errorCurrentUser} />}
      </StyledContainer>
    );
  }
  if (data) {
    //console.log('data.days', data.days);
    const reservations = filterUserReservationsData(data.days, gastId);
    //console.log('reservations', reservations);
    return (
      <>
        <Nav />
        <Calendar
          handleMonthChange={handleMonthChange}
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          emptyCells={emptyCells}
          daysInMonthArray={daysInMonthArray}
          selectedDateTimestamp={selectedDateTimestamp}
          guideId="0"
          reservations={reservations}
        />
      </>
    );
  }
};
BookedTrips.propTypes = {
  gastId: PropTypes.string,
};

export default BookedTrips;
