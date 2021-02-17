import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Year = ({ selectedYear }) => {
  return <StyledSpan className="calendar_font">{selectedYear}</StyledSpan>;
};
const StyledSpan = styled.span`
  color: var(--calendarColorLight);
  font-size: 3rem;
  margin-left: 20px;
  margin-top: 10px;
  -webkit-transform: rotate(-15deg);
  -moz-transform: rotate(-15deg);
  @media (max-width: 840px) {
    font-size: 2.8rem;
  }
  @media (max-width: 600px) {
    font-size: 2.5rem;
  }
`;
Year.propTypes = {
  selectedYear: PropTypes.string.required,
};

export default Year;
//
