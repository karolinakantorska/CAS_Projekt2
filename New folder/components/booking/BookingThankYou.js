import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import User from '../main/User';

const BookingThankYou = (props) => {
  const {
    time,
    day,
    month,
    year,
    guideId,
    guideName,
    guideSurname,
  } = props.props;
  return (
    <User>
      {(currentUserPermission, currentUserName) => (
        <span>
          <p>
            <strong>Hallo: {currentUserName}!</strong>
          </p>
          <p>
            Your,ve just booked MTB Guide: {guideName} {guideSurname}
          </p>
          <p>
            For a {time} trip on: {year}/{month}/{day}
          </p>
          <Link
            href={{
              pathname: '/booking_guide',
              query: {
                guideId,
                guideName,
                guideSurname,
              },
            }}
          ></Link>
          <Link href="/guides">
            <a>Book another MTB Guide</a>
          </Link>
        </span>
      )}
    </User>
  );
};
BookingThankYou.propTypes = {
  time: PropTypes.string,
  day: PropTypes.string,
  month: PropTypes.string,
  year: PropTypes.string,
  guideId: PropTypes.string,
  guideName: PropTypes.string,
  guideSurname: PropTypes.string,
};
export default BookingThankYou;
