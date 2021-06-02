import styled from 'styled-components';
import { Fab } from '@rmwc/fab';

export const StyledNav = styled.nav`
  cursor: pointer;
  width: 100%;
  height: 40px;
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
export const StyledNav2 = styled.nav`
  cursor: pointer;
  width: 100%;
  margin-top: 40px;
  padding-left: 4px;
  line-height: 100%;
  display: grid;
  justify-items: center;
  align-items: center;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.6);
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2%;
  //white-space: nowrap;
`;
export const StyledNav2User = styled.nav`
  cursor: pointer;
  display: grid;
  justify-items: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.6);
  height: 40px;
  grid-template-columns: 1fr;
  @media (min-width: 401px) {
    background-color: rgba(255, 255, 255, 0);
    .nav_bottom_user {
      display: none;
    }
  }
`;
export const StyledDiv = styled.span`
  position: fixed;
  z-index: 2;
  margin-top: 120px;
  right:20px;
`;
export const StyledFab = styled(Fab)`
  background-color: var(--mdc-theme-secondary);
  height:65px;
  width: 65px;
`;
export const StyledSpan = styled.div`
  margin-top: -6px;
`;