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
  grid-template-rows: 10px 45px 45px;
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
    height: 43px;
  }
  .PM {
    grid-area: bookingPM;
    height: 43px;
    align-self: flex-end;
  }
  .DAY {
    height: 90px;
  }
`;

export default DaySpan;
/*
  <span className='Span__Linie__Top' / >
   .Span__Linie__Top {
    border-top: 1px solid #78909c;
  }
  */
