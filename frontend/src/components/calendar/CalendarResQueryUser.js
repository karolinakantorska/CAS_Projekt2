import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

// Components
import Calendar from './Calendar';
import Loading from '../reusable/LoadingBar';
import ErrorGraphql from '../reusable/ErrorGraphql';
// Utils
import { permission } from '../../lib/utils';
import {
  useCalendar,
  reservationsDataToArray,
  reservationsData,
} from '../../lib/utilsCalendar';
import { useAllUsersWithPermission } from '../../apollo/querries/useAllUsersWithPermission';

import { useGuideMonthReservations } from '../../apollo/querries/useGuideMonthReservations';

const CalendarResQueryUser = ({ guideId }) => {
  const {
    loading: loadingGuides,
    error: errorGuides,
    data: dataGuides,
  } = useAllUsersWithPermission(permission.guide);
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
  if (loading || loadingGuides) {
    return <Loading />;
  }
  if (error || errorGuides) {
    return (
      <StyledContainer>
        {errorCurrentUser && <ErrorGraphql error={errorCurrentUser} />}
      </StyledContainer>
    );
  }
  if (data && dataGuides) {
    const reservations = reservationsData(data.days, guideId);
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
