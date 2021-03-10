import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { StyledTextMenuAdmin } from '../styles/StyledText';

const NavAdmin = () => {
  return (
    <StyledNav>
      <Link href="/add_guide">
        <StyledTextMenuAdmin>Add Guide</StyledTextMenuAdmin>
      </Link>
      <Link href="/change_info">
        <StyledTextMenuAdmin>Change Info</StyledTextMenuAdmin>
      </Link>
      <Link href={`/calendar_admin?guideId=0`}>
        <StyledTextMenuAdmin>Calendar</StyledTextMenuAdmin>
      </Link>
    </StyledNav>
  );
};
/*
      <Link href={`/booking_calendar?guideId=${guideId}`}>
        <StyledTextMenuAdmin>My Calendar</StyledTextMenuAdmin>
      </Link>;
*/
export const StyledNav = styled.nav`
  cursor: pointer;
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-columns: repeat(5, 1fr);
  background-color: rgba(255, 255, 255, 0.5);
  white-space: nowrap;
  a {
    color: var(--colorSecundary);
  }
  a:hover {
    color: var(--colorLight);
  }
`;
export default NavAdmin;
