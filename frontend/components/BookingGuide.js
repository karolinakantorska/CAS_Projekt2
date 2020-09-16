import React from "react";
import Link from "next/link";
import styled from "styled-components";
import UpdateGuide from "./UpdateGuide";

const BookingGuide = (props) => (
  <div>
    <h4>Book a MTB guide</h4>
    
    <UpdateGuide id={props.id} />
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
