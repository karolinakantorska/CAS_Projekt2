import React from 'react';
import Link from 'next/link';

import { StyledNav2 } from '../styles/StyledNav2';
import { StyledMenu2 } from '../styles/Text';

const NavUser = ({ userId }) => {
  console.log(userId);
  return (
    <StyledNav2>
      <Link href="/info">
        <StyledMenu2 use="body" className="userSpec">
          Info
        </StyledMenu2>
      </Link>
      {userId && (
        <Link href={`/my_trips?userId=${userId}`}>
          <StyledMenu2 use="body">My Trips</StyledMenu2>
        </Link>
      )}
    </StyledNav2>
  );
};
export default NavUser;
