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
    dayInThePast,
  } = props;
  // if there is only one reservation at the day, different than DAY reservation
  if (reservation.length === 1) {
    const { time, userName, userEmail, id } = reservation[0];
    let booking = handleBooking;
    let rippleDisabled = false;
    if (time === 'DAY') {
      booking = null;
      rippleDisabled = true;
    }
    return (
      // if there is 1 reservations at the day
      //<Ripple disabled={rippleDisabled}>
      <DaySpanStyled
        className={`active ${time} ${dayInThePast}`}
        onClick={() => booking(dayOfMonth)}
      >
        <DayNr dayOfMonth={dayOfMonth} highlight={highlight} />
        <Entry
          time={time}
          userName={userName}
          userEmail={userEmail}
          id={id}
          currentUserPermission={currentUserPermission}
        />
      </DaySpanStyled>
      //</Ripple>
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
      <DaySpanStyled
        className={`active ${dayInThePast}`}
        onClick={() => handleBooking(dayOfMonth)}
      >
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
  //background: red;
  grid-template-areas:
    'dayNr '
    'bookingAM '
    'bookingPM ';
  .highlight {
    color: red;
  }
  &.active:not(.DAY, .dayInThePast):hover {
    background: rgba(21, 21, 21, 0.02);
    border-radius: 5px;
    /*
    animation-name: hoverMe;
    animation-duration: 2s;
    @keyframes hoverMe {
      0% {
        background-color: white;
      }
      100% {
        background-color: rgba(21, 21, 21, 0.02);
      }
    }
    */
  }
  &.active:not(.DAY, .dayInThePast):active {
    background: radial-gradient(rgba(21, 21, 21, 0.04), white);

    border-radius: 5px;
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
    height: 84px;
  }
`;
const StyledRipple = styled.span``;

export default DaySpan;
/*
  <span className='Span__Linie__Top' / >
   .Span__Linie__Top {
    border-top: 1px solid #78909c;
  }
  */
