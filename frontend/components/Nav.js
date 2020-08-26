import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const Nav = () => (
  <StyledNav>
    <Link href="/">
      <a>Home</a>
    </Link>
    <Link href="/guides">
      <a>MTB Guides</a>
    </Link>
    <Link href="/user">
      <a>User</a>
    </Link>

  </StyledNav>
);

const StyledNav = styled.nav`
    background: white;
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
`;

export default Nav;