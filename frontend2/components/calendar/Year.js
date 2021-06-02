import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Year = ({ selectedYear }) => {
  return <StyledSpan className="calendar_font">{selectedYear}</StyledSpan>;
};
Year.propTypes = {
  selectedYear: PropTypes.string,
};
const StyledSpan = styled.span`
  grid-area: year;
  color: var(--colorLight);
  font-size: 2.5rem;
  display:grid;
  justify-content: center;
  align-self:center;
  -webkit-transform: rotate(-5deg);-webkit-transform-webkit-transform-webkit-transform-webkit-transform-webkit-transform-webkit-transform
  -moz-transform: rotate(-5deg);-moz-transform-moz-transform-moz-transform-moz-transform-moz-transform-moz-transform-moz-transform
  @media (max-width: 840px) {
    font-size: 2.8rem;
  }
  @media (max-width: 600px) {
    font-size: 2.5rem;
  }
`;

export default Year;
