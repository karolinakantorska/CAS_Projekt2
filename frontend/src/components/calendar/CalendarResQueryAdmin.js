import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

// Components
import Calendar from './Calendar';
import Loading from '../reusable/LoadingBar';
import ErrorGraphql from '../reusable/ErrorGraphql';
// Utils
import { permission } from '../../lib/utils';
import { useCalendar, reservationsData } from '../../lib/utilsCalendar';
import { useGuidesInput } from '../../lib/utilsForm';
import { useAllUsersWithPermission } from '../../apollo/querries/useAllUsersWithPermission';

import { useGuideMonthReservations } from '../../apollo/querries/useGuideMonthReservations';
import { useManyGuidesMonthReservations } from '../../apollo/querries/useManyGuidesMonthReservations';
import { Select } from '@rmwc/select';

const CalendarResQuery = ({ guideId }) => {
  const { guides, handleChangeGuide1, handleChangeGuide2 } = useGuidesInput({
    guide1: { id: '0', name: 'Guide 1' },
    guide2: { id: '0', name: 'Guide 2' },
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
    emptyCells,
    daysInMonthArray,
    selectedDateTimestamp,
  } = useCalendar();
  const [
    monthReservationsLazyQuery,
    { loading, error, data, refetch },
  ] = useManyGuidesMonthReservations();
  useEffect(() => {
    console.log('go', selectedMonth);
    monthReservationsLazyQuery({
      variables: {
        year: selectedYear,
        month: selectedMonth,
        id1: guides.guide1.id,
        id2: guides.guide2.id,
        id3: '0',
      },
    });
  }, [guides, selectedMonth]);
  useEffect(() => {
    if (data) {
      setReservations(reservationsData(data.days, guides.guide1.id, guides.guide2.id));
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
        <Select
          disabled={false}
          onChange={handleChangeGuide1}
          label="Guide 1"
          placeholder={guides.guide1.name}
        >
          {dataGuides.users.map((user) => (
            <option value={`${user.id} ${user.name}`}>{user.name}</option>
          ))}
        </Select>
        <Select
          disabled={false}
          onChange={handleChangeGuide2}
          label="Guide 2"
          placeholder={guides.guide2.name}
        >
          {dataGuides.users.map((user) => (
            <option value={`${user.id} ${user.name}`}>{user.name}</option>
          ))}
        </Select>
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
        )
      </>
    );
  }
};
CalendarResQuery.propTypes = {
  guideId: PropTypes.string,
};

export default CalendarResQuery;
