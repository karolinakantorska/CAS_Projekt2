import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { permission } from '../../lib/utils';
import { routeToEditEntry } from '../../lib/utilsRouts';
// Components for Styling
import { StyledTextBody2 } from '../styles/StyledText';

const Entry = ({
  id,
  time,
  userName,
  currentUserPermission,
  currentUserName,
  guideName,
}) => {
  const Router = useRouter();
  function handleEntrySpanClick() {
    if (
      currentUserPermission === permission.admin ||
      currentUserPermission === permission.guide
    ) {
      routeToEditEntry(id);
    }
    return;
  }
  return (
    <EntrySpan className={time} onClick={() => handleEntrySpanClick()}>
      {currentUserPermission === permission.user &&
        // userName is the user who booked the appointment
        (userName === currentUserName ? (
          <div className="grid_column_div own_booking">
            <span className="your_booking">Your booking!</span>
          </div>
        ) : (
          <div className="grid_column_div ">
            <span>Booked!</span>
          </div>
        ))}
      {(currentUserPermission === permission.admin ||
        currentUserPermission === permission.guide) &&
        // userName is the user who booked the appointment
        (userName === guideName ? (
          <div className="grid_column_div ">
            <StyledTextBody2 className="holiday">Free!</StyledTextBody2>
          </div>
        ) : (
          <div className="grid_column_div ">
            <StyledTextBody2>{`Gast: ${userName}`}</StyledTextBody2>
          </div>
        ))}
    </EntrySpan>
  );
};
Entry.propTypes = {
  id: PropTypes.string,
  time: PropTypes.string,
  userName: PropTypes.string,
  userEmail: PropTypes.string,
  currentUserPermission: PropTypes.string,
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
