import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Components
import DayNr from './DayNr';
import Entry from './Entry';

const DaySpan = ({
  reservation,
  dayOfMonth,
  highlight,
  handleBooking,
  currentUserPermission,
  currentUserName,
  dayInThePast,
}) => {
  // if there is only one reservation at the day, different than DAY reservation
  if (reservation.length === 1) {
    const { time, userName, userEmail, id, guide } = reservation[0];
    console.log(reservation[0]);
    const guideName = guide.name;
    return (
      // if there is 1 reservations at the day
      <DaySpanStyled>
        <DayNr dayOfMonth={dayOfMonth} highlight={highlight} />
        <Entry
          key={time}
          time={time}
          userName={userName}
          userEmail={userEmail}
          id={id}
          currentUserPermission={currentUserPermission}
          currentUserName={currentUserName}
          guideName={guideName}
          key={id}
        />
        {time !== 'DAY' && (
          <StyledBookingSpan
            className={dayInThePast && 'dayInThePast'}
            onClick={() => handleBooking(dayOfMonth, dayInThePast, time, currentUserName)}
          />
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
          const { time, userName, userEmail, id, guide } = res;
          const guideName = guide.name;
          return (
            <Entry
              key={time}
              time={time}
              userName={userName}
              userEmail={userEmail}
              id={id}
              currentUserPermission={currentUserPermission}
              currentUserName={currentUserName}
              guideName={guideName}
              key={id}
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
          className={dayInThePast && 'dayInThePast'}
          onClick={() => handleBooking(dayOfMonth, dayInThePast, time, currentUserName)}
        />
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
  dayInThePast: PropTypes.bool,
};
const DaySpanStyled = styled.span`
  display: grid;
  grid-template-rows: 10px 50px 50px;
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
