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
  display: grid;
  font-size: 0.9rem;
  margin-top: 0.4rem;
  border-radius: 5px;

  background: rgba(217, 217, 217, 0.5);
  //text-align: center;
  align-content: center;
  justify-content: center;
  div {
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
  .AM::before,
  .PM::before,
  .DAY::before {
    font: 'Hind, Arial, sans-serif';
  }
`;

export default Entry;
