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
    <EntrySpan className={time}>
      <div className={time}>
        {currentUserPermission === 'USER' && <span>Booked!</span>}
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
  font-size: 0.9rem;
  border-radius: 5px;
  padding: 2px;
  background: rgba(217, 217, 217, 0.5);
  text-align: center;
  div {
    display: grid;
    grid-auto-flow: column;
  }
  span {
    align-self: start;
  }
  .AM::before {
    content: 'AM:';
  }
  .PM::before {
    content: 'PM: ';
  }
  .DAY::before {
    content: 'DAY: ';
  }
  .AM::before,
  .PM::before,
  .DAY::before {
  }
`;

export default Entry;
