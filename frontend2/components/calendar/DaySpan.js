import React from 'react';
import PropTypes from 'prop-types';
// Components
import DayNr from './DayNr';
import Entry from './Entry';
// Utils
import { routeToBookingConfirmation } from '../../lib/utilsRouts';
// Styled
import {DaySpanStyled,
StyledBookingSpanDay,
StyledBookingSpan} from '../../styles/StyledDaySpan'

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
  timeStamp,
  //selectedDateTimestamp,
}) => {
  //console.log('timeStamp', timeStamp);
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
        // nrOfMonth,
        timeStamp,
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
          ></StyledBookingSpan>
        )}
      </DaySpanStyled>
    );
  }
  // if there are no reservations at the day
  else if (reservation.length === 0) {
    const time = '';
    return (
      <DaySpanStyled>
        <DayNr dayOfMonth={dayOfMonth} highlight={highlight} />
        <StyledBookingSpanDay
          className={
            (dayInThePast || dayTooMuchInFuture || guideId === '0') && 'dayInThePast'
          }
          onClick={() => handleBooking(time)}
        ></StyledBookingSpanDay>
      </DaySpanStyled>
    );
  }
  // if there are 2 or more reservations at the day
  else if (reservation.length === 2) {
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
  } else {
    return (
      <DaySpanStyled>
        <DayNr dayOfMonth={dayOfMonth} highlight={highlight} />
        <span>
          {reservation.map((res) => {
            return <p>Too many res {res.time}</p>;
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


export default DaySpan;
