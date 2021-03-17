import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';
// Components

import Loading from '../reusable/LoadingBar';
import ErrorGraphql from '../reusable/ErrorGraphql';
// Utils
import { currentDate, weekDaysEN } from '../../lib/utilsCalendar';
import { useCurrentUser } from '../../apollo/querries/useCurrentUser';

const BookedTrips = ({userId})=>{

    return (
      <p>My Trips {userId}</p>
    );

};
BookedTrips.propTypes = {
  userId: PropTypes.string,
};

export default BookedTrips;
