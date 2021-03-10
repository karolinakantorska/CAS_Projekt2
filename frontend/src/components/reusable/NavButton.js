import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { StyledTextMenuBlack } from '../styles/StyledText';

const NavButton = ({ text, href, className }) => {
  const location = () => (window ? window.location.pathname : 'none');
  return (
    <StyledLink className={className}>
      <Link href={href}>
        <StyledTextMenuBlack className={`${location() === href && 'active'}`}>
          {text}
        </StyledTextMenuBlack>
      </Link>
    </StyledLink>
  );
};
export const StyledLink = styled.span`
  white-space: nowrap;
  a:hover,
  .active {
    color: var(--colorSecundary);
  }
`;
NavButton.propTypes = {
  text: PropTypes.string,
  href: PropTypes.string,
  className: PropTypes.className,
};
export default NavButton;
