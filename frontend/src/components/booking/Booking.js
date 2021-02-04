import React from 'react';
import PropTypes from 'prop-types';
import Nav from '../main/Nav';
import Calendar from '../calendar/Calendar';
import { StyledContainer } from '../styles/StyledContainer';

const Booking = (props) => {
  return (
    <div>
      <Nav />
      <StyledContainer>
        <Calendar props={props.props} />
      </StyledContainer>
    </div>
  );
};
Booking.propTypes = {
  guideId: PropTypes.string,
  guideId: PropTypes.string,
  guideName: PropTypes.string,
  guideSurname: PropTypes.string,
  guidePhoto: PropTypes.string,
};

export default Booking;
