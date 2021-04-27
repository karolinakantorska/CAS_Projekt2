import React from 'react';
// Components
import ErrorGraphql from '../reusable/ErrorGraphql';
import LoadingBar from '../reusable/LoadingBar';
// Utils
import { useAllUsersWithPermission } from '../../apollo/querries/useAllUsersWithPermission';
import { permission } from '../../lib/utils';
// Components for Styling
import { Select } from '@rmwc/select';

const SelectGuide = ({ handleGuideChange }) => {
  //console.log('dayId', dayId);
  const { loading, error, data } = useAllUsersWithPermission(permission.guide);
  if (loading) {
    return <LoadingBar />;
  }
  if (error) {
    return <ErrorGraphql error={error} />;
  }
  if (data) {
    return (
      <Select disabled={false} label="Find a free guide: " onChange={handleGuideChange}>
        {data.users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </Select>
    );
  }
};

export default SelectGuide;
