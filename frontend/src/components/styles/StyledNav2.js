import styled from 'styled-components';

export const StyledNav2 = styled.nav`
  cursor: pointer;
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-columns: repeat(4, 1fr);
  background-color: rgba(255, 255, 255, 0.5);
  white-space: nowrap;
  a {
    color: var(--colorSecundary);
  }
  a:hover {
    color: var(--colorLight);
  }
`;
