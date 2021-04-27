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
  trip,
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
    if (dayInThePast || dayTooMuchInFuture) {
      return;
    } else {
      routeToBookingConfirmation(
        dayOfMonth,
        selectedMonth,
        selectedYear,
        guideId,
        trip.id,
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
        {time !== 'DAY' && !trip.wholeDay && (
          <StyledBookingSpan
            className={
              (dayInThePast || dayTooMuchInFuture || guideId === '0') && 'dayInThePast'
            }
            onClick={() => handleBooking(time)}
          >
            <DayNr dayOfMonth={dayOfMonth} highlight={highlight} />
          </StyledBookingSpan>
        )}
      </DaySpanStyled>
    );
  }
  // if there are no reservations at the day
  else if (reservation.length === 0) {
    const time = '';
    return (
      <DaySpanStyled>
        <StyledBookingSpanDay
          className={
            (dayInThePast || dayTooMuchInFuture || guideId === '0') && 'dayInThePast'
          }
          onClick={() => handleBooking(time)}
        >
          <DayNr dayOfMonth={dayOfMonth} highlight={highlight} />
        </StyledBookingSpanDay>
      </DaySpanStyled>
    );
  }
  // if there are 2 or more reservations at the day
  else {
    return (
      <DaySpanStyled>
        <DayNr dayOfMonth={dayOfMonth} highlight={highlight} />
        <span>
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
        </span>
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
  grid-template-areas:
    'dayNr '
    'bookingAM '
    'bookingPM ';
  .highlight {
    color: red;
  }
  .AM {
    grid-area: bookingAM;
    align-self: start;
    //max-height: 44px;
  }
  .PM {
    grid-area: bookingPM;
    //height: 44px;
    align-self: end;
  }
  .DAY {
    height: 94px;
  }
`;
const StyledBookingSpanDay = styled.span`
  //height: 94px;
  &:not(.dayInThePast):hover {
    height: 94px;
    margin-top: 6px;
    border-radius: 5px;
    transition: 0.2s;
    background-color: rgba(21, 21, 21, 0.3);
  }
  &:not(.dayInThePast) {
    height: 94px;
    cursor: pointer;
    border-radius: 5px;
    background-color: rgba(0, 255, 0, 0.15);

    //background-color: rgba(0, 255, 0, 0.06);
  }
`;
const StyledBookingSpan = styled.span`
  &:not(.dayInThePast):hover {
    height: 44px;
    margin-top: 6px;
    border-radius: 5px;
    transition: 0.2s;
    background-color: rgba(21, 21, 21, 0.03);
  }
  &:not(.dayInThePast) {
    height: 34px;
    cursor: pointer;
    border-radius: 5px;
    background-color: rgba(0, 255, 0, 0.15);
    //background-color: rgba(21, 21, 21, 0.03);
  }
`;

export default DaySpan;
