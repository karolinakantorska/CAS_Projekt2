import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const Guide = (props) => (

    <div>
        <h4>MTB Guide:</h4>
        <p>name:</p>
        <p>{props.user.name}</p>
        <p>surname:</p>
        <p>{props.user.surname}</p>
        <p>id:</p>
        <p>{props.user.id}</p>
        <p>email:</p>
        <p>{props.user.email}</p>
        <p>description:</p>
        <p>{props.user.description}</p>
        <p>image:</p>
        <img src={props.user.photo} alt="Mountainbiker photo"/>
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