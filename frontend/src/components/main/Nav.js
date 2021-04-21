import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
//Components
import Loading from '../reusable/LoadingBar';
import ErrorGraphql from '../reusable/ErrorGraphql';
import Signout from '../signin_signout/Signout';
import NavAdmin from '../main/NavAdmin';
import NavGuide from '../main/NavGuide';
//Utils
import { permission } from '../../lib/utils';
import { useCurrentUser } from '../../apollo/querries/useCurrentUser';
// Styling
import { StyledMenuMain, StyledTopMenu } from '../styles/Text';
import { Icon } from '@rmwc/icon';

const Nav = () => {
  const [show, setShow] = useState(false);
  const { loading, error, data } = useCurrentUser();
  if (loading) {
    //return <Loading />;
    return <Loading />;
  }
  if (error) {
    return <ErrorGraphql error={error} />;
  }
  if (data) {
    return (
      <>
        <StyledNav>
          {data.currentUser.name ? (
            <StyledTopMenu use="caption" className="user">
              {data.currentUser.name} / logout
            </StyledTopMenu>
          ) : (
            <StyledTopMenu use="caption" className="user">
              log in / register
            </StyledTopMenu>
          )}
          <Link href="/">
            <StyledMenuMain use="body" className="home">
              <Icon icon="home" aria-label="homepage" />
            </StyledMenuMain>
          </Link>
          {data.currentUser.permissions === '' && (
            <Link href="/info">
              <StyledMenuMain use="body" className="userSpec">
                Info
              </StyledMenuMain>
            </Link>
          )}
          {data.currentUser.permissions === permission.user && (
            <>
              <Link href="/info">
                <StyledMenuMain use="body" className="userSpec">
                  Info
                </StyledMenuMain>
              </Link>
              <Link href={`/my_trips?gastId=${data.currentUser.id}`}>
                <StyledMenuMain use="body" className="trips">
                  My Trips
                </StyledMenuMain>
              </Link>
            </>
          )}

          {data.currentUser.permissions === permission.admin && (
            <StyledMenuMain
              use="body"
              className={`userSpec ${show && 'active'}`}
              onClick={() => setShow((show) => setShow(!show))}
            >
              Admin
            </StyledMenuMain>
          )}
          {data.currentUser.permissions === permission.guide && (
            <StyledMenuMain
              use="body"
              className={`userSpec ${show && 'active'}`}
              onClick={() => setShow((show) => setShow(!show))}
            >
              Guide
            </StyledMenuMain>
          )}
          <Link href="/guides">
            <StyledMenuMain use="body" className="guides">
              MTB Guides
            </StyledMenuMain>
          </Link>
          {data.currentUser.permissions ? (
            <span className="signin">
              <Signout />
            </span>
          ) : (
            <Link href="/signin_page">
              <StyledMenuMain use="body" className="signin">
                <Icon icon="person_outline" aria-label="Login" />
              </StyledMenuMain>
            </Link>
          )}
        </StyledNav>
        {data.currentUser.permissions === permission.admin && (
          <StyledSpan>{show && <NavAdmin />}</StyledSpan>
        )}
        {data.currentUser.permissions === permission.guide && (
          <StyledSpan>{show && <NavGuide guideId={data.currentUser.id} />}</StyledSpan>
        )}
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
  grid-template-rows: 3fr 4fr;
  grid-template-columns: 1fr 2fr 3fr 3fr 1fr;
  grid-template-areas:
    '. . . . user'
    'home userSpec guides trips  signin';
  white-space: nowrap;
  background-color: rgba(255, 255, 255, 0.8);
  span:hover {
    color: var(--colorSecundary);
  }
  a:hover,
  .active {
    color: var(--colorSecundary);
  }
  .user {
    cursor: auto;
    grid-area: user;
    height: 10px;
  }
  .home {
    grid-area: home;
  }
  .userSpec {
    grid-area: userSpec;
  }
  .trips {
    grid-area: trips;
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
