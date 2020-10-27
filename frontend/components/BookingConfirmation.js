import React, { useState, useEffect } from 'react';

const BookingConfirmation = (props) => {
  console.log('props: ', props);
  console.log('props.query: ', props.props.query);
  const {
    guideId,
    name,
    email,
    year,
    month,
    day,
  } = props.props.query;
  return (
    <section>
      <p>confirm booking</p>
      <p>guideId: {guideId}</p>
      <p>name: {name}</p>
      <p>email: {email}</p>
      <p>year: {year}</p>
      <p>month: {month}</p>
      <p>day: {day}</p>
    </section>
  );
};

export default BookingConfirmation;
