import React from 'react';
import Link from 'next/link';
import { StyledMenuMain } from '../../styles/Text';
import { Icon } from '@rmwc/icon';
const NavNoUser = () => {
  return (
    <>
      <Link href="/">
        <StyledMenuMain use="body" className="home">
          <Icon icon="home" aria-label="homepage" />
        </StyledMenuMain>
      </Link>
      <Link href="/info">
        <StyledMenuMain use="body" className="info">
          Info
        </StyledMenuMain>
      </Link>
      <Link href="/guides">
        <StyledMenuMain use="body" className="guides">
          Guides
        </StyledMenuMain>
      </Link>
    </>
  );
};

export default NavNoUser;
