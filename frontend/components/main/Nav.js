import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
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
              <StyledTextMenuWhite className="home ">
                Home
              </StyledTextMenuWhite>
            </Link>
            <Link href="/guides">
              <StyledTextMenuWhite className="guides">
                MTB Guides
              </StyledTextMenuWhite>
            </Link>
            {currentUserPermission === 'ADMIN' && (
              <Link href="/add_guide">
                <StyledTextMenuWhite className="add">
                  Add New MTB Guide
                </StyledTextMenuWhite>
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
                  Signup|Signin
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
  div {
    margin: auto;
    padding-top: 0.5rem;
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
  .user {
    justify-self: start;
  }
  a:hover {
    color: white;
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
