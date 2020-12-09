import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Router from 'next/router';
import styled from 'styled-components';
import {
  StyledTextBody1,
  StyledTextBody2,
  StyledTextTitle5,
  StyledTextTitle6,
  StyledTextSubtitle1,
  StyledTextSubtitle2,
  StyledTextMenuWhite,
  StyledTextButtonBlack,
} from '../styles/StyledText';

const Entry = (props) => {
  const {
    id,
    time,
    userName,
    userEmail,
    currentUserPermission,
  } = props;
  function handleClick(e) {
    console.log(e);
    e.stopPropagation();
    console.log('booking info');
    Router.push({
      pathname: '/info_booking',
      query: {
        userName,
        time,
        id,
      },
    });
  }
  return (
    <EntrySpan className={time}>
      {currentUserPermission === 'USER' && (
        <div className={`${time}  grid_column_div`}>
          <span>Booked!</span>
        </div>
      )}
      {(currentUserPermission === 'ADMIN' ||
        currentUserPermission === 'GUIDE') && (
        <div clasName="grid_row_div">
          <StyledTextBody2>{userName}</StyledTextBody2>
          <StyledTextBody2>{userEmail}</StyledTextBody2>
        </div>
      )}
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
  font-size: 0.9rem;
  margin-top: 0.4rem;
  border-radius: 5px;

  background: rgba(217, 217, 217, 0.5);
  //text-align: center;
  align-content: center;
  justify-content: center;
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
