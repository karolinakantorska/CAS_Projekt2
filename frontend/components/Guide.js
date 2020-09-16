import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import DeleteUser from './DeleteUser';

const Guide = (props) => (
  <div>
    <h4>MTB Guide:</h4>
    <p>name: {props.user.name}</p>
    <p>surname: {props.user.surname}</p>
    <p>id: {props.user.id}</p>
    <p>email: {props.user.email}</p>
    <p>description: {props.user.description}</p>
    <p>image:</p>
    <img src={props.user.photo} alt="Mountainbiker photo" />
    <Link
      href={{
        pathname: "/booking_guide",
        query: { id: props.user.id },
      }}
    >
      <button>Edit</button>
    </Link>

    <DeleteUser props={props}>Delete</DeleteUser>
  </div>
);
/*
const StyledNav = styled.nav`
    background: white;
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
`;
*/

export default Guide;