import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
// Components
import Calendar from './Calendar';
import LoadingBar from '../reusable/LoadingBar';
import ErrorGraphql from '../reusable/ErrorGraphql';
// Utils
import { noTripChoosen } from '../../lib/utils';
import { useCalendar, filterReservationsData } from '../../lib/utilsCalendar';
import { useCurrentUser } from '../../apollo/querries/useCurrentUser';
import { useTripsToFindOneTrip } from '../../apollo/querries/useTripsToFindOneTrip';
import { useGuideMonthReservations } from '../../apollo/querries/useGuideMonthReservations';
// Components for Styling
import {
  StyledContainer,
} from '../../styles/StyledContainer';
import CalendarDescrption from './CalendarDescrption';

const CalendarResQueryUser = ({ guideId, tripId }) => {
  const {
    handleMonthChange,
    selectedYear,
    selectedMonth,
    nrOfMonth,
    emptyCells,
    daysInMonthArray,
  } = useCalendar();
      const {
        loading: loadingCurrentUser,
        error: errorCurrentUser,
        data: dataCurrentUser,
      } = useCurrentUser();
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
    return ()=>refetch();
  }, [selectedMonth]);

  if (loading || loadingTrip || loadingCurrentUser) {
    return <LoadingBar />;
  }
  if (error || errorTrip || errorCurrentUser) {
    return (
      <StyledContainer>
        {errorTrip && <ErrorGraphql error={errorTrip} />}
        {error && <ErrorGraphql error={error} />}
        {errorCurrentUser && <ErrorGraphql error={errorCurrentUser} />}
      </StyledContainer>
    );
  }
  if (data && dataTrip && dataCurrentUser) {
    const reservations = filterReservationsData(data.days, guideId);
            const trip = dataTrip.trips[0] ? dataTrip.trips[0] : noTripChoosen;
    return (
      <StyledContainer>
        <CalendarDescrption guideId={guideId} currentUser={dataCurrentUser.currentUser} trip={trip} />
        <Calendar
          handleMonthChange={handleMonthChange}
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          nrOfMonth={nrOfMonth}
          emptyCells={emptyCells}
          daysInMonthArray={daysInMonthArray}
          guideId={guideId}
          trip={trip}
          reservations={reservations}
        />
      </StyledContainer>
    );
  }
};
CalendarResQueryUser.propTypes = {
  guideId: PropTypes.string,
};

export default CalendarResQueryUser;
