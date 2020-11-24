import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';

const Entry = (props) => {
  const {
    id,
    time,
    userName,
    userEmail,
    currentUserPermission,
  } = props;

  return (
      <EntrySpan className={time}>
        <div className={time}>
          {currentUserPermission === 'USER' && <p>already booked!</p>}
          {(currentUserPermission === 'ADMIN' ||
            currentUserPermission === 'GUIDE') && (
            <Link
              href={{
                pathname: '/info_booking',
                query: {
                  userName,
                  time,
                  id,
                },
              }}
            >
              <span>
                <p>gast name: {userName}</p>
                <p>gast email: {userEmail}</p>
              </span>
            </Link>
          )}
        </div>
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
  background: white;
  font-size: 0.6rem;

  & .AM {
    background: lightskyblue;
    //align-self: start;
    border: 1px solid gray;
    padding: 0;
    height: 35px;
  }
  & .PM {
    background: powderblue;
    //align-self: end;
    border: 1px solid gray;
    height: 35px;
  }
  & .DAY {
    background: mistyrose;
    border: 1px solid gray;
    height: 80px;
  }
  & .AM::before {
    content: 'AM';
  }
  & .PM::before {
    content: 'PM';
  }
  & .DAY::before {
    content: 'DAY';
  }
`;

export default Entry;
