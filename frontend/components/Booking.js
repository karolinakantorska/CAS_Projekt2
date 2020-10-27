import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import SingleGuideInfo from './SingleGuideInfo';
import Calendar from './Calendar';

const Booking = (props) => (
  <div>
    <h4>Book a MTB guide</h4>
    <SingleGuideInfo id={props.id} />
    <Calendar guideId={props.id} />
  </div>
);
/*
const StyledNav = styled.nav`
    background: white;
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
`;
*/

export default Booking;
