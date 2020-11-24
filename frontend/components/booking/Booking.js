import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import SingleGuideInfo from '../guide/SingleGuideInfo';
import Calendar from '../calendar/Calendar';


const Booking = (props) => {
  const {guideId} = props.props;
  return (
    <StyledDiv>
      <h4>Book a MTB guide</h4>
      <SingleGuideInfo id={guideId} className="SingleGuideInfo" />
      <span className="calendar">
        <Calendar props={props.props} />
      </span>
    </StyledDiv>
  );
  
  };
  SingleGuideInfo.PropTypes = {
    guideId: PropTypes.string,
  };

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 15px;
  h4 {
    align-self: start;
   // margin: 0;
  }
  .calendar {
    grid-column: 1/-1;
  }
  .MuiCard-root {
    justify-self: end;
  }
`;


export default Booking;
