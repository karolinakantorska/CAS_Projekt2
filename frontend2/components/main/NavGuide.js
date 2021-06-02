import React from 'react';
import Link from 'next/link';

import { StyledNav2 } from '../../styles/StyledNav';
import { StyledMenu2 } from '../../styles/Text';

const NavGuide = ({ guideId }) => {
  return (
    <StyledNav2>
      <Link href={`/my_calendar/${guideId}`}>
        <StyledMenu2 use="body">Guide Calendar</StyledMenu2>
      </Link>
      <a href={`/guide_trips/${guideId}`}>
        <StyledMenu2 use="body">Guide Trips</StyledMenu2>
      </a>
      <Link href={`/add_trip/${guideId}`}>
        <StyledMenu2 use="body">Add Trip</StyledMenu2>
      </Link>
    </StyledNav2>
  );
};

export default NavGuide;
