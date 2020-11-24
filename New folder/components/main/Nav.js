import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import Signout from '../signin_signout/Signout';
import User from './User';

const Nav = (props) => {
  return (
    <User>
      {(currentUserPermission, currentUserName) => (
        <div>
          <div>
            <p>User: {currentUserName}</p>
            <Link href="/">
              <a className="home ">Home</a>
            </Link>
            <Link href="/guides">
              <a className="guides">MTB Guides</a>
            </Link>
            {currentUserPermission === 'ADMIN' && (
              <Link href="/add_guide">
                <a className="add">Add New MTB Guide</a>
              </Link>
            )}
            {currentUserName && <Signout />}
            {!currentUserName && (
              <Link href="/signup_page">
                <a className="signin">Signup|Signin</a>
              </Link>
            )}
          </div>
        </div>
      )}
    </User>
  );
};
const StyledNav = styled.nav`
  background-color: ${(props) => props.theme.primaryColorButton};
  color: ${(props) => props.theme.primaryColorWritingHell};

  div {
    margin: auto;
    max-width: ${(props) => props.theme.maxWidth};
    height: 50px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-areas: ' user add home guides signin';
  }
  a {
    color: ${(props) => props.theme.primaryColorWritingHell};
    justify-self: end;
    align-self: center;
  }
  a:hover {
    color: ${(props) => props.theme.primaryColorWritingHover};
  }
  a:active {
    background-color: rgb(236, 249, 236, 0.1);
  }
  .user {
    grid-area: user;
  }
  .home {
    grid-area: home;
  }
  .add {
    grid-area: add;
  }
  .guides {
    grid-area: guides;
  }
  .signin {
    grid-area: signin;
  }
`;

export default Nav;
