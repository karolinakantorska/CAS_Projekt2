import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import SingleGuideInfo from '../guide/SingleGuideInfo';
import Calendar from '../calendar/Calendar';

const Booking = (props) => {
  const { guideId } = props.props;
  return (
    <StyledDiv>
      <h4>Book a MTB guide</h4>
      <SingleGuideInfo id={guideId} className="SingleGuideInfo" />
      <Calendar props={props.props} />
    </StyledDiv>
  );
};
SingleGuideInfo.PropTypes = {
  guideId: PropTypes.string,
};

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;

  h4 {
    align-self: start;
  }
  .MuiCard-root {
    justify-self: end;
  }
`;

export default Booking;
