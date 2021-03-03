import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { Icon } from '@rmwc/icon';
//Components
import Loading from '../reusable/LoadingBar';
import ErrorGraphql from '../reusable/ErrorGraphql';
import Signout from '../signin_signout/Signout';

import { useCurrentUser } from '../../apollo/querries/useCurrentUser';
import { StyledTextMenuBlack, StyledTextBody2 } from '../styles/StyledText';

const Nav = () => {
  const { loading, error, data } = useCurrentUser();
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorGraphql error={error} />;
  }
  if (data) {
    return (
      <StyledNav>
        <StyledTextBody2 className="user" data-test="a-userName">
          {data.currentUser.name ? data.currentUser.name : 'please login'}
        </StyledTextBody2>
        <Link href="/">
          <StyledTextMenuBlack className="home">Home</StyledTextMenuBlack>
        </Link>
        <Link href="/guides">
          <StyledTextMenuBlack className="guides">MTB Guides</StyledTextMenuBlack>
        </Link>
        {data.currentUser.permissions === 'ADMIN' && (
          <Link href="/add_guide">
            <StyledTextMenuBlack className="add">Add Guide</StyledTextMenuBlack>
          </Link>
        )}
        {data.currentUser.name && (
          <span className="signin">
            <Signout />
          </span>
        )}
        {!data.currentUser.name && (
          <Link href="/signin_page">
            <StyledTextMenuBlack className="signin">
              <Icon icon="person_outline" aria-label="Login" />
            </StyledTextMenuBlack>
          </Link>
        )}
      </StyledNav>
    );
  }
};

const StyledNav = styled.nav`
  cursor: pointer;
  z-index: 10;
  margin: auto;
  //max-width: var(--maxWidth);
  display: grid;
  justify-items: center;
  align-content: center;
  grid-template-rows: 20px 30px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-areas:
    ' none none none user'
    ' home add guides signin';
  white-space: nowrap;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0.8) 80%,
    rgba(255, 255, 255, 0.1) 100%
  );
  .home:hover,
  .add:hover,
  .guides:hover,
  .signin:hover {
    color: #5a5b5c;
    text-shadow: 0px 0px 10px #c4c4c4;
  }
  .user {
    cursor: auto;
    grid-area: user;
    align-self: start;
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
