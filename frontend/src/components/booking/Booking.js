import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Nav from '../main/Nav';
import Calendar from '../calendar/Calendar';
import { StyledContainer } from '../styles/StyledContainer';

const Booking = (props) => {
  const {
    guideId,
    guideName,
    guideSurname,
    guidePhoto,
  } = props.props;
  return (
    <div>
      <Nav />
      <StyledContainer>
        <Calendar props={props.props} />
      </StyledContainer>
    </div>
  );
};
Booking.PropTypes = {
  guideId: PropTypes.string,
  guideId: PropTypes.string,
  guideName: PropTypes.string,
  guideSurname: PropTypes.string,
  guidePhoto: PropTypes.string,
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
