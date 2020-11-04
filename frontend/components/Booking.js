import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import SingleGuideInfo from './SingleGuideInfo';
import Calendar from './Calendar';

const Booking = (props) => {
  const {guideId, guideName, guideSurname} = props.props;
  return (
    <div>
      <h4>Book a MTB guide</h4>
      <SingleGuideInfo id={guideId} />
      <Calendar props={props.props} />
    </div>
  );
  
  };
/*
const StyledNav = styled.nav`
    background: white;
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
`;
*/

export default Booking;
    //<SingleGuideInfo id={props.id} />
    //<Calendar guideId={props.id} />