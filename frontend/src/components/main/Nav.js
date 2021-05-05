import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
//Components
import ErrorGraphql from '../reusable/ErrorGraphql';
import NavNoUser from '../main/NavNoUser';
import NavAdmin from '../main/NavAdmin';
import NavGuide from '../main/NavGuide';
import LoadingBar from '../reusable/LoadingBar';
//Utils
import { permission } from '../../lib/utils';
import { useCurrentUser } from '../../apollo/querries/useCurrentUser';
import { useSignout } from '../../apollo/mutations/useSignout';
// Styling
import { StyledNav2User } from '../styles/StyledNav2';
import { StyledMenuMain, StyledTopMenu } from '../styles/Text';
import { StyledMenu2 } from '../styles/Text';
import { Icon } from '@rmwc/icon';

const Nav = () => {
  const { loading, error, data } = useCurrentUser();
  const [signout] = useSignout();
  return (
    <>
      <StyledNav>
        {error && <ErrorGraphql error={error} />}
        <NavNoUser />
        {data && data.currentUser.name ? (
          <StyledTopMenu use="caption" className="user" onClick={signout}>
            {data.currentUser.name} / logout
          </StyledTopMenu>
        ) : (
          <Link href="/signin_page">
            <StyledTopMenu use="caption" className="user">
              log in / register
            </StyledTopMenu>
          </Link>
        )}
        {data && data.currentUser.permissions !== '' && (
          <>
            <Link href={`/allTrips`}>
              <StyledMenuMain use="body" className="trips">
                Trips
              </StyledMenuMain>
            </Link>
            <Link href={`/my_trips?gastId=${data.currentUser.id}`}>
              <StyledMenuMain use="body" className="myBookings">
                My Bookings
              </StyledMenuMain>
            </Link>
          </>
        )}
        {data && data.currentUser.permissions ? (
          <StyledMenuMain use="body" onClick={signout} className="signin">
            <Icon icon="logout" aria-label="Logout" />
          </StyledMenuMain>
        ) : (
          <Link href="/signin_page">
            <StyledMenuMain use="body" className="signin">
              {<Icon icon="login" aria-label="Login" />}
            </StyledMenuMain>
          </Link>
        )}
      </StyledNav>
      {/*loading && <LoadingBar />*/}
      {data && data.currentUser.permissions === permission.user && (
        <StyledNav2User className="nav_bottom_user">
          <Link href={`/my_trips?gastId=${data.currentUser.id}`}>
            <StyledMenu2 use="body" className="nav_bottom_user">
              My Bookings
            </StyledMenu2>
          </Link>
        </StyledNav2User>
      )}
      {data && data.currentUser.permissions === permission.admin && (
        <StyledSpan>
          <NavAdmin />
        </StyledSpan>
      )}
      {data && data.currentUser.permissions === permission.guide && (
        <StyledSpan>
          <NavGuide guideId={data.currentUser.id} />
        </StyledSpan>
      )}
    </>
  );
};

const StyledNav = styled.nav`
  cursor: pointer;
  margin: auto;
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-rows: 3fr 4fr;
  grid-template-columns: 1fr 2fr 2fr 2fr 3fr 1fr;
  grid-template-areas:
    '. . . . . user'
    'home info guides trips myBookings signin';
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
  .info {
    grid-area: info;
  }
  .guides {
    grid-area: guides;
  }
  .trips {
    grid-area: trips;
  }
  .myBookings {
    grid-area: myBookings;
  }
  .signin {
    grid-area: signin;
  }
  @media (max-width: 400px) {
    grid-template-columns: 1fr 2fr 2fr 2fr 1fr;
    grid-template-areas:
      '. . . .  user'
      'home info guides trips signin';
    .myBookings {
      display: none;
    }
  }
`;

const StyledSpan = styled.span`
  display: grid;
  grid-template-rows: 30px;
`;
export default Nav;
/*

      */
