import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Icon } from '@rmwc/icon';
import Signout from '../signin_signout/Signout';
import User from './User';
import { StyledTextMenuBlack } from '../styles/StyledText';

const Nav = (props) => {
  return (
    <User>
      {(currentUserPermission, currentUserName) => (
        <StyledNav>
          <div data-testid="nav">
            <StyledTextMenuBlack className="user">
              User: {currentUserName}
            </StyledTextMenuBlack>
            <Link href="/">
              <StyledTextMenuBlack className="home ">Home</StyledTextMenuBlack>
            </Link>
            <Link href="/guides">
              <StyledTextMenuBlack className="guides">MTB Guides</StyledTextMenuBlack>
            </Link>
            {currentUserPermission === 'ADMIN' && (
              <Link href="/add_guide">
                <StyledTextMenuBlack className="add">Add MTB Guide</StyledTextMenuBlack>
              </Link>
            )}
            {currentUserName && (
              <span className="signin">
                <Signout />
              </span>
            )}
            {!currentUserName && (
              <Link href="/signin_page">
                <StyledTextMenuBlack className="signin">
                  <Icon icon="person_outline" aria-label="Login" />
                </StyledTextMenuBlack>
              </Link>
            )}
          </div>
        </StyledNav>
      )}
    </User>
  );
};
const StyledNav = styled.nav`
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0.7) 80%,
    rgba(255, 255, 255, 0.1) 100%
  );
  cursor: pointer;
  div {
    margin: auto;
    padding-top: 0.5rem;
    max-width: var(--maxWidth);
    height: 50px;
    display: grid;
    grid-template-columns: 50fr 50fr 20fr 30fr 10fr;
    grid-template-areas: ' user add home guides signin';
  }
  a,
  span {
    color: #212121;
    justify-self: end;
    align-self: center;
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
    grid-area: user;
    justify-self: start;
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
  .user,
  .home,
  .add,
  .guides,
  .signin {
    @media (max-width: 600px) {
      font-size: 0.96rem;
    }
    @media (max-width: 480px) {
      font-size: 0.88rem;
    }
    @media (max-width: 400px) {
      font-size: 0.82rem;
    }
    @media (max-width: 360px) {
      font-size: 0.75rem;
    }
  }
`;

export default Nav;
