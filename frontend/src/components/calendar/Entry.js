import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
//Components
import EntryGuide from '../booking/EntryGuide';
import EntryAdmin from '../booking/EntryAdmin';
import EntryUser from '../booking/EntryUser';
import { permission } from '../../lib/utils';
import { routeToEditEntry } from '../../lib/utilsRouts';
// Components for Styling
import { Typography } from '@rmwc/typography';
import { Icon } from '@rmwc/icon';
const Entry = ({ reservation, currentUser }) => {
  function handleEntrySpanClick() {
    routeToEditEntry(reservation.id);
  }
  console.log('reservation', reservation);
  if (currentUser.permissions === permission.user) {
    return <EntryUser reservation={reservation} currentUser={currentUser} />;
  }
  if (currentUser.permissions === permission.admin) {
    return <EntryAdmin reservation={reservation} />;
  }
  if (currentUser.permissions === permission.guide) {
    return <EntryGuide reservation={reservation} currentUser={currentUser} />;
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
  text-align: center;
  .holiday {
    color: var(--colorWarning);
  }
  .your_booking {
    color: var(--colorWarning);
  }
`;
export default Entry;
/*
      <EntrySpan className={reservation.time} onClick={() => handleEntrySpanClick()}>
        {reservation.gastId === reservation.guide.id ? (
          <Typography className="holiday">Free!</Typography>
        ) : (
          <Typography use="caption">
            {`Gast: ${reservation.userName} `}
            {reservation.confirmed ? (
              <Icon icon={{ icon: 'done', size: 'xsmall' }} />
            ) : (
              <Icon icon={{ icon: 'minimize', size: 'xsmall' }} />
            )}
          </Typography>
        )}
      </EntrySpan>
      */
