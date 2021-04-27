import styled from 'styled-components';

export const StyledNav2 = styled.nav`
  cursor: pointer;
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-rows: 25px;
  background-color: rgba(255, 255, 255, 0.6);

  grid-template-columns: repeat(4, 1fr);
  grid-gap: 3%;
  //white-space: nowrap;
`;
export const StyledNav2User = styled.nav`
  cursor: pointer;
  display: grid;
  justify-items: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.6);
  grid-template-rows: 25px;

  grid-template-columns: 1fr;

  @media (min-width: 401px) {
    background-color: rgba(255, 255, 255, 0);
    .nav_bottom_user {
      display: none;
    }
  }
`;
