import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { StyledTextMenuAdmin } from '../styles/StyledText';

const Nav = () => {
  return (
    <StyledNav>
      <Link href="/add_guide">
        <StyledTextMenuAdmin>Add Guide</StyledTextMenuAdmin>
      </Link>
      <Link href="/">
        <StyledTextMenuAdmin>Change Info</StyledTextMenuAdmin>
      </Link>
    </StyledNav>
  );
};

const StyledNav = styled.nav`
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
export default Nav;
