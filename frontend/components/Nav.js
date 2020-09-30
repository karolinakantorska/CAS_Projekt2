import React, { useState, useEffect } from "react";
import Link from 'next/link';
import styled from 'styled-components';
import Signout from './Signout';
import User from './User';


const Nav = (props) => {

return (
  <StyledNav>
    <User>
      {(currentUserPermission, currentUserName) => (
        <React.Fragment>
          <p>User: {currentUserName}</p>
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/guides">
            <a>MTB Guides</a>
          </Link>
          {props.currentUserPermission === "ADMIN" ? (
            <Link href="/add_guide">
              <a>Add New MTB Guide</a>
            </Link>
          ) : null}
          {props.currentUserName ? <Signout /> : null}
          {!props.currentUserName ? (
            <Link href="/signup">
              <a>Signup|Signin</a>
            </Link>
          ) : null}
        </React.Fragment>
      )}
    </User>
  </StyledNav>
);
}
const StyledNav = styled.nav`
    background: white;
    display: grid;
    grid-template-columns: repeat(5,1fr) ;
`;

export default Nav;
