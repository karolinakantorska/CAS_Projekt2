import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DayNr from './DayNr';
import Entry from './Entry';

const DaySpan = (props) => {
  const {
    reservation,
    dayOfMonth,
    highlight,
    handleBooking,
    currentUserPermission,
  } = props;
  // if there is only one reservation at the day, different than DAY reservation
  if (reservation.length === 1) {
    const { time, userName, userEmail, id } = reservation[0];
    let booking = handleBooking;
    if (time === 'DAY') {
      booking = null;
    }
    return (
      <DaySpanStyled onClick={booking}>
        <DayNr dayOfMonth={dayOfMonth} highlight={highlight} />
        <Entry
          time={time}
          userName={userName}
          userEmail={userEmail}
          id={id}
          currentUserPermission={currentUserPermission}
        />
      </DaySpanStyled>
    );
  }
  // if there are 2 reservations at the day
  else if (reservation.length === 2) {
    return (
      <DaySpanStyled>
        <DayNr dayOfMonth={dayOfMonth} highlight={highlight} />
        {reservation.map((res) => {
          const { time, userName, userEmail, id } = res;
          return (
            <Entry
              key={time}
              time={time}
              userName={userName}
              userEmail={userEmail}
              id={id}
              currentUserPermission={currentUserPermission}
              key={id}
            />
          );
        })}
      </DaySpanStyled>
    );
  }
  // if there are no reservations at the day
  else {
    return (
      <DaySpanStyled onClick={handleBooking}>
        <DayNr dayOfMonth={dayOfMonth} highlight={highlight} />
      </DaySpanStyled>
    );
  }
};

DaySpan.propTypes = {
  reservation: PropTypes.array,
  dayOfMonth: PropTypes.string,
  highlight: PropTypes.bool,
  handleBooking: PropTypes.func,
  currentUserPermission: PropTypes.string,
};
const DaySpanStyled = styled.span`
  display: grid;
  height: 100px;
  grid-template-rows: 20px 40px 40px;
  justify-content: stretch;
  grid-template-areas:
    'dayNr'
    'bookingAM'
    'bookingPM';
  border-top: 1px solid gray;

  .highlight {
    color: red;
  }
  .AM {
    grid-area: bookingAM;
  }
  .PM {
    grid-area: bookingPM;
    align-self: end;
  }
`;

export default DaySpan;
