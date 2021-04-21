import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// Components
import Nav from '../main/Nav';
import Calendar from './Calendar';
import Loading from '../reusable/LoadingBar';
import ErrorGraphql from '../reusable/ErrorGraphql';
// Utils
import { useCalendar, filterReservationsData } from '../../lib/utilsCalendar';

import { useGuideMonthReservations } from '../../apollo/querries/useGuideMonthReservations';

const CalendarResQueryUser = ({ guideId, tripId }) => {
  const {
    handleMonthChange,
    selectedYear,
    selectedMonth,
    nrOfMonth,
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
    const reservations = filterReservationsData(data.days, guideId);
    return (
      <>
        <Nav />
        <Calendar
          handleMonthChange={handleMonthChange}
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          nrOfMonth={nrOfMonth}
          emptyCells={emptyCells}
          daysInMonthArray={daysInMonthArray}
          selectedDateTimestamp={selectedDateTimestamp}
          guideId={guideId}
          tripId={tripId}
          reservations={reservations}
        />
      </>
    );
  }
};
CalendarResQueryUser.propTypes = {
  guideId: PropTypes.string,
};

export default CalendarResQueryUser;
