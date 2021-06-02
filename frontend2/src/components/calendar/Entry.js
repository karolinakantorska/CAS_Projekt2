import React from 'react';
import PropTypes from 'prop-types';
//Components
import EntryGuide from '../booking/EntryGuide';
import EntryAdmin from '../booking/EntryAdmin';
import EntryUser from '../booking/EntryUser';
import { permission } from '../../lib/utils';

const Entry = ({ reservation, currentUser }) => {
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
export default Entry;
