import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const Guide = (props) => (

    <div>
        <h4>MTB Guide:</h4>
        <p>name:</p>
        <p>{props.item.name}</p>
        <p>id:</p>
        <p>{props.item.id}</p>

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