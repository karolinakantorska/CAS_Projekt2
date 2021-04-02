import React from 'react';
import Link from 'next/link';
import { StyledNav2 } from '../styles/StyledNav2';
import { StyledMenu2 } from '../styles/Text';

const NavAdmin = () => {
  return (
    <StyledNav2>
      <Link href="/add_guide">
        <StyledMenu2 use="body">Add Guide</StyledMenu2>
      </Link>
      <Link href="/change_info">
        <StyledMenu2 use="body">Change Info</StyledMenu2>
      </Link>
      <Link href={`/empty_reservations`}>
        <StyledMenu2 use="body">Empty Reservations</StyledMenu2>
      </Link>
      <Link href={`/calendar_admin?guideId=0`}>
        <StyledMenu2 use="body">Calendar</StyledMenu2>
      </Link>
    </StyledNav2>
  );
};
/*
      <Link href={`/booking_calendar?guideId=${guideId}`}>
        <StyledTextMenuAdmin>My Calendar</StyledTextMenuAdmin>
      </Link>;
*/

export default NavAdmin;
