import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Signout from '../signin_signout/Signout';
import User from './User';

const Nav = (props) => {
  return (
    <User>
      {(currentUserPermission, currentUserName) => (
        <StyledNav>
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
            {currentUserName && (
              <span className="signin">
                <Signout />
              </span>
            )}
            {!currentUserName && (
              <Link href="/signin_page">
                <a className="signin">Signup|Signin</a>
              </Link>
            )}
          </div>
        </StyledNav>
      )}
    </User>
  );
};
const StyledNav = styled.nav`
  background-color: ${(props) => props.theme.color.primary};
  color: ${(props) => props.theme.colorText.negativ};
  div {
    margin: auto;
    max-width: ${(props) => props.theme.maxWidth};
    height: 2.5rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-areas: ' user add home guides signin';
  }
  a,
  span {
    color: ${(props) => props.theme.colorText.negativ};
    justify-self: end;
    align-self: center;
  }
  a:hover {
    color: #f5f5f5;
    text-shadow: 0px 0px 40px #ffffff;
  }
  a:active {
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
