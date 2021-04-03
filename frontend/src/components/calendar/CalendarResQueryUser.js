import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

// Components
import Calendar from './Calendar';
import Loading from '../reusable/LoadingBar';
import ErrorGraphql from '../reusable/ErrorGraphql';
// Utils
import { useCalendar, filterReservationsData } from '../../lib/utilsCalendar';

import { useGuideMonthReservations } from '../../apollo/querries/useGuideMonthReservations';

const CalendarResQueryUser = ({ guideId }) => {
  const {
    handleMonthChange,
    selectedYear,
    selectedMonth,
    emptyCells,
    daysInMonthArray,
    selectedDateTimestamp,
  } = useCalendar();
  const { loading, error, data, refetch } = useGuideMonthReservations(
    selectedYear,
    selectedMonth,
    guideId,
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
    const reservations = filterReservationsData(data.days, guideId);
    //console.log('reservations', reservations);
    return (
      <Calendar
        handleMonthChange={handleMonthChange}
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        emptyCells={emptyCells}
        daysInMonthArray={daysInMonthArray}
        selectedDateTimestamp={selectedDateTimestamp}
        guideId={guideId}
        reservations={reservations}
      />
    );
  }
};
CalendarResQueryUser.propTypes = {
  guideId: PropTypes.string,
};

export default CalendarResQueryUser;
