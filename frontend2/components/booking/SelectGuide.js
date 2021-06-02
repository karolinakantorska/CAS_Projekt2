import React from 'react';
// Components
import ErrorGraphql from '../reusable/ErrorGraphql';
import LoadingBar from '../reusable/LoadingBar';
// Utils
import { useAllUsersWithPermission } from '../../apollo/querries/useAllUsersWithPermission';
import { useGuideWithReservationForDay } from '../../apollo/querries/useGuidesWithReservationForDay';
import { permission } from '../../lib/utils';
// Components for Styling
import { Select } from '@rmwc/select';

const SelectGuide = ({ handleGuideChange, dayId }) => {
  const { loading, error, data } = useGuideWithReservationForDay(dayId);
  const {
    loading: loadingAll,
    error: errorAll,
    data: dataAll,
  } = useAllUsersWithPermission(permission.guide);

  if (loading || loadingAll) {
    return <LoadingBar />;
  }
  if (error || errorAll) {
    return <ErrorGraphql error={error} />;
  }
  if (data && dataAll) {
    let filtered = [];
    dataAll.users.map((item) => {
      let push = true;
      data.users.map((item2) => {
        if (item.id === item2.id) {
          push = false;
        }
      });
      if (push) {
        filtered.push(item);
      }
    });
    return (
      <Select disabled={false} label="Find a free guide: " onChange={handleGuideChange}>
        {filtered.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </Select>
    );
  }
};

export default SelectGuide;
