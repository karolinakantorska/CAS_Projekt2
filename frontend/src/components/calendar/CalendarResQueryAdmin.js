import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// Components
import Nav from '../main/Nav';
import Calendar from './Calendar';
import Loading from '../reusable/LoadingBar';
import ErrorGraphql from '../reusable/ErrorGraphql';
// Utils
import { permission } from '../../lib/utils';
import { useCalendar, filterReservationsData } from '../../lib/utilsCalendar';
import { useFormInput } from '../../lib/utilsForm';
import { useAllUsersWithPermission } from '../../apollo/querries/useAllUsersWithPermission';
import { useLazyGuideMonthReservations } from '../../apollo/querries/useLazyGuideMonthReservations';
import { Select } from '@rmwc/select';

const CalendarResQuery = ({ guideId }) => {
  const { value, handleChange } = useFormInput({
    id: '0',
  });
  const [reservations, setReservations] = useState({});
  const {
    loading: loadingGuides,
    error: errorGuides,
    data: dataGuides,
  } = useAllUsersWithPermission(permission.guide);
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
    monthReservationsLazyQuery({
      variables: {
        year: selectedYear,
        month: selectedMonth,
        id: value,
      },
    });
  }, [value, selectedMonth]);
  useEffect(() => {
    if (data) {
      setReservations(filterReservationsData(data.days, value));
    }
  }, [data]);

  if (loadingGuides || loading) {
    return <Loading />;
  }
  if (errorGuides || error) {
    return (
      <StyledContainer>
        {errorCurrentUser && <ErrorGraphql error={errorCurrentUser} />}
      </StyledContainer>
    );
  }
  if (dataGuides) {
    return (
      <>
        <Nav />
        <Select
          disabled={false}
          onChange={handleChange}
          label="Guide:"
          placeholder="select Guide:"
        >
          {dataGuides.users.map((user) => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </Select>
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
        />
        )
      </>
    );
  }
};
CalendarResQuery.propTypes = {
  guideId: PropTypes.string,
};

export default CalendarResQuery;
