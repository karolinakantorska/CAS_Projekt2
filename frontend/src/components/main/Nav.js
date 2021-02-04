import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Icon } from '@rmwc/icon';
import Signout from '../signin_signout/Signout';
import { useUser } from '../../lib/userState';
import { StyledTextMenuBlack, StyledTextBody2 } from '../styles/StyledText';

const Nav = () => {
  const { currentUser } = useUser();
  return (
    <StyledNav>
      <div data-test="nav">
        <StyledTextBody2 className="user" data-test="a-userName">
          {currentUser.name}
        </StyledTextBody2>
        <Link href="/">
          <StyledTextMenuBlack className="home ">Home</StyledTextMenuBlack>
        </Link>
        <Link href="/guides">
          <StyledTextMenuBlack className="guides">MTB Guides</StyledTextMenuBlack>
        </Link>
        {currentUser.permissions === 'ADMIN' && (
          <Link href="/add_guide">
            <StyledTextMenuBlack className="add">Add Guide</StyledTextMenuBlack>
          </Link>
        )}
        {currentUser.name && (
          <span className="signin">
            <Signout />
          </span>
        )}
        {!currentUser.name && (
          <Link href="/signin_page">
            <StyledTextMenuBlack className="signin">
              <Icon icon="person_outline" aria-label="Login" />
            </StyledTextMenuBlack>
          </Link>
        )}
      </div>
    </StyledNav>
  );
};
const StyledNav = styled.nav`
  cursor: pointer;
  white-space: nowrap;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0.7) 80%,
    rgba(255, 255, 255, 0.1) 100%
  );

  div {
    margin: auto;
    max-width: var(--maxWidth);
    display: grid;
    grid-template-rows: 1fr, 1fr;
    //grid-template-columns: 50fr 50fr 20fr 30fr 10fr;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-areas:
      ' none none none user'
      ' home add guides signin';
  }
  a,
  span {
    color: #212121;
    align-self: center;
    white-space: nowrap;
  }
  .home:hover,
  .add:hover,
  .guides:hover,
  .signin:hover {
    color: #b71c1c;
    text-shadow: 0px 0px 40px #546e7a;
  }
  a:active {
  }
  .user {
    cursor: auto;
    grid-area: user;
    justify-self: center;
    align-self: start;
  }
  .home {
    grid-area: home;
    justify-self: center;
  }
  .add {
    grid-area: add;
    justify-self: center;
  }
  .guides {
    grid-area: guides;
    justify-self: center;
  }
  .signin {
    grid-area: signin;
    justify-self: center;
  }
  .menu {
    display: none;
  }
  @media (max-width: 420px) {
  }
`;

export default Nav;
