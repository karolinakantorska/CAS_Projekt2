import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Entry = (props) => {
  const {
    id,
    time,
    userName,
    userEmail,
    currentUserPermission,
  } = props;

  return (
    <EntrySpan className="entryContainer">
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
Entry.PropTypes = {
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
    border: 1px solid gray;
    padding: 0;
  }
  & .PM {
    background: powderblue;
    border: 1px solid gray;
  }
  & .DAY {
    background: mistyrose;
    border: 1px solid gray;
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
