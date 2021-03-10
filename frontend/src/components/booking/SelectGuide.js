import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useGuideWithoutReservation } from '../../apollo/querries/useGuidesWithoutReservation';
import Loading from '../reusable/LoadingBar';
import ErrorGraphql from '../reusable/ErrorGraphql';
// Components for Styling
import { Select } from '@rmwc/select';

const SelectGuide = ({ id }) => {
  const { loading, error, data } = useGuideWithoutReservation(id);
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorGraphql error={error} />;
  }
  if (data) {
    console.log(data);
    return (
      <Select
        disabled={false}
        //onChange={handleChangeGuide1}
        label="Guide 1"
        //placeholder={guides.guide1.name}
      >
        {data.users.map((user) => (
          <option value={`${user.id} ${user.name}`}>{user.name}</option>
        ))}
      </Select>
    );
  }
};

export default SelectGuide;
