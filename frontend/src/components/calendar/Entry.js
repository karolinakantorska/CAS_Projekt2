import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { permission } from '../../lib/utils';
import { routeToEditEntry } from '../../lib/utilsRouts';
// Components for Styling
import { StyledTextBody2 } from '../styles/StyledText';

const Entry = ({ reservation, currentUser }) => {
  function handleEntrySpanClick() {
    if (
      currentUser.permissions === permission.admin ||
      (currentUser.permissions === permission.guide &&
        currentUser.id === reservation.guide.id)
    ) {
      routeToEditEntry(reservation.id);
    }
    return;
  }
  return (
    <EntrySpan className={reservation.time} onClick={() => handleEntrySpanClick()}>
      {currentUser.permissions === permission.user &&
        // TODO Ids would be better
        (reservation.userEmail === currentUser.email ? (
          <div className="grid_column_div own_booking">
            <span className="your_booking">Your booking!</span>
          </div>
        ) : (
          <div className="grid_column_div ">
            <span>Booked!</span>
          </div>
        ))}
      {(currentUser.permissions === permission.admin ||
        currentUser.permissions === permission.guide) &&
        // TODO Ids would be better
        (reservation.userEmail === reservation.guide.email ? (
          <div className="grid_column_div ">
            <StyledTextBody2 className="holiday">Free!</StyledTextBody2>
          </div>
        ) : (
          <div className="grid_column_div ">
            <StyledTextBody2>{`Gast: ${reservation.userName}`}</StyledTextBody2>
          </div>
        ))}
    </EntrySpan>
  );
};
Entry.propTypes = {
  reservation: PropTypes.object,
  currentUser: PropTypes.object,
};
const EntrySpan = styled.span`
  display: grid;
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
  .grid_column_div {
    display: grid;
    grid-auto-flow: column;
    align-content: center;
  }
  .grid_row_div {
    display: grid;
    grid-auto-flow: column;
    align-content: center;
  }
  span {
    align-self: start;
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
