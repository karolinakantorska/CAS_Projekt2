import React from 'react';
import Link from 'next/link';

import { StyledNav2 } from '../styles/StyledNav2';
import { StyledMenu2 } from '../styles/Text';

const NavGuide = ({ guideId }) => {
  return (
    <StyledNav2>
      <Link href={`/calendar_booking?guideId=${guideId}`}>
        <StyledMenu2 use="body">My Calendar</StyledMenu2>
      </Link>
      <Link href={`/trips?guideId=${guideId}`}>
        <StyledMenu2 use="body">My Trips</StyledMenu2>
      </Link>
      <Link href={`/add_trip?guideId=${guideId}`}>
        <StyledMenu2 use="body">Add Trip</StyledMenu2>
      </Link>
    </StyledNav2>
  );
};

export default NavGuide;
