import React from "react";
import Link from "next/link";
import styled from "styled-components";
import SingleGuideInfo from "./SingleGuideInfo";
import Calendar from "./CalendarComponent";

const BookingGuide = (props) => (
  <div>
    <h4>Book a MTB guide</h4>
    <SingleGuideInfo id={props.id} />
    <Calendar />
  </div>
);
/*
const StyledNav = styled.nav`
    background: white;
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
`;
*/

export default BookingGuide;
