import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Icon } from '@rmwc/icon';
import Signout from '../signin_signout/Signout';
import User from './User';
import { StyledTextMenuWhite } from '../styles/StyledText';

const Nav = (props) => {
  return (
    <User>
      {(currentUserPermission, currentUserName) => (
        <StyledNav>
          <div>
            <StyledTextMenuWhite className="user">
              User: {currentUserName}
            </StyledTextMenuWhite>
            <Link href="/">
              <StyledTextMenuWhite className="home ">Home</StyledTextMenuWhite>
            </Link>
            <Link href="/guides">
              <StyledTextMenuWhite className="guides">MTB Guides</StyledTextMenuWhite>
            </Link>
            {currentUserPermission === 'ADMIN' && (
              <Link href="/add_guide">
                <StyledTextMenuWhite className="add">Add MTB Guide</StyledTextMenuWhite>
              </Link>
            )}
            {currentUserName && (
              <span className="signin">
                <Signout />
              </span>
            )}
            {!currentUserName && (
              <Link href="/signin_page">
                <StyledTextMenuWhite className="signin">
                  <Icon icon="person_outline" />
                </StyledTextMenuWhite>
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
  cursor: pointer;
  div {
    margin: auto;
    padding-top: 0.5rem;
    max-width: ${(props) => props.theme.maxWidth};
    height: 2.5rem;
    display: grid;
    grid-template-columns: 50fr 50fr 20fr 30fr 10fr;
    grid-template-areas: ' user add home guides signin';
  }
  a,
  span {
    color: ${(props) => props.theme.colorText.negativ};
    justify-self: end;
    align-self: center;
  }
  a:hover {
    color: white;
    text-shadow: 0px 0px 40px #ffffff;
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
