import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DayNr = (props) => {
  const { dayOfMonth, highlight } = props;
  return highlight ? (
    <div>{dayOfMonth}</div>
  ) : (
    <div>{dayOfMonth}</div>
  );
};

DayNr.propTypes = {
  dayOfMonth: PropTypes.string,
  highlight: PropTypes.bool,
};
const StyledNrSpan = styled.span`
  display: grid;
  font-family: 'Yanone Kaffeesatz', 'sans-serif';
  font-size: 1.8rem;
  line-height: 0.6;
  .highlight {
    color: #ef5350;
  }
`;

export default DayNr;
