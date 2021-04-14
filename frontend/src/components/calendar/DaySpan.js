import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// Components
import DayNr from './DayNr';
import Entry from './Entry';
// Utils
import { routeToBookingConfirmation } from '../../lib/utilsRouts';

const DaySpan = ({
  reservation,
  guideId,
  dayOfMonth,
  selectedYear,
  selectedMonth,
  nrOfMonth,
  highlight,
  currentUser,
  dayInThePast,
  dayTooMuchInFuture,
}) => {
  function handleBooking(bookedTime) {
    if (guideId === '0') {
      return null;
    }
    if (dayInThePast) {
      alert(`You can't book a day in the past`);
      return;
    }
    if (dayTooMuchInFuture) {
      alert(
        `We are sorry but you don't offer bookings for more than tree months in advance`,
      );
      return;
    } else {
      routeToBookingConfirmation(
        dayOfMonth,
        selectedMonth,
        selectedYear,
        guideId,
        bookedTime,
        nrOfMonth,
      );
    }
  }
  // if there is only one reservation at the day, different than DAY reservation
  if (reservation.length === 1) {
    const time = reservation[0].time;

    return (
      // if there is 1 reservations at the day
      <DaySpanStyled>
        <DayNr dayOfMonth={dayOfMonth} highlight={highlight} />
        <Entry
          reservation={reservation[0]}
          currentUser={currentUser}
          key={reservation[0].id}
        />
        {time !== 'DAY' && (
          <StyledBookingSpan
            className={
              (dayInThePast || dayTooMuchInFuture || guideId === '0') && 'dayInThePast'
            }
            onClick={() => handleBooking(time)}
          ></StyledBookingSpan>
        )}
      </DaySpanStyled>
    );
  }
  // if there are 2 reservations at the day
  else if (reservation.length === 2) {
    return (
      <DaySpanStyled>
        <DayNr dayOfMonth={dayOfMonth} highlight={highlight} />
        {reservation.map((res) => {
          return (
            <Entry
              key={res.time}
              reservation={res}
              currentUser={currentUser}
              key={res.id}
            />
          );
        })}
      </DaySpanStyled>
    );
  }
  // if there are no reservations at the day
  else {
    const time = '';
    return (
      <DaySpanStyled>
        <DayNr dayOfMonth={dayOfMonth} highlight={highlight} />
        <StyledBookingSpanDay
          className={
            (dayInThePast || dayTooMuchInFuture || guideId === '0') && 'dayInThePast'
          }
          onClick={() => handleBooking(time)}
        />
      </DaySpanStyled>
    );
  }
};
DaySpan.propTypes = {
  reservation: PropTypes.array,
  currentUser: PropTypes.object,
  dayOfMonth: PropTypes.string,
  highlight: PropTypes.bool,
  handleBooking: PropTypes.func,
  dayInThePast: PropTypes.bool,
  dayTooMuchInFuture: PropTypes.bool,
};
const DaySpanStyled = styled.span`
  display: grid;
  grid-template-rows: 10px 50px 50px;
  min-height: 110px;
  justify-content: stretch;
  //background: red;
  grid-template-areas:
    'dayNr '
    'bookingAM '
    'bookingPM ';
  .highlight {
    color: red;
  }
  .AM {
    grid-area: bookingAM;
    height: 44px;
  }
  .PM {
    grid-area: bookingPM;
    height: 44px;
    align-self: end;
  }
  .DAY {
    height: 94px;
  }
`;
const StyledBookingSpanDay = styled.span`
  &:not(.dayInThePast):hover {
    height: 94px;
    margin-top: 6px;
    border-radius: 5px;
    transition: 0.2s background-color;
    background-color: rgba(21, 21, 21, 0.06);
`;
const StyledBookingSpan = styled.span`
  &:not(.dayInThePast):hover {
    height: 44px;
    margin-top: 6px;
    border-radius: 5px;
    transition: 0.2s background-color;
    background-color: rgba(21, 21, 21, 0.06);
`;

export default DaySpan;
