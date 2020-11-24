import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
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
        {currentUserPermission === 'USER' && (
          <Typography>Booked!</Typography>
        )}
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
  font-size: 0.6rem;
  border-radius: 5px;
  padding: 2px;
  background: #eceff1;
  & .AM {
    height: 35px;
  }
  & .PM {
    height: 35px;
  }
  & .DAY {
    height: 80px;
  }
  & .AM::before {
    content: 'AM:';
  }
  & .PM::before {
    content: 'PM:';
  }
  & .DAY::before {
    content: 'DAY:';
  }
`;

export default Entry;
