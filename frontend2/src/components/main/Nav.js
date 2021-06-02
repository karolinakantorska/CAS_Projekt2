import React from 'react';
import Link from 'next/link';
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
import { StyledNav, StyledDiv, StyledFab,StyledSpan } from '../../styles/StyledNav';
import {
  StyledMenuMain,
  StyledTopMenu,
  StyledTypographyDense,
  StyledButtonTextWhite,
} from '../../styles/Text';
import MediaQuery from 'react-responsive';
import { Icon } from '@rmwc/icon';


const Nav = () => {
  const { loading, error, data } = useCurrentUser();
  const [signout] = useSignout();
  return (
    <>
      <StyledNav>
        {error && <ErrorGraphql error={error} />}
        {loading && <LoadingBar />}
        <NavNoUser />
        {data && data.currentUser.name ? (
          <StyledTopMenu use="caption" className="user" onClick={signout}>
            <MediaQuery minDeviceWidth={401}>
              {data.currentUser.name} / log out
            </MediaQuery>
            <MediaQuery maxDeviceWidth={400}>log out</MediaQuery>
          </StyledTopMenu>
        ) : (
          <Link href="/signin_page">
            <StyledTopMenu use="caption" className="user">
              sign in / register
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
            <Link href={`/my_trips/${data.currentUser.id}`}>
              <StyledMenuMain use="body" className="myBookings">
                Your Bookings
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

      {data && data.currentUser.permissions === permission.admin && <NavAdmin />}
      {data && data.currentUser.permissions === permission.guide && (
        <NavGuide guideId={data.currentUser.id} />
      )}
      {data && data.currentUser.permissions !== '' && (
        <StyledDiv>
          <MediaQuery maxDeviceWidth={400}>
            <StyledFab className="bookingChip">
              <StyledSpan>
<StyledButtonTextWhite use="body">My Booking</StyledButtonTextWhite>
              </StyledSpan>
            </StyledFab>
          </MediaQuery>
        </StyledDiv>
      )}
    </>
  );
};


export default Nav;

