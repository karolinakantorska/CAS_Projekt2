import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { Icon } from '@rmwc/icon';
//Components
import Loading from '../reusable/LoadingBar';
import ErrorGraphql from '../reusable/ErrorGraphql';
import Signout from '../signin_signout/Signout';
import NavAdmin from '../main/NavAdmin';

import { useCurrentUser } from '../../apollo/querries/useCurrentUser';
import { StyledTextMenuBlack, StyledTextBody2 } from '../styles/StyledText';

const Nav = () => {
  const [show, setShow] = useState(true);
  const { loading, error, data } = useCurrentUser();

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorGraphql error={error} />;
  }
  if (data) {
    return (
      <>
        <StyledNav>
          <StyledTextBody2 className="user">
            {data.currentUser.name ? data.currentUser.name : 'please login'}
          </StyledTextBody2>
          <Link href="/">
            <StyledTextMenuBlack className="home">Home</StyledTextMenuBlack>
          </Link>
          <StyledTextMenuBlack
            className={`userSpec ${show && 'active'}`}
            onClick={() => setShow((show) => setShow(!show))}
          >
            Info
          </StyledTextMenuBlack>
          <Link href="/guides">
            <StyledTextMenuBlack className="guides">MTB Guides</StyledTextMenuBlack>
          </Link>
          {data.currentUser.permissions === 'ADMIN' && (
            <StyledTextMenuBlack
              className={`userSpec ${show && 'active'}`}
              onClick={() => setShow((show) => setShow(!show))}
            >
              Add Guide
            </StyledTextMenuBlack>
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
        <StyledSpan>{show && <NavAdmin />}</StyledSpan>
      </>
    );
  }
};

const StyledNav = styled.nav`
  cursor: pointer;
  margin: auto;
  //max-width: var(--maxWidth);
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-rows: 2fr 4fr;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-areas:
    ' none none none user'
    ' home userSpec guides signin';
  white-space: nowrap;
  background-color: rgba(255, 255, 255, 1);
  a:hover,
  .active {
    color: var(--colorSecundary);
  }
  .user {
    cursor: auto;
    grid-area: user;
  }
  .home {
    grid-area: home;
  }
  .userSpec {
    grid-area: userSpec;
  }
  .guides {
    grid-area: guides;
  }
  .signin {
    grid-area: signin;
  }
`;
const StyledSpan = styled.span`
  display: grid;
  grid-template-rows: 30px;
`;
export default Nav;
