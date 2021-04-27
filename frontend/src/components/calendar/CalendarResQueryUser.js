import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
// Components
import Nav from '../main/Nav';
import Calendar from './Calendar';
import LoadingBar from '../reusable/LoadingBar';
import ErrorGraphql from '../reusable/ErrorGraphql';
// Utils
import { useCalendar, filterReservationsData } from '../../lib/utilsCalendar';
import { useTripsToFindOneTrip } from '../../apollo/querries/useTripsToFindOneTrip';
import { useGuideMonthReservations } from '../../apollo/querries/useGuideMonthReservations';

import { StyledContainer } from '../styles/StyledContainer';

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
  const {
    loading: loadingTrip,
    error: errorTrip,
    data: dataTrip,
  } = useTripsToFindOneTrip(tripId);
  useEffect(() => {
    refetch();
  }, [selectedMonth]);
  if (loading || loadingTrip) {
    return <LoadingBar />;
  }
  if (error || errorTrip) {
    return (
      <StyledContainer>
        {errorTrip && <ErrorGraphql error={errorTrip} />}
        {error && <ErrorGraphql error={error} />}
      </StyledContainer>
    );
  }
  if (data && dataTrip) {
    const reservations = filterReservationsData(data.days, guideId);
    const trip = dataTrip.trips[0];
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
          trip={trip}
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
