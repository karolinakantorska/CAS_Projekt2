import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// Components
import Calendar from './Calendar';
import LoadingBar from '../reusable/LoadingBar';
import ErrorGraphql from '../reusable/ErrorGraphql';
// Utils
import { permission } from '../../lib/utils';
import { useCalendar, filterReservationsData } from '../../lib/utilsCalendar';
import { useFormInput } from '../../lib/utilsForm';
import { useAllUsersWithPermission } from '../../apollo/querries/useAllUsersWithPermission';
import { noTripChoosen } from '../../apollo/querries/useTripsToFindOneTrip';
import { useLazyGuideMonthReservations } from '../../apollo/querries/useLazyGuideMonthReservations';
import { Select } from '@rmwc/select';
//Styles
import { StyledContainer, StyledSpanLong } from '../../styles/StyledContainer';

const CalendarResQueryAdmin = ({ guideId }) => {
  const { value, handleChange } = useFormInput('0');
  const [reservations, setReservations] = useState({});
  
  const {
    loading: loadingGuides,
    error: errorGuides,
    data: dataGuides,
  } = useAllUsersWithPermission(permission.guide);
  
  const trip = noTripChoosen;
  const {
    handleMonthChange,
    selectedYear,
    selectedMonth,
    nrOfMonth,
    emptyCells,
    daysInMonthArray,
    selectedDateTimestamp,
  } = useCalendar();
  const [
    monthReservationsLazyQuery,
    { loading, error, data, refetch },
  ] = useLazyGuideMonthReservations();

  useEffect(() => {
    if (value !== '0'){
    monthReservationsLazyQuery({
      variables: {
        year: selectedYear,
        month: selectedMonth,
        id: value,
      },
    });
    }
  }, [value, selectedMonth]);
  
  useEffect(() => {
    if (data) {
      setReservations(filterReservationsData(data.days, value));
    }
  }, [data]);
  return (
    <StyledContainer>
      <StyledSpanLong>
        <Select
          disabled={false}
          onChange={handleChange}
          label="Guide:"
          placeholder="select Guide:"
        >
          {dataGuides &&
            dataGuides.users.map((user) => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
        </Select>
        {loadingGuides && <LoadingBar />}
        {loading && <LoadingBar />}
        {errorGuides && <ErrorGraphql error={errorGuides} />}
        {error && <ErrorGraphql error={error} />}
      </StyledSpanLong>
      <Calendar
        handleMonthChange={handleMonthChange}
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        nrOfMonth={nrOfMonth}
        emptyCells={emptyCells}
        daysInMonthArray={daysInMonthArray}
        selectedDateTimestamp={selectedDateTimestamp}
        guideId={guideId}
        reservations={reservations}
        trip={trip}
      />
      )
    </StyledContainer>
  );
};
CalendarResQueryAdmin.propTypes = {
  guideId: PropTypes.string,
};

export default CalendarResQueryAdmin;
