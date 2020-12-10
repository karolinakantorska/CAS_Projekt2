import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DayNr = (props) => {
  const { dayOfMonth, highlight } = props;
  return highlight ? (
    <StyledNrSpan className="highlight">{dayOfMonth}</StyledNrSpan>
  ) : (
    <StyledNrSpan>{dayOfMonth}</StyledNrSpan>
  );
};

DayNr.propTypes = {
  dayOfMonth: PropTypes.string,
  highlight: PropTypes.bool,
};
const StyledNrSpan = styled.span`
  display: grid;
  font-family: ${(props) => props.theme.fontFamilyCalendar};
  color: ${(props) => props.theme.colorTextCalendar.numbersLight};
  font-size: 2rem;
  padding: 0.4rem 0 0 0.2rem;
  line-height: 0.6;
  .highlight {
    color: ${(props) => props.theme.colorTextCalendar.warning};
  }
`;

export default DayNr;
