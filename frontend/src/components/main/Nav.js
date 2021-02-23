import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { Icon } from '@rmwc/icon';
//Components
import Loading from '../reusable/LoadingBar';
import Error from '../reusable/Error';
import Signout from '../signin_signout/Signout';

import { useCurrentUser } from '../../apollo/querries/useCurrentUser';
import { StyledTextMenuBlack, StyledTextBody2 } from '../styles/StyledText';

const Nav = () => {
  const { loading, error, data } = useCurrentUser();
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error error={error} />;
  }
  if (data) {
    return (
      <StyledNav>
        <StyledTextBody2 className="user" data-test="a-userName">
          {data.currentUser.name ? data.currentUser.name : 'please login'}
        </StyledTextBody2>
        <Link href="/">
          <StyledTextMenuBlack className="home ">Home</StyledTextMenuBlack>
        </Link>
        <Link href="/guides">
          <StyledTextMenuBlack className="guides">MTB Guides</StyledTextMenuBlack>
        </Link>
        {data.currentUser.permission === 'ADMIN' && (
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
  margin: auto;
  max-width: var(--maxWidth);
  display: grid;
  justify-items: center;
  align-content: center;
  grid-template-rows: 10px, 20px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-areas:
    ' none none none user'
    ' home add guides signin';
  color: #212121;
  white-space: nowrap;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0.7) 80%,
    rgba(255, 255, 255, 0.1) 100%
  );
  .home:hover,
  .add:hover,
  .guides:hover,
  .signin:hover {
    color: #b71c1c;
    text-shadow: 0px 0px 10px #546e7a;
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
