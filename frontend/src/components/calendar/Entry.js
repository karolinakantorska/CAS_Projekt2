import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { permission } from '../../lib/utils';
import { routeToEditEntry } from '../../lib/utilsRouts';
// Components for Styling
import { StyledTextBody2 } from '../styles/StyledText';

const Entry = ({ reservation, currentUser }) => {
  function handleEntrySpanClick() {
    routeToEditEntry(reservation.id);
  }
  if (currentUser.permissions === permission.user) {
    return (
      <EntrySpan className={reservation.time}>
        {/* TODO Ids would be better*/}
        {reservation.userEmail === currentUser.email ? (
          <span className="your_booking">Your booking!</span>
        ) : (
          <span>Booked!</span>
        )}
      </EntrySpan>
    );
  }
  if (currentUser.permissions === permission.admin) {
    return (
      <EntrySpan className={reservation.time} onClick={() => handleEntrySpanClick()}>
        <StyledTextBody2>{`Gast: ${reservation.userName}`}</StyledTextBody2>
        <StyledTextBody2>{`Guide: ${reservation.guide.name}`}</StyledTextBody2>
      </EntrySpan>
    );
  }
  if (currentUser.permissions === permission.guide) {
    return (
      <EntrySpan className={reservation.time} onClick={() => handleEntrySpanClick()}>
        {/* TODO Ids would be better*/}
        {reservation.userEmail === reservation.guide.email ? (
          <StyledTextBody2 className="holiday">Free!</StyledTextBody2>
        ) : (
          <StyledTextBody2>{`Gast: ${reservation.userName}`}</StyledTextBody2>
        )}
      </EntrySpan>
    );
  } else {
    return <p>booked</p>;
  }
};
Entry.propTypes = {
  reservation: PropTypes.object,
  currentUser: PropTypes.object,
};
const EntrySpan = styled.span`
  display: grid;
  //grid-template-rows: 1fr 1fr;
  max-width: 138px;
  font-size: 0.9rem;
  margin-top: 6px;
  border-radius: 5px;
  background: rgba(217, 217, 217, 0.5);
  align-content: center;
  justify-content: center;
  .holiday {
    color: red;
  }
  .your_booking {
    color: red;
  }
  .AM::before {
    content: 'AM: ';
  }
  .PM::before {
    content: 'PM: ';
  }
  .DAY::before {
    content: 'DAY: ';
  }
`;

export default Entry;
