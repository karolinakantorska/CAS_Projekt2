import React from 'react';
import Link from 'next/link';

import { StyledTextMenuAdmin } from '../styles/StyledText';
import { StyledNav } from './NavAdmin';

const NavGuide = ({ guideId }) => {
  return (
    <StyledNav>
      <Link href={`/calendar_booking?guideId=${guideId}`}>
        <StyledTextMenuAdmin>My Calendar</StyledTextMenuAdmin>
      </Link>
      <Link href="/trips">
        <StyledTextMenuAdmin>My Trips</StyledTextMenuAdmin>
      </Link>
      <Link href="/add_trip">
        <StyledTextMenuAdmin>Add Trip</StyledTextMenuAdmin>
      </Link>
    </StyledNav>
  );
};
export default NavGuide;
