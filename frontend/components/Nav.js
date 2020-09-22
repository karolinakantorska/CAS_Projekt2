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
    <Link href="/add_guide">
      <a>Add New MTB Guide</a>
    </Link>
    <Link href="/signup">
      <a>Signup</a>
    </Link>

  </StyledNav>
);

const StyledNav = styled.nav`
    background: white;
    display: grid;
    grid-template-columns: repeat(5,1fr) ;
`;

export default Nav;