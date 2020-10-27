import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Signout from './Signout';
import User from './User';

const Nav = (props) => {
  return (
    <User>
      {(currentUserPermission, currentUserName) => (
        <StyledNav>
          <p>User: {currentUserName}</p>
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/guides">
            <a>MTB Guides</a>
          </Link>
          {props.currentUserPermission === 'ADMIN' ? (
            <Link href="/add_guide">
              <a>Add New MTB Guide</a>
            </Link>
          ) : null}
          {currentUserName && <Signout />}
          {!currentUserName && (
            <Link href="/signup_page">
              <a>Signup|Signin</a>
            </Link>
          )}
        </StyledNav>
      )}
    </User>
  );
};
const StyledNav = styled.nav`
  background: white;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;

export default Nav;
