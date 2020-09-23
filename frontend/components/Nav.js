import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { gql, useMutation, useQuery } from "@apollo/client";
import styled from 'styled-components';
import User from './User';
import Signout from './Signout';
import { isNullableType } from "graphql";

const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    currentUser {
      id
      email
      permissions
    }
  }
`;


const Nav = () => {
const { loading, error, data } = useQuery(CURRENT_USER_QUERY, {});
const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    if (data && data.currentUser !== null) {
      setCurrentUser(data.currentUser);
    }
  }, [loading, data]);

if (loading) {
  return <p>Loading</p>;
}

return (
  <User email={currentUser.email}>
    <StyledNav>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/guides">
        <a>MTB Guides</a>
      </Link>
      {currentUser ? (
        <React.Fragment>
          <Link href="/add_guide">
            <a>Add New MTB Guide</a>
          </Link>
          <Signout />
        </React.Fragment>
      ) : null}
      {!currentUser ? (
        <React.Fragment>
          <Link href="/signup">
            <a>Signup|Signin</a>
          </Link>
        </React.Fragment>
      ) : null}
    </StyledNav>
  </User>
);
}
const StyledNav = styled.nav`
    background: white;
    display: grid;
    grid-template-columns: repeat(5,1fr) ;
`;

export default Nav;