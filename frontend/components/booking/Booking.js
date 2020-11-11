import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SingleGuideInfo from '../guide/SingleGuideInfo';
import Calendar from '../calendar/Calendar';

const Booking = (props) => {
  const {guideId} = props.props;
  return (
    <div>
      <h4>Book a MTB guide</h4>
      <SingleGuideInfo id={guideId} />
      <Calendar props={props.props} />
    </div>
  );
  
  };
  SingleGuideInfo.PropTypes = {
    guideId: PropTypes.string,
  };
/*
const StyledNav = styled.nav`
    background: white;
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
`;
*/

export default Booking;
